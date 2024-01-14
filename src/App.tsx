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

function App() {
  return (
    <LoginProvider>
      <div className="App">
        <BrowserRouter>
          <SideBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/notes" element={<Notes />} />
            <Route path="/shared" element={<SharedNotes />} />
            <Route path="/trash" element={<Trash />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </BrowserRouter>
      </div>
    </LoginProvider>
  );
}

export default App;
