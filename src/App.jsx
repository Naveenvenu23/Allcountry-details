import { BrowserRouter, Routes, Route } from "react-router-dom";
import CountryList from "./pages/CountryList";
import CountryDetails from "./pages/CountryDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CountryList />} />
        <Route path="/country/:code" element={<CountryDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
