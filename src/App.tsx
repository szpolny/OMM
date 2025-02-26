import { useEffect, useState } from "react";
import { Store } from "@tauri-apps/plugin-store";
import { LoaderCircle } from "lucide-react";
import WelcomePage from "./routes/WelcomePage/WelcomePage";
import "./App.css";

// Types
interface AppState {
  loading: boolean;
  initialized: boolean | null;
}

interface InitializedData {
  value: boolean;
}

// Loading component
const LoadingSpinner = () => (
  <div className="w-full h-full flex justify-center items-center">
    <div className="animate-spin">
      <LoaderCircle />
    </div>
  </div>
);

// Data store utilities
const getDataStore = async (): Promise<Store> => {
  return await Store.load("data.json");
};

const isInitialized = async (): Promise<InitializedData> => {
  const dataStore = await getDataStore();
  return (await dataStore.get<InitializedData>("initialized")) || { value: false };
};

function App() {
  const [state, setState] = useState<AppState>({
    loading: true,
    initialized: null,
  });

  useEffect(() => {
    const checkInitialization = async () => {
      try {
        const initialized = await isInitialized();
        setState({
          loading: false,
          initialized: initialized.value,
        });
      } catch (error) {
        console.error("Failed to check initialization status:", error);
        setState({
          loading: false,
          initialized: false,
        });
      }
    };

    checkInitialization();
  }, []);

  const renderContent = () => {
    if (state.loading) {
      return <LoadingSpinner />;
    }

    if (!state.initialized) {
      return <WelcomePage />;
    }

    // Here will be mod manager dashboard
    return <div>Dashboard</div>;
  };

  return (
    <div className="bg-gradient-to-b from-slate-900 to-slate-800 min-h-screen w-screen">
      {renderContent()}
    </div>
  );
}

export default App;