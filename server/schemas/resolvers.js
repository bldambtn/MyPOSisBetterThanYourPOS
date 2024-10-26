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

    usersInOrganization: async (parent, { organization }) => {
      try {
        return await User.find({ organization });
      } catch (err) {
        console.error("❌ Error fetching users in organization:", err);
        throw new Error("Failed to fetch users.");
      }
    },

    SearchProduct: async (_, { plu }) => {
      try {
        return await Inventory.findOne({ plu });
      } catch (err) {
        console.error("❌ Error fetching inventories:", err);
        throw new Error("Failed to fetch inventories.");
      }
    },

    getSalesReports: async (parent, { dateRange, product, category }) => {
      try {
        const filter = {};

        // Apply filters based on dateRange, product, or category
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

        return await SalesReport.find(filter);
      } catch (err) {
        console.error("❌ Error fetching sales reports:", err);
        throw new Error("Failed to fetch sales reports.");
      }
    },
  },

  Mutation: {
    addUser: async (parent, args) => {
      try {
        // Normalize the organization field to lowercase and trim any extra spaces
        args.organization = args.organization.trim().toLowerCase();
        
        const user = await User.create(args);
        const token = signToken(user);
        return { token, user };
      } catch (err) {
        console.error("❌ Error creating user:", err);
        throw new Error("Failed to create user.");
      }
    },

    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('No user found with this email address');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);
      return { token, user };
    },

    addInventory: async (parent, { upc, plu, productName, weightPerItem, salePrice, vendorPrice, inStock, coo, companyOfOrigin }) => {
      try {
        return await Inventory.create({ upc, plu, productName, weightPerItem, salePrice, vendorPrice, inStock, coo, companyOfOrigin });
      } catch (err) {
        console.error("❌ Error adding inventory:", err);
        throw new Error("Failed to add inventory.");
      }
    },

    updateInventory: async (parent, { id, upc, plu, productName, weightPerItem, salePrice, vendorPrice, inStock, coo, companyOfOrigin }) => {
      try {
        return await Inventory.findByIdAndUpdate(
          id,
          { upc, plu, productName, weightPerItem, salePrice, vendorPrice, inStock, coo, companyOfOrigin },
          { new: true }
        );
      } catch (err) {
        console.error("❌ Error updating inventory:", err);
        throw new Error("Failed to update inventory.");
      }
    },

    deleteInventory: async (parent, { id }) => {
      try {
        return await Inventory.findByIdAndDelete(id);
      } catch (err) {
        console.error("❌ Error deleting inventory:", err);
        throw new Error("Failed to delete inventory.");
      }
    },
  },
};

module.exports = resolvers;
