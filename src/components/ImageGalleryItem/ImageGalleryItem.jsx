import "./ImageGalleryItem.css";

export default function ImageGalleryItem({ image, onClick }) {
  return (
    <li className="ImageGalleryItem">
      <img
        className="ImageGalleryItem-image"
        src={image.webformatURL}
        alt=""
        onClick={() => onClick(image)}
      />
    </li>
  );
}