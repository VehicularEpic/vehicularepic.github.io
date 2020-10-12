import { MatrixUtils } from '@/modules/utils/utils'
import { ShaderProgram, Model } from '@/modules/web-game'

import Wheel from './wheel'
import Player from './player'

export default class Vehicle {

    public readonly name: string;
    private readonly model: Model;
    private readonly _wheels: Wheel[] = [];

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
            .forEach(e => this._wheels.push(e));
    }

    public render(shader: ShaderProgram, player: Player): void {
        shader.uniformMatrix4fv('model',
            MatrixUtils.transform(player.position, player.quat)
        );

        this.model.render();
        this._wheels.forEach(e => e.render(shader));
    }

    public get wheels(): Wheel[] {
        return this._wheels;
    }

}