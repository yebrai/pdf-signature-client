import { useState } from "react";

export const useForm = () => {
  const [form, setForm] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);
  
    const handleChange = (event) => {
      const { name, value } = event.target;
      setForm({ ...form, [name]: value });
    };

    const showErrorMessage = () => errorMessage;

    const placeholderWarningIfEmpty = (inputValue, correctString) => {
      return (errorMessage === "Por favor, rellene todos los campos" && !inputValue) ? errorMessage : correctString
    }

    const inputWarningStyleIfEmpty = ( inputValue) => {
      return (errorMessage === "Por favor, rellene todos los campos" && !inputValue) ?  "inputFormRedBorder" : "inputForm" 
    }

    return {
      form,
      handleChange,
      errorMessage,
      setErrorMessage,
      placeholderWarningIfEmpty,
      showErrorMessage,
      inputWarningStyleIfEmpty
    }

}
