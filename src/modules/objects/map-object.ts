import { MatrixUtils } from '@/modules/utils/utils';
import { Model, ShaderProgram } from '@/modules/web-game';

import Entity from './entity';

export default class MapObject {

    private readonly model: Model;

    public constructor(model: Model) {
        this.model = model;
    }

    public render(shader: ShaderProgram, entity: Entity): void {
        shader.uniformMatrix4fv('model',
            MatrixUtils.transform(entity.position, entity.quat)
        );

        this.model.render();
    }

}