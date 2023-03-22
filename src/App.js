import "./styles.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Home from "./views/Home";
import Favoritos from "./views/Favoritos";
import MyContext from "./my_context";


export default function App() {
  const endpoint = "/fotos.json";
  const [data, setData] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const globalData = { data, setData, favorites, setFavorites };
  
  useEffect(() => {
    dataconsult();
  }, [])
  const dataconsult = async () => {
    const response = await (await fetch(endpoint)).json()
    const data = response.photos
    const photos = data.map((photo) => ({
      id: photo.id,
      image: photo.src.tiny,
      liked: photo.liked,
    }))
    setData(photos)
    return
  }

  return (
    <div className="App">
      <MyContext.Provider value={globalData}>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/favoritos" element={<Favoritos />} />
          </Routes>
        </BrowserRouter>
      </MyContext.Provider>
    </div>
  );
}
