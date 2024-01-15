import React, { useContext, useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SideBar from "./SideBar"; // Assuming you have a SideBar component
import Note from "../models/Note";
import { LoginContext } from "../context/LoginProvider";
import LoginContextType from "../models/LoginContextType";
import ServiceNotes from "../services/ServiceNotes";
import NoteHome from "./NoteHome";
import NoteRequest from "../dtos/NoteRequest";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [scratchPadText, setScratchPadText] = useState("");
  const [notes, setNotes] = useState<Note[]>([]);
  let { user, setUserCookie } = useContext(LoginContext) as LoginContextType;
  let serviceNotes = new ServiceNotes();
  let nav = useNavigate();

  const handlerConvertNote = async (): Promise<void> => {
    try {
      const note = {
        title: `Scratch Pad ${new Date().toLocaleDateString()}`,
        materie: "", 
        tag: "", 
        notite: scratchPadText,
        isTrash: false,
        userId: user.id,
      };
      const notesData = await serviceNotes.createNote(note);
      nav(`/notes`, { state: { selectedNote: note } });
      console.log(notesData);
      
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user && user.id) {
          const notesData = await serviceNotes.getAllNotesByUser(user.id);
          setNotes(notesData);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();

    const handleBeforeUnload = async () => {
      await fetchData();
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [user]);



  return (
    <div className="home">
      <div className="home__gridContainer">

        <div className="home__gridContainer__top">
        <div className="home__gridContainer__notes">
          <h1>Notes</h1>
          <div className="home__gridContainer__notes__slider">
            {notes.map((note) => (
              <NoteHome key={note.id} note={note} />
            ))}
          </div>
        </div>
        <div className="home__gridContainer__stick">
          <h1>Scratch Pad</h1>
          <textarea
            value={scratchPadText}
            onChange={(e) => setScratchPadText(e.target.value)}
            placeholder="Type your note here..."
          />
          <button className="button__first" onClick={()=> handlerConvertNote()}>Convert to Note</button>
        </div>
        </div>

       
        <div className="home__gridContainer__trash">
          <h1>Good day  {user.username} !</h1>
        </div>
      </div>
    </div>
  );
};

export default Home;
