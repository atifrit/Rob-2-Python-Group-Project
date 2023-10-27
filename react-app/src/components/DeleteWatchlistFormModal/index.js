import React from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { deleteWatchlistById } from "../../store/watchlists";
import "./deletemodal.css";

const DeleteWatchlistFormModal = ({ watchlistId }) => {
  const dispatch = useDispatch();
  const { setModalContent } = useModal();

  const handleDelete = async () => {
    await dispatch(deleteWatchlistById(watchlistId));
    setModalContent(null);
  };

  const closeModal = () => {
    setModalContent(null);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h4>Confirm Deletion</h4>
        <p>Are you sure you want to delete this watchlist?</p>
        <button onClick={handleDelete} className="yes">
          Yes
        </button>
        <button onClick={closeModal} className="no">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default DeleteWatchlistFormModal;
