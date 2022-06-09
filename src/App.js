import { Routes, Route } from "react-router-dom";
import "./App.css";
import MainPage from "./components/MainPage/MainPage";
import ImportFile from "./components/ImportFile/ImportFile";
import SearchPage from "./components/SearchPage/SearchPage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<MainPage />}>
          <Route path="/" element={<ImportFile />} />
          <Route path="/search-student" element={<SearchPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
