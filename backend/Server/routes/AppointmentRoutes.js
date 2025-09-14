import express from "express"
import Appointment from "../models/AppointmentModel.js"

const router = express.Router();

router.post("/add", async (req,res) =>{
    const {patient,provider,date,reason}= req.body
    try {
        const newAppointment = new Appointment({
            patient,provider,date,reason
        })
        await newAppointment.save();
        res.status(201).json({message:"Appointment Added"})
    }catch (err){
        res.status(500).json({message:err.message})
    }
})

router.get('/view/:id',async (req,res)=>{
    const {id} = req.params
    try{
        const ViewAppointments = await Appointment.find({provider:id})
            .populate('patient','firstName lastName')
        res.json(ViewAppointments)
    }catch (err){
        res.status(500).json({message:err.message})
    }
})

export default router;