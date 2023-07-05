const mongoose = require("mongoose");
require('dotenv').config()

const connect = async () => {
  const password = process.env.DB_PASSWORD;
  const url = process.env.DB_URL?.replace("<password>", password);
  console.log(url)

  try {
    await mongoose.connect(url);
    console.log("CONNECTIONS SUCCESSFUL:🥳🥳🥳🥳");
    return true;
  } catch (e) {
    console.log("ERROR💥💥💥💥💥:", e);
    return false;
  }
};

module.exports = {
  connect,
};
