
const { getRandomInt, wait } = require('./../utils')

const todos = []

function createTodo(call, callback) {
    const { request } = call

    const todoItem = {
        "id": getRandomInt(999999),
        "description": request.description
    }

    todos.push(todoItem)
    console.log(todoItem)
    callback(null, todoItem)
}

function readTodos(call, callback) {
    callback(null, {
        "todoItems": todos
    }) 
}

async function streamTodos(call, callback) {
    todos.forEach(todo => {
        call.write(todo)
    })

    /*
    * NOTE: Uncomment the below code to
    * check how streaming works setting
    * network throttling 
    * */
    // for await (const todo of todos) {
    //     await wait(1000)
    //     call.write(todo)
    // }

    call.end()
}

const procedures = {
    createTodo,
    readTodos,
    streamTodos
}

module.exports = procedures