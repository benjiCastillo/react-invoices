import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import schemaValidator from "./schemaValidator";
import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import InputTextRHF from "../../../app/shared/rhf/InputTextRHF";
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
      company_nit_document: "5653651017",
      username: "BCE7218547",
      password: "BCE7218547",
    },
  });

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const response = await AuthServices.login(data);
      setUser(response.data.user, response.data.access_token);
      navigate("/users");
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
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
