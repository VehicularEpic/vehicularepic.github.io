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