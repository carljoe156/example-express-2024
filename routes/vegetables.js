const express = require("express");
const router = express.Router();
const Vegetable = require("../models/vegetables");

// add a seed route temporarily
router.get("/seed", async (req, res) => {
  try {
    await Vegetable.create([
      {
        name: "Beet",
        color: "pink",
        readyToEat: true,
      },
      {
        name: "pumpkin",
        color: "orange",
        readyToEat: true,
      },
      {
        name: "potatoes",
        color: "green",
        readyToEat: false,
      },
      {
        name: "carrot",
        color: "orange",
        readyToEat: true,
      },
      {
        name: "broccoli",
        color: "red",
        readyToEat: false,
      },
    ]);

    res.status(200).redirect("/api/vegetables");
  } catch (err) {
    res.status(400).send(err);
  }
});

// INDEX
// this is called an index route, where you can see all of the data
// THIS is one version of READ
// READ many
// this is only practical when you have small amounts of data
// but you you can also use an index route and limit the number of responses
router.get("/", async (req, res) => {
  try {
    const foundVegetables = await Vegetable.find({});
    res.status(200).json(foundVegetables);
  } catch (err) {
    res.status(400).send(err);
  }
});

// DELETE
router.delete("/:id", async (req, res) => {
  try {
    const deletedVegetable = await Vegetable.findByIdAndDelete(req.params.id);
    console.log(deletedVegetable);
    res.status(200).redirect("/api/vegetables");
  } catch (err) {
    res.status(400).send(err);
  }
});

// UPDATE
// put replaces a resource
router.put("/:id", async (req, res) => {
  if (req.body.readyToEat === "on") {
    req.body.readyToEat = true;
  } else {
    req.body.readyToEat = false;
  }

  try {
    const updatedVegetable = await Vegetable.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    console.log(updatedVegetable);
    res.redirect(`/api/vegetables/${req.params.id}`);
  } catch (err) {
    res.send(err).status(400);
  }
});

// CREATE
router.post("/", async (req, res) => {
  console.log(req.body);
  if (req.body.readyToEat === "on") {
    req.body.readyToEat = true;
  } else {
    req.body.readyToEat = false;
  }
  try {
    const createdVegetable = await Vegetable.create(req.body);
    res.status(200).redirect("/api/vegetables");
  } catch (err) {
    res.status(400).send(err);
  }
});

// SHOW
router.get("/:id", async (req, res) => {
  try {
    const foundVegetable = await Vegetable.findById(req.params.id);
    res.json(foundVegetable).status(200);
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
