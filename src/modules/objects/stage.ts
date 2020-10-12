import { Vec3 } from 'cannon'

import Camera from '@/modules/utils/camera'
import { MatrixUtils } from '@/modules/utils/utils'
import { Model, ShaderProgram } from '@/modules/web-game'

import Entity from './entity';

const vertices = [
    [-1.0, 0.0, -1.0],
    [1.0, 0.0, -1.0],
    [-1.0, 0.0, 1.0],
    [-1.0, 0.0, 1.0],
    [1.0, 0.0, 1.0],
    [1.0, 0.0, -1.0]
];

const normals = [
    [0, -1, 0],
    [0, -1, 0],
    [0, -1, 0],
    [0, 1, 0],
    [0, 1, 0],
    [0, 1, 0]
];

export default class Stage {

    public readonly name: string;
    private readonly sky: number[];
    private readonly ground: Model;
    private readonly objects: Map<Entity, Model> = new Map();

    constructor(
        name: string,
        sky: number[],
        ground: number[],
        { entities, models }: {
            entities: Entity[], models: Model[]
        }
    ) {
        this.name = name;
        this.sky = sky;
        this.ground = new Model({
            vertices,
            colors: vertices.map(e => ground),
            normals
        });

        entities.forEach((e, i) => {
            this.objects.set(e, models[i]);
        });
    }

    public scene(GL: WebGL2RenderingContext, shader: ShaderProgram): void {
        GL.disable(GL.DEPTH_TEST);
        shader.uniformMatrix4fv('model',
            MatrixUtils.transform(new Vec3(0.0, 0.0, 0.0), undefined, 1E+6)
        );
        this.ground.render();

        GL.enable(GL.DEPTH_TEST);
        GL.clearColor(this.sky[0], this.sky[1], this.sky[2], 1.0);
    }

    public render(shader: ShaderProgram, camera: Camera): void {
        shader.uniform3f('u_LightPos', 0.0, -100.0, 0.0);

        for (const [entity, model] of this.objects.entries()) {
            entity.render(shader, model);
        }
    }

}