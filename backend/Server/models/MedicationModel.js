import mongoose from "mongoose";

const MedicationSchema = new mongoose.Schema({
    patientId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient',
        required: true
    },
    providerId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Staff',
        required: true
    },
    medicationName:{
        type:String,
        required:true,
    },
    dosage:{
        type:String,
        required:true,
    },
    frequency:{
        type:String,
        required:true
    },
    status:{
        type:String,
        default:'Active'
    },
    prescribedDate:{
        type:Date,
        default: Date.now()
    }
})

const Medication = mongoose.model('Medication', MedicationSchema)

export default Medication