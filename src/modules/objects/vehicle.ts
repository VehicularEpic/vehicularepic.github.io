import Wheel from './wheel'

import { MatrixUtils } from '@/modules/utils/utils'
import { ShaderProgram, Model } from '@/modules/web-game'

export default class Vehicle {

    private readonly name: string;
    private readonly model: Model;
    private readonly wheels: Wheel[] = [];

    public x: number = 0;
    public y: number = 0;
    public z: number = 0;

    public xz: number = 0;
    public zy: number = 0;
    public xy: number = 0;

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

    public render(shader: ShaderProgram): void {
        const matrix = MatrixUtils.transformation(
            this.x, this.y, this.z,
            this.xz, this.zy, this.xy
        );

        shader.uniformMatrix4fv('model', matrix);
        this.model.render();

        this.wheels.forEach(e => {
            e.render(shader, matrix);
        });
    }

}