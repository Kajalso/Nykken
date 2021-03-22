import "./App.css";
import { Header } from "./components/Header";
import DataInfoFetching from "./api/DataInfoFetching";
import DataFetching from "./api/DataFetching";

function App() {
  return (
    <div className="App">
      <Header />
      <DataInfoFetching />
      <DataFetching />
    </div>
  );
}

export default App;
