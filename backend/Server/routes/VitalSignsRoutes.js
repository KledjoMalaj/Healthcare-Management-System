import express, {response} from "express";
import VitalSigns from "../models/VitalSignsModel.js";

const router = express.Router();

router.post('/add',async (req,res)=>{
    const {patientId,providerId,bloodPressure,heartRate,temperature,weight,lastUpdated} = req.body
    try{
        const newVitalSigns = new VitalSigns({
            patientId,providerId,bloodPressure,heartRate,temperature,weight,lastUpdated
        })
        await newVitalSigns.save()
        res.status(200).json({message:"Vital Signs added"})
    }catch (err){
        res.status(500).json({message:err.message})
    }
})

router.get('/:id', async (req,res)=>{
    const {id} = req.params
    try{
        const vitalSigns = await VitalSigns.find({patientId:id})
        res.json(vitalSigns)
    }catch (err) {
        res.status(500).json({message:err.message})
    }
})

router.patch('/edit/:id',async (req,res)=>{
    const {id} = req.params
    const update = req.body
    try{
        await VitalSigns.findOneAndUpdate({patientId:id} , update,{new:true})
        res.status(200).json({message:"Update Success"})
    }catch(err){
        res.status(500).json({message:err.message})
    }
})

export default router