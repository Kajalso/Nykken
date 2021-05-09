import "./App.scss";
import { Header } from "./components/Header/Header";
import { Dashboard } from "./components/Dashboard/Dashboard";
import GroupsContextProvider from "./context/GroupsContext";
import CustomChartContextProvider from "./context/CustomChartsContext";
import CustomChartsContextProvider from "./context/CustomChartsContext";

function App() {
  return (
    <div className="App">
      <GroupsContextProvider>
        <CustomChartsContextProvider>
          <Header />
          <Dashboard />
        </CustomChartsContextProvider>
      </GroupsContextProvider>
    </div>
  );
}

export default App;
