import './ConfirmDeletionModal.css'


const ConfirmDeleteModal = ({ onDelete, onClose, message, type }) => (
    <div className="confirm_deletion">
      <h2>Confirm Delete</h2>
      <p>{message}</p>
      <button id="red_button" onClick={onDelete}>Yes (Delete {type})</button>
      <button id="dark_grey_button" onClick={onClose}>No (Keep {type})</button>
    </div>
  );
  
  export default ConfirmDeleteModal;

 
  