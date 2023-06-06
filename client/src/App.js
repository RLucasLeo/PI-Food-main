import './App.css';
import { Route, Routes} from "react-router-dom"
import LandingPage from './Components/LandingPage/Landing';
import Home from './Components/HomePage/home';
import Detail from './Components/Detail/Detail';
import Create from './Components/Create/Create';
import axios from "axios"
import Error404 from './Components/Error404/Error404';
axios.defaults.baseURL = "http://localhost:3001/"
function App() {
  return (
   
      <div className='App'>
        <Routes>
          <Route exact path ='/' element={<LandingPage/>}></Route>
          <Route exact path ='/home' element={<Home/>}></Route>
          <Route exact path='/detail/:id' element={<Detail/>}></Route>
          <Route exact path='/create' element={<Create/>}></Route>
          <Route path={'*'} element={<Error404/>}></Route>
        </Routes>
      </div>
   
  );
}

export default App;
