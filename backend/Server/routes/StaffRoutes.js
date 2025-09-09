import express from "express";
import Staff from "../models/StaffModel.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import {authenticateToken} from "../authMiddlewere.js";
dotenv.config();

const router = express.Router();

router.post("/register", async (req, res) => {
    const { firstName, lastName, dateOfBirth, email, password, role, specialty } = req.body;
    try {
        const dob = new Date(dateOfBirth);
        if (isNaN(dob.getTime())) {
            return res.status(400).json({ message: "Invalid date format" });
        }

        const newStaff = new Staff({
            firstName,
            lastName,
            dateOfBirth: dob,
            email,
            password,
            role,
            specialty,
        });

        await newStaff.save();
        res.status(201).json({ message: "Successfully registered" });

    } catch (err) {
        console.error("Error registering staff:", err);
        res.status(500).json({ message: err.message });
    }
});

router.post('/login', async (req, res) => {
    const {firstName, email, password } = req.body;
    try{
        const staff = await Staff.findOne({ email: email });
        if (!staff) {
            res.status(400).json({ message: "Email not found" });
        }
        if(staff.password !== password) {
            res.status(400).json({ message: "Passwords do not match" });
        }
        const token = jwt.sign({id: staff._id,email: staff.email},
            process.env.ACCESS_TOKEN_SECRET)
        res.json({token: token})

    }catch(err){
        res.status(500).json({ message: err.message });
    }
})

router.get('/me', authenticateToken,async (req, res) => {
    try{
        const staff = await Staff.findById(req.user.id)
        res.json(staff)
    }catch(err){
        res.status(500).json({ message: err.message });
    }
})


router.patch('/edit/:id', async (req, res) => {
    const { id } = req.params;
    const updates = req.body;

    try {

        if (updates.dateOfBirth) {
            const dob = new Date(updates.dateOfBirth);
            if (isNaN(dob.getTime())) {
                return res.status(400).json({ message: "Invalid date format" });
            }
            updates.dateOfBirth = dob;
        }

        const updatedStaff = await Staff.findByIdAndUpdate(id, updates, { new: true });

        if (!updatedStaff) {
            return res.status(404).json({ message: "Staff not found" });
        }

        res.json({ message: "Staff updated successfully", staff: updatedStaff });
    } catch (err) {
        console.error("Error updating staff:", err);
        res.status(500).json({ message: err.message });
    }
});







export default router;
