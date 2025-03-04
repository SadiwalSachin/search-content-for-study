import Navbar from "./components/Navbar"
import { Route , Routes } from "react-router-dom"
import AddPyq from "./Pages/AddPyq"
import TotalPyq from "./Pages/TotalPyq"
import Home from "./Pages/Home"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from "./components/Footer"
import EditPyq from "./components/EditPyq"

function App() {

  return (
    <>
     <ToastContainer />
     <Navbar/>
     <Routes>
      <Route path="/editpyq" element={<EditPyq/>} />
      <Route path="/addpyq" element={<AddPyq/>}/>
      <Route path="/totalpyq" element={<TotalPyq/>}/>
      <Route path="/" element={<Home/>}/>
     </Routes>
     <Footer/>
    </>
  )
}

export default App
