import * as yup from "yup";

const schemaValidator = () => {
  return yup.object({
    username: yup.string().required("El nombre de usuario es requerido"),
    password: yup
      .string()
      .required("La contraseña es requerida")
      .min(6, "La contraseña debe tener al menos 6 caracteres"),
  });
};

export default schemaValidator;
