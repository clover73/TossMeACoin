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
    bannerURL: { type: GraphQLString },
    Twitter: { type: GraphQLString },
    Instagram: { type: GraphQLString },
    YouTube: { type: GraphQLString },
    TikTok: { type: GraphQLString },
    LinkedIn: { type: GraphQLString },
    GitHub: { type: GraphQLString },
    Website: { type: GraphQLString },
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
        name: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args) {
        let newCreator = new Creator({
          publicKey: args.publicKey,
          name: args.name,
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
        bannerURL: { type: GraphQLString },
        Twitter: { type: GraphQLString },
        Instagram: { type: GraphQLString },
        YouTube: { type: GraphQLString },
        TikTok: { type: GraphQLString },
        LinkedIn: { type: GraphQLString },
        GitHub: { type: GraphQLString },
        Website: { type: GraphQLString },
      },
      async resolve(parent, args) {
        const creator = await Creator.findOne({ publicKey: args.publicKey });

        if (!creator) return { error: "Couldn't find an creator to update" };

        if (args.name !== undefined) creator.name = args.name;
        if (args.bio !== undefined) creator.bio = args.bio;
        if (args.avatarURL !== undefined) creator.avatarURL = args.avatarURL;
        if (args.bannerURL !== undefined) creator.bannerURL = args.bannerURL;
        if (args.Twitter !== undefined) creator.Twitter = args.Twitter;
        if (args.Instagram !== undefined) creator.Instagram = args.Instagram;
        if (args.YouTube !== undefined) creator.YouTube = args.YouTube;
        if (args.TikTok !== undefined) creator.TikTok = args.TikTok;
        if (args.LinkedIn !== undefined) creator.LinkedIn = args.LinkedIn;
        if (args.GitHub !== undefined) creator.GitHub = args.GitHub;
        if (args.Website !== undefined) creator.Website = args.Website;

        return creator.save();
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
