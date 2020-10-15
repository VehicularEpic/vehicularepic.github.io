import { mat4 } from 'gl-matrix'
import { World, SAPBroadphase, Plane, Body } from 'cannon'

import Vehicle from './objects/vehicle'
import { MatrixUtils, VecUtils } from './utils/utils'
import ModelFactory from './factory/model-factory'
import Stage from './objects/stage'
import StageFactory from './factory/stage-factory'
import Camera from './utils/camera'
import Player from './objects/player'
import MapObject from './objects/map-object'

var handle: number = 0;
var GL: WebGL2RenderingContext;
var shader: ShaderProgram;

const camera = new Camera();
const player = new Player();

const world = new World();
world.broadphase = new SAPBroadphase(world);
world.gravity.set(0, 0, -10);
world.defaultContactMaterial.friction = 0.6;

(() => {
    const plane = new Body({ mass: 0 });
    plane.addShape(new Plane());
    plane.position.set(0, 0, 0);
    world.addBody(plane);
})();

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
const Objects: Map<string, MapObject> = new Map();

const stages: number = 71;
const Stages: Map<number, Stage> = new Map();

var zz = 0;

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

        Vehicles.set(name, new Vehicle(data, model));
    }

    const objects = models.filter(e => !['start', 'full', 'cres'].includes(e));
    for (const name of objects) {
        const data = await (await fetch(`models/objects/${name}.json`)).json();
        const model = await ModelFactory.create(data['model'], 'objects');

        Objects.set(name, new MapObject(model));
    }

    for (let i = 1; i <= stages; i++) {
        Stages.set(i, await StageFactory.create(String(i), models, Objects));
    }

    window.dispatchEvent(new Event('resize'));
}

function handler(game: WebGame) {
    var lastCallTime = 0;
    const time = 1 / 60;

    function step() {
        if (player.keys['ArrowUp']) {
            player.vehicle.applyEngineForce(-player.force, 2);
            player.vehicle.applyEngineForce(-player.force, 3);
        }

        if (player.keys['ArrowDown']) {
            player.vehicle.applyEngineForce(player.force, 2);
            player.vehicle.applyEngineForce(player.force, 3);
        }

        if (player.keys['ArrowRight']) {
            player.vehicle.setSteeringValue(player.steer, 0);
            player.vehicle.setSteeringValue(player.steer, 1);
        }

        if (player.keys['ArrowLeft']) {
            player.vehicle.setSteeringValue(-player.steer, 0);
            player.vehicle.setSteeringValue(-player.steer, 1);
        }

        if (player.keys['Space']) {
            player.vehicle.setBrake(player.brake, 0);
            player.vehicle.setBrake(player.brake, 1);
            player.vehicle.setBrake(player.brake, 2);
            player.vehicle.setBrake(player.brake, 3);
        }

        if (player.keys['KeyZ'] && player.keys['KeyX']) {
            zz = 0;
        } else {
            if (player.keys['KeyZ']) {
                zz += 0.1;
            }

            if (player.keys['KeyX']) {
                zz -= 0.1;
            }
        }

        const now = performance.now() / 1000;
        if (lastCallTime === 0) {
            world.step(time);
            return lastCallTime = now;
        }

        world.step(time, now - lastCallTime, 3);
    }

    function update() {
        handle = window.requestAnimationFrame(update);

        GL.viewport(0, 0, GL.canvas.width, GL.canvas.height);
        GL.clear(GL.COLOR_BUFFER_BIT | GL.DEPTH_BUFFER_BIT);

        if (game.state !== State.MENU) {
            shader.use();
            shader.uniformMatrix4fv('projection',
                MatrixUtils.perspective(70.0, window.innerWidth / window.innerHeight)
            );

            if (game.state === State.CARS) {
                GL.clearColor(0.0, 0.0, 0.0, 1.0);

                camera.pos(0.0, -4.0, 20.0);
                camera.center(0.0, 0.0, 0.0);
                shader.uniformMatrix4fv('view', camera.matrix);

                shader.uniform3f('u_LightPos', 0.0, -100.0, -10.0);
                game.vehicle.render(shader, player);
            }

            if (game.state === State.STAGES || game.state === State.GAME) {
                const stage = Stages.get(game.stage) as Stage;

                if (game.state === State.STAGES) {
                    camera.pos(camera.x + 0.1, -100.0, camera.z + 0.1);
                    shader.uniformMatrix4fv('view', camera.matrix);
                }

                stage.scene(GL, shader);
                stage.render(shader, camera);
            }

            if (game.state === State.GAME) {
                const vec = VecUtils.angles(player.quat);
                const cxz = vec.z + zz;

                const x = player.x + (-16 * Math.sin(cxz));
                const z = player.z + (-16 * Math.cos(cxz));

                camera.pos(x, player.y - 5, z);
                camera.center(player.x, player.y, player.z);
                shader.uniformMatrix4fv('view', camera.matrix);

                game.vehicle.render(shader, player);
            }

        }

        step();
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

    private _stage: number = 64;

    public start(): void {
        handler(this);
    }

    public stop(): void {
        window.cancelAnimationFrame(handle);
    }

    public initGame(): void {
        const chassisBody = new Body({
            mass: this.vehicle.mass
        });

        chassisBody.addShape(this.vehicle.shape);
        player.vehicle.chassisBody = chassisBody;

        this.vehicle.wheels.forEach(e =>
            player.vehicle.addWheel(e.options)
        );

        player.vehicle.addToWorld(world);
        world.addEventListener('postStep', () =>
            player.update(this.vehicle.wheels)
        );
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

    public get stages(): number {
        return stages;
    }

    public get stage(): number {
        return this._stage;
    }

    public set stage(value: number) {
        this._stage = value;
    }

    public get vehicle(): Vehicle {
        return Vehicles.get(
            vehicles[this._selected]
        ) as Vehicle;
    }

    public set context(context: WebGL2RenderingContext) {
        GL = context;
    }

    public get player(): Player {
        return player;
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
