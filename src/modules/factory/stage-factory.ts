import path from 'path'

import { Model } from '@/modules/web-game'
import Stage from '@/modules/objects/stage'
import Entity from '../objects/entity';

function regex(key: string, text: string): string[] {
    const values: string[] = [];
    const regex = new RegExp(`${key}\\((.+?)\\)`, 'gm');

    for (let e; (e = regex.exec(text)) !== null;) {
        values.push(e[1]);
    }

    return values;
}

export default class StageFactory {

    public static async create(id: string, names: string[], objects: Map<string, Model>): Promise<Stage> {
        const base = path.join('stages', `${id}.txt`);
        const data = await (await fetch(base)).text();
        const entities: Entity[] = [];
        const models: Model[] = [];

        regex('set', data).forEach(e => {
            const values = e.split(/[,]/g).map(i => Number(i));
            const name = names[values[0] - 10];

            if (objects.has(name)) {
                models.push(objects.get(name) as Model);

                const entity = new Entity();
                entity.pos(
                    values[1] / 100.0,
                    (values[3] - 250) / 100.0,
                    values[2] / 100.0
                );
                entity.xz = values[4] * (Math.PI / 180.0);
                entities.push(entity);
            }
        });

        const name = regex('name', data)[0] || 'Unknown Stage';

        const ground = regex('ground', data)[0]
            .split(/[,]/g).map(i => Number(i) / 255.0);

        const sky = regex('sky', data)[0]
            .split(/[,]/g).map(i => Number(i) / 255.0);

        return new Stage(name, sky, ground, { entities, models });
    }

}