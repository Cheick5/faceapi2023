import {Route, Routes} from 'react-router-dom';
import './App.css';
// import logo from './logo.svg';
import { Index } from './pages/home/index';
import { Uploaded } from './pages/upload/uploaded';
import FileUpload from './components/FileUpload';
import CreatePersonGroup from './components/CreatePersonGroup';
import DeletePersonGroup from './components/DeletePersonGroup';
import CreatePerson from './components/CreatePerson';
import DeletePerson from './components/DeletePerson';
import TrainPersonGroup from './components/TrainPersonGroup';
import AddCourse from './components/AddCourse';
import Enrolment from './components/Enrolment';
import {Navbar} from './components'
import {Header} from './container' 

function App() {
  return (
    <div>
      <Navbar/>
      <Routes>
        <Route  path = "/" element = {<><Header/></>}/> 
        {/* <Route  path = "/uploaded" element = {<> <Uploaded/> </>}/> */}
        <Route  path = "/PersonGroup" element = {<><CreatePersonGroup/> <DeletePersonGroup/> </> }/>
        <Route  path = "/Person" element = {<><CreatePerson/> <DeletePerson/> </> }/>
        <Route  path = "/Images" element = {<> <FileUpload/> </>}/>
        <Route  path = "/Train" element = {<> <TrainPersonGroup/> </>}/>
        <Route  path = "/Database" element = {<> <AddCourse/> <Enrolment/></>}/>

        {/* <Route  path = "/eventos" element = {<> <Eventos/> <Footer/> </> }/>
        <Route  path = "/tienda" element = {<><Tienda/> <Footer/> </>}/>
        <Route  path = "/carrito" element = {<><CarritoCompras/> <Paypal/> <Footer/></>}/> */}

      </Routes>
    </div>
  )
}
export default App;