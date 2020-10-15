import { Vec3, Quaternion } from 'cannon'

export default class Entity {

    private _position: Vec3 = new Vec3(0.0, 0.0, 0.0);
    private _quat: Quaternion = new Quaternion(0.0, 0.0, 0.0, 0.0);

    public pos(x: number, y: number, z: number): void {
        this._position.set(z, x, -y);
    }

    public set xz(value: number) {
        const xz = value / 2.0;
        this._quat = new Quaternion(
            0.0, 0.0, -Math.sin(xz), Math.cos(xz)
        );
    }

    public get x(): number {
        return this._position.y;
    }

    public get y(): number {
        return -this._position.z;
    }

    public get z(): number {
        return this._position.x;
    }

    public get position(): Vec3 {
        return this._position;
    }

    public get quat(): Quaternion {
        return this._quat;
    }

}