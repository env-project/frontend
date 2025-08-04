import { Routes, Route } from "react-router";
import Footer from "./components/Footer";
import "./index.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Footer />} />
    </Routes>
  );
}

export default App;
