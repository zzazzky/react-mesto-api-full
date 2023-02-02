function ImagePopup(props) {
  return (
    <div
      className={
        props.card.link
          ? "popup popup_type_picture popup_opened"
          : "popup popup_type_picture"
      }
    >
      <figure className="popup__illustration">
        <button
          className="popup__close-button button"
          type="button"
          onClick={props.onClose}
        ></button>
        <img
          className="popup__image"
          src={props.card.link}
          alt={props.card.name}
        />
        <figcaption className="popup__caption">{props.card.name}</figcaption>
      </figure>
    </div>
  );
}

export default ImagePopup;
