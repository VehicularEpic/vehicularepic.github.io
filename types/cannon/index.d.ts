declare module 'cannon' {

    interface RaycastVehicle {

        updateWheelTransform(wheelIndex: integer);

    }

    interface IWheelInfoOptions {

        worldTransform?: Transform;

    }

}