#include "Shader.hpp"

static GLuint compile(GLenum type, const char* source) {
    GLint status;
    GLuint shader = glCreateShader(type);

    glShaderSource(shader, 1, &source, NULL);
    glCompileShader(shader);

    glGetShaderiv(shader, GL_COMPILE_STATUS, &status);

    if (status == GL_FALSE) {
        GLint length;
        glGetShaderiv(shader, GL_INFO_LOG_LENGTH, &length);

        GLchar description[length];
        glGetShaderInfoLog(shader, length, NULL, description);

        fprintf(stderr, "Error compiling shader: %s\n", description);
    }

    return shader;
}

Shader::Shader(const char* vertex_shader, const char* fragment_shader) {
    GLuint vertex = compile(GL_VERTEX_SHADER, vertex_shader);
    GLuint fragment = compile(GL_FRAGMENT_SHADER, fragment_shader);

    this->program = glCreateProgram();
    glAttachShader(this->program, vertex);
    glAttachShader(this->program, fragment);

    glLinkProgram(this->program);
    glValidateProgram(this->program);

    glDeleteShader(vertex);
    glDeleteShader(fragment);
}

Shader::~Shader() {
    glDeleteProgram(this->program);
}

void Shader::_int(GLint location, GLint value) {
    glUniform1i(location, value);
}

void Shader::_float(GLint location, GLfloat value) {
    glUniform1f(location, value);
}

void Shader::_vec2f(GLint location, GLfloat x, GLfloat y) {
    glUniform2f(location, x, y);
}

void Shader::_vec3f(GLint location, GLfloat x, GLfloat y, GLfloat z) {
    glUniform3f(location, x, y, z);
}

void Shader::_vec4f(GLint location, GLfloat x, GLfloat y, GLfloat z, GLfloat w) {
    glUniform4f(location, x, y, z, w);
}

void Shader::_matrix4f(GLint location, const GLfloat* value) {
    glUniformMatrix4fv(location, 1, GL_FALSE, value);
}