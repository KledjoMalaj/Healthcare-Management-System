import mongoose from "mongoose";

const BillingSchema = new mongoose.Schema({
    patient:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Patient',
        required:true
    },
    appointment:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Appointment',
        required: true
    },
    description:{
        type:String,
        required:true
    },
    amount:{
        type:Number,
        required:true
    },
    amountPaid:{
        type:Number,
        required:true
    },
    paymentStatus:{
        type:String,
        enum:['Unpaid','Partial','Paid'],
        default:'Unpaid'
    },
    paymentMethod:{
        type:String,
    },
    paymentDate:Date,
},{timestamps: true})

const Billing = mongoose.model("Billing", BillingSchema)

export default Billing