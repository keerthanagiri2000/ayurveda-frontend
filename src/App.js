import './App.css';
import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EditDoctor from './pages/admin/editDoctor';

const Home = lazy(() =>import('./pages/home'));
const DoctorsList = lazy(() => import('./pages/admin/doctorsList'));
const AddDoctor = lazy(() => import('./pages/admin/addDoctor'));
const SlotList = lazy(() => import('./pages/admin/slotList'));
const AddSlot = lazy(() => import('./pages/admin/addSlot'));
const EditSlot = lazy(() => import('./pages/admin/editSlot'));

function App() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path='/' element = {<Home />} />

          {/* Admin Module */}
          <Route path='/admin/doctors' element = {<DoctorsList />} />
          <Route path='/admin/add_doctor' element = {<AddDoctor />} />
          <Route path='/admin/edit_doctor' element = {<EditDoctor /> } /> 
          <Route path='/admin/slots' element = {<SlotList />} />
          <Route path='/admin/add_slot' element = {<AddSlot />} />
          <Route path='/admin/edit_slot' element = {<EditSlot />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
