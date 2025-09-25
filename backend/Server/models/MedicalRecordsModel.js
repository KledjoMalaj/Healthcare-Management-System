import mongoose from "mongoose";

const MedicalRecordsSchema = new mongoose.Schema({
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
    visitDate:{
        type:Date,
        required:true,
        default:Date.now
    },
    visitType:{
        type:String,
        required:true
    },

    bloodPressure: String,
    heartRate: String,
    temperature: String,
    weight: String,

    symptoms: String,
    diagnosis: String,
    notes: String,

})

const MedicalRecord = mongoose.model('MedicalRecord', MedicalRecordsSchema)

export default MedicalRecord