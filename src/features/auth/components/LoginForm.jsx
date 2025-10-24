import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import { Message } from 'primereact/message';

import InputTextRHF from "../../../app/shared/rhf/InputTextRHF";
import schemaValidator from "./schemaValidator";

import { AuthServices } from "../services/auth.services";
import { useAuthStore } from "../../../app/store/UseAuthStore";

export default function LoginForm() {
  const { setUser } = useAuthStore();
  const navigate = useNavigate();

  const schema = schemaValidator();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      company_nit_document: "1060829017",
      username: "BP0000000",
      password: "BP0000000",
    },
  });

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = async (data) => {
    try {
      setErrorMessage("");
      setLoading(true);
      const response = await AuthServices.login(data);
      setUser(response.data.user, response.data.access_token);
      navigate("/users");
    } catch (error) {
      console.error("Error al iniciar sesión:", error.response.data.error);
      setErrorMessage(error.response.data.error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-12 gap-4 mb-4">
        <div className="col-span-12">
          <InputTextRHF
            control={control}
            name="company_nit_document"
            label="NIT"
            placeholder="Ingrese el NIT de la empresa"
            error={errors.company_nit_document?.message}
          />
        </div>

        <div className="col-span-12">
          <InputTextRHF
            control={control}
            name="username"
            label="Nombre de usuario"
            placeholder="Ingrese su nombre"
            error={errors.username?.message}
          />
        </div>

        <div className="col-span-12">
          <InputTextRHF
            control={control}
            name="password"
            label="Contraseña"
            placeholder="Ingrese su contraseña"
            type="password"
            error={errors.password?.message}
          />
        </div>

        {errorMessage && (
          <div className="col-span-12">
            <Message
              className="w-full"
              severity="error"
              text={errorMessage}
            />
          </div>
        )}
      </div>

      <Button
        type="submit"
        label="Iniciar sesión"
        size="small"
        className="w-full block"
        disabled={loading}
        loading={loading}
      />
    </form>
  );
}
