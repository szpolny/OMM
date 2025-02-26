import "./App.css";
import { Store } from '@tauri-apps/plugin-store'
import WelcomePage from "./routes/WelcomePage/WelcomePage";

const dataStore = await Store.load('data.json');

const initialized = await dataStore.get<{ value: number }>('initialized') ?? false;

console.log(initialized);

function App() {
  return (
    <div className="bg-gradient-to-b from-slate-900 to-slate-800 min-h-screen w-screen">
      {!initialized ? <WelcomePage /> : null}
    </div>
  )
}

export default App;
