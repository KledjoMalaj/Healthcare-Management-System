import express from "express";
import Patient from "../models/PatientModel.js"

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
        res.json({message:"Login Successfull"});
    }catch(err){
        res.status(400).json({message:"Invalid Login"});
    }
})

export default router;