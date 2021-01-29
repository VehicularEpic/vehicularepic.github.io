#include "Window.hpp"

static void error_callback(int error, const char* description) {
    fprintf(stderr, "Error: %s\n", description);
}

Window::Window(int width, int height) {
    glfwSetErrorCallback(error_callback);

    if (!glfwInit())
        emscripten_force_exit(EXIT_FAILURE);

    glfwDefaultWindowHints();
    glfwWindowHint(GLFW_CONTEXT_VERSION_MAJOR, 3);
    glfwWindowHint(GLFW_CONTEXT_VERSION_MINOR, 1);
    glfwWindowHint(GLFW_OPENGL_PROFILE, GLFW_OPENGL_CORE_PROFILE);

    this->window = glfwCreateWindow(width, height, "WebGL", NULL, NULL);

    if (!this->window) {
        glfwTerminate();
        emscripten_force_exit(EXIT_FAILURE);
    }

    glfwMakeContextCurrent(this->window);
    gladLoadGL(glfwGetProcAddress);
    glfwSwapInterval(1);

    this->resize(width, height);
}

Window::~Window() {
    glfwDestroyWindow(this->window);
}

void Window::update() {
    glfwSwapBuffers(this->window);
    glfwPollEvents();
}

void Window::resize(int width, int height) {
    glViewport(0, 0, width, height);
    this->width = width;
    this->height = height;
}