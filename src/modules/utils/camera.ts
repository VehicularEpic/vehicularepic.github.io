import { mat4 } from 'gl-matrix'
import { MatrixUtils } from './utils'

export default class Camera {

    private _x: number = 0;
    private _y: number = 0;
    private _z: number = 0;

    private _cx: number = 0;
    private _cy: number = 0;
    private _cz: number = 0;

    public pos(x: number, y: number, z: number): void {
        this._x = x;
        this._y = y;
        this._z = z;
    }

    public center(x: number, y: number, z: number): void {
        this._cx = x;
        this._cy = y;
        this._cz = z;
    }

    public get matrix(): mat4 {
        return MatrixUtils.lookAt(
            this._x, this._y, this._z,
            this._cx, this._cy, this._cz
        );
    }

    public get x(): number {
        return this._x;
    }

    public get y(): number {
        return this._y;
    }

    public get z(): number {
        return this._z;
    }

    public get cx(): number {
        return this._cx;
    }

    public get cy(): number {
        return this._cy;
    }

    public get cz(): number {
        return this._cz;
    }

}