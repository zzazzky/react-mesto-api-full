import React, { useState } from "react";
import PopupWithForm from "./PopupWithForm";
import CurrentUserContext from "../contexts/CurrentUserContext";

function EditProfilePopup(props) {
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser.name, currentUser.about, props.isOpen]);

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser({
      name: name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      name="edit-profile"
      title="Редактировать профиль"
      {...props}
      onSubmit={handleSubmit}
    >
      <input
        className="popup__input popup__input_content_profile-name"
        type="text"
        name="profile-name"
        required
        minLength="2"
        maxLength="40"
        value={name}
        onChange={handleNameChange}
      />
      <span className="popup__error popup__error_type_profile-name"></span>
      <input
        className="popup__input popup__input_content_description"
        type="text"
        name="profile-description"
        required
        minLength="2"
        maxLength="40"
        onChange={handleDescriptionChange}
        value={description}
      />
      <span className="popup__error popup__error_type_profile-description"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
