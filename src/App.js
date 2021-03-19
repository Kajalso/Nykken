import "./App.css";
import { Header } from "./components/Header";
import DataFetching from "./api/DataFetching";

function App() {
  return (
    <div className="App">
      <Header />
      <DataFetching />
    </div>
  );
}

export default App;
