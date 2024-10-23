const { Inventory, User, SalesReport } = require("../models");
const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    hello: () => "Hello, World!",

    getInventory: async () => {
      try {
        return await Inventory.find();
      } catch (err) {
        console.error("❌ Error fetching inventory:", err);
        throw new Error("Failed to fetch inventory.");
      }
    },

    user: async (parent, args, context) => {
      if (context.user) {
        try {
          return await User.findById(context.user._id);
        } catch (err) {
          console.error("❌ Error fetching user:", err);
          throw new Error("Failed to fetch user.");
        }
      }
      throw new AuthenticationError("Not authenticated");
    },

    // Fetch a single inventory item by ID
    getInventoryItem: async (parent, { id }) => {
      try {
        return await Inventory.findById(id);
      } catch (err) {
        console.error("❌ Error fetching inventory item:", err);
        throw new Error("Failed to fetch inventory item.");
      }
    },

    getSalesReports: async (parent, { dateRange, product, category }) => {
      try {
        const filter = {};
        // Apply filters
        if (dateRange) {
          const today = new Date();
          if (dateRange === "daily") {
            filter.date = { $gte: new Date(today.setHours(0, 0, 0, 0)) };
          } else if (dateRange === "weekly") {
            filter.date = { $gte: new Date(today.setDate(today.getDate() - 7)) };
          } else if (dateRange === "monthly") {
            filter.date = { $gte: new Date(today.setMonth(today.getMonth() - 1)) };
          }
        }
        if (product) {
          filter.product = product;
        }
        if (category) {
          filter.category = category;
        }

        console.log('Filter being used:', filter); // Log the filter for debugging
        const reports = await SalesReport.find(filter);
        console.log('Fetched reports:', reports); // Log fetched reports for debugging
        return reports;
      } catch (err) {
        console.error("❌ Error fetching sales reports:", err);
        return [];
      }
    },

    SearchProduct: async (_, { plu }) => {
      try {
        return await Inventory.findOne({plu: plu}).populate('company');
      } catch (err) {
        console.error("❌ Error fetching inventories:", err);
        throw new Error("Failed to fetch inventories.");
      }
    },
  },

  Mutation: {
    addUser: async (parent, { firstName, lastName, username, organization, email, password }) => {
      try {
        const user = await User.create({ firstName, lastName, username, organization, email, password });
        const token = signToken(user);
        return { token, user };
      } catch (err) {
        console.error("❌ Error creating user:", err);
        throw new Error("Failed to create user.");
      }
    },

    login: async (parent, { email, password }) => {
      try {
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
      } catch (err) {
        console.error("❌ Error logging in:", err);
        throw new Error("Login failed.");
      }
    },

    addInventoryItem: async (parent, { upc, plu, productName, weightPerItem, salePrice, vendorPrice, inStock, coo, companyOfOrigin, company }) => { 
      try {
        const newItem = await Inventory.create({ upc, plu, productName, weightPerItem, salePrice, vendorPrice, inStock, coo, companyOfOrigin, company });
        return newItem;
      } catch (err) {
        console.error("❌ Error adding inventory item:", err);
        throw new Error("Failed to add inventory item.");
      }
    },

    updateInventoryItem: async (parent, { id, upc, plu, productName, weightPerItem, salePrice, vendorPrice, inStock, coo, companyOfOrigin }) => { // Updated from Item to Inventory
      try {
        const updatedItem = await Inventory.findByIdAndUpdate(
          id,
          { upc, plu, productName, weightPerItem, salePrice, vendorPrice, inStock, coo, companyOfOrigin },
          { new: true }
        );
        return updatedItem;
      } catch (err) {
        console.error("❌ Error updating inventory item:", err);
        throw new Error("Failed to update inventory item.");
      }
    },

    deleteInventoryItem: async (parent, { id }) => {
      try {
        const deletedItem = await Inventory.findByIdAndDelete(id);
        return deletedItem;
      } catch (err) {
        console.error("❌ Error deleting inventory item:", err);
        throw new Error("Failed to delete inventory item.");
      }
    },
  },
};

module.exports = resolvers;
