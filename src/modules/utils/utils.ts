import { Quaternion, Vec3 } from 'cannon'
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

    public static angles(q: Quaternion): Vec3 {
        const angles = new Vec3();

        const sinr_cosp = 2 * (q.w * q.x + q.y * q.z);
        const cosr_cosp = 1 - 2 * (q.x * q.x + q.y * q.y);
        angles.x = Math.atan2(sinr_cosp, cosr_cosp);

        const sinp = 2 * (q.w * q.y - q.z * q.x);

        if (Math.abs(sinp) >= 1) {
            angles.y = (Math.PI / 2.0) * Math.sign(sinp);
        } else {
            angles.y = Math.asin(sinp);
        }

        const siny_cosp = 2 * (q.w * q.z + q.x * q.y);
        const cosy_cosp = 1 - 2 * (q.y * q.y + q.z * q.z);
        angles.z = Math.atan2(siny_cosp, cosy_cosp);

        return angles;
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

    public static transform(position: Vec3, quaternion?: Quaternion, scale: number = 1.0): mat4 {
        const { x, y, z } = position;

        const matrix = mat4.create();
        mat4.translate(matrix, matrix, [y, -z, x] as vec3);
        mat4.scale(matrix, matrix, [scale, scale, scale] as vec3);

        if (quaternion !== undefined) {
            const { x: qx, y: qy, z: qz, w: qw } = quaternion;
            const mat = mat4.fromQuat(mat4.create(),
                quat.set(quat.create(), qy, -qz, qx, -qw)
            );

            return mat4.mul(matrix, matrix, mat);
        }

        return matrix;
    }

}