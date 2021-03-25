import "./App.css";
import { Header } from "./components/Header";
import { SensorData } from "./components/SensorData";
import { DataInfo } from "./components/DataInfo";

function App() {
  return (
    <div className="App">
      <Header />
      <DataInfo />
      <SensorData />
    </div>
  );
}

export default App;
