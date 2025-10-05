import express from "express"
import Appointment from "../models/AppointmentModel.js"
import Billing from "../models/BillingModel.js";

const router = express.Router();

router.post("/add", async (req,res) =>{
    const {patient,provider,date,time,reason,status,appointmentType}= req.body
    try {
        const newAppointment = new Appointment({
            patient,provider,date,time,reason,status,appointmentType
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

router.delete("/delete", async (req, res) => {
    const { id } = req.body;
    try {
        const appointment = await Appointment.findByIdAndDelete(id);
        if (!appointment) {
            return res.status(404).json({ message: "Appointment not found" });
        }

        await Billing.deleteOne({ appointment: id });

        res.status(200).json({ message: "Appointment and related billing deleted" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});;

const prices = {
    'Check-up': 150,
    'Follow-up': 120,
    'Consultation': 200,
    'Emergency': 450,
    'Procedure': 300
};

router.patch("/confirm/:id", async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    try {
        const updatedAppointment = await Appointment.findByIdAndUpdate(
            id,
            { $set: { status } },
            { new: true }
        ).populate("patient provider");

        if (!updatedAppointment) {
            return res.status(404).json({ message: "Appointment not found" });
        }

        if (status === "Confirmed") {
            const existingBilling = await Billing.findOne({ appointment: id });
            if (!existingBilling) {
                const type = updatedAppointment.appointmentType;
                const amount = prices[type] || 0;

                const newBilling = new Billing({
                    patient: updatedAppointment.patient._id,
                    appointment: updatedAppointment._id,
                    description: `Billing for ${type} appointment `,
                    amount: amount,
                    amountPaid: 0,
                    paymentStatus: "Unpaid"
                });

                await newBilling.save();
            }
        }

        res.json(updatedAppointment);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export default router;