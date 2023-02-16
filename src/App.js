import {Route, Routes} from 'react-router-dom';
import './App.css';
import { Uploaded } from './pages/upload/uploaded';
import FileUpload from './components/Images/FileUpload';
import CreatePersonGroup from './components/PersonGroup/CreatePersonGroup';
import DeletePersonGroup from './components/PersonGroup/DeletePersonGroup';
import CreatePerson from './components/Person/CreatePerson';
import PersonShowImagesTrain from './components/Images/PersonShowImagesTrain';
import DeletePerson from './components/Person/DeletePerson';
import TrainPersonGroup from './components/Train/TrainPersonGroup';
import AddCourse from './components/DataBase/AddCourse';
import Enrolment from './components/DataBase/Enrolment';
import {Navbar} from './components'
import {Header, Tutorial, Footer} from './container' 
import { useRef } from 'react';

function App() {

  return (
    <div>
      <Navbar/>
      <Routes>
        <Route  path = "/" element = {<><Header/> <Tutorial/> </>}/> 
        {/* <Route  path = "/uploaded" element = {<> <Uploaded/> </>}/> */}
        <Route  path = "/PersonGroup" element = {<><CreatePersonGroup/> <DeletePersonGroup/> </> }/>
        <Route  path = "/Person" element = {<><CreatePerson/> <DeletePerson/> </> }/>
        <Route  path = "/Images" element = {<> <FileUpload/> <PersonShowImagesTrain/> </>}/>
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