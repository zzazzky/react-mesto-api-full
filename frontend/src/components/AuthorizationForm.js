import React, { useState } from "react";
function AuthorizationForm(props) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onAuthorizate(password, email);
  }

  return (
    <div className="authorization">
      <form
        className="authorization__form"
        name={props.formName}
        noValidate
        onSubmit={handleSubmit}
      >
        <h1 className="authorization__title">{props.title}</h1>
        <input
          className="authorization__input"
          type="email"
          placeholder="Email"
          name="authorization-email"
          value={email}
          onChange={handleEmailChange}
        />
        <input
          className="authorization__input"
          type="password"
          placeholder="Пароль"
          name="authorization-password"
          value={password}
          onChange={handlePasswordChange}
        />
        <button className="authorization__button button">{props.button}</button>
      </form>
      <p className="authorization__capture">
        {props.capture}
        {props.link}
      </p>
    </div>
  );
}

export default AuthorizationForm;
