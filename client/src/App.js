import './App.css';
import { Route, Routes} from "react-router-dom"
import LandingPage from './Components/LandingPage/Landing';
import Home from './Components/HomePage/home';
function App() {
  return (
   
      <div className='App'>
        <Routes>
          <Route exact path ='/' element={<LandingPage/>}></Route>
          <Route exact path ='/home' element={<Home/>}></Route>
        </Routes>
      </div>
   
  );
}

export default App;
