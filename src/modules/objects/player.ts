import { Quaternion, RaycastVehicle, Transform } from 'cannon'

import Entity from './entity'
import Wheel from './wheel';

const steer = 0.35;
const brake = 100;

export default class Player extends Entity {

    public force: number = 0;
    public readonly keys: {
        [name: string]: boolean
    } = {};

    public readonly vehicle: RaycastVehicle = new RaycastVehicle({});

    public update(wheels: Wheel[]): void {
        this.position.copy(this.vehicle.chassisBody.position);
        this.quat.copy(this.vehicle.chassisBody.quaternion);

        this.vehicle.wheelInfos.forEach((e, i) => {
            this.vehicle.updateWheelTransform(i);
            const t = e.worldTransform as Transform;

            const wheel = wheels[i];
            wheel.position.copy(t.position);
            wheel.quat.copy(t.quaternion);
        });
    }

    public xy(angle: number): void {
        const quaternion = new Quaternion(0.0, Math.sin(angle * 0.5), 0.0, Math.cos(angle * 0.5));
        const result = this.vehicle.chassisBody.quaternion.mult(quaternion);
        this.vehicle.chassisBody.quaternion.copy(result);
    }

    public zy(angle: number): void {
        const quaternion = new Quaternion(Math.sin(angle * 0.5), 0.0, 0.0, Math.cos(angle * 0.5));
        const result = this.vehicle.chassisBody.quaternion.mult(quaternion);
        this.vehicle.chassisBody.quaternion.copy(result);
    }

    public get steer(): number {
        return steer;
    }

    public get brake(): number {
        return brake;
    }

}