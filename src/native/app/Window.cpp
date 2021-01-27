#include "Window.hpp"

static void error_callback(int error, const char* description) {
    fprintf(stderr, "Error: %s\n", description);
}

Window::Window(int width, int height) {
    this->width = width;
    this->height = height;

    glfwSetErrorCallback(error_callback);

    if (!glfwInit())
        emscripten_force_exit(EXIT_FAILURE);

    glfwDefaultWindowHints();
    glfwWindowHint(GLFW_CONTEXT_VERSION_MAJOR, 3);
    glfwWindowHint(GLFW_CONTEXT_VERSION_MINOR, 1);

    this->window = glfwCreateWindow(width, height, "WebGL", NULL, NULL);

    if (!this->window) {
        glfwTerminate();
        emscripten_force_exit(EXIT_FAILURE);
    }

    glfwMakeContextCurrent(this->window);
    gladLoadGL(glfwGetProcAddress);
    glfwSwapInterval(1);
}

Window::~Window() {
    glfwDestroyWindow(this->window);
}

void Window::update() {
    glfwSwapBuffers(this->window);
    glfwPollEvents();
}