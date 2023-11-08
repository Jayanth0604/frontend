import './App.css';
import  {
  BrowserRouter as Router,
  Routes,
  Route, 
}from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.css';
import SignIn from './Components/SignIn';
import TermsCondition from './Components/TermsCondition';
import Dashboard from './Components/Dashboard';
import Employee from './Components/Employee';
import Profile from './Components/Profile';
import Edit from './Components/Edit';
import Empdashboard from './Components/Empdashboard';
import EmpProfile from './Components/EmpProfile';
import EditEmployee from './Components/EditEmployee';
import EmployeeTask from './Components/EmployeeTask';
import TaskfromManager from './Components/TaskfromManager';
import SignUp from './Components/SignUp';
import ApplyLeave from './Components/ApplyLeave';
import LeaveReq from './Components/LeaveReq';
import Teams from './Components/Teams';
import AddManager from './Components/AddManager';
import ManagerEditProfile from './Components/ManagerEditProfile';
import TaskSubmit from './Components/TaskSubmit';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Timesheet from './Components/Timesheet';
import Event from './Components/Event';
import Calendar from './Components/Calendar';
import ManagerDashboard from './Components/ManagerDashboard';
import AddEmployee from './Components/AddEmployee';
import Timer from './Components/Timer';
import EmpCalendar from './Components/EmpCalendar';
import EmployeeTimesheet from './Components/EmployeeTimesheet';
import { LoginProvider } from './Components/LoginContext';

function App() {
  
  return (
    <div className="App">
      <LoginProvider>
  <Router>
    <Routes>
      <Route path="/Login" element={<SignIn />} />
      <Route path="/Register" element={<SignUp />} />
      <Route path="/Termsandcondition-page" element={<TermsCondition />} />
      <Route path="/dashboard/:email" element={<Dashboard />} />
      <Route path="/profile/:email" element={<Profile />} />
      <Route path="/CRUD-employee/:email" element={<Employee />} />
      <Route path="/Edit-Employee/:email" element={<Edit />} />
      <Route path="/Task-Project/:email" element={<EmployeeTask />} />
      <Route path="/Employee-profile/:email" element={<EmpProfile />} />
      <Route path="/Employee-dashboard/:email" element={<Empdashboard />} />
      <Route path='/EmployeeEditOption/:email' element={<EditEmployee />} />
      <Route path='/AssignTask/:email' element={<TaskfromManager />} />
      <Route path='/View-Team' element={<Teams />} />
       <Route path='/Add-Events/:email' element={<Event />} />
      <Route path='/ApplyLeave/:email' element={<ApplyLeave />} />
      <Route path='/Employee-Leave-Request/:email' element={<LeaveReq />} />
      <Route path='/Add-Manager/:email' element={<AddManager />} />
      <Route path='/Manager-Profile/:email' element={<ManagerEditProfile />} />
      <Route path = '/task-Submit-by-employees/:email' element={<TaskSubmit />} />
      <Route path='/Time-Sheet-Employee/:email' element={<Timesheet />} />
      <Route path='/Calendar/:email' element={<Calendar />} />
      <Route path='/Add-Employee/:email' element={<AddEmployee />} />
      <Route path='/Manager-dashboard/:email' element={<ManagerDashboard />} />
      <Route path='/Timer' element={<Timer />} />
      <Route path='/employee-calendar/:email' element={<EmpCalendar />} />
      <Route path='/EmployeesTimeSheet/:email' element={<EmployeeTimesheet />} /> 
    </Routes>
    </Router>
    </LoginProvider>
    <ToastContainer />
   
    </div>
  );
}

export default App;
// ClientId-> 534728716726-gu08k1df6kjsm8qg49gmasl2fl6dra8c.apps.googleusercontent.com
// ClientSecret->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