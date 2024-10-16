const { Item } = require('../models');

const resolvers = {
  Query: {
    hello: () => 'Hello, World!',
    getItems: async () => {
      try {
        return await Item.find();
      } catch (err) {
        console.error('❌ Error fetching items:', err);
        return [];
      }
    },
  },
};

module.exports = resolvers;
