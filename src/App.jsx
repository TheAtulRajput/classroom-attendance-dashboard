import { AppProvider } from "./context/AppContext";
import AppShell from "./layouts/AppShell";

function App() {
  return (
    <AppProvider>
      <AppShell />
    </AppProvider>
  );
}

export default App;