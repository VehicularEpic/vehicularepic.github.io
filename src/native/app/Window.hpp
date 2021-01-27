#ifndef WINDOW_HPP
#define WINDOW_HPP

#include <stdio.h>
#include <stdlib.h>

#define GLFW_INCLUDE_NONE
#include <GLFW/glfw3.h>
#include <glad/gl.h>

#include <emscripten/emscripten.h>

class Window {
private:
    int width;
    int height;

    GLFWwindow* window;

public:
    Window(int width, int height);
    ~Window();

    void update();

    int getWidth() { return width; };
    int getHeight() { return height; };
};

#endif