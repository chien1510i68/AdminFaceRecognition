import logo from "./logo.svg";
import "./App.css";
import { RouterProvider } from "react-router-dom";
import { routerPage } from "./routes/routes";

function App() {
  return (
    <div className="App">
      <RouterProvider router={routerPage} />
    </div>
  );
}

export default App;
