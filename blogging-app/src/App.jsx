import { BrowserRouter, Routes, Route } from "react-router-dom";
import {Home,About,SignIn,SignUp,Dashboard,Projects} from "./pages";
import { Header, FooterComponent } from "./components";

export default function App() {
  return (
   <>
   <BrowserRouter>
   <Header/>
   <Routes>
    <Route path="/" element={<Home/>} />
    <Route path="/about" element={<About/>} />
    <Route path="/signin" element={<SignIn/>} />
    <Route path="/signup" element={<SignUp/>} />
    <Route path="/dashboard" element={<Dashboard/>} />
    <Route path="/projects" element={<Projects/>} />
   </Routes>
   <FooterComponent/>
   </BrowserRouter>
   </>
  )
}
