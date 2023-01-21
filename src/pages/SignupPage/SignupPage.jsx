import "./SignupPage.css";
import { Link, useNavigate } from "react-router-dom";
import authService from "../../services/auth.service";
import { useForm } from "./../../hooks/useForm";

function SignupPage() {
  const {form, handleChange, errorMessage, setErrorMessage} = useForm()

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
        <input type="text" name="username" value={form.username} onChange={handleChange} />

        <label>Contraseña:</label>
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
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
