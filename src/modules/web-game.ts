import { mat4 } from 'gl-matrix'

import Entity from './objects/entity'
import Vehicle from './objects/vehicle'
import { MatrixUtils } from './utils/utils'
import ModelFactory from './factory/model-factory'

var handle: number = 0;
var GL: WebGL2RenderingContext;
var shader: ShaderProgram;

const player = new Entity();
player.y = -1.0;
player.z = 10.0;

const vehicles: string[] = [
    'drags'
];

const models: string[] = [
    'prod', 'prodw', 'prodb2', 'prodb1', 'prodt', 'drod', 'grod', 'drodt', 'nrod', 'nrodt',
    'mixpd', 'mixnd', 'mixpn', 'prode', 'drode', 'pipg', 'prmp', 'prmpc', 'prmpg', 'prmpm',
    'prmpw', 'prmpb', 'prmps', 'dbmp', 'drmpb', 'drmps', 'pipe', 'spikes', 'rail', 'brdr',
    'chk', 'fix', 'dchk', 'drodb', 'drodbb', 'bprmpup', 'prmpup', 'start', 'wall', 'fenc',
    'prmpl', 'net', 'prmpspd', 'drmpg', 'tiny', 'dhil', 'stunl', 'tunl', 'lift', 'mountn',
    'mass', 'cres', 'pile1', 'pile2', 'brdr2', 'tre1', 'tre2', 'tre3', 'tre4', 'tre5',
    'tre6', 'tre7', 'tre8', 'cac1', 'cac2', 'cac3', 'blok', 'full', 'pyrmd', 'tub'
];

const Vehicles: Map<string, Vehicle> = new Map();

async function initialize() {
    window.addEventListener('resize', () => {
        GL.canvas.width = window.innerWidth;
        GL.canvas.height = window.innerHeight;
    });

    GL.enable(GL.DEPTH_TEST);
    GL.depthFunc(GL.LEQUAL);

    shader = new ShaderProgram();
    await shader.create(
        {
            name: 'vertex.glsl',
            type: GL.VERTEX_SHADER
        },
        {
            name: 'fragment.glsl',
            type: GL.FRAGMENT_SHADER
        }
    );

    for (const name of vehicles) {
        const data = await (await fetch(`models/vehicles/${name}.json`)).json();
        const model = await ModelFactory.create(data['model'], 'vehicles');

        const vehicle = new Vehicle(data['name'], model, data['wheels'], data['rims']);
        Vehicles.set(name, vehicle);
    }

    window.dispatchEvent(new Event('resize'));
}

function handler(game: WebGame) {
    function update() {
        handle = window.requestAnimationFrame(update);

        GL.clearColor(0.0, 0.0, 0.0, 1.0);
        GL.viewport(0, 0, GL.canvas.width, GL.canvas.height);
        GL.clear(GL.COLOR_BUFFER_BIT | GL.DEPTH_BUFFER_BIT);

        if (game.state !== State.MENU) {
            const matrix = MatrixUtils.perspective(70.0, window.innerWidth / window.innerHeight);

            if (game.state === State.CARS) {
                const vehicle = Vehicles.get(
                    vehicles[game.selected]
                ) as Vehicle;

                player.xz += 0.01;

                shader.use();
                shader.uniformMatrix4fv('projection', matrix);
                shader.uniformMatrix4fv('view',
                    MatrixUtils.lookAt(0.0, -4.0, 20.0, 0.0, 0.0, 0.0));

                shader.uniform3f('u_LightPos', 0.0, 15.0, -10.0);
                vehicle.render(shader, player);
            }
        }
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
    private _selected: number = 0;

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

    public get selected(): number {
        return this._selected;
    }

    public set selected(value: number) {
        this._selected = Math.max(Math.min(value, vehicles.length - 1), 0);
    }

    public set context(context: WebGL2RenderingContext) {
        GL = context;
    }

}

export class ShaderProgram {

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

    public uniform3f(name: string, x: number, y: number, z: number) {
        GL.uniform3f(this.uniform(name), x, y, z);
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

export class Model {

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
