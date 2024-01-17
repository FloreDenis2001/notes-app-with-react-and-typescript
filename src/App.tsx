import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import "./App.css";
import Login from "./components/Login";
import LoginProvider from "./context/LoginProvider";
import Home from "./components/Home";
import Profile from "./components/Home";
import Notes from "./components/Notes";
import SharedNotes from "./components/SharedNotes";
import Trash from "./components/Trash";
import SideBar from "./components/SideBar";
import Register from "./components/Register";
import NavigationBar from "./components/NavigationBar";

function App() {
  return (
    <LoginProvider>
      <div className="App">
        <BrowserRouter>
          <SideBar />
          <NavigationBar/>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/note" element={<Notes />} />
            <Route path="/share" element={<SharedNotes />} />
            <Route path="/trash" element={<Trash />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </BrowserRouter>
      </div>
    </LoginProvider>
  );
}

export default App;
