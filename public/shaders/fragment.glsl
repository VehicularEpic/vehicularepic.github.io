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

    float distance = length(u_LightPos - v_position);
    vec3 lightVector = normalize(u_LightPos - v_position);

    float brightness = 100.0;
    float diffuse = max(dot(normals, lightVector), 0.1) * brightness;
 
    diffuse = diffuse * (1.0 / (1.0 + (0.25 * distance * distance)));
    frag_color = vec4(v_colors * diffuse, 1.0);
}