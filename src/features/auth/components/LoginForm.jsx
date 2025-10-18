
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import schemaValidator from "./schemaValidator";
import InputTextCustom from "../../../app/shared/form-control/InputTextCustom";
import { Button } from "primereact/button";
import { AuthServices } from "../services/auth.services";

export default function LoginForm() {
  const schema = schemaValidator();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const response = await AuthServices.login(data);
      console.log("Datos del formulario:", response);
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
          <InputTextCustom
            id="username"
            label="Nombre de usuario"
            placeholder="Ingrese su nombre"
            size="small"
            required
            error={errors.username?.message}
            {...register("username")}
          />
        </div>

        <div className="col-span-12">
          <InputTextCustom
            id="password"
            label="Contraseña"
            placeholder="Ingrese su contraseña"
            size="small"
            error={errors.password?.message}
            {...register("password")}
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
