#ifndef MODEL3D_HPP
#define MODEL3D_HPP

#include <glad/gl.h>

#include <vector>

class Model3D {
private:
    GLuint object;
    GLuint buffer;

    const GLsizei length;
public:
    Model3D(std::vector<GLfloat> data);
    virtual ~Model3D();

    void render();
};

#endif