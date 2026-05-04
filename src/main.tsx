import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import ErrorBoundary from "./components/error/ErrorBoundary.tsx";
import { HelmetProvider } from "react-helmet-async";
import { AuthProvider, LoaderProvider } from "./Context/Context.tsx";
import "bootstrap/dist/css/bootstrap.min.css";

createRoot(document.getElementById("root")!).render(
  // <StrictMode>
  <AuthProvider>
    <LoaderProvider>
      <BrowserRouter>
        <ErrorBoundary fallback={<h1>Something went wrong.</h1>}>
          <HelmetProvider>
            <App />
          </HelmetProvider>
        </ErrorBoundary>
      </BrowserRouter>
    </LoaderProvider>
  </AuthProvider>
  // </StrictMode>
);
