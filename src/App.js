import "./App.css";
import { Header } from "./components/Header";
import { SensorData } from "./components/SensorData";

function App() {
  return (
    <div className="App">
      <Header />
      <div className="sensor-grid">
        <SensorData />
        <SensorData />
        <SensorData />
        <SensorData />
      </div>
    </div>
  );
}

export default App;
