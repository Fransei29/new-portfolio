# Panda 3D a partir del isotipo de la marca (public/isotipo-panda.svg).
# Cada pieza del SVG se extruye y se "infla" con un perfil de almohadón:
#   - shell: la silueta completa (orejas incluidas) en carbón #2e2d3b
#   - face:  la cara clara #f3f2f4, apoyada sobre el shell
#   - ojos y nariz: carbón brillante, montados sobre la curva de la cara
# Uso: blender -b --python panda3d.py -- <svg> <out.glb> [preview.png]
import bpy, bmesh, sys, math
from mathutils import Vector

argv = sys.argv[sys.argv.index('--') + 1:]
SVG, OUT = argv[0], argv[1]
PREVIEW = argv[2] if len(argv) > 2 else None

bpy.ops.wm.read_factory_settings(use_empty=True)
bpy.ops.import_curve.svg(filepath=SVG)
curves = [o for o in bpy.data.objects if o.type == 'CURVE']

# Identificar piezas por tamaño (el SVG trae: cara, contorno+orejas, 2 ojos, nariz).
by_size = sorted(curves, key=lambda o: o.dimensions.x * o.dimensions.y, reverse=True)
outline, face = by_size[0], by_size[1]
small = by_size[2:]
nose = min(small, key=lambda o: o.dimensions.x * o.dimensions.y)
eyes = [o for o in small if o is not nose]

HEAD_W = 1.15
S = HEAD_W / outline.dimensions.x


def hex_lin(h):
    def c(v):
        v = v / 255
        return v / 12.92 if v <= 0.04045 else ((v + 0.055) / 1.055) ** 2.4
    return (c(int(h[1:3], 16)), c(int(h[3:5], 16)), c(int(h[5:7], 16)), 1.0)


def material(name, hexcol, rough, coat=0.0):
    m = bpy.data.materials.new(name)
    m.use_nodes = True
    b = m.node_tree.nodes['Principled BSDF']
    b.inputs['Base Color'].default_value = hex_lin(hexcol)
    b.inputs['Roughness'].default_value = rough
    b.inputs['Metallic'].default_value = 0.0
    if coat:
        b.inputs['Coat Weight'].default_value = coat
        b.inputs['Coat Roughness'].default_value = 0.08
    return m


M_INK = material('panda_ink', '#2e2d3b', 0.42)
M_FACE = material('panda_face', '#f3f2f4', 0.48)
M_EYE = material('panda_eye', '#24232f', 0.16, coat=1.0)


def polyline(obj, keep_outer_only=False):
    """Contornos 2D (en unidades finales) de una curva del SVG."""
    loops = []
    for sp in obj.data.splines:
        pts = []
        bp = sp.bezier_points
        n = len(bp)
        for i in range(n):
            a, b = bp[i], bp[(i + 1) % n]
            p0, p1, p2, p3 = a.co, a.handle_right, b.handle_left, b.co
            for k in range(12):
                t = k / 12
                q = ((1 - t) ** 3) * p0 + 3 * ((1 - t) ** 2) * t * p1 + 3 * (1 - t) * t * t * p2 + (t ** 3) * p3
                w = obj.matrix_world @ q
                pts.append((w.x * S, w.y * S))
        loops.append(pts)
    if keep_outer_only:
        loops = [max(loops, key=lambda L: area(L))]
    return loops


def area(L):
    return abs(sum(L[i][0] * L[(i + 1) % len(L)][1] - L[(i + 1) % len(L)][0] * L[i][1] for i in range(len(L)))) / 2


def dist_to(loops, x, y):
    best = 1e9
    for L in loops:
        n = len(L)
        for i in range(n):
            ax, ay = L[i]
            bx, by = L[(i + 1) % n]
            dx, dy = bx - ax, by - ay
            ll = dx * dx + dy * dy or 1e-12
            t = max(0.0, min(1.0, ((x - ax) * dx + (y - ay) * dy) / ll))
            ex, ey = ax + t * dx - x, ay + t * dy - y
            d = ex * ex + ey * ey
            if d < best:
                best = d
    return math.sqrt(best)


def inside(L, x, y):
    c = False
    n = len(L)
    for i in range(n):
        ax, ay = L[i]
        bx, by = L[(i + 1) % n]
        if (ay > y) != (by > y) and x < (bx - ax) * (y - ay) / (by - ay) + ax:
            c = not c
    return c


def pillow(loops, z0, thick, rim, bulge, mat, name, res=0.012, base_fn=None):
    """Malla cerrada: tapa delantera inflada (perfil circular en el borde,
    panza suave en el centro), lateral y tapa trasera plana."""
    outer = max(loops, key=area)
    holes = [L for L in loops if L is not outer]
    xs = [p[0] for p in outer]
    ys = [p[1] for p in outer]
    cx, cy = (min(xs) + max(xs)) / 2, (min(ys) + max(ys)) / 2
    rmax = max(max(xs) - min(xs), max(ys) - min(ys)) / 2

    # Triangulación: grilla regular adentro + el contorno, unido con bmesh.
    bm = bmesh.new()
    ring = [bm.verts.new((x, y, 0)) for x, y in outer]
    bm.faces.new(ring)
    for H in holes:
        hr = [bm.verts.new((x, y, 0)) for x, y in H]
        bm.faces.new(hr)
    bm.normal_update()
    me = bpy.data.meshes.new(name + '_2d')
    bm.to_mesh(me)
    bm.free()
    ob = bpy.data.objects.new(name, me)
    bpy.context.collection.objects.link(ob)
    bpy.context.view_layer.objects.active = ob
    ob.select_set(True)
    # Malla pareja para que el inflado sea suave: relleno con grid fill vía remesh 2D.
    bpy.ops.object.mode_set(mode='EDIT')
    bpy.ops.mesh.select_all(action='SELECT')
    if holes:
        # la cara del agujero no es parte de la pieza
        bpy.ops.mesh.delete(type='ONLY_FACE')
        bpy.ops.mesh.select_all(action='DESELECT')
        bpy.ops.object.mode_set(mode='OBJECT')
        bm = bmesh.new()
        bm.from_mesh(me)
        # rellenar sólo el anillo entre contornos
        bmesh.ops.triangle_fill(bm, use_beauty=True, use_dissolve=False, edges=bm.edges[:])
        # sacar los triángulos que caen dentro del agujero
        kill = [f for f in bm.faces if any(inside(H, *f.calc_center_median().xy) for H in holes)]
        bmesh.ops.delete(bm, geom=kill, context='FACES')
        bm.to_mesh(me)
        bm.free()
        bpy.ops.object.mode_set(mode='EDIT')
        bpy.ops.mesh.select_all(action='SELECT')
    bpy.ops.mesh.quads_convert_to_tris()
    bpy.ops.object.mode_set(mode='OBJECT')
    # Subdividir hasta la resolución pedida (aristas largas del triangulado).
    bm = bmesh.new()
    bm.from_mesh(me)
    for _ in range(8):
        long_e = [e for e in bm.edges if e.calc_length() > res * 1.6]
        if not long_e:
            break
        bmesh.ops.subdivide_edges(bm, edges=long_e, cuts=1, use_grid_fill=False)
        bmesh.ops.triangulate(bm, faces=bm.faces[:])
        bmesh.ops.beautify_fill(bm, faces=bm.faces[:], edges=bm.edges[:])
    # Relajar el interior para que los triángulos queden parejos.
    boundary = {v for e in bm.edges if e.is_boundary for v in e.verts}
    for _ in range(12):
        for v in bm.verts:
            if v in boundary or not v.link_edges:
                continue
            avg = sum((e.other_vert(v).co for e in v.link_edges), Vector()) / len(v.link_edges)
            v.co.x, v.co.y = avg.x, avg.y

    # Tapa delantera: altura según la distancia al borde.
    front = list(bm.faces)
    for v in bm.verts:
        d = dist_to(loops, v.co.x, v.co.y)
        t = min(d / rim, 1.0)
        prof = math.sqrt(max(0.0, 1 - (1 - t) ** 2))
        r2 = ((v.co.x - cx) ** 2 + (v.co.y - cy) ** 2) / (rmax * rmax)
        base = base_fn(v.co.x, v.co.y) if base_fn else z0
        v.co.z = base + thick * 0.35 + (thick * 0.65) * prof + bulge * max(0.0, 1 - r2)
    # Lateral + tapa trasera: extruir el borde hacia atrás y cerrar.
    edges_b = [e for e in bm.edges if e.is_boundary]
    ret = bmesh.ops.extrude_edge_only(bm, edges=edges_b)
    new_v = [g for g in ret['geom'] if isinstance(g, bmesh.types.BMVert)]
    for v in new_v:
        v.co.z = (base_fn(v.co.x, v.co.y) if base_fn else z0) - 0.002
    back = bmesh.ops.duplicate(bm, geom=front)
    bv = [g for g in back['geom'] if isinstance(g, bmesh.types.BMVert)]
    for v in bv:
        v.co.z = (base_fn(v.co.x, v.co.y) if base_fn else z0) - 0.002
    bmesh.ops.reverse_faces(bm, faces=[g for g in back['geom'] if isinstance(g, bmesh.types.BMFace)])
    bmesh.ops.remove_doubles(bm, verts=bm.verts[:], dist=1e-5)
    bmesh.ops.recalc_face_normals(bm, faces=bm.faces[:])
    bm.to_mesh(me)
    bm.free()
    me.materials.append(mat)
    for p in me.polygons:
        p.use_smooth = True
    return ob


outline_loops = polyline(outline, keep_outer_only=True)
face_loops = polyline(face)

# Shell carbón: silueta entera, orejas incluidas.
SHELL_T = 0.16
shell = pillow(outline_loops, 0.0, SHELL_T, rim=0.07, bulge=0.05, mat=M_INK, name='panda_shell', res=0.02)
shell_top = lambda x, y: SHELL_T * 0.6  # la cara se apoya un poco hundida en el shell

# Cara clara: almohadón más alto, panza notoria.
FACE_T = 0.12
FACE_RIM = 0.16
FACE_BULGE = 0.1
fxs = [p[0] for L in face_loops for p in L]
fys = [p[1] for L in face_loops for p in L]
fcx, fcy = (min(fxs) + max(fxs)) / 2, (min(fys) + max(fys)) / 2
frmax = max(max(fxs) - min(fxs), max(fys) - min(fys)) / 2
face_ob = pillow(face_loops, SHELL_T * 0.6, FACE_T, rim=FACE_RIM, bulge=FACE_BULGE, mat=M_FACE, name='panda_face', res=0.018)


def face_height(x, y):
    d = dist_to(face_loops, x, y)
    t = min(d / FACE_RIM, 1.0)
    prof = math.sqrt(max(0.0, 1 - (1 - t) ** 2))
    r2 = ((x - fcx) ** 2 + (y - fcy) ** 2) / (frmax * frmax)
    return SHELL_T * 0.6 + FACE_T * 0.35 + FACE_T * 0.65 * prof + FACE_BULGE * max(0.0, 1 - r2)


# Ojos y nariz: montados sobre la curva de la cara (hundidos 4 mm para que no floten).
parts = [face_ob, shell]
for i, e in enumerate(eyes + [nose]):
    L = polyline(e)
    is_nose = e is nose
    ob = pillow(L, 0, 0.035 if is_nose else 0.03, rim=0.02 if is_nose else 0.035, bulge=0.012,
                mat=M_EYE, name='panda_nose' if is_nose else f'panda_eye{i}', res=0.008,
                base_fn=lambda x, y: face_height(x, y) - 0.012)
    parts.append(ob)

for c in curves:
    bpy.data.objects.remove(c, do_unlink=True)


def finish(ob, voxel, smooth_iter, ratio):
    """Remallado uniforme + suavizado: saca las arrugas del armado a mano."""
    bpy.ops.object.select_all(action='DESELECT')
    bpy.context.view_layer.objects.active = ob
    ob.select_set(True)
    m = ob.modifiers.new('rm', 'REMESH')
    m.mode = 'VOXEL'
    m.voxel_size = voxel
    m.adaptivity = 0
    m = ob.modifiers.new('sm', 'SMOOTH')
    m.factor = 0.6
    m.iterations = smooth_iter
    m = ob.modifiers.new('dc', 'DECIMATE')
    m.ratio = ratio
    for mod in list(ob.modifiers):
        bpy.ops.object.modifier_apply(modifier=mod.name)
    for p in ob.data.polygons:
        p.use_smooth = True


finish(shell, 0.007, 12, 0.35)
finish(face_ob, 0.006, 10, 0.35)
for ob in parts[2:]:
    finish(ob, 0.003, 6, 0.4)

# Cabeza = shell + cara + nariz en una malla; los ojos aparte (con el origen en
# su centro) para poder parpadear. Todo bajo un empty "panda", centrado en la
# cabeza y orientado con la cara hacia -Y (frente de Blender) y arriba +Z.
eye_obs = [o for o in parts if o.name.startswith('panda_eye')]
head_parts = [o for o in parts if o not in eye_obs]
bpy.ops.object.select_all(action='DESELECT')
for p in head_parts:
    p.select_set(True)
bpy.context.view_layer.objects.active = face_ob
bpy.ops.object.join()
head = bpy.context.active_object
head.name = 'panda_head'
xs = [v.co.x for v in head.data.vertices]
ys = [v.co.y for v in head.data.vertices]
cx, cy = (min(xs) + max(xs)) / 2, (min(ys) + max(ys)) / 2
for ob in [head] + eye_obs:
    for v in ob.data.vertices:
        v.co.x -= cx
        v.co.y -= cy
# Ojo izquierdo/derecho según x; origen en el centro de cada uno.
eye_obs.sort(key=lambda o: sum(v.co.x for v in o.data.vertices) / len(o.data.vertices))
for ob, nm in zip(eye_obs, ('panda_eye_l', 'panda_eye_r')):
    ob.name = nm
    bpy.ops.object.select_all(action='DESELECT')
    bpy.context.view_layer.objects.active = ob
    ob.select_set(True)
    bpy.ops.object.origin_set(type='ORIGIN_GEOMETRY', center='BOUNDS')
# Patitas: una mano tipo mitón (palma ovalada + tres deditos) en carbón, con
# el mismo inflado que la cabeza. Se exportan aparte; el hero las apoya sobre
# el borde del dashboard, como agarrándose para asomarse.
def paw_outline(cx, cy, flip):
    pts = []
    n = 140
    for k in range(n):
        t = 2 * math.pi * k / n
        rx, ry = 0.17, 0.125
        x, y = rx * math.cos(t), ry * math.sin(t)
        # deditos: tres lomas sobre el borde de arriba
        if math.sin(t) > 0.25:
            bump = abs(math.cos(3 * (t - math.pi / 2)))
            r = 1 + 0.26 * bump ** 2.5 * (math.sin(t) - 0.25) / 0.75
            x, y = x * r, y * r
        pts.append((cx + (x if not flip else -x), cy + y))
    return [pts]


paw_obs = []
for nm, px, flip in (('panda_paw_l', -0.36, False), ('panda_paw_r', 0.36, True)):
    ob = pillow(paw_outline(0, 0, flip), 0.0, 0.09, rim=0.06, bulge=0.025, mat=M_INK, name=nm, res=0.01)
    finish(ob, 0.004, 8, 0.4)
    ob.name = nm
    for v in ob.data.vertices:
        v.co.x += px
        v.co.y += -0.62
        v.co.z += 0.12
    bpy.ops.object.select_all(action='DESELECT')
    bpy.context.view_layer.objects.active = ob
    ob.select_set(True)
    bpy.ops.object.origin_set(type='ORIGIN_GEOMETRY', center='BOUNDS')
    paw_obs.append(ob)

root = bpy.data.objects.new('panda', None)
bpy.context.collection.objects.link(root)
for ob in [head] + eye_obs + paw_obs:
    ob.parent = root
root.rotation_euler = (math.radians(90), 0, 0)
bpy.ops.object.select_all(action='DESELECT')
for ob in [root, head] + eye_obs + paw_obs:
    ob.select_set(True)
print('PANDA dims', [round(d, 3) for d in head.dimensions], 'verts', sum(len(o.data.vertices) for o in [head] + eye_obs))

bpy.ops.export_scene.gltf(filepath=OUT, export_format='GLB', use_selection=True,
                          export_draco_mesh_compression_enable=True,
                          export_draco_mesh_compression_level=6, export_apply=True)

if PREVIEW:
    scn = bpy.context.scene
    scn.render.engine = 'CYCLES'
    scn.cycles.samples = 48
    scn.cycles.device = 'CPU'
    scn.render.resolution_x = scn.render.resolution_y = 700
    scn.render.film_transparent = False
    w = bpy.data.worlds.new('w')
    scn.world = w
    w.use_nodes = True
    w.node_tree.nodes['Background'].inputs[0].default_value = (0.78, 0.76, 0.9, 1)
    w.node_tree.nodes['Background'].inputs[1].default_value = 0.7
    for loc, en in (((-2, -3, 3), 450), ((3, -1, 2), 150)):
        ld = bpy.data.lights.new('l', 'AREA')
        ld.energy = en
        ld.size = 3
        lo = bpy.data.objects.new('l', ld)
        lo.location = loc
        lo.rotation_euler = (Vector((0, 0, 0)) - Vector(loc)).to_track_quat('-Z', 'Y').to_euler()
        scn.collection.objects.link(lo)
    for name, rz, rx in (('a', 0, 0), ('b', 28, 12)):
        cd = bpy.data.cameras.new('c')
        cd.lens = 85
        co = bpy.data.objects.new('c', cd)
        scn.collection.objects.link(co)
        dist = 5.2
        a, b = math.radians(rz), math.radians(rx)
        co.location = (dist * math.sin(a) * math.cos(b), -dist * math.cos(a) * math.cos(b), dist * math.sin(b))
        co.rotation_euler = (Vector((0, 0, 0)) - co.location).to_track_quat('-Z', 'Y').to_euler()
        scn.camera = co
        scn.render.filepath = PREVIEW.replace('.png', f'-{name}.png')
        bpy.ops.render.render(write_still=True)
