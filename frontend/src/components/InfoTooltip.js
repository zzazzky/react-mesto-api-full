function InfoTooltip(props) {
  return (
    <div
      className={
        props.isOpen
          ? `popup popup_type_authorization-result popup_opened`
          : `popup popup_type_authorization-result`
      }
    >
      <div className="popup__container">
        <button
          className="popup__close-button button"
          type="button"
          onClick={props.onClose}
        ></button>
        <div
          className={
            props.isOK
              ? `popup__authorization-picture`
              : `popup__authorization-picture popup__authorization-picture_wrong`
          }
        />
        <h2 className="popup__authorization-title">
          {props.isOK
            ? "Вы успешно зарегистрировались!"
            : "Что-то пошло не так! Попробуйте ещё раз."}
        </h2>
      </div>
    </div>
  );
}

export default InfoTooltip;
