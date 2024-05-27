import './App.css';
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import LoginPage from './logincomponent/LoginPage';
import DashboardPage from './dashboardcomponent/DashboardPage';
import RegistrationPage from './registrationcomponent/RegistrationPage';


function App() {
  return (
    <div> 
      <Router>
        <Routes>
          <Route exact path ="/" element={<LoginPage/>}/>
          <Route  path ="/dashboard" element={<DashboardPage/>}/>
          <Route  path ="/registration" element={<RegistrationPage/>}/>
          
        </Routes>
      </Router>
    </div>
  );
}

export default App;
