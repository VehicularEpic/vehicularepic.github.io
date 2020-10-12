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
    float intensity = clamp(dot(n, l_dir), 0.0f, 1.0f);

    vec3 diffuse = vec3(0.2) + intensity;
    frag_color = vec4(diffuse * v_colors, 1.0);
}