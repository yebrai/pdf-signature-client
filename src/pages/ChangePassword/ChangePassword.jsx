import { useForm } from "./../../hooks/useForm";
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import authService from "../../services/auth.service";
import { useNavigate } from "react-router-dom";
import "./ChangePassword.css";
import "../Form.css";


function ChangePassword() {
    const {form, handleChange, errorMessage, setErrorMessage, showErrorMessage, placeholderWarningIfEmpty, inputWarningStyleIfEmpty} = useForm()
  const { storeToken, authenticateUser } = useContext(AuthContext);

  const navigate = useNavigate();


    const handleChangePassword = async(e) => {
        e.preventDefault();
        try {
          const response = await authService.changePassword(form)
            //quitar el response si no lo usamos
            authenticateUser();
            navigate("/login");
        } catch (error) {
          setErrorMessage(error.response.data.message)
        }
      };
      console.log("className",inputWarningStyleIfEmpty(form.oldPassword))
      console.log("error", showErrorMessage())
  return (
    <div>
        <h1>Cambiar comtraseña</h1>
        <form onSubmit={handleChangePassword}>
        <label htmlFor="oldPassword">Antigua contraseña:</label>
        <input className={inputWarningStyleIfEmpty( form.oldPassword)}
         type="password"
          name="oldPassword"
          value={form.oldPassword}
          onChange={handleChange}
          placeholder={placeholderWarningIfEmpty(form.oldPassword, "Contraseña")}/>
          <label htmlFor="newPassword">Nueva contraseña:</label>
        <input className={inputWarningStyleIfEmpty(form.newPassword)}
        type="password"
          name="password"
          value={form.newPassword}
          onChange={handleChange}
          placeholder={placeholderWarningIfEmpty(form.newPassword, "Nueva contraseña")}/>
          <label htmlFor="newPassword2">Rescriba nueva contraseña:</label>
        <input className={inputWarningStyleIfEmpty(form.newPassword2)}
        type="password"
          name="password2"
          value={form.newPassword2}
          onChange={handleChange}
          placeholder={placeholderWarningIfEmpty(form.newPassword2, "Nueva contraseña")}/>
          <button type="submit">Actualizar</button>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </form>
    </div>
  )
}

export default ChangePassword