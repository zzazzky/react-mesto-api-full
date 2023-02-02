import AuthorizationForm from "./AuthorizationForm";
import { Link } from "react-router-dom";

function Register(props) {
  return (
    <AuthorizationForm
      onAuthorizate={props.onAuthorizate}
      title="Регистрация"
      button="Зарегистрироваться"
      capture="Уже зарегистрированы? "
      formName="register-form"
      link={
        <Link className="authorization__capture button" to="/sign-in">
          Войти
        </Link>
      }
    />
  );
}

export default Register;
