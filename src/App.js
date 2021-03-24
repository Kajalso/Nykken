import "./App.css";
import { Header } from "./components/Header";
import { DataInfoFetching } from "./api/DataInfoFetching";
import DataFetching from "./api/DataFetching";
import { RenderData } from "./components/RenderData";

function App() {
  return (
    <div className="App">
      <Header />
      <DataInfoFetching />
      <DataFetching />
      <RenderData />
    </div>
  );
}

export default App;
