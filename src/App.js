import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./Pages/Homepage";
import CoinPage from "./Pages/CoinPage";

function App() {

  return (
    <BrowserRouter>
      <div>

        <Routes>
          <Route path='/' element={<Homepage />} exact />
          <Route path='/coins' element={<CoinPage />} exact />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
