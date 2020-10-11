#version 300 es
precision mediump float;

in vec3 v_colors;
in vec3 v_position;
in vec3 v_normals;

layout (location = 0) out vec4 frag_color;

uniform vec3 u_LightPos;

void main(void) {
    vec3 normals = v_normals;
    if (!gl_FrontFacing) {
        normals = -v_normals;
    }

    vec3 n = normalize(normals);
    vec3 l_dir = normalize(u_LightPos.xyz);
    float intensity = max(dot(n, l_dir), 0.0) * 2.5;

    frag_color = vec4(intensity * v_colors, 1.0);
}