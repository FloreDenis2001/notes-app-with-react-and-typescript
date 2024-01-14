import React from "react";
import Note from "../models/Note";

interface NoteProps {
  note: Note;
  onClick: (note: Note) => void;
}

const NoteContainer: React.FC<NoteProps> = ({ note, onClick }) => {
  const handleNoteClick = () => {
    onClick(note);
  };

  return (
    <div className="note" key={note.id} onClick={handleNoteClick}>
      <div className="note__title">{note.title}</div>
      <div className="note__content">{note.notite}</div>
      <div className="note__bottom">
        <div className="note__date">{note.createdAt}</div>
        <div className="note__tag">{note.tag}</div>
      </div>
      <div className="note__materie">{note.materie}</div>
    </div>
  );
};

export default NoteContainer;
