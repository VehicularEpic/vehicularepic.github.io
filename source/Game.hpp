#include "Window.hpp"
#include "Shader.hpp"
#include "Model3D.hpp"

#define __EMSCRIPTEN__ 1
#include <emscripten/emscripten.h>
#include <emscripten/bind.h>

using namespace emscripten;

#include <glm/mat4x4.hpp>
#include <glm/gtc/type_ptr.hpp>
#include <glm/gtc/matrix_transform.hpp>

#define GLM_ENABLE_EXPERIMENTAL
#include <glm/gtx/quaternion.hpp>

#include <map>
#include <cmath>
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
    void shader(std::string name, Shader& shader);
    void model(std::string name, Model3D& model);
};

EMSCRIPTEN_BINDINGS(window) {
    class_<Game>("Game")
        .constructor<Window&>()
        .function("start", &Game::start)
        .function("shader", &Game::shader)
        .function("model", &Game::model);

    class_<Window>("Window").constructor<int, int>()
        .property("width", &Window::getWidth, &Window::setWidth)
        .property("height", &Window::getHeight, &Window::setHeight);

    class_<Shader>("Shader")
        .constructor<std::string, std::string>();

    class_<Model3D>("Model3D")
        .constructor<std::vector<GLfloat>>();

    register_vector<GLfloat>("VectorFloat");
}