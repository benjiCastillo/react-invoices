import { Card } from "primereact/card";
import LoginForm from "../components/LoginForm";

export default function Login() {
  const header = (
    <div className="flex justify-center p-4">
      <h1 className="text-xl font-bold">Ingresar</h1>
    </div>
  );

  return (
    <Card className="w-1/4" header={header}>
      <LoginForm />
    </Card>
  );
}
