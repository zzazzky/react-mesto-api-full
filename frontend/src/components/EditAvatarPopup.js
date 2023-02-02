import React, { useState } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
  const avatarRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar(avatarRef.current.value);
  }

  return (
    <PopupWithForm
      name="edit-avatar"
      title="Обновить аватар"
      onSubmit={handleSubmit}
      {...props}
    >
      <input
        className="popup__input popup__input_content_avatar-link"
        type="url"
        name="avatar-link"
        placeholder="Ссылка на картинку"
        required
        ref={avatarRef}
      />
      <span className="popup__error popup__error_type_avatar-link"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
