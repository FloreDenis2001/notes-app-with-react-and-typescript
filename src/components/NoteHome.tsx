import React, { useContext } from "react";
import Note from "../models/Note";
import { faEdit, faRemove } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ServiceNotes from "../services/ServiceNotes";
import { useNavigate } from "react-router-dom";
import LoginContextType from "../models/LoginContextType";
import { LoginContext } from "../context/LoginProvider";
import TrashRequest from "../dtos/TrashRequest";

interface NoteProps {
  note: Note;
}

const NoteHome: React.FC<NoteProps> = ({ note }) => {
  const serviceNotes = new ServiceNotes();
  let { user, setUserCookie } = useContext(LoginContext) as LoginContextType;
  let nav = useNavigate();
  const handlerMoveToTrash = async (): Promise<void> => {
    try {
      await serviceNotes.moveNoteToTrash({userId: user.id, noteId: note.id}as TrashRequest);
      nav("/trash");
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <div className="noteHome" key={note.id}>
      <div className="noteHome__title">{note.title}</div>
      <div className="noteHome__content">{note.notite}</div>
      <div className="noteHome__materie">{note.materie}</div>
      <div className="noteHome__bottom">
        <FontAwesomeIcon
          className="navigation__leftBar__options__item__icon"
          icon={faEdit}  onClick={() => nav(`/note`, { state: { selectedNote: note } })}
        />
        <FontAwesomeIcon
          className="navigation__leftBar__options__item__icon"
          icon={faRemove} onClick={() => handlerMoveToTrash()}
        />
      </div>
    </div>
  );
};

export default NoteHome;
