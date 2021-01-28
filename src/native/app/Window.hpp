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
    virtual ~Window();

    void update();

    int getWidth() {
        return width;
    }

    void setWidth(int width) {
        this->width = width;
    }

    int getHeight() {
        return height;
    }

    void setHeight(int height) {
        this->height = height;
    }
};

#endif