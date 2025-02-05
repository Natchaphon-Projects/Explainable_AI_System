import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./LoginPage";
import OTPLogin from "./OTPLogin";
import EnterOTP from "./EnterOTP";
import ParentDashboard from "./components/ParentDashboard";
import DoctorDashboard from "./components/DoctorDashboard";
import AdminDashboard from "./components/AdminDashboard";
import ManageDepartment from "./components/ManageDepartment";
import ManageParentDepartment from "./components/ManageParentDepartment"; // Added for Parents
import ManageDoctorDepartment from "./components/ManageDoctorDepartment"; // Added for Doctors
import EditPatient from "./components/EditPatient";
import AddPatient from "./components/AddPatient";
import ViewPatientResults from "./components/ViewPatientResults";
import PatientAssessmentResult from "./components/PatientAssessmentResult"; // Added new component
import PatientDetails from "./components/PatientDetails";
import RiskAssessmentEdit from "./components/RiskAssessmentEdit";
import RiskAssessment from "./components/RiskAssessment";
import Recommendations from "./components/Recommendations";
import PatientHistory from "./components/PatientHistory";


function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LoginPage />} />
        <Route path="/otp-login" element={<OTPLogin />} />
        <Route path="/enter-otp" element={<EnterOTP />} />

        {/* Parent Routes */}
        <Route path="/parent-dashboard" element={<ParentDashboard />} />
        <Route path="/parent-risk-assessment" element={<RiskAssessment />} />
        <Route path="/parent-recommendations" element={<Recommendations />} />

        {/* Doctor Routes */}
        <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
        <Route path="/view-results" element={<ViewPatientResults />} />
        <Route path="/patient-details/:id" element={<PatientDetails />} />
        <Route path="/edit-assessment/:id" element={<RiskAssessmentEdit />} />
        <Route path="/patient-history" element={<PatientHistory />} />
        <Route path="/patient-assessment/:id" element={<PatientAssessmentResult />} /> {/* New route */}

        {/* Admin Routes */}
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/manage-department" element={<ManageDepartment />} />
        <Route path="/manage-parents" element={<ManageParentDepartment />} /> {/* New route */}
        <Route path="/manage-doctors" element={<ManageDoctorDepartment />} /> {/* New route */}
        <Route path="/edit-patient/:id" element={<EditPatient />} />
        <Route path="/add-patient" element={<AddPatient />} />
      </Routes>
    </Router>
  );
}

export default App;
