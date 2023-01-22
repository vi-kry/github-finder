import { BrowserRouter as Router, Route } from "react-router-dom";
// @ts-ignore
import Navbar from "./components/layout/Navbar";

function App(): JSX.Element {
  return (
    <Router>
      <div className="flex flex-col justify-between h-screen">
        <Navbar />
        <main>Content</main>
      </div>
    </Router>
  );
}

export default App;
