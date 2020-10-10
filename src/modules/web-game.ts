import path from 'path'
import { mat4, quat } from 'gl-matrix'

var handle: number = 0;
var GL: WebGL2RenderingContext;

const files: string[] = [
    'drags'
];

async function initialize() {
    window.addEventListener('resize', () => {
        GL.canvas.width = window.innerWidth;
        GL.canvas.height = window.innerHeight;
    });

    GL.enable(GL.DEPTH_TEST);
    GL.depthFunc(GL.LEQUAL);

    for (const name of files) {
        const data = await (await fetch(`models/${name}.json`)).json();
        const model = await ModelFactory.create(data['model']);
    }

    window.dispatchEvent(new Event('resize'));
}

function handler(game: WebGame) {
    function update() {
        handle = window.requestAnimationFrame(update);

        GL.clearColor(0.0, 0.0, 0.0, 1.0);
        GL.viewport(0, 0, GL.canvas.width, GL.canvas.height);
        GL.clear(GL.COLOR_BUFFER_BIT | GL.DEPTH_BUFFER_BIT);
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

class VertexArray {

    private readonly buffer: WebGLVertexArrayObject;
    private readonly buffers: WebGLBuffer[] = [];

    constructor() {
        this.buffer = GL.createVertexArray() as WebGLVertexArrayObject;
    }

    public bind(): void {
        GL.bindVertexArray(this.buffer);
    }

    public unbind(): void {
        GL.bindVertexArray(null);
    }

    public push(data: number[]): void {
        this.bind();
        const index = this.buffers.length;
        const object = GL.createBuffer() as WebGLBuffer;
        this.buffers.push(object);

        GL.enableVertexAttribArray(index);
        GL.bindBuffer(GL.ARRAY_BUFFER, object);
        GL.bufferData(GL.ARRAY_BUFFER, new Float32Array(data), GL.STATIC_DRAW);
        GL.vertexAttribPointer(index, 3, GL.FLOAT, false, 0, 0);
        GL.bindBuffer(GL.ARRAY_BUFFER, null);
        this.unbind();
    }

}

class ModelFactory {

    public static async create(object: string): Promise<Model> {
        const vertices: number[][] = [];
        const colors: number[][] = [];
        const normals: number[][] = [];

        const data = await (await fetch(`models/${object}`)).text();

        function vec3(type: 'v' | 'vn'): number[][] {
            const values: number[][] = [];
            const regex = new RegExp(`${type}\\s(.+?)$`, 'gm');

            for (let a; (a = regex.exec(data)) !== null;) {
                values.push(a[1].split(/\s/).map(i => Number(i)));
            }

            return values;
        }

        const v = vec3('v'), vn = vec3('vn');
        const materials = await (async () => {
            const values: {
                [material: string]: number[]
            } = {};

            const mtllib = /mtllib\s(.+?)$/gm.exec(data);
            if (mtllib !== null) {
                const file = path.basename(mtllib[1]);
                const rgx1 = /newmtl\s(.+?)$/gm, rgx2 = /Kd\s(.+?)$/gm;
                const mtldata = await (await fetch(`models/${file}`)).text();

                for (let a; (a = rgx1.exec(mtldata)) !== null;) {
                    values[a[1]] = (rgx2.exec(mtldata) as RegExpExecArray)[1]
                        .split(/\s/).map(i => Number(i));
                }

                return values;
            }

            values['default'] = [0.25, 0.25, 0.25];
            return values;
        })();

        var material: string = 'default';
        data.split(/\n/gm).filter(s =>
            /^(usemtl|f)/.test(s)
        ).map(e => e.split(/\s/, 4)).forEach(e => {
            if (e[0] === 'usemtl') {
                material = e[1];
            } else if (e[0] === 'f') {
                e.slice(1).forEach(i => {
                    const indices = i.split(/\/\//g)
                        .map(j => Number(j));

                    vertices.push(v[indices[0] - 1]);
                    colors.push(materials[material]);
                    normals.push(vn[indices[1] - 1]);
                });
            }
        });

        return new Model({ vertices, colors, normals });
    }

}

class Model {

    private readonly length: number;
    private readonly buffer: VertexArray;

    constructor(data: {
        vertices: number[][],
        colors: number[][],
        normals: number[][],
    }) {
        this.buffer = new VertexArray();
        this.length = data.vertices.length;

        this.buffer.push(data.vertices.flat());
        this.buffer.push(data.colors.flat());
        this.buffer.push(data.normals.flat());
    }

    public render(): void {
        this.buffer.bind();
        GL.drawArrays(GL.TRIANGLES, 0, this.length);
        this.buffer.unbind();
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