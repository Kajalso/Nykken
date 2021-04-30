import "./App.scss";
import { Header } from "./components/Header/Header";
import { Dashboard } from "./components/Dashboard/Dashboard";
import GroupsContextProvider from "./context/GroupsContext";

function App() {

  return (
    <div className="App">
      <GroupsContextProvider>
      <Header />
      <Dashboard />
      </GroupsContextProvider>
    </div>
  );
}

export default App;
