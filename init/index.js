const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");
const User = require("../models/user.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);

  // Fetch a user from the User model
  const user = await User.findOne(); // Adjust this to your logic for finding a user

  // Ensure that a user is available
  if (!user) {
    console.error("No user found. Please create a user first.");
    return;
  }

  // Call initDB after fetching the user
  await initDB(user);
}

const initDB = async (user) => {
  await Listing.deleteMany({});

  const modifiedData = initData.data.map((obj) => ({
    ...obj,
    owner: user._id,
  }));

  await Listing.insertMany(modifiedData);
  console.log("Data was initialized");
};
