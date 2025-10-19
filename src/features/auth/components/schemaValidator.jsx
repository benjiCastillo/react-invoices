import * as yup from "yup";

const schemaValidator = () => {
  return yup.object({
    company_nit_document: yup
      .string()
      .required("El NIT es requerido")
      .min(10, "El NIT debe tener al menos 12 caracteres")
      .max(20, "El NIT debe tener menos de 20 caracteres"),
    username: yup
      .string()
      .required("El nombre de usuario es requerido")
      .max(30, "El nombre de usuario debe tener menos de 20 caracteres"),
    password: yup
      .string()
      .required("La contraseña es requerida")
      .min(6, "La contraseña debe tener al menos 6 caracteres")
      .max(20, "La contraseña debe tener menos de 20 caracteres"),
  });
};

export default schemaValidator;
