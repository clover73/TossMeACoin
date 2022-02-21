const graphql = require('graphql');
const Creator = require('../models/creator');

const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLScalarType,
  GraphQLList,
  GraphQLNonNull,
} = graphql;

const dateValue = (value) => {
  if (value instanceof Date) {
    return +value;
  }
};

const DateType = new graphql.GraphQLScalarType({
  name: 'Date',
  serialize: dateValue,
  parseValue: dateValue,
  parseLiteral(ast) {
    return dateValue(ast.value);
  },
});

const CreatorType = new GraphQLObjectType({
  name: 'Creator',
  fields: () => ({
    publicKey: { type: GraphQLID },
    name: { type: GraphQLString },
    bio: { type: GraphQLString },
    createdAt: { type: DateType },
    avatarURL: { type: GraphQLString },
    customLink: { type: GraphQLString },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    creator: {
      type: CreatorType,
      args: { publicKey: { type: GraphQLID } },
      resolve(parent, args) {
        return Creator.findOne({ publicKey: args.publicKey });
      },
    },
    creators: {
      type: new GraphQLList(CreatorType),
      args: { name: { type: GraphQLString } },
      resolve(parent, args) {
        if (args.name !== undefined) return Creator.find({ name: args.name });
        else return Creator.find();
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addCreator: {
      type: CreatorType,
      args: {
        publicKey: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args) {
        let newCreator = new Creator({
          publicKey: args.publicKey,
          createdAt: new Date(),
        });

        return newCreator.save();
      },
    },
    updateCreator: {
      type: CreatorType,
      args: {
        publicKey: { type: new GraphQLNonNull(GraphQLID) },
        name: { type: GraphQLString },
        bio: { type: GraphQLString },
        avatarURL: { type: GraphQLString },
        customLink: { type: GraphQLString },
      },
      async resolve(parent, args) {
        const creator = await Creator.findOne({ publicKey: args.publicKey });

        if (!creator) return { error: "Couldn't find an creator to update" };

        if (args.name !== undefined) creator.name = args.name;
        if (args.bio !== undefined) creator.bio = args.bio;
        if (args.avatarURL !== undefined) creator.avatarURL = args.avatarURL;
        if (args.customLink !== undefined) creator.customLink = args.customLink;

        return creator.save();
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
