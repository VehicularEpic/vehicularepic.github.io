import Wheel from './wheel'
import Entity from './entity'

import { MatrixUtils } from '@/modules/utils/utils'
import { ShaderProgram, Model } from '@/modules/web-game'

export default class Vehicle {

    public readonly name: string;
    private readonly model: Model;
    private readonly wheels: Wheel[] = [];

    constructor(
        name: string,
        model: Model,
        wheels: {
            width: number,
            height: number,
            position: number[]
        }[],
        rims: {
            magnitude: number,
            depth: number,
            color: number[]
        }
    ) {
        this.name = name;
        this.model = model;
        wheels.map(e => new Wheel(e, rims))
            .forEach(e =>
                this.wheels.push(e)
            );
    }

    public render(shader: ShaderProgram, entity: Entity): void {
        const matrix = MatrixUtils.transformation(
            entity.x, entity.y, entity.z,
            entity.xz, entity.zy, entity.xy
        );

        shader.uniformMatrix4fv('model', matrix);
        this.model.render();

        this.wheels.forEach(e => {
            e.render(shader, matrix);
        });
    }

}