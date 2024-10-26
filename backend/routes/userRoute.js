const express = require("express");
const mongoose = require("mongoose");
const User = require('../models/userModel');
const router = express.Router();

// Create a new user
router.post("/api/users", async (req, res) => {
    const { name, email, age } = req.body;
    
    try {
        const userAdded = await User.create({ name, email, age });
        res.status(201).json(userAdded);
    } catch (error) {
        console.log("error", error.message);
        res.status(400).json({ error: error.message });
    }
});

// Get all users
router.get("/api/users", async (req, res) => {
    try {
        const showAll = await User.find();
        res.status(200).json(showAll);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
});

// Get a single user by ID
router.get("/api/users/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const singleUser = await User.findById(id);
        if (singleUser) {
            res.status(200).json(singleUser);
        } else {
            res.status(404).json({ error: "User not found" });
        }
    } catch (error) {
        console.log("error", error.message);
        res.status(500).json({ error: error.message });
    }
});

// Delete a user
router.delete("/api/users/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const singleUser = await User.findByIdAndDelete(id);
        if (singleUser) {
            res.status(200).json(singleUser);
        } else {
            res.status(404).json({ error: "User not found" });
        }
    } catch (error) {
        console.log("error", error.message);
        res.status(500).json({ error: error.message });
    }
});

// Update a user
router.patch("/api/users/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const updateUser = await User.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true
        });
        if (updateUser) {
            res.status(200).json(updateUser);
        } else {
            res.status(404).json({ error: "User not found" });
        }
    } catch (error) {
        console.log("error", error.message);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
