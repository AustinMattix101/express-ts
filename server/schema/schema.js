"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const Client_1 = __importDefault(require("../models/Client"));
const Project_1 = __importDefault(require("..//models/Project"));
const ProjectType = new graphql_1.GraphQLObjectType({
    name: "Project",
    fields: () => ({
        id: { type: graphql_1.GraphQLID },
        name: { type: graphql_1.GraphQLString },
        description: { type: graphql_1.GraphQLString },
        status: { type: graphql_1.GraphQLString },
        client: {
            type: ClientType,
            resolve(parentValue, _args) {
                return Client_1.default.findById(parentValue.clientId);
            }
        }
    })
});
const ClientType = new graphql_1.GraphQLObjectType({
    name: "Client",
    fields: () => ({
        id: { type: graphql_1.GraphQLID },
        name: { type: graphql_1.GraphQLString },
        email: { type: graphql_1.GraphQLString },
        phone: { type: graphql_1.GraphQLString }
    })
});
const RootQuery = new graphql_1.GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        projects: {
            type: new graphql_1.GraphQLList(ProjectType),
            resolve(_parentValue, _args) {
                return Project_1.default.find();
            }
        },
        project: {
            type: ProjectType,
            args: { id: { type: graphql_1.GraphQLID } },
            resolve(_parentValue, args) {
                return Project_1.default.findById(args.id);
            }
        },
        clients: {
            type: new graphql_1.GraphQLList(ClientType),
            resolve(_parentValue, _args) {
                return Client_1.default.find();
            }
        },
        client: {
            type: ClientType,
            args: { id: { type: graphql_1.GraphQLID } },
            resolve(_parentValue, args) {
                return Client_1.default.findById(args.id);
            }
        }
    }
});
const mutation = new graphql_1.GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addClient: {
            type: ClientType,
            args: {
                name: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
                email: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
                phone: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
            },
            resolve(_parentValue, args) {
                const client = new Client_1.default({
                    name: args.name,
                    email: args.email,
                    phone: args.phone,
                });
                return client.save();
            }
        },
        deleteClient: {
            type: ClientType,
            args: {
                id: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLID) },
            },
            resolve(_parentValue, args) {
                Project_1.default.find({ clientId: args.id }).then((projects) => {
                    projects.forEach(project => {
                        project.remove();
                    });
                });
                return Client_1.default.findByIdAndRemove(args.id);
            }
        },
        addProject: {
            type: ProjectType,
            args: {
                name: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
                description: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
                status: {
                    type: new graphql_1.GraphQLEnumType({
                        name: 'ProjectStatus',
                        values: {
                            'new': { value: 'Not Started' },
                            'progress': { value: 'In Progress' },
                            'completed': { value: 'Completed' },
                        }
                    }),
                    defaultValue: 'Not Started',
                },
                clientId: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLID) },
            },
            resolve(_parentValue, args) {
                const project = new Project_1.default({
                    name: args.name,
                    description: args.description,
                    status: args.status,
                    clientId: args.clientId,
                });
                return project.save();
            },
        },
        deleteProject: {
            type: ProjectType,
            args: {
                id: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) }
            },
            resolve(_parentValue, args) {
                return Project_1.default.findByIdAndRemove(args.id);
            }
        },
        updateProject: {
            type: ProjectType,
            args: {
                id: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLID) },
                name: { type: graphql_1.GraphQLString },
                description: { type: graphql_1.GraphQLString },
                status: {
                    type: new graphql_1.GraphQLEnumType({
                        name: 'ProjectStatusUpdate',
                        values: {
                            new: { value: 'Not Started' },
                            progress: { value: 'In Progress' },
                            completed: { value: 'Completed' },
                        },
                    }),
                },
            },
            resolve(_parent, args) {
                return Project_1.default.findByIdAndUpdate(args.id, {
                    $set: {
                        name: args.name,
                        description: args.description,
                        status: args.status,
                    },
                }, { new: true });
            },
        },
    }
});
exports.default = new graphql_1.GraphQLSchema({
    query: RootQuery,
    mutation
});
//# sourceMappingURL=schema.js.map