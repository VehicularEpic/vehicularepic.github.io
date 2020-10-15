import path from 'path'

import Stage from '@/modules/objects/stage'
import Entity from '@/modules/objects/entity'
import MapObject from '@/modules/objects/map-object'

function regex(key: string, text: string): string[] {
    const values: string[] = [];
    const regex = new RegExp(`${key}\\((.+?)\\)`, 'gm');

    for (let e; (e = regex.exec(text)) !== null;) {
        values.push(e[1]);
    }

    return values;
}

export default class StageFactory {

    public static async create(id: string, names: string[], source: Map<string, MapObject>): Promise<Stage> {
        const base = path.join('stages', `${id}.txt`);
        const data = await (await fetch(base)).text();
        const entities: Entity[] = [];
        const objects: MapObject[] = [];

        regex('set', data).forEach(e => {
            const values = e.split(/[,]/g).map(i => Number(i));
            const name = names[values[0] - 10];

            if (source.has(name)) {
                objects.push(source.get(name) as MapObject);

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

        return new Stage(name, sky, ground, { entities, objects });
    }

}