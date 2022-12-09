const grpc = require('grpc')
const protoLoader = require('@grpc/proto-loader')
const packageDef = protoLoader.loadSync('todo.proto', {})
const grpcObject = grpc.loadPackageDefinition(packageDef)
const todoPackage = grpcObject.todo

const client = new todoPackage.Todo("0.0.0.0:10000", grpc.credentials.createInsecure())

const description = process.argv[2]

function createTodo() {
    client.createTodo({
        "id": -1,
        "description": description
    }, (err, res) => {
        console.log(res)
    })
}

function readTodos() {
    client.readTodos({}, (err, res) => {
        console.log(res)
    })
}

function streamTodos() {
    const call = client.streamTodos()

    call.on('data', todo => {
        console.log(todo)
    })

    endStream(call)
}

function endStream(call) {
    call.on("end", (err) => {
        console.log("Ended streaming")
    })
}

// createTodo()
// readTodos() 
streamTodos()