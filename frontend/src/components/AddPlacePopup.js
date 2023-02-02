import React, { useState } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
  const [placeName, setPlaceName] = React.useState("");
  const [placeLink, setPlaceLink] = React.useState("");

  function handlePlaceNameChange(e) {
    setPlaceName(e.target.value);
  }

  function handlePlaceLinkChange(e) {
    setPlaceLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onAddPlace({
      name: placeName,
      link: placeLink,
    });
  }

  return (
    <PopupWithForm
      name="add-card"
      title="Новое место"
      {...props}
      onSubmit={handleSubmit}
    >
      <input
        className="popup__input popup__input_content_name"
        type="text"
        name="name"
        placeholder="Название"
        required
        minLength="2"
        maxLength="30"
        value={placeName}
        onChange={handlePlaceNameChange}
      />
      <span className="popup__error popup__error_type_name"></span>
      <input
        className="popup__input popup__input_content_link"
        type="url"
        name="link"
        placeholder="Ссылка на картинку"
        required
        onChange={handlePlaceLinkChange}
        value={placeLink}
      />
      <span className="popup__error popup__error_type_link"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
