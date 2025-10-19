import { Card } from "primereact/card";
import LoginForm from "../components/LoginForm";

export default function Login() {
  const header = (
    <div className="flex justify-center p-4">
      <h1 className="text-xl font-bold">Ingresar</h1>
    </div>
  );

  return (
    <Card className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4" header={header}>
      <LoginForm />
    </Card>
  );
}
