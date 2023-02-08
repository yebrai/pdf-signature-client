import "./SignupPage.css";
import "../Form.css";
import { Link, useNavigate } from "react-router-dom";
import authService from "../../services/auth.service";
import { useForm } from "./../../hooks/useForm";

function SignupPage() {
  const {form, handleChange, errorMessage, setErrorMessage, placeholderWarningIfEmpty, inputWarningStyleIfEmpty} = useForm()

  const navigate = useNavigate();


  const handleSignupSubmit = async(e) => {
    e.preventDefault();

    try {
      await authService.signup(form)
        navigate("/login");
      
    } catch (error) {
      setErrorMessage(error.response.data.message);
    }
  };

  return (
    <div className="SignupPage">
      <h1>Sign Up</h1>

      <form onSubmit={handleSignupSubmit}>
        <label>Usuario:</label>
        <input className={inputWarningStyleIfEmpty( form.username)} type="text" name="username" value={form.username} onChange={handleChange} placeholder={placeholderWarningIfEmpty(form.password, "Usuario")}/>

        <label>Contraseña:</label>
        <input
        className={inputWarningStyleIfEmpty( form.password)}
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder={placeholderWarningIfEmpty(form.password, "Contraseña")}
        />

        <button type="submit">Sign Up</button>
      </form>

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <p>¿Ya tienes cuenta?</p>
      <Link to={"/login"}> Login</Link>
    </div>
  );
}

export default SignupPage;
