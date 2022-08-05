import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./Pages/Homepage";
import CoinPage from "./Pages/CoinPage";
import Error from "./Pages/Error";


function App() {

  return (
    <BrowserRouter>
      <div>

        <Routes>
          <Route path='/' element={<Homepage />} exact />
          <Route path='/coins/:id' element={<CoinPage />} exact />
          <Route path='*' element={<Error />} exact />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
