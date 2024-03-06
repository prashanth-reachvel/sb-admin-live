const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const School = require("./models/School");
const Request = require("./models/Request");
const User = require("./models/User");
const Inventory = require("./models/AddInventory");
const InventoryUpdate = require("./models/UpdateInventory");
const InventoryItem = require("./models/InventoryItem");

const app = express();
app.use(express.json());
app.use(cors({
  origin: "https://localadmin.sevabharath.com",
  methods: ["GET", "POST", "PUT", "DELETE"],
}));
app.use("/uploads", express.static("uploads"));

require("dotenv").config();

const port = process.env.PORT || 3001;
const mongo_uri = process.env.MONGODB_URI;

// Connect to MongoDB Atlas
mongoose.connect(mongo_uri);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB Atlas");
});

// Admin Register
app.post("/register", (req, res) => {
  User.create(req.body)
    .then((schools) => res.json(schools))
    .catch((err) => console.log(err));
});

// Admin Login
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  User.findOne({ username: username }).then((user) => {
    if (user) {
      if (user.password === password) {
        res.json("Success");
      } else {
        res.json("The Password is incorrect");
      }
    } else {
      res.json("No record existed");
    }
  });
});

// Endpoint to create a new school
app.post("/api/add", async (req, res) => {
  try {
    const school = new School(req.body);
    await school.save();
    res.status(201).json(school);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Endpoint to fetch requests
app.get("/api/requests", async (req, res) => {
  try {
    const requests = await Request.find(
      {},
      {
        schoolName: 1,
        inventory: 1,
        quantity: 1,
        date: 1,
        selectedFile: 1,
        status: 1,
      }
    )
      .sort({ date: -1 }) // Sort by date descending
      .limit(10); // Limit to latest 5
    res.json(requests);
  } catch (err) {
    console.error("Error fetching requests:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Endpoint to update status
app.put("/api/requests/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const updatedRequest = await Request.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
    res.json(updatedRequest);
  } catch (err) {
    console.error("Error updating request status:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

//Endpoint to get and display the school lists
app.get("/schoolslist", async (req, res) => {
  try {
    const schools = await School.find();
    res.json(schools);
  } catch (err) {
    console.error("Error fetching schools:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Endpoint to add inventory
app.post("/api/addinventory", async (req, res) => {
  try {
    const {
      school,
      title,
      createdDate,
      totalAddQuantity,
      available,
      distributed,
      totalBoxes,
      reason,
    } = req.body;

    // Create a new inventory document
    const inventory = new Inventory({
      school,
      title,
      createdDate,
      totalAddQuantity,
      available,
      distributed,
      totalBoxes,
      reason,
    });

    // Save the inventory document to the database
    await inventory.save();

    // Send a success response
    res.status(201).json({ message: "Inventory added successfully" });
  } catch (error) {
    console.error("Error adding inventory:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Endpoint to get inventory data by schoolName
app.get("/api/inventory/:schoolName", async (req, res) => {
  try {
    const { schoolName } = req.params;
    const inventory = await Inventory.find({ school: schoolName });

    // Get unique titles from the inventory
    const uniqueTitles = [...new Set(inventory.map((item) => item.title))];

    // Get the latest data for each unique title
    const latestInventoryData = uniqueTitles.map((title) => {
      const itemsWithTitle = inventory.filter((item) => item.title === title);
      const latestItem = itemsWithTitle.reduce((prev, current) => {
        const dateA = new Date(prev.updatedDate || prev.createdDate);
        const dateB = new Date(current.updatedDate || current.createdDate);
        return dateA > dateB ? prev : current;
      });
      return latestItem;
    });

    console.log(latestInventoryData);
    res.json(latestInventoryData);
  } catch (error) {
    console.error("Error fetching inventory:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// app.get("/api/inventory/:school/:title", async (req, res) => {
//   try {
//     const { school, title } = req.params;
//     const inventory = await Inventory.aggregate([
//       {
//         $match: {
//           school: school,
//           title: title,
//         },
//       },
//       {
//         $addFields: {
//           latestDate: { $max: ["$createdDate", "$updatedDate"] },
//         },
//       },
//       {
//         $sort: {
//           latestDate: -1,
//         },
//       },
//       {
//         $limit: 1,
//       },
//     ]);
//     if (inventory.length === 0) {
//       return res.status(404).json({ error: "Inventory not found" });
//     }
//     res.json(inventory[0]);
//   } catch (error) {
//     console.error("Error fetching inventory:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

app.get("/api/inventory/:school/:title", async (req, res) => {
  try {
    const { school, title } = req.params;
    const inventory = await Inventory.find({ school: school });

    // Get unique titles from the inventory
    const uniqueTitles = [...new Set(inventory.map((item) => item.title))];

    // Get the latest data for each unique title
    const latestInventoryData = uniqueTitles.map((title) => {
      const itemsWithTitle = inventory.filter((item) => item.title === title);
      const latestItem = itemsWithTitle.reduce((prev, current) => {
        const dateA = new Date(prev.updatedDate || prev.createdDate);
        const dateB = new Date(current.updatedDate || current.createdDate);
        return dateA > dateB ? prev : current;
      });
      return latestItem;
    });

    // Filter by title if provided
    const filteredInventory = title
      ? latestInventoryData.filter((item) => item.title === title)
      : latestInventoryData;

    res.json(filteredInventory);
  } catch (error) {
    console.error("Error fetching inventory:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Endpoint to update inventory
app.post("/api/updateinventory/:school/:title", async (req, res) => {
  try {
    const { school, title } = req.params;
    const {
      updatedDate,
      newTotalQuantity,
      totalAddQuantity,
      available,
      distributed,
      totalBoxes,
      reason,
    } = req.body;

    const newInventory = new InventoryUpdate({
      school,
      title,
      updatedDate,
      newTotalQuantity,
      totalAddQuantity,
      available,
      distributed,
      totalBoxes,
      reason,
    });

    await newInventory.save();

    res.json({ message: "Inventory created successfully" });
  } catch (error) {
    console.error("Error creating inventory:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// GET recent updates by school and title
app.get("/api/recentupdates/:school/:title", async (req, res) => {
  try {
    const { school, title } = req.params;
    const recentUpdates = await InventoryUpdate.find({ title, school }).sort({
      updatedDate: -1,
    });
    res.json(recentUpdates);
  } catch (error) {
    console.error("Error fetching recent updates:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Assume you have a MongoDB connection set up and a Inventory model defined
app.get("/api/inventories/:school/", async (req, res) => {
  try {
    const { school, title } = req.params;
    const inventory = await Inventory.findOne({ school, title });
    if (!inventory) {
      return res.status(404).json({ message: "Inventory not found" });
    }
    res.json(inventory);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

// Endpoint to fetch profile data by schoolName
app.get("/api/profile/:schoolName", async (req, res) => {
  try {
    const { schoolName } = req.params;
    const school = await School.findOne({ schoolName: schoolName });
    if (!school) {
      return res.status(404).json({ error: "School not found" });
    }
    res.json(school);
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Endpoint to update username
app.put("/api/profile/updateUsername/:schoolName", async (req, res) => {
  try {
    const { schoolName } = req.params;
    const { username } = req.body;
    const updatedSchool = await School.findOneAndUpdate(
      { schoolName: schoolName },
      { username: username },
      { new: true }
    );
    res.json({ message: "Username updated successfully", updatedSchool });
  } catch (error) {
    console.error("Error updating username:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Endpoint to update password
app.put("/api/profile/updatePassword/:schoolName", async (req, res) => {
  try {
    const { schoolName } = req.params;
    const { password } = req.body;
    const updatedSchool = await School.findOneAndUpdate(
      { schoolName: schoolName },
      { password: password },
      { new: true }
    );
    res.json({ message: "Password updated successfully", updatedSchool });
  } catch (error) {
    console.error("Error updating password:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Endpoint to update Student count
app.put("/api/profile/updateStudents/:schoolName", async (req, res) => {
  try {
    const { schoolName } = req.params;
    const { students } = res.body;
    const updatedSchool = await School.findOneAndUpdate(
      { schoolName: schoolName },
      { students: students },
      { new: true }
    );
    res.json({ message: "Students count updated successfully", updatedSchool });
  } catch (error) {
    console.error("Error updating students count:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// app.get("/api/inventories", async (req, res) => {
//   try {
//     const allInventories = await Inventory.find({});
//     res.json(allInventories);
//   } catch (error) {
//     console.error("Error fetching all inventories:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

app.get("/api/inventories", async (req, res) => {
  try {
    const inventory = await Inventory.find({});

    // Group inventory items by school
    const inventoryBySchool = inventory.reduce((acc, item) => {
      const currentItemDate = new Date(item.updatedDate || item.createdDate);
      const currentLatestDate = acc[item.school]
        ? new Date(acc[item.school].updatedDate || acc[item.school].createdDate)
        : null; // Initialize with 0

      if (!acc[item.school] || currentItemDate > currentLatestDate) {
        acc[item.school] = item;
      }
      return acc;
    }, {});

    // Convert the object back to an array
    const latestInventoryData = Object.values(inventoryBySchool);

    console.log(latestInventoryData);
    res.json(latestInventoryData);
  } catch (error) {
    console.error("Error fetching inventory:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Endpoint to fetch the latest record for each school based on title
// app.get("/api/inventories", async (req, res) => {
//   try {
//     const latestInventories = await Inventory.aggregate([
//       {
//         $addFields: {
//           updatedDate: {
//             $cond: {
//               if: { $eq: [{ $type: "$updatedDate" }, "date"] },
//               then: "$updatedDate",
//               else: { $toDate: "$updatedDate" },
//             },
//           },
//         },
//       },
//       {
//         $sort: { updatedDate: -1 },
//       },
//       {
//         $group: {
//           _id: "$school", // Group by school
//           latestItem: { $first: "$$ROOT" }, // Get the first document (latest) in each group
//         },
//       },
//       {
//         $replaceRoot: { newRoot: "$latestItem" }, // Replace the root document with the latest inventory
//       },
//     ]);

//     res.json(latestInventories);
//   } catch (error) {
//     console.error("Error fetching latest inventories:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

// Endpoint to fetch all schools and their titles
app.get("/api/schools", async (req, res) => {
  try {
    const schools = await Inventory.find({}, { school: 1, title: 1 });
    const uniqueSchools = Array.from(
      new Set(schools.map((item) => item.school))
    ); // Get unique school names
    const schoolData = uniqueSchools.map((school) => ({
      schoolName: school,
      titles: schools
        .filter((item) => item.school === school)
        .map((item) => item.title),
    }));
    res.json(schoolData);
  } catch (err) {
    console.error("Error fetching schools:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// POST route to update next shipment date
app.put("/api/nextshipment/:schoolName/:title", async (req, res) => {
  const { schoolName, title } = req.params;
  const { newShipmentDate } = req.body;

  try {
    const inventoryItem = await InventoryItem.findOneAndUpdate(
      { school: schoolName, title: title },
      { shipmentDate: newShipmentDate },
      { new: true }
    );

    if (!inventoryItem) {
      return res.status(404).json({ message: "Inventory item not found" });
    }

    res.json({
      message: "Next shipment date updated successfully",
      inventoryItem,
    });
  } catch (error) {
    console.error("Error updating next shipment date:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
app.listen(port, () => {
  console.log("Server is running on: " + port);
});
