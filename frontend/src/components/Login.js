import AuthorizationForm from "./AuthorizationForm";

function Login(props) {
  return (
    <AuthorizationForm
      onAuthorizate={props.onAuthorizate}
      title="Вход"
      button="Войти"
      capture=""
      formName="login-form"
    />
  );
}

export default Login;
