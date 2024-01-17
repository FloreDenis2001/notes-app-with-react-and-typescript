import React, { useContext, useEffect, useState } from "react";
import Note from "../models/Note";
import ServiceNotes from "../services/ServiceNotes";
import { LoginContext } from "../context/LoginProvider";
import LoginContextType from "../models/LoginContextType";

interface NoteProps {
  note: Note;
  onClick: (note: Note) => void;
}

const NoteContainer: React.FC<NoteProps> = ({ note, onClick }) => {
  const { user } = useContext(LoginContext) as LoginContextType;
  let serviceNotes = new ServiceNotes();
  const [isOwner, setIsOwner] = useState<boolean>(false);

  const handlerOwner = async (): Promise<void> => {
    try {
      let response = await serviceNotes.getVerifyNote(note.id);
      console.log(response);
      if (response.id === user.id) {
        setIsOwner(true);
      } else {
        setIsOwner(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handlerOwner();
  }, [note, user.id]);

  const handleNoteClick = () => {
    onClick(note);
  };

  const dateString = note.createdAt;
  const extractedDate = dateString.split("T")[0];

  return (
    <div className="note" key={note.id} onClick={handleNoteClick}>
      <div className="note__title">{note.title}</div>
      <div className="note__content">{note.notite}</div>
      <div className="note__bottom">
        <div className="note__date">{extractedDate}</div>
        <div className="note__tag">{note.tag}</div>
      </div>
      <div className="note__materie">{note.materie}</div>
      {isOwner && <div className="note__owner">Owner</div>}
      {!isOwner && <div className="note__owner note__owner__shared">Shared</div>}
    </div>
  );
};

export default NoteContainer;
