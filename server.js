const grpc = require('grpc')
const protoLoader = require('@grpc/proto-loader')
const packageDef = protoLoader.loadSync('protos/todo.proto', {})
const grpcObject = grpc.loadPackageDefinition(packageDef)
const todoPackage = grpcObject.todo
const { services } = require('./services')

const server = new grpc.Server()

server.bind('0.0.0.0:10000', grpc.ServerCredentials.createInsecure())
server.addService(todoPackage.Todo.service, services)

server.start()