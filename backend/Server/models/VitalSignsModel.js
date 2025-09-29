import mongoose from "mongoose";

const VitalSignsSchema = new mongoose.Schema({
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
    bloodPressure:{
        type:String
    },
    heartRate:{
        type:String
    },
    temperature:{
        type:String
    },
    weight:{
        type:String
    },
    lastUpdated:{
        type:Date,
        required:true,
        default:Date.now()
    }
})

const VitalSigns = mongoose.model('VitalSigns', VitalSignsSchema)

export default VitalSigns