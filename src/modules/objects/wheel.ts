import { vec3 } from 'gl-matrix'
import { Quaternion, Vec3 } from 'cannon'

import { ShaderProgram, Model } from '@/modules/web-game'
import { TriangleMesh, VecUtils, MatrixUtils } from '@/modules/utils/utils'

export default class Wheel {

    public readonly radius: number;

    private readonly model: Model;

    public position: Vec3;
    public quat: Quaternion = new Quaternion(0.0, 0.0, 0.0, 0.0);

    constructor(
        { width, height, position }: { width: number, height: number, position: number[] },
        { magnitude, depth, color }: { magnitude: number, depth: number, color: number[] }
    ) {
        const resolution = 12;
        const w_width = width / 10.0;
        const w_height = height / 10.0;
        const data: TriangleMesh[] = [];
        const colors: number[][] = [];

        for (let i = 0; i < resolution / 2; i++) {
            const vt: vec3[] = [];
            vt[2] = vec3.fromValues((-depth * w_width), 0.0, 0.0);

            for (let j = i; j < i + 2; j++) {
                const theta = 2.0 * Math.PI * j / (resolution / 2.0);
                vt[j - i] = vec3.fromValues(
                    (-4 * w_width),
                    (magnitude * (Math.sin(theta) * 10.0)),
                    (magnitude * (Math.cos(theta) * 10.0))
                );
            }

            data.push(new TriangleMesh(vt[0], vt[1], vt[2]));
            colors.push(color, color, color);
        }


        const vertex: vec3[] = [];
        for (let i = 0; i < resolution; i++) {
            const theta = 2.0 * Math.PI * i / resolution;
            const vec = vec3.fromValues(
                (-4 * w_width),
                (w_height * (Math.sin(theta) * 12.557)),
                (w_height * (Math.cos(theta) * 12.557))
            );

            vertex.push(vec);
        }

        for (let i = 0; i < resolution / 2; i++) {
            if (i > 0) {
                const p1 = i + (i - 1), p2 = p1 + 1, p3 = p2 + 1;
                data.push(new TriangleMesh(data[i].p1, vertex[p1], vertex[p2]));
                data.push(new TriangleMesh(data[i].p1, vertex[p2], vertex[p3]));

                if (i < (resolution / 2) - 1) {
                    data.push(new TriangleMesh(data[i].p1, vertex[p3], data[i + 1].p1));
                } else {
                    data.push(new TriangleMesh(data[i].p1, vertex[p3], data[0].p1));
                }
            } else {
                data.push(new TriangleMesh(data[i].p1, vertex[i], vertex[i + 1]));
                data.push(new TriangleMesh(data[i].p1, vertex[i + 1], data[i + 1].p1));
                data.push(new TriangleMesh(data[i].p1, vertex[i], vertex[vertex.length - 1]));
            }
        }

        for (let i = 0; i < resolution; i++) {
            if (i > 0) {
                data.push(new TriangleMesh(
                    vertex[i - 1],
                    vec3.fromValues(vertex[i - 1][0] * -1, vertex[i - 1][1], vertex[i - 1][2]),
                    vec3.fromValues(vertex[i - 1][0] * -1, vertex[i][1], vertex[i][2])
                ));
                data.push(new TriangleMesh(
                    vec3.fromValues(vertex[i - 1][0] * -1, vertex[i][1], vertex[i][2]),
                    vertex[i], vertex[i - 1]
                ));
            } else {
                data.push(new TriangleMesh(
                    vertex[vertex.length - 1],
                    vec3.fromValues(vertex[vertex.length - 1][0] * -1, vertex[vertex.length - 1][1], vertex[vertex.length - 1][2]),
                    vec3.fromValues(vertex[vertex.length - 1][0] * -1, vertex[i][1], vertex[i][2])
                ));
                data.push(new TriangleMesh(
                    vec3.fromValues(vertex[vertex.length - 1][0] * -1, vertex[i][1], vertex[i][2]),
                    vertex[i], vertex[vertex.length - 1]
                ));
            }
        }

        for (let i = resolution / 2; i < data.length; i++) {
            colors.push(
                [0.18, 0.18, 0.18],
                [0.18, 0.18, 0.18],
                [0.18, 0.18, 0.18]
            );
        }

        this.model = new Model({
            vertices: data.map(e => [[...e.p1], [...e.p2], [...e.p3]]).flat(),
            colors, normals: VecUtils.normals(data)
        });
        this.radius = w_height / 8.0;

        const { [0]: x, [1]: y, [2]: z } = position.map(e => e / 100.0);
        this.position = new Vec3(x, y, z);
    }

    public render(shader: ShaderProgram): void {
        shader.uniformMatrix4fv('model',
            MatrixUtils.transform(this.position, this.quat)
        );
        this.model.render();
    }

    public get x(): number {
        return this.position.x;
    }

    public get y(): number {
        return this.position.y;
    }

    public get z(): number {
        return this.position.z;
    }

}