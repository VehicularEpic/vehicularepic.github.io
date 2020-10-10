#version 300 es

layout (location = 0) in vec3 a_position;
layout (location = 1) in vec3 a_colors;
layout (location = 2) in vec3 a_normals;
out vec3 v_colors;

uniform mat4 projection;
uniform mat4 view;
uniform mat4 model;
        
void main(void) {
    gl_Position = projection * view * model * vec4(a_position / 100.0, 1.0);
    v_colors = a_colors;
}