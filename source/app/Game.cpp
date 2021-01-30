#include "Game.hpp"

std::map<std::string, Shader*> shaders;

void Game::render() {
    glClear(GL_COLOR_BUFFER_BIT | GL_DEPTH_BUFFER_BIT);
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