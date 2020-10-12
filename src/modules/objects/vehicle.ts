import { Box, Shape, Vec3 } from 'cannon'

import { MatrixUtils } from '@/modules/utils/utils'
import { ShaderProgram, Model } from '@/modules/web-game'

import Wheel from './wheel'
import Player from './player'

export default class Vehicle {

    public readonly name: string;
    public readonly mass: number;

    private readonly model: Model;
    private readonly _wheels: Wheel[] = [];
    private readonly boundaries: number[];

    constructor({ name, mass, boundaries, suspension, friction, wheels, rims }: {
        name: string,
        mass: number,
        boundaries: number[],
        suspension: number,
        friction: number,
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
    }, model: Model) {
        this.name = name;
        this.model = model;
        this.mass = mass;
        this.boundaries = boundaries;
        wheels.map(e => new Wheel(e, rims, suspension, friction))
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

    public get shape(): Shape {
        const { [0]: x, [1]: y, [2]: z } = this.boundaries;
        return new Box(new Vec3(z, x, y));
    }

}