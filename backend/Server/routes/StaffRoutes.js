import express from "express";
import Staff from "../models/StaffModel.js";

const router = express.Router();

router.post("/register", async (req, res) => {
    const { firstName, lastName, dateOfBirth, email, password } = req.body;
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
            password
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
        res.json({ message: "Login successful!" });
    }catch(err){
        res.status(500).json({ message: err.message });
    }
})



export default router;
