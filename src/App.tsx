import { Routes, Route } from "react-router";
import "@/index.css";
import Test from "./components/Test";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Test />} />
    </Routes>
  );
}

export default App;
