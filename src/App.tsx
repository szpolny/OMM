import { useEffect, useState } from "react";
import { LoaderCircle } from "lucide-react";
import WelcomePage from "./views/WelcomePage/WelcomePage";
import "./App.css";
import Dashboard from "./views/Dashboard/Dashboard";
import { getDataStore } from "./utils/store";
import useInitializedStore from "./stores/useInitializedStore";


// Loading component
const LoadingSpinner = () => (
  <div className="w-full h-full flex justify-center items-center">
    <div className="animate-spin">
      <LoaderCircle />
    </div>
  </div>
);

const isInitialized = async (): Promise<boolean> => {
  const dataStore = await getDataStore();
  return (await dataStore.get<boolean>("initialized")) || false;
};

function App() {
  const { loading, initialized, setLoading, setInitialized } = useInitializedStore();

  useEffect(() => {
    const checkInitialization = async () => {
      try {
        const initialized = await isInitialized();
        setLoading(false);
        setInitialized(initialized);
      } catch (error) {
        console.error("Failed to check initialization status:", error);
        setLoading(false);
        setInitialized(false);
      }
    };

    checkInitialization();
  }, []);

  const renderContent = () => {
    if (loading) {
      return <LoadingSpinner />;
    }

    if (!initialized) {
      return <WelcomePage />;
    }

    // Here will be mod manager dashboard
    return <Dashboard />;
  };

  return (
    <div className="bg-gradient-to-b from-slate-900 to-slate-800 min-h-screen w-screen">
      {renderContent()}
    </div>
  );
}

export default App;