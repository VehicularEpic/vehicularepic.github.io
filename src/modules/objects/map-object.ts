import { MatrixUtils } from '@/modules/utils/utils';
import { Model, ShaderProgram } from '@/modules/web-game';
import { ConvexPolyhedron, Shape, Vec3 } from 'cannon';

import Entity from './entity';

export default class MapObject {

    public readonly shape?: Shape;
    private readonly model: Model;

    public constructor(model: Model, { vertices, faces }: { vertices?: number[][], faces?: number[][] }) {
        this.model = model;
        if (vertices && faces) {
            const v = vertices.map(e => {
                return new Vec3(e[2] / 100.0, e[0] / 100.0, -(e[1] / 100.0));
            });

            this.shape = new ConvexPolyhedron(v, faces as any);
        }
    }

    public render(shader: ShaderProgram, entity: Entity): void {
        shader.uniformMatrix4fv('model',
            MatrixUtils.transform(entity.position, entity.quat)
        );

        this.model.render();
    }

}