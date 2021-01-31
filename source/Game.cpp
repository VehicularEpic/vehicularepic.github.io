#include "Game.hpp"

std::map<std::string, Shader*> shaders;
std::map<std::string, Model3D*> models;

// Infinite perspective function
static glm::mat4 perspective(float fovY, float aspect) {
    float near = 0.01;
    float height = near * tan((fovY / 2.f) * (M_PI / 180.f));

    glm::mat4 matrix = glm::frustum(-(height * aspect), height * aspect, -height, height, near, .0f);

    float e = 1E-6;
    matrix[2][2] = e - 1.f;
    matrix[3][2] = (e - 2.f) * near;
    return matrix;
}

void Game::render() {
    glClear(GL_COLOR_BUFFER_BIT | GL_DEPTH_BUFFER_BIT);
    glViewport(0, 0, window.getWidth(), window.getHeight());

    this->window.update();
}

void Game::callback(void* instance) {
    reinterpret_cast<Game*>(instance)->render();
}

void Game::start() {
    glEnable(GL_DEPTH_TEST);
    glDepthFunc(GL_LEQUAL);

    emscripten_set_main_loop_arg(&Game::callback, this, 0, 0);
}

void Game::shader(std::string name, Shader& shader) {
    shaders.insert({ name, &shader });
}

void Game::model(std::string name, Model3D& model) {
    models.insert({ name, &model });
}