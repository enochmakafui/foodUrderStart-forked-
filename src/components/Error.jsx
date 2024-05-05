export default function Error({ title, message, onClose }) {
  return (
    <div>
      <h2>{title}</h2>
      <p>{message}</p>
      <div className="modal-actions">
        <button className="button" onClick={() => onClose()}>
          Okay
        </button>
      </div>
    </div>
  );
}
