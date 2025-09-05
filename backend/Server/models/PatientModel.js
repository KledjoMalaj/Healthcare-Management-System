import mongoose from "mongoose";

const PatientSchema = new mongoose.Schema({
    firstName:{
        type:String, required: true, trim: true
    },
    lastName:{
        type:String, required: true, trim: true
    },
    dateOfBirth:{
        type:Date, required: true
    },
    email:{
        type:String,required: true, trim: true
    },
    password:{
        type:String,required: true
    }
})

const Patient = mongoose.model("Patient", PatientSchema);

export default Patient;