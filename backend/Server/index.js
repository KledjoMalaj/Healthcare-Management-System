import express from "express";
import mongoose from "mongoose";
import StaffRoutes from "./routes/StaffRoutes.js";
import PatientRoutes from "./routes/PatientRoutes.js";
import AppointmentRoutes from "./routes/AppointmentRoutes.js";
import MedicalRecordsRoutes from "./routes/MedicalRecordsRoutes.js";
import cors from "cors";

const app = express();
const port = 3030;

app.use(express.json());

app.use(cors({
    origin: "http://localhost:5173"
}))
try {
    await mongoose.connect("mongodb://127.0.0.1:27017/HMS");
    console.log("MongoDB connected!");
} catch (err) {
    console.error("MongoDB connection error:", err);
}

mongoose.connection.on("error", err => console.error("MongoDB connection error:", err));

app.use("/staff", StaffRoutes);
app.use("/patient", PatientRoutes);
app.use("/appointment", AppointmentRoutes)
app.use("/medicalRecords", MedicalRecordsRoutes)

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
