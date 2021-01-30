#include "Window.hpp"
#include "Shader.hpp"

#define __EMSCRIPTEN__ 1
#include <emscripten/emscripten.h>
#include <emscripten/bind.h>

#include <map>
#include <string>

class Game {
private:
    Window window;

    void render();
    static void callback(void* instance);
public:
    Game(Window& window) : window(window) {}
    virtual ~Game() { delete (&this->window); }

    void start();
    void shader(std::string, Shader& shader);
};

EMSCRIPTEN_BINDINGS(window) {
    emscripten::class_<Game>("Game")
        .constructor<Window&>()
        .function("start", &Game::start)
        .function("shader", &Game::shader);

    emscripten::class_<Window>("Window")
        .constructor<int, int>()
        .function("resize", &Window::resize)
        .property("width", &Window::getWidth)
        .property("height", &Window::getHeight);

    emscripten::class_<Shader>("Shader")
        .constructor<std::string, std::string>();
}