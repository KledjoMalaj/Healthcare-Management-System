import express from "express"
import Appointment from "../models/AppointmentModel.js"

const router = express.Router();

router.post("/add", async (req,res) =>{
    const {patient,provider,date,time,reason,status}= req.body
    try {
        const newAppointment = new Appointment({
            patient,provider,date,time,reason,status
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
        const ViewAppointments = await Appointment.find(
            {$or:[
                    {provider:id},
                    {patient:id}
                ]}
        )
            .populate('patient provider','firstName lastName role')
        res.json(ViewAppointments)
    }catch (err){
        res.status(500).json({message:err.message})
    }
})

router.delete('/delete', async (req, res) => {
    const { id } = req.body;
    try {
        const appointment = await Appointment.findByIdAndDelete(id);
        if (!appointment) {
            return res.status(404).json({ message: "Appointment not found" });
        }
        res.status(200).json({ message: "Appointment Deleted" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.patch('/confirm/:id',async (req,res)=>{
    const {id} = req.params;
    const {status} = req.body;
    try{
        const updatedAppointment = await Appointment.findByIdAndUpdate(
            id,
            {$set:{status}},
            {new :true}
        )
        res.json(updatedAppointment)
    }catch (err){
        res.status(500).json({message: err.message})
    }
})




export default router;