import { RaycastVehicle, Transform } from 'cannon'

import Entity from './entity'
import Wheel from './wheel';

export default class Player extends Entity {

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

}