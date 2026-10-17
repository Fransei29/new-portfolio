/**
 * Superficie de three que usa el hero 3D (components/SystemHero).
 *
 * Se suma a types/three.d.ts por declaration merging, con la misma regla que
 * ese archivo: sin @types/three instalado, se declara sólo lo que se usa. Las
 * clases que ya existen allá se amplían con `interface` del mismo nombre.
 * Si algún día se instala @types/three, este archivo también se borra.
 */
declare module 'three' {
  export type ColorRepresentation = Color | string | number;

  interface Vector3 {
    copy(v: Vector3): this;
    sub(v: Vector3): this;
    add(v: Vector3): this;
    normalize(): this;
    negate(): this;
    clone(): Vector3;
    multiplyScalar(s: number): this;
    crossVectors(a: Vector3, b: Vector3): this;
    applyMatrix4(m: Matrix4): this;
    project(camera: Camera): this;
    setScalar(s: number): this;
    addScaledVector(v: Vector3, s: number): this;
  }

  interface Color {
    set(value: ColorRepresentation): this;
  }

  export class Vector2 {
    constructor(x?: number, y?: number);
    set(x: number, y: number): this;
  }

  export class Box3 {
    max: Vector3;
    setFromObject(object: Object3D): this;
    getCenter(target: Vector3): Vector3;
  }

  export class Raycaster {
    setFromCamera(coords: Vector2, camera: Camera): void;
    intersectObjects(objects: Object3D[], recursive?: boolean): { object: Object3D }[];
  }

  export class Matrix4 {
    makeBasis(x: Vector3, y: Vector3, z: Vector3): this;
    makeRotationX(theta: number): this;
    makeScale(x: number, y: number, z: number): this;
    copy(m: Matrix4): this;
    multiply(m: Matrix4): this;
  }

  export class Quaternion {
    setFromRotationMatrix(m: Matrix4): this;
    setFromEuler(e: Euler): this;
    slerpQuaternions(a: Quaternion, b: Quaternion, t: number): this;
    premultiply(q: Quaternion): this;
    multiply(q: Quaternion): this;
    copy(q: Quaternion): this;
  }

  export class Euler {
    x: number;
    y: number;
    z: number;
    set(x: number, y: number, z: number): this;
  }

  interface Object3D {
    name: string;
    matrix: Matrix4;
    matrixAutoUpdate: boolean;
    matrixWorldNeedsUpdate: boolean;
    visible: boolean;
    renderOrder: number;
    removeFromParent(): this;
    rotation: Euler;
    quaternion: Quaternion;
    scale: Vector3;
    matrixWorld: Matrix4;
    traverse(callback: (object: Object3D) => void): void;
    getObjectByName(name: string): Object3D | undefined;
    updateMatrixWorld(force?: boolean): void;
    lookAt(target: Vector3): void;
  }

  interface Scene {
    environment: Texture | null;
    environmentIntensity: number;
  }

  export class Group extends Object3D {}

  export class Mesh extends Object3D {
    constructor(geometry?: BufferGeometry, material?: Material);
    readonly isMesh: true;
    geometry: BufferGeometry;
    material: Material | Material[];
  }

  interface BufferGeometry {
    translate(x: number, y: number, z: number): this;
    computeBoundingBox(): void;
    boundingBox: { min: Vector3; max: Vector3 } | null;
  }
  export class PlaneGeometry extends BufferGeometry {
    constructor(width?: number, height?: number);
  }
  export class CylinderGeometry extends BufferGeometry {
    constructor(radiusTop?: number, radiusBottom?: number, height?: number, radialSegments?: number);
  }

  export class Texture {
    colorSpace: string;
    flipY: boolean;
    anisotropy: number;
    generateMipmaps: boolean;
    minFilter: number;
    needsUpdate: boolean;
    clone(): this;
    dispose(): void;
  }
  export const LinearFilter: number;
  export class CanvasTexture extends Texture {
    constructor(canvas: HTMLCanvasElement);
  }
  export class TextureLoader {
    loadAsync(url: string): Promise<Texture>;
  }
  export const SRGBColorSpace: string;
  export const NeutralToneMapping: number;
  export const MathUtils: { radToDeg(radians: number): number };

  interface Material {
    name: string;
    colorWrite: boolean;
    transparent: boolean;
  }
  export interface MeshBasicMaterialParameters {
    color?: ColorRepresentation;
    map?: Texture | null;
    transparent?: boolean;
    opacity?: number;
    depthWrite?: boolean;
    toneMapped?: boolean;
  }
  export class MeshBasicMaterial extends Material {
    constructor(parameters?: MeshBasicMaterialParameters);
    map: Texture | null;
    opacity: number;
  }
  export class MeshStandardMaterial extends Material {
    emissiveIntensity: number;
    color: Color;
    roughness: number;
  }

  export class DirectionalLight extends Object3D {
    constructor(color?: ColorRepresentation, intensity?: number);
  }

  interface WebGLRendererParameters {
    powerPreference?: 'high-performance' | 'low-power' | 'default';
  }
  interface WebGLRenderer {
    toneMapping: number;
    toneMappingExposure: number;
    setClearColor(color: ColorRepresentation, alpha?: number): void;
    capabilities: { getMaxAnisotropy(): number };
  }

  export class PMREMGenerator {
    constructor(renderer: WebGLRenderer);
    fromScene(scene: Scene, sigma?: number): { texture: Texture };
    dispose(): void;
  }
}

declare module 'three/examples/jsm/loaders/DRACOLoader.js' {
  export class DRACOLoader {
    setDecoderPath(path: string): this;
    dispose(): void;
  }
}

declare module 'three/examples/jsm/loaders/GLTFLoader.js' {
  import type { Group } from 'three';
  import type { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
  export interface GLTF {
    scene: Group;
  }
  export class GLTFLoader {
    setDRACOLoader(loader: DRACOLoader): this;
    loadAsync(url: string): Promise<GLTF>;
  }
}

declare module 'three/examples/jsm/environments/RoomEnvironment.js' {
  import { Scene } from 'three';
  export class RoomEnvironment extends Scene {}
}

