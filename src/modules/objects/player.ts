import { RaycastVehicle } from 'cannon'

import Entity from './entity'

export default class Player extends Entity {

    public vehicle!: RaycastVehicle;

}