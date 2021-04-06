import "./App.css";
import { Header } from "./components/Header";
import { SensorData } from "./components/SensorData";

function App() {
  return (
    <div className="App">
      <Header />
      <SensorData />
      <SensorData />
    </div>
  );
}

export default App;
