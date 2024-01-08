import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

import Home from "./Components/Home";
import About_us from "./Components/About_us";
import Services from "./Components/Services";
import Contact_us from "./Components/Contact_us";
import ChooseAcc from "./Components/ChooseAcc";
import AuthLogin from "./Components/AuthLogin";
import AuthReg from "./Components/AuthReg";
import AdminLogin from "./Components/AdminLogin";
import AdminReg from "./Components/AdminReg";
import Authhome from "./Components/Authority/Authhome";
import Home2 from "./Components/Home2";
import Crud from "./Components/Crud";
import Complaints from "./Components/Complaints";
import Reports from "./Components/Reports";
import Crud2 from "./Components/Crud2";
import Addlocation from "./Components/Addlocation";
import RegBuses from "./Components/RegBuses";
import AddBus from "./Components/AddBus";
import EditBus from "./Components/EditBus";
import PostDetails from "./Components/PostDetails";
import BusDetails from "./Components/BusDetails";
import CreatePost from "./Components/CreatePost";
import EditPost from "./Components/EditPost";
import Reports1 from "./Components/Authority/Reports1";
import Passengers from "./Components/Registered users/Passengers";
import Reset from "./Components/Reset";
import Conductors from "./Components/Registered users/Conductors";
import UserLocation from "./Components/UserLocation";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About_us />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact_us />} />
          <Route path="/chooseaccount" element={<ChooseAcc />} />

          <Route path="/conductors" element={<Conductors/>}/>
          <Route path="/userlocation" element={<UserLocation/>}/>
          <Route path="/passengers" element={<Passengers/>}/>
          <Route path="/authsignup" element={<AuthReg />} />
          <Route path="/authsignin" element={<AuthLogin />} />
          <Route path="/adminsignin" element={<AdminLogin />} />
          <Route path="/adminsignup" element={<AdminReg />} />
          <Route path="/authdash" element={<Authhome />} />
          <Route path="/dashboard" element={<Home2 />} />
          <Route path="/news-feed" element={<Crud />} />
          <Route path="/complaints" element={<Complaints />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/location" element={<Crud2 />} />
          <Route path="/addlocation" element={<Addlocation />} />
          <Route path="/regbus" element={<RegBuses />} />
          <Route path="/add" element={<CreatePost />} />
          <Route path="/addbus" element={<AddBus />} />
          <Route path="/edit/:id" element={<EditPost />} />
          <Route path="/post/:id" element={<PostDetails />} />
          <Route path="/bus/:id" element={<BusDetails />} />
          <Route path="/bus/edit/:id" element={<EditBus />} />
          <Route path="/seereports" element={<Reports1/>}/>
          <Route path="/resetpassword" element={<Reset/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
