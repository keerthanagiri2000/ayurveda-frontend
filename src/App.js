import './App.css';
import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const Home = lazy(() =>import('./pages/home'));
const DoctorsList = lazy(() => import('./pages/admin/doctorsList'));
const AddDoctor = lazy(() => import('./pages/admin/addDoctor'));
const SlotList = lazy(() => import('./pages/admin/slotList'));
const AddSlot = lazy(() => import('./pages/admin/addSlot'));
const EditSlot = lazy(() => import('./pages/admin/editSlot'));
const EditDoctor = lazy(() => import('./pages/admin/editDoctor'));
const Register = lazy(() => import('./pages/register'));
const Login = lazy(() => import('./pages/login'));
const AppointmentDashboard = lazy(() => import('./pages/appointmentDashboard'));

function App() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path='/' element = {<Home />} />
          <Route path='/register' element = {<Register />} />
          <Route path='/login' element = {<Login />} />
          <Route path='/appointment_dashboard' element = {<AppointmentDashboard />} />

          {/* Admin Module */}
          <Route path='/admin/doctors' element = {<DoctorsList />} />
          <Route path='/admin/add_doctor' element = {<AddDoctor />} />
          <Route path='/admin/edit_doctor/:id' element = {<EditDoctor /> } /> 
          <Route path='/admin/slots' element = {<SlotList />} />
          <Route path='/admin/add_slot' element = {<AddSlot />} />
          <Route path='/admin/edit_slot' element = {<EditSlot />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
