import "./LoginPage.css";
import "../Form.css";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
import authService from "../../services/auth.service";
import { useForm } from "./../../hooks/useForm";

function LoginPage() {
  const {form, handleChange, errorMessage, setErrorMessage, placeholderWarningIfEmpty, inputWarningStyleIfEmpty} = useForm()
  const { storeToken, authenticateUser } = useContext(AuthContext);

  const navigate = useNavigate();
  
  const handleLoginSubmit = async(e) => {
    e.preventDefault();
    try {
      const response = await authService.login(form)
      storeToken(response.data.authToken)
        authenticateUser();
        navigate("/");
    } catch (error) {
      setErrorMessage(error.response.data.message)
    }
  };

  return (
    <div className="LoginPage">
      <h1>Login</h1>
      <form onSubmit={handleLoginSubmit}>
        <label>Usuario:</label>
        <input className={inputWarningStyleIfEmpty( form.username)} type="username" name="username" value={form.username} onChange={handleChange} placeholder={placeholderWarningIfEmpty(form.oldPassword, "Usuario")}/>
        <label>Password:</label>
        <input
        className={inputWarningStyleIfEmpty(form.password)}
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder={placeholderWarningIfEmpty(form.password, "Contraseña")}
        />
        <button type="submit">Login</button>
      </form>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <p>¿No tienes cuenta?</p>
      <Link to={"/signup"}> Registrate</Link>
    </div>
  );
}

export default LoginPage;
