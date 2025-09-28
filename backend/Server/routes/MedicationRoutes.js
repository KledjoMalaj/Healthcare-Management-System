import express from "express";
import Medication from "../models/MedicationModel.js";

const router = express.Router();

router.post('/add',async (req,res)=>{
    const {patientId,providerId,medicationName,dosage,frequency,status,prescribeDate} = req.body
    try{
        const newMedication = new Medication({
            patientId,providerId,medicationName,dosage,frequency,status,prescribeDate
        })
        await newMedication.save()
        res.status(200).json({message:"Medication Added"})
    } catch (err){
        res.status(500).json({message:err.message})
    }
})

router.get('/:id',async (req,res)=>{
    const {id} = req.params
    try{
        const medication = await Medication.find({patientId:id})
            .populate("providerId","firstName lastName role")
        res.json(medication)
    }catch (err){
        res.status(500).json({message:err.message})
    }
})

export default router