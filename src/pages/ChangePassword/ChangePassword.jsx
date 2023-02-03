import { useForm } from "./../../hooks/useForm";
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import authService from "../../services/auth.service";
import { useNavigate } from "react-router-dom";



function ChangePassword() {
    const {form, handleChange, errorMessage, setErrorMessage} = useForm()
  const { storeToken, authenticateUser } = useContext(AuthContext);

  const navigate = useNavigate();


    const handleChangePassword = async(e) => {
        e.preventDefault();
        try {
          const response = await authService.changePassword(form)
          
            authenticateUser();
            navigate("/login");
        } catch (error) {
          setErrorMessage(error.response.data.message)
        }
      };
  return (
    <div>
        <h1>Cambiar comtraseña</h1>
        <form onSubmit={handleChangePassword}>
        <label htmlFor="oldPassword">Antigua contraseña:</label>
        <input type="password"
          name="oldPassword"
          value={form.oldPassword}
          onChange={handleChange}/>
          <label htmlFor="newPassword">Nueva contraseña:</label>
        <input type="password"
          name="password"
          value={form.newPassword}
          onChange={handleChange}/>
          <label htmlFor="newPassword2">Rescriba nueva contraseña:</label>
        <input type="password"
          name="password2"
          value={form.newPassword2}
          onChange={handleChange}/>
          <button type="submit">Actualizar</button>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </form>
    </div>
  )
}

export default ChangePassword