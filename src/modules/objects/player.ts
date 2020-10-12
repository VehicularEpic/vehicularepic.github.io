import { RaycastVehicle, Transform } from 'cannon'

import Entity from './entity'
import Wheel from './wheel';

const steer = 0.5;
const force = 100;
const brake = 2;

export default class Player extends Entity {

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

    public get steer(): number {
        return steer;
    }

    public get force(): number {
        return force;
    }

    public get brake(): number {
        return brake;
    }

}