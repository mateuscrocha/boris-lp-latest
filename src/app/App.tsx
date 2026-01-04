import { BrowserRouter } from "react-router-dom";

import { AppRoutes } from "./routes";
import { AuthProvider } from "./providers/AuthProvider";

export function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}

