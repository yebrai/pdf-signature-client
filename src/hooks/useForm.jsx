import { useState } from "react";

export const useForm = () => {
  const [form, setForm] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);
  
    const handleChange = (event) => {
      const { name, value } = event.target;
      setForm({ ...form, [name]: value });
    };

    return {
      form,
      handleChange,
      errorMessage,
      setErrorMessage

    }

}
