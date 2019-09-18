const mongoose = require("mongoose");
const Tag = require("../models/Tag.js");

mongoose.connect("mongodb://localhost/sht-i-wanna-eat", {
  useNewUrlParser: true
});

tags = [
  {
    name: "near work"
  },
  {
    name: "near home"
  },
  {
    name: "new!"
  }
];

Tag.insertMany(tags)
  .then(data => {
    console.log("success! added " + data.length + " tags in the collection");
  })
  .catch(err => {
    console.log(err);
  });
