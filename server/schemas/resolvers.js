const { Item, User, Inventory, SalesReport } = require("../models");
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
        throw new Error("Failed to fetch items.");
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

    getInventories: async () => {
      try {
        return await Inventory.find().populate('company');
      } catch (err) {
        console.error("❌ Error fetching inventories:", err);
        throw new Error("Failed to fetch inventories.");
      }
    },

    getInventory: async (parent, { id }) => {
      try {
        return await Inventory.findById(id).populate('company');
      } catch (err) {
        console.error("❌ Error fetching inventory:", err);
        throw new Error("Failed to fetch inventory.");
      }
    },

    getSalesReports: async (parent, { dateRange, product, category }) => {
      try {
        // Comment out or log the filters
        const filter = {};
    
        // Uncomment below if you want to apply the filters later
        
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
        
    
        console.log('Filter being used:', filter); // Log the filter being used for debugging
        const reports = await SalesReport.find(filter);
        console.log('Fetched reports:', reports); // Log the fetched reports for debugging
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

    addInventory: async (parent, { upc, plu, productName, weightPerItem, salePrice, vendorPrice, inStock, coo, companyOfOrigin, company }) => {
      try {
        const newInventory = await Inventory.create({ upc, plu, productName, weightPerItem, salePrice, vendorPrice, inStock, coo, companyOfOrigin, company });
        return newInventory;
      } catch (err) {
        console.error("❌ Error adding inventory:", err);
        throw new Error("Failed to add inventory.");
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
        throw new Error("Failed to update inventory.");
      }
    },

    deleteInventory: async (parent, { id }) => {
      try {
        const deletedInventory = await Inventory.findByIdAndDelete(id);
        return deletedInventory;
      } catch (err) {
        console.error("❌ Error deleting inventory:", err);
        throw new Error("Failed to delete inventory.");
      }
    },
  },
};

module.exports = resolvers;
