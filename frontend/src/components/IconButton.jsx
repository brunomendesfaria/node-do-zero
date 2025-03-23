/* eslint-disable no-unused-vars */
import './IconButton.css';

function IconButton({ icon: Icon, onClick, title, color = 'default', type = 'button' }) {
  return (
    <button
      className={`icon-button ${color}`}
      onClick={onClick}
      type={type}
      title={title}
    >
      <Icon size={16} />
    </button>
  );
}

export default IconButton;
