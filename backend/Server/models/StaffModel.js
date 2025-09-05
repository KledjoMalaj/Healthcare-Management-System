import mongoose from 'mongoose';

const StaffSchema = new mongoose.Schema({
    firstName: {
        type: String, required: true, trim: true
    },
    lastName: {
        type: String, required: true, trim: true
    },
    dateOfBirth: {
        type: Date, required: true
    },
    email: {
        type: String, required: true, unique: true
    },
    password: {
        type: String, required: true
    }
})

const Staff = mongoose.model('Staff', StaffSchema);

export default Staff;