import express  from "express";
import Billing  from "../models/BillingModel.js";
import Appointment from "../models/AppointmentModel.js";


const router = express.Router()


router.get('/view/:id',async (req,res)=> {
    const {id} = req.params
    try {
        const ViewBilling = await Billing.find({patient:id})
            .populate({
                path:'appointment',
                populate:{
                    path:'provider',
                    select:'firstName lastName role',
                }
            })
        res.json(ViewBilling)
    } catch (err) {
        res.status(500).json({message: err.message})
    }
})

export default router