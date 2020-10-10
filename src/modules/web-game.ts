import { mat4, quat } from 'gl-matrix'

var handle: number = 0;
var GL: WebGL2RenderingContext;

async function initialize() {

}

function handler(game: WebGame) {
    function update() {
        handle = window.requestAnimationFrame(update);
    }

    if (handle === 0) {
        initialize().then(update);
    }
}

export enum State {

    MENU, CARS, STAGES, GAME

}

export class WebGame {

    private _state: State = State.MENU;

    public start(): void {
        handler(this);
    }

    public stop(): void {
        window.cancelAnimationFrame(handle);
    }

    public get state(): State {
        return this._state;
    }

    public set state(state: State) {
        this._state = state;
    }

    public set context(context: WebGL2RenderingContext) {
        GL = context;
    }

}

class ShaderProgram {

    private readonly uniforms: {
        [uniform: string]: WebGLUniformLocation
    } = {};
    private readonly program: WebGLProgram;

    public constructor() {
        this.program = GL.createProgram() as WebGLProgram;
    }

    public async create(...shaders: { name: string, type: GLenum }[]): Promise<void> {
        async function fetchShader(file: string, type: GLenum): Promise<WebGLShader> {
            return (await fetch(file)).text().then(data => {
                const shader = GL.createShader(type) as WebGLShader;
                GL.shaderSource(shader, data);
                GL.compileShader(shader);

                if (!GL.getShaderParameter(shader, GL.COMPILE_STATUS)) {
                    return Promise.reject(GL.getShaderInfoLog(shader));
                }

                return Promise.resolve(shader);
            });
        }

        for (const e of shaders) {
            const shader = await fetchShader(`shaders/${e.name}`, e.type);
            GL.attachShader(this.program, shader);
        }

        GL.linkProgram(this.program);
        if (!GL.getProgramParameter(this.program, GL.LINK_STATUS)) {
            throw new Error('[SHADER_PROGRAM ERROR] ' + GL.getProgramInfoLog(this.program));
        }
    }

    public use(): void {
        GL.useProgram(this.program);
    }

    public uniform(name: string): WebGLUniformLocation {
        if (this.uniforms[name] !== undefined) {
            return this.uniforms[name];
        }

        return this.uniforms[name] = GL.getUniformLocation(
            this.program, name
        ) as WebGLUniformLocation;
    }

    public uniform1i(name: string, value: GLint) {
        GL.uniform1i(this.uniform(name), value);
    }

    public uniformMatrix4fv(name: string, matrix: mat4) {
        GL.uniformMatrix4fv(this.uniform(name), false, matrix);
    }

}

class MatrixUtils {

    public static perspective(fovY: number, aspect: number): mat4 {
        const near = 0.01;
        const height = near * Math.tan((fovY / 2) * (Math.PI / 180.0));

        const matrix = mat4.create();
        mat4.frustum(matrix, -(height * aspect), height * aspect, -height, height, near, 0);

        const e = 1E-6;
        matrix[10] = e - 1.0;
        matrix[14] = (e - 2.0) * near;
        return matrix;
    }

    public static lookAt(x: number, y: number, z: number, cx: number, cy: number, cz: number): mat4 {
        return mat4.lookAt(
            mat4.create(),
            [x, y, z],
            [cx, cy, cz],
            [0.0, -1.0, 0.0]
        );
    }

    public static transformation(x: number, y: number, z: number, xz: number, zy: number, xy: number): mat4 {
        const quat_xz = quat.setAxisAngle(quat.create(), [0.0, -1.0, 0.0], xz);
        const quat_zy = quat.setAxisAngle(quat.create(), [1.0, 0.0, 0.0], zy);
        const quat_xy = quat.setAxisAngle(quat.create(), [0.0, 0.0, 1.0], xy);

        const rotated = quat.create();
        quat.mul(rotated, quat_xz, quat_zy);
        quat.mul(rotated, rotated, quat_xy);

        return mat4.fromRotationTranslationScale(mat4.create(),
            rotated, [x, y, z], [1.0, 1.0, 1.0]
        );
    }

}