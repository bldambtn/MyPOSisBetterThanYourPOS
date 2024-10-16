const resolvers = {
    Query: {
      hello: () => 'Hello, World!',
      getItems: () => [
        { id: 1, name: 'Paint', quantity: 100 },
        { id: 2, name: 'Brush', quantity: 50 },
      ],
    },
  };
  
  module.exports = resolvers;
  