const { createTodo, readTodos, streamTodos } = require('./../procedures')

const services = {
    "createTodo": createTodo,
    "readTodos": readTodos,
    "streamTodos": streamTodos
}

module.exports = { services }