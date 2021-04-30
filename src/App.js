import "./App.scss";
import { Header } from "./components/Header/Header";
import { Dashboard } from "./components/Dashboard/Dashboard";
import GroupsContextProvider from "./context/GroupsContext";

function App() {
  console.log("width: " + document.body.clientWidth);
  console.log("height " + document.body.clientHeight);

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
