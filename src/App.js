import "./App.css";
import { Header } from "./components/Header";
import { SensorChart } from "./components/SensorChart/SensorChart";

function App() {
  return (
    <div className="App">
      <Header />
      <div className="sensor-grid">
        <SensorChart />
      </div>
    </div>
  );
}

export default App;
