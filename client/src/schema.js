import fetch from 'node-fetch';

import {
    GraphQLID,
    GraphQLList,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLString
} from 'graphql';
import {
    fromGlobalId,
    globalIdField,
    nodeDefinitions,
} from 'graphql-relay';


const {
    nodeField,
    nodeInterface,
} = nodeDefinitions(
    // A method that maps from a global id to an object
    (globalId, {loaders}) => {
        const {id, type} = fromGlobalId(globalId);
        if (type === 'Person') {
            return loaders.person.load(id);
        }
    },
    // A method that maps from an object to a type
    (obj) => {
        if (obj.hasOwnProperty('username')) {
            return PersonType;
        }
    }
);

const PersonType = new GraphQLObjectType({
    name: 'Person',
    description: '...',

    fields: ()=> ({
        firstName: {
            type: GraphQLString,
            resolve: (person) => person.first_name
        },
        lastName: {
            type: GraphQLString,
            resolve: (person) => person.last_name
        },
        email: {type: GraphQLString},
        username: {type: GraphQLString},
        id: {type: GraphQLString},
        friends: {
            type: new GraphQLList(PersonType),
            resolve: (obj, args, {loaders}) =>
                loaders.person.loadManyByURL(obj.friends)
        }
    }),
    interfaces: [nodeInterface]
});

const QueryType = new GraphQLObjectType({
    name: 'Query',
    description: '...',

    fields: () => ({
        allPeople: {
            type: new GraphQLList(PersonType),
            description: 'Everyone, everywhere',
            resolve: (root, args, {loaders}) => loaders.person.loadAll(),
        },
        node: nodeField,
        person: {
            type: PersonType,
            args: {
                id: {type: new GraphQLNonNull(GraphQLID)},
            },
            resolve: (root, args, {loaders}) => loaders.person.load(args.id),
        },
    }),
});

export default new GraphQLSchema({
    query: QueryType
})