const graphql = require("graphql");
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLID
} = graphql;
const _ = require("lodash");

//dummy data
let books = [
    { name: 'Name of the Wild', genre: 'Fantacy', id: '1' },
    { name: 'The Final Empire', genre: 'Fantacy', id: '2' },
    { name: 'The Long Earth', genre: 'Sci-Fi', id: '3' }
]

let authors = [
    {name: 'Patrick', age: 44, id: '1'},
    {name: 'Jk Rowling', age: 43, id: '2'},
    {name: 'William', age: 48, id: '3'}
]

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString }
    })
});

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: {
                id: { type: GraphQLID }
            },
            resolve(parent, args) {
                return _.find(books, { id: args.id })
            }
        },
        author: {
            type: AuthorType,
            args: {
                id: { type: GraphQLID }
            },
            resolve(parent, args) {
                return _.find(authors, { id: args.id })
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
})
