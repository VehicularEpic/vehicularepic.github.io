#ifndef WINDOW_HPP
#define WINDOW_HPP

#define GLFW_INCLUDE_NONE
#include <GLFW/glfw3.h>
#include <glad/gl.h>

#include <cstdio>
#include <cstdlib>

class Window {
private:
    int width;
    int height;

    GLFWwindow* window;

public:
    Window(int width, int height);
    virtual ~Window();

    void update();

    int getWidth() const {
        return width;
    }

    void setWidth(int width) {
        this->width = width;
    }

    int getHeight() const {
        return height;
    }

    void setHeight(int height) {
        this->height = height;
    }
};

#endif