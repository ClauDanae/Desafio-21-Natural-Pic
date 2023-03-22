import "../assets/css/galeria.css";
import Heart from "./Heart";
import { useContext } from "react";
import MyContext from "../my_context";

export default function Galeria() {
  const { data, favorites, setFavorites } = useContext(MyContext)
  const changeLiked = (id) =>{
    const i=data.findIndex((photo) => photo.id === id)
    data[i].liked = !data[i].liked
  }
  const changeFavorites = (id,photo) =>{
    console.log(!photo.liked)
    if(!photo.liked){
      setFavorites([...favorites, photo])
      console.log(favorites)
    }
    else{
      const i = favorites.findIndex((photo) => photo.id === id)
      console.log(i)
      setFavorites([...favorites.slice(0,i),...favorites.slice(i+1,favorites.length)])
      console.log(favorites)
    }
  }
  return (
    <div className="galeria grid-columns-5 p-3">
        {data.map((photo) => (
           <div key={photo.id} className="photo" style={{backgroundImage: `url(${photo.image})`}}>
            <button onClick={() => {
                  changeFavorites(photo.id,photo)
                  changeLiked(photo.id)
            }}>
            <Heart filled = {photo.liked}/>
            </button>
            </div>
        ))}
    </div>
  );
}