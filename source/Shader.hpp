#ifndef SHADER_HPP
#define SHADER_HPP

#include <stdio.h>
#include <glad/gl.h>

#include <string>

class Shader {
private:
    GLuint program;
public:
    Shader(std::string vertex_shader, std::string fragment_shader);
    virtual ~Shader();

    void _int(GLint location, GLint value);
    void _float(GLint location, GLfloat value);
    void _vec2f(GLint location, GLfloat x, GLfloat y);
    void _vec3f(GLint location, GLfloat x, GLfloat y, GLfloat z);
    void _vec4f(GLint location, GLfloat x, GLfloat y, GLfloat z, GLfloat w);
    void _matrix4f(GLint location, const GLfloat* value);

    GLuint getProgram() const {
        return program;
    }
};

#endif