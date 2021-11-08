import logo from './logo.svg';
import './App.css';
import Movie from './components/movie/Movie';
import { useState } from 'react';
import { movies$ } from './api/movies';
import { Progress, Spin } from 'antd';

function App() {
  // {Promise.all([movies]).then(data=>{console.log(data)})}

  const [movies, setMovies] = useState({})
  const [isloading, setIsloading] = useState(true)
  useState(() => {
    // setIsloading(true)
    movies$.then(movie => {
      setMovies(movie)
    });
    // setIsloading(false)
  }, [])

  // movies$.then(movie => {
  //   setMovies(movie)
  // });

  const handleDelete = (id) =>{
    setMovies(movies.filter(movie => movie.id != id))
    console.log('number is deleted',id)
  }

  const handleLikeDislike = (id) =>{
    setMovies(movies.map(movie => movie.id == id ? {...movie,likes:movie.likes+1} : {movie}))
    // setMovies(movies.map(movie=>{
    //   if(movie?.id == id){
    //     if(movie?.likedalready==false){
    //       return{...movie,likes:movie.likes+1, likedalready:false}
    //     }else{
    //       return{...movie,likes:movie.likes-1,likedalready:true }
    //     }
    //   }
    // }))
    console.log('number is liked/disliked',id)
  }



  return (
    <div className="App">
      {!movies.length==0 ? <div className='movies' >
        {movies.map((movie,index) => (
          <Movie key={index} movie={movie} handleDelete={handleDelete} handleLikeDislike={handleLikeDislike} />
        ))}
      </div> : <div><Spin size="large" /></div>}
    </div>
  );
}

export default App;
