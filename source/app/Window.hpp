#ifndef WINDOW_HPP
#define WINDOW_HPP

#include <stdio.h>
#include <stdlib.h>

#define GLFW_INCLUDE_NONE
#include <GLFW/glfw3.h>
#include <glad/gl.h>

#define __EMSCRIPTEN__ 1
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
    void resize(int width, int height);

    int getWidth() const {
        return width;
    }

    int getHeight() const {
        return height;
    }
};

#endif