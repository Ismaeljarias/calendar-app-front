import React from "react";
import { useDispatch } from "react-redux";
import { eventStartDelete } from "../../actions/events";

const DeleteEventFab = () => {
  const dispatch = useDispatch();

  const handleOpenModal = () => {
    dispatch(eventStartDelete());
  };
  return (
    <button className="btn btn-danger fab-danger" onClick={handleOpenModal}>
      <i className="fas fa-trash"></i>
      <span> Delete Event</span>
    </button>
  );
};

export default DeleteEventFab;
