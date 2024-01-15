import React, { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSort,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import Note from "../models/Note";
import NoteContainer from "./NoteContainer";
import ServiceNotes from "../services/ServiceNotes";
import { LoginContext } from "../context/LoginProvider";
import LoginContextType from "../models/LoginContextType";
import TrashEditor from "./TrashEditor";
import { useNavigate } from "react-router-dom";

const Trash : React.FC = () => {
  const [sortBy, setSortBy] = useState("title");
  const [isSortDropdownOpen, setSortDropdownOpen] = useState(false);
  const [selectedNode, setSelectedNode] = useState<Note>();
  const [isAddNote, setIsAddNote] = useState<boolean>(false);
  const [isFilterDropdownOpen, setFilterDropdownOpen] = useState(false);
  const [notes, setNotes] = useState<Note[]>([]);
  const [originalNotes, setOriginalNotes] = useState<Note[]>([]);
  let serviceNotes = new ServiceNotes();
  let { user, setUserCookie } = useContext(LoginContext) as LoginContextType;

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user && user.id) {
          const notesData = await serviceNotes.getTrashNotes(user.id);
          setNotes(notesData);
          setOriginalNotes(notesData);
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

  const handleSortTitle = () => {
    const sortedNotes = [...notes].sort((a, b) => a.title.localeCompare(b.title));
    setNotes(sortedNotes);
    setSortDropdownOpen(false);
  };
  
  const handleSortDate = () => {
    const sortedNotes = [...notes].sort((a, b) => a.createdAt.localeCompare(b.createdAt));
    setNotes(sortedNotes);
    setSortDropdownOpen(false);
  };
  
  const handleSortUpdate = () => {
    const sortedNotes = [...notes]
      .filter((note) => note.updatedAt !== null)
      .sort((a, b) => a.updatedAt.localeCompare(b.updatedAt));
    setNotes(sortedNotes);
    setSortDropdownOpen(false);
  };

  

  const handlerNoteClick = (note: Note) => {
    setSelectedNode(note);
  };

  

  const handleNoteUpdate = async () => {
    try {
      const updatedNotesData = await serviceNotes.getTrashNotes(user.id);
      setNotes(updatedNotesData);
      setOriginalNotes(updatedNotesData);
    } catch (error) {
      console.log(error);
    }
  };

  const handleNoteDelete = async (): Promise<void> => {
    try {
      const notesData = await serviceNotes.getTrashNotes(user.id);
      setNotes(notesData);
      setOriginalNotes(notesData);
      setSelectedNode(undefined);
    } catch (error) {
      console.log(error);
    }
  };



  return (
    <div className="notes">
      <div className="notes__content">
        <div className="notes__content__header">
          <FontAwesomeIcon
            className="navigation__leftBar__options__item__icon"
            icon={faTrash}
          />
          <h1>Trash</h1>

        
        </div>
        <div className="notes__content__filters">
          <p className="notes__total">{notes.length} note(s)</p>

          <div className="content__filters__container">
            <div className="dropdown">
              <div
                className="dropdown__header"
                onClick={() => {
                  setSortDropdownOpen(!isSortDropdownOpen);
                  setFilterDropdownOpen(false);
                }}
              >
                <FontAwesomeIcon
                  className="navigation__leftBar__options__item__icon"
                  icon={faSort}
                />
              </div>
              {isSortDropdownOpen && (
                <div className="dropdown__options">
                  <span>Sort by : </span>
                  <div onClick={() => handleSortTitle()}>Title</div>
                  <div onClick={() => handleSortDate()}>Created Date</div>
                  <div onClick={() => handleSortUpdate()}>Updated Date</div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="notes__content__notes">
          {notes.map((note, index) => (
            <NoteContainer note={note} onClick={() => handlerNoteClick(note)} />
          ))}
        </div>
      </div>
      <div className="notes__edit">
        {selectedNode && (
          <TrashEditor
            note={selectedNode}
            onUpdate={() => handleNoteUpdate()}
            onDelete={() => handleNoteDelete()}
          />
        )}
      </div>
    </div>
  );
};

export default Trash;
