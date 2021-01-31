#include "Model3D.hpp"

Model3D::Model3D(std::vector<GLfloat> data) : length(data.size() / 9) {
    glGenVertexArrays(1, &this->object);
    glBindVertexArray(this->object);

    glGenBuffers(1, &this->buffer);
    glBindBuffer(GL_ARRAY_BUFFER, this->buffer);
    glBufferData(GL_ARRAY_BUFFER, data.size() * sizeof(GLfloat), &data[0], GL_STATIC_DRAW);

    // Vertices pointer
    glEnableVertexAttribArray(0);
    glVertexAttribPointer(0, 3, GL_FLOAT, GL_FALSE, sizeof(GLfloat) * 9, (void*)0);

    // Colors pointer
    glEnableVertexAttribArray(1);
    glVertexAttribPointer(1, 3, GL_FLOAT, GL_FALSE, sizeof(GLfloat) * 9, (void*)(sizeof(GLfloat) * 3));

    // Normals pointer
    glEnableVertexAttribArray(2);
    glVertexAttribPointer(2, 3, GL_FLOAT, GL_FALSE, sizeof(GLfloat) * 9, (void*)(sizeof(GLfloat) * 6));

    glBindBuffer(GL_ARRAY_BUFFER, 0);
    glBindVertexArray(0);
}

Model3D::~Model3D() {
    glDeleteVertexArrays(1, &this->object);
    glDeleteBuffers(1, &this->buffer);
}

void Model3D::render() {
    glBindVertexArray(this->object);
    glDrawArrays(GL_TRIANGLES, 0, this->length);
    glBindVertexArray(0);
}