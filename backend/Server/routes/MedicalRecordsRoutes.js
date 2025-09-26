import express from "express";
import MedicalRecord from "../models/MedicalRecordsModel.js";

const router = express.Router();

router.post("/add",async (req,res)=>{
    const {patientId,providerId,visitDate,visitType,bloodPressure,heartRate,temperature,wight,symptoms,diagnosis,notes} = req.body
    try {
        const newMedicalRecord = new MedicalRecord({
            patientId,providerId,visitDate,visitType,bloodPressure,heartRate,temperature,wight,symptoms,diagnosis,notes
        })
        await newMedicalRecord.save();
        res.status(201).json({message:"Medical Record Added"})
    } catch (err) {
        res.status(500).json({message:err.message})
    }
})

router.get("/:id",async (req,res)=>{
    const {id} = req.params
    try{
        const MedicalRecords = await MedicalRecord.find({patientId:id})
            .populate("providerId","firstName lastName role")
        res.json(MedicalRecords)
    }catch (err) {
        res.status(500).json({message:err.message})
    }
})

export default router