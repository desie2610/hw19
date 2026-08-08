import { useEffect } from "react";
import "./Modal.css";

export default function Modal({ image, onClose }) {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.code === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  const handleBackdropClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="Overlay"
      onClick={handleBackdropClick}
    >
      <div className="Modal">
        <img
          src={image.largeImageURL}
          alt=""
        />
      </div>
    </div>
  );
}