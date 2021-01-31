#version 300 es

layout (location = 0) in vec3 a_position;
layout (location = 1) in vec3 a_colors;
layout (location = 2) in vec3 a_normals;

out vec3 v_colors;
out vec3 v_position;
out vec3 v_normals;

uniform mat4 projection;
uniform mat4 view;
uniform mat4 model;
        
void main(void) {
    vec4 position = vec4(a_position / 100.0, 1.0);

    v_colors = a_colors;
    v_position = vec3(model * position);
    v_normals = normalize(mat3(transpose(inverse(model))) * a_normals);

    gl_Position = projection * view * model * position;
}