# Animación del panda 3D para la pantalla de carga: un saltito con vuelta
# completa, aterrizaje con rebote y un parpadeo, en loop. Fondo transparente
# con sombra de contacto (shadow catcher), para apoyarse sobre la página.
#
# Usa el mismo modelo del hero (public/hero3d/panda.glb, sin patitas).
# Uso: blender -b --python panda_loader.py -- <panda.glb> <out_dir> [ink_hex]
# Deja los cuadros en out_dir/f_####.png; el WebP animado lo arma otro paso.
import bpy, sys, math
from mathutils import Vector

argv = sys.argv[sys.argv.index('--') + 1:]
GLB, OUT = argv[0], argv[1]
INK = argv[2] if len(argv) > 2 else None

FRAMES = 40  # a 24 fps: 1,67 s por vuelta
SIZE = 320

bpy.ops.wm.read_factory_settings(use_empty=True)
bpy.ops.import_scene.gltf(filepath=GLB)
for n in ('panda_paw_l', 'panda_paw_r'):
    o = bpy.data.objects.get(n)
    if o:
        bpy.data.objects.remove(o, do_unlink=True)

root = bpy.data.objects['panda']
head = bpy.data.objects['panda_head']
eyes = [bpy.data.objects[n] for n in ('panda_eye_l', 'panda_eye_r')]


def hex_lin(h):
    def c(v):
        v = v / 255
        return v / 12.92 if v <= 0.04045 else ((v + 0.055) / 1.055) ** 2.4
    return (c(int(h[1:3], 16)), c(int(h[3:5], 16)), c(int(h[5:7], 16)), 1.0)


if INK:
    m = bpy.data.materials.get('panda_ink')
    m.node_tree.nodes['Principled BSDF'].inputs['Base Color'].default_value = hex_lin(INK)

# Pivote en la base de la cabeza: el salto y el aplastamiento salen del piso.
zs = [(head.matrix_world @ v.co).z for v in head.data.vertices]
zmin = min(zs)
pivot = bpy.data.objects.new('pivot', None)
bpy.context.collection.objects.link(pivot)
pivot.location = (0, 0, zmin)
root.parent = pivot
root.location.z -= zmin
H = max(zs) - zmin


def smooth(x):
    x = max(0.0, min(1.0, x))
    return x * x * (3 - 2 * x)


scn = bpy.context.scene
scn.frame_start, scn.frame_end = 1, FRAMES
for f in range(1, FRAMES + 1):
    t = (f - 1) / FRAMES
    # 0.00–0.12 se agacha, 0.12–0.62 en el aire con una vuelta, 0.62–0.78 aterriza y rebota.
    crouch = smooth(t / 0.12) * (1 - smooth((t - 0.12) / 0.06))
    air = (t - 0.12) / 0.5
    hop = math.sin(math.pi * air) if 0 <= air <= 1 else 0.0
    land = (t - 0.62) / 0.16
    bounce = math.sin(math.pi * land) * (1 - land) if 0 <= land <= 1 else 0.0
    squash = 0.16 * crouch + 0.2 * bounce
    stretch = 0.1 * hop * (1 - abs(2 * air - 1)) if 0 <= air <= 1 else 0.0
    pivot.location.z = 0.55 * H * hop
    pivot.scale = (1 + squash * 0.6, 1 + squash * 0.6, 1 - squash + stretch)
    pivot.rotation_euler = (0, 0, 2 * math.pi * smooth(air) if air > 0 else 0)
    pivot.keyframe_insert('location', frame=f)
    pivot.keyframe_insert('scale', frame=f)
    pivot.keyframe_insert('rotation_euler', frame=f)
    # Parpadeo, ya en el piso.
    b = (t - 0.84) / 0.09
    lid = 1 - 0.9 * math.sin(math.pi * b) if 0 <= b <= 1 else 1.0
    for e in eyes:
        e.scale = (1, 1, lid)
        e.keyframe_insert('scale', frame=f)

for o in [pivot] + eyes:
    if o.animation_data and o.animation_data.action:
        for fc in getattr(o.animation_data.action, 'fcurves', []):
            for k in fc.keyframe_points:
                k.interpolation = 'LINEAR'

# Piso que sólo recibe sombra.
bpy.ops.mesh.primitive_plane_add(size=6, location=(0, 0, 0))
floor = bpy.context.active_object
floor.is_shadow_catcher = True

# Luz de estudio: key arriba a la izquierda, contra lila, ambiente suave.
w = bpy.data.worlds.new('w')
scn.world = w
w.use_nodes = True
w.node_tree.nodes['Background'].inputs[0].default_value = (0.85, 0.83, 0.95, 1)
w.node_tree.nodes['Background'].inputs[1].default_value = 0.55
for loc, en, col, size in (
    ((-2.2, -2.6, 3.4), 520, (1, 1, 1), 2.6),
    ((2.6, 1.8, 2.0), 260, (0.8, 0.72, 1.0), 2.0),
):
    ld = bpy.data.lights.new('l', 'AREA')
    ld.energy = en
    ld.size = size
    ld.color = col
    lo = bpy.data.objects.new('l', ld)
    lo.location = loc
    lo.rotation_euler = (Vector((0, 0, 0.5)) - Vector(loc)).to_track_quat('-Z', 'Y').to_euler()
    scn.collection.objects.link(lo)

cd = bpy.data.cameras.new('cam')
cd.lens = 60
cam = bpy.data.objects.new('cam', cd)
scn.collection.objects.link(cam)
target = Vector((0, 0, H * 0.75))
cam.location = target + Vector((0, -1, 0.32)).normalized() * 6.4
cam.rotation_euler = (target - cam.location).to_track_quat('-Z', 'Y').to_euler()
scn.camera = cam

scn.render.engine = 'CYCLES'
scn.cycles.device = 'CPU'
scn.cycles.samples = 40
scn.cycles.use_denoising = True
scn.render.film_transparent = True
scn.render.resolution_x = scn.render.resolution_y = SIZE
scn.render.fps = 24
scn.render.image_settings.file_format = 'PNG'
scn.render.image_settings.color_mode = 'RGBA'
scn.render.filepath = OUT.rstrip('/') + '/f_'
bpy.ops.render.render(animation=True)
