import { vec3, mat4, quat } from 'gl-matrix'

export class TriangleMesh {

    private readonly _p1: vec3;
    private readonly _p2: vec3;
    private readonly _p3: vec3;

    constructor(p1: vec3, p2: vec3, p3: vec3) {
        this._p1 = p1;
        this._p2 = p2;
        this._p3 = p3;
    }

    public get p1(): vec3 {
        return this._p1;
    }

    public get p2(): vec3 {
        return this._p2;
    }

    public get p3(): vec3 {
        return this._p3;
    }

}

export class VecUtils {

    public static normals(faces: TriangleMesh[]): number[][] {
        const normals: number[][] = [];

        faces.forEach(tri => {
            const U = vec3.sub(vec3.create(), tri.p2, tri.p1);
            const V = vec3.sub(vec3.create(), tri.p3, tri.p1);

            const normal = [...VecUtils.ncross(U, V)];
            normals.push(normal, normal, normal);
        });

        return normals;
    }

    public static ncross(a: vec3, b: vec3): vec3 {
        const vec = vec3.cross(vec3.create(), a, b);
        return vec3.normalize(vec, vec);
    }

}

export class MatrixUtils {

    public static perspective(fovY: number, aspect: number): mat4 {
        const near = 0.01;
        const height = near * Math.tan((fovY / 2) * (Math.PI / 180.0));

        const matrix = mat4.create();
        mat4.frustum(matrix, -(height * aspect), height * aspect, -height, height, near, 0);

        const e = 1E-6;
        matrix[10] = e - 1.0;
        matrix[14] = (e - 2.0) * near;
        return matrix;
    }

    public static lookAt(x: number, y: number, z: number, cx: number, cy: number, cz: number): mat4 {
        return mat4.lookAt(
            mat4.create(),
            [x, y, z],
            [cx, cy, cz],
            [0.0, -1.0, 0.0]
        );
    }

    public static transformation(x: number, y: number, z: number, xz: number, zy: number, xy: number, scale: number = 1.0): mat4 {
        const quat_xz = quat.setAxisAngle(quat.create(), [0.0, -1.0, 0.0], xz);
        const quat_zy = quat.setAxisAngle(quat.create(), [1.0, 0.0, 0.0], zy);
        const quat_xy = quat.setAxisAngle(quat.create(), [0.0, 0.0, 1.0], xy);

        const rotated = quat.create();
        quat.mul(rotated, quat_xz, quat_zy);
        quat.mul(rotated, rotated, quat_xy);

        return mat4.fromRotationTranslationScale(mat4.create(),
            rotated, [x, y, z], [scale, scale, scale]
        );
    }

}