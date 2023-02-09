import {Route, Routes} from 'react-router-dom';
// import logo from './logo.svg';
import { Index } from './pages/home/index';
import { Uploaded } from './pages/upload/uploaded';
import FileUpload from './components/FileUpload';
import CreatePersonGroup from './components/CreatePersonGroup';
import DeletePersonGroup from './components/DeletePersonGroup';
import CreatePerson from './components/CreatePerson';
import DeletePerson from './components/DeletePerson';
// import './App.css';

export const App = () => {
  return (
    <div>
      <Routes>
        <Route  path = "/" element = {<><Index/></>}/>
        <Route  path = "/uploaded" element = {<> <Uploaded/> </>}/>
        <Route  path = "/FileUpload" element = {<> <FileUpload/> </>}/>
        <Route  path = "/PersonGroup" element = {<><CreatePersonGroup/> <DeletePersonGroup/> </> }/>
        <Route  path = "/Person" element = {<><CreatePerson/> <DeletePerson/> </> }/>
        {/* <Route  path = "/eventos" element = {<> <Eventos/> <Footer/> </> }/>
        <Route  path = "/tienda" element = {<><Tienda/> <Footer/> </>}/>
        <Route  path = "/carrito" element = {<><CarritoCompras/> <Paypal/> <Footer/></>}/> */}

      </Routes>
    </div>
  )
}
