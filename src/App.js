import "./App.css";
import routes, { RenderRoutes } from "./routes";
import { AuthProvider } from "./context/JWTAuthContext";
import { DialogProvider } from "./context/dialogStore";
import ErrorLayout from "./components/errorLayout/ErrorLayout";

function App() {
  return (
    <div className="app global-centring">
      <DialogProvider>
        <AuthProvider>
          <ErrorLayout>
            <RenderRoutes routes={routes} />
          </ErrorLayout>
        </AuthProvider>
      </DialogProvider>
    </div>
  );
}

export default App;
