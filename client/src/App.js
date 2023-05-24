import './App.css';
import { Route, Routes} from "react-router-dom"
import LandingPage from './Components/LandingPage/Landing';
function App() {
  return (
   
      <div className='App'>
        <Routes>
          <Route exact path ='/' element={<LandingPage/>}></Route>
        </Routes>
      </div>
   
  );
}

export default App;
