import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./app/router/AppRouter";
import { PrimeReactProvider } from "primereact/api";
import 'primereact/resources/themes/lara-light-indigo/theme.css'; //theme
import 'primereact/resources/primereact.min.css'; //core css
import 'primeicons/primeicons.css'; //icons

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <PrimeReactProvider>
      <AppRouter />
    </PrimeReactProvider>
  </BrowserRouter>
);
