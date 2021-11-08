import { useState } from "react"
import { movies$ } from "../../api/movies"
import './movie.css'
// import LinearProgress from '@mui/material/LinearProgress';
import { Progress, Button, Switch } from 'antd';


const Movie = ({ movie, handleDelete, handleLikeDislike }) => {

    return (
        
        <div className='movie' >
            <h3> {movie?.title} </h3>
            <h5> {movie?.category} </h5>
            <h5> {movie?.likedalready} </h5>
            <p> 👍 {movie?.likes} 👎 {movie?.dislikes} </p>
            <Switch defaultChecked={false} onClick={()=>handleLikeDislike(movie?.id)} />
            <Progress strokeLinecap="square" percent={movie?.likes / (movie?.likes + movie?.dislikes) * 100} showInfo={false} status='normal' />
            <div className='movie__delete__button' >
                <Button danger onClick={()=>handleDelete(movie?.id)} >Delete</Button>
            </div>

        </div>
    )
}

export default Movie
