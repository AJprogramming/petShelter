import PetForm from "./components/petsForm";
import OnePet from "./components/oneDisplay";
import PetUpdateForm from "./components/updateForm";
import All from "./components/allDisplay";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <div className="ms-3 mt-4 pb-3">
        <h1>Pet Shelter</h1>
      </div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<All />} />
          <Route path="/home" element={<All />} />
          <Route path="/new" element={<PetForm />} />
          <Route path="/pets/:id" element={<OnePet />} />
          <Route path="/pets/:id/edit" element={<PetUpdateForm />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
