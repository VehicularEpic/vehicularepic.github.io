#version 300 es
precision mediump float;

in vec3 v_colors;
layout (location = 0) out vec4 frag_color;

void main(void) {
    frag_color = vec4(v_colors, 1.0);
}