import path from 'path'
import { Model } from '@/modules/web-game'

export default class ModelFactory {

    public static async create(object: string): Promise<Model> {
        const vertices: number[][] = [];
        const colors: number[][] = [];
        const normals: number[][] = [];

        const data = await (await fetch(`models/${object}`)).text();

        function vec3(type: 'v' | 'vn'): number[][] {
            const values: number[][] = [];
            const regex = new RegExp(`${type}\\s(.+?)$`, 'gm');

            for (let a; (a = regex.exec(data)) !== null;) {
                values.push(a[1].split(/\s/).map(i => Number(i)));
            }

            return values;
        }

        const v = vec3('v'), vn = vec3('vn');
        const materials = await (async () => {
            const values: {
                [material: string]: number[]
            } = {};

            const mtllib = /mtllib\s(.+?)$/gm.exec(data);
            if (mtllib !== null) {
                const file = path.basename(mtllib[1]);
                const rgx1 = /newmtl\s(.+?)$/gm, rgx2 = /Kd\s(.+?)$/gm;
                const mtldata = await (await fetch(`models/${file}`)).text();

                for (let a; (a = rgx1.exec(mtldata)) !== null;) {
                    values[a[1]] = (rgx2.exec(mtldata) as RegExpExecArray)[1]
                        .split(/\s/).map(i => Number(i));
                }

                return values;
            }

            values['default'] = [0.25, 0.25, 0.25];
            return values;
        })();

        var material: string = 'default';
        data.split(/\n/gm).filter(s =>
            /^(usemtl|f)/.test(s)
        ).map(e => e.split(/\s/, 4)).forEach(e => {
            if (e[0] === 'usemtl') {
                material = e[1];
            } else if (e[0] === 'f') {
                e.slice(1).forEach(i => {
                    const indices = i.split(/\/\//g)
                        .map(j => Number(j));

                    vertices.push(v[indices[0] - 1]);
                    colors.push(materials[material]);
                    normals.push(vn[indices[1] - 1]);
                });
            }
        });

        return new Model({ vertices, colors, normals });
    }

}