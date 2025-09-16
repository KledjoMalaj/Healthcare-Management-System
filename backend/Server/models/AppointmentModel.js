import mongoose from "mongoose";

const AppointmentSchema = new mongoose.Schema({
    patient:{type:mongoose.Schema.Types.ObjectId, ref:"Patient", required:true},
    provider:{type:mongoose.Schema.Types.ObjectId, ref:"Staff", required:true},
    date:{type:Date, required: true},
    time:{type:String, required: true},
    status:{type:String,default:'Scheduled'},
    reason:{type:String},
}, {timestamps:true})

const Appointment = mongoose.model("Appointment",AppointmentSchema)

export default Appointment;