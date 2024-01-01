import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import BlogNav from "./Components/Navbar/Navbar";
import Home from "./Components/blogs/home";
import Login from "./Components/Registration/login";
import Signup from "./Components/Registration/signup";
import Createblogs from "./Components/blogs/createblogs";
import Viewblogs from "./Components/blogs/viewblogs";
const App = () => {
  return (
    <BrowserRouter>
      <BlogNav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/createblog" element={<Createblogs />} />
        <Route path="/blog/:id" element={<Viewblogs/>}/>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
