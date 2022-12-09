const grpc = require('grpc')
const protoLoader = require('@grpc/proto-loader')
const packageDef = protoLoader.loadSync('todo.proto', {})
const grpcObject = grpc.loadPackageDefinition(packageDef)
const todoPackage = grpcObject.todo

const server = new grpc.Server()
server.bind('0.0.0.0:10000', grpc.ServerCredentials.createInsecure())

server.addService(todoPackage.Todo.service, {
    "createTodo": createTodo,
    "readTodos": readTodos,
    "streamTodos": streamTodos
})

server.start()

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

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

const wait = async (milliseconds) => {
    await new Promise(resolve => {
        return setTimeout(resolve, milliseconds)
    });
};