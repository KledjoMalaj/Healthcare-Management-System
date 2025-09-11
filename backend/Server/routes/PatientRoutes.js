import express from "express";
import Patient from "../models/PatientModel.js"
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import {authenticateToken} from "../authMiddlewere.js";
import Staff from "../models/StaffModel.js";
dotenv.config();

const router = express.Router();

router.post("/register", async (req, res) => {
    const {firstName, lastName, dateOfBirth, email, password} = req.body;
    try{
        const dob = new Date(dateOfBirth);
        if(isNaN(dob.getTime())) {
            return res.status(400).json({message:"Invalid Date format"});
        }

        const newPatient = new Patient({
            firstName,
            lastName,
            dateOfBirth,
            email,
            password,
        })
        await newPatient.save();
        res.status(201).json({message:"Patient successfully registered"});
    } catch(err){
        res.status(500).json({ message: err.message });
    }
})
router.post('/login', async (req, res) => {
    const {firstName, email, password} = req.body;
    try{
        const patient = await Patient.findOne({email:email})
        if(!patient){
            return res.status(400).json({message:"Email does not match"});
        }
        if(patient.password !== password){
            return res.status(400).json({message:"Passwords do not match"});
        }
        const token = jwt.sign({id: patient._id, email: patient.email},
            process.env.ACCESS_TOKEN_SECRET)
        res.json({token: token})
    }catch(err){
        res.status(400).json({message:"Invalid Login"});
    }
})

router.get('/me', authenticateToken,async (req, res) => {
    try{
        const patient = await Patient.findById(req.user.id)
        res.json(patient)
    }catch(err){
        res.status(500).json({ message: err.message });
    }
})

router.patch('/edit/:id', async (req, res) => {
    const {id} = req.params;
    const update = req.body;
    try{
        const UpdatedPatient = await Patient.findByIdAndUpdate(id, update, {new: true})
        if(!UpdatedPatient){
            res.status(404).json({message:"No patient found"});
        }
        res.json({ message: "Patient updated successfully", patient: UpdatedPatient });
    }catch(err){
        res.status(500).json({ message: err.message });
    }
})

export default router;