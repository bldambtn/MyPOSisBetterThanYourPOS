const { Item, User, Inventory } = require("../models");
const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    hello: () => "Hello, World!",
    getItems: async () => {
      try {
        return await Item.find();
      } catch (err) {
        console.error("❌ Error fetching items:", err);
        return [];
      }
    },
    user: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id);
        return user;
      }

      throw new AuthenticationError("Not authenticated");
    },
    getInventories: async () => {
      try {
        return await Inventory.find().populate('company');
      } catch (err) {
        console.error("❌ Error fetching inventories:", err);
        return [];
      }
    },
    getInventory: async (parent, { id }) => {
      try {
        return await Inventory.findById(id).populate('company');
      } catch (err) {
        console.error("❌ Error fetching inventory:", err);
        return null;
      }
    },
  },
  Mutation: {
    addUser: async (parent, { firstName, lastName, username, organization, email, password }) => {
      const user = await User.create({ firstName, lastName, username, organization, email, password });
      const token = signToken(user);

      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user);

      return { token, user };
    },
    addInventory: async (parent, { upc, plu, productName, weightPerItem, salePrice, vendorPrice, inStock, coo, companyOfOrigin, company }) => {
      try {
        const newInventory = await Inventory.create({ upc, plu, productName, weightPerItem, salePrice, vendorPrice, inStock, coo, companyOfOrigin, company });
        return newInventory;
      } catch (err) {
        console.error("❌ Error adding inventory:", err);
        throw new Error("Error adding inventory");
      }
    },
    updateInventory: async (parent, { id, upc, plu, productName, weightPerItem, salePrice, vendorPrice, inStock, coo, companyOfOrigin }) => {
      try {
        const updatedInventory = await Inventory.findByIdAndUpdate(
          id,
          { upc, plu, productName, weightPerItem, salePrice, vendorPrice, inStock, coo, companyOfOrigin },
          { new: true }
        );
        return updatedInventory;
      } catch (err) {
        console.error("❌ Error updating inventory:", err);
        throw new Error("Error updating inventory");
      }
    },
    deleteInventory: async (parent, { id }) => {
      try {
        const deletedInventory = await Inventory.findByIdAndDelete(id);
        return deletedInventory;
      } catch (err) {
        console.error("❌ Error deleting inventory:", err);
        throw new Error("Error deleting inventory");
      }
    },
  },
};

module.exports = resolvers;
