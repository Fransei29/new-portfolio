/**
 * Declaración mínima de three.
 *
 * three 0.171 dejó de publicar sus .d.ts y los tipos viven en @types/three, que
 * no está instalado. Como la consigna es no sumar dependencias, declaramos a
 * mano SÓLO la superficie que usa el campo de partículas del hero.
 *
 * Deliberadamente NO es `declare module 'three'` a secas: eso lo volvería `any`
 * y perderíamos el chequeo justo en el código que manipula buffers tipados, que
 * es donde un error de tipos se paga caro (un Float32Array mal pasado no falla,
 * dibuja basura).
 *
 * Si en algún momento se instala @types/three, este archivo se borra y el
 * código de arriba compila igual — está escrito contra la API real.
 */
declare module 'three' {
  export class Color {
    constructor(r?: number, g?: number, b?: number);
    setRGB(r: number, g: number, b: number): this;
  }

  export class Vector3 {
    constructor(x?: number, y?: number, z?: number);
    x: number;
    y: number;
    z: number;
    set(x: number, y: number, z: number): this;
  }

  export class BufferAttribute {
    constructor(array: ArrayLike<number>, itemSize: number, normalized?: boolean);
    needsUpdate: boolean;
    array: ArrayLike<number>;
  }

  export class BufferGeometry {
    attributes: { [name: string]: BufferAttribute };
    setAttribute(name: string, attribute: BufferAttribute): this;
    dispose(): void;
  }

  export interface Uniform<T = unknown> {
    value: T;
  }

  export interface ShaderMaterialParameters {
    vertexShader?: string;
    fragmentShader?: string;
    uniforms?: { [name: string]: Uniform };
    transparent?: boolean;
    depthWrite?: boolean;
    depthTest?: boolean;
  }

  export class Material {
    dispose(): void;
  }

  export class ShaderMaterial extends Material {
    constructor(parameters?: ShaderMaterialParameters);
    uniforms: { [name: string]: Uniform };
  }

  export class Object3D {
    frustumCulled: boolean;
    position: Vector3;
    add(...object: Object3D[]): this;
    remove(...object: Object3D[]): this;
  }

  export class Scene extends Object3D {}

  export class Points extends Object3D {
    constructor(geometry?: BufferGeometry, material?: Material);
  }

  export class Camera extends Object3D {}

  export class PerspectiveCamera extends Camera {
    constructor(fov?: number, aspect?: number, near?: number, far?: number);
    fov: number;
    aspect: number;
    updateProjectionMatrix(): void;
  }

  export interface WebGLRendererParameters {
    canvas?: HTMLCanvasElement;
    alpha?: boolean;
    antialias?: boolean;
    powerPreference?: 'high-performance' | 'low-power' | 'default';
  }

  export class WebGLRenderer {
    constructor(parameters?: WebGLRendererParameters);
    setSize(width: number, height: number, updateStyle?: boolean): void;
    setPixelRatio(value: number): void;
    setClearAlpha(alpha: number): void;
    render(scene: Scene, camera: Camera): void;
    dispose(): void;
    forceContextLoss(): void;
  }
}
