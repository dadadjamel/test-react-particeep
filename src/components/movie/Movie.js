import { useEffect, useState } from "react"
import { movies$ } from "../../api/movies"
import './movie.css'
// import LinearProgress from '@mui/material/LinearProgress';
import { Progress, Button, Switch, Radio } from 'antd';

const options = [
    { label: 'Like', value: 'like' },
    { label: '/', value: 'Nothing' },
    { label: 'Dislike', value: 'Dislike' },
];
const Movie = ({ movie, handleDelete }) => {

    const [valueLikeDislike, setValueLikeDislike] = useState('Nothing')
    const [localMovie, setLocalMovie] = useState(movie)

    useEffect(() => {
        
    }, [localMovie])

    const handlelikeandDislike = (e) => {
        const _valuelike = e.target.value
        setValueLikeDislike(_valuelike)
        if (_valuelike == 'like') {
            let dislikes = localMovie.dislikes
            if (localMovie.disliked){
                dislikes -= 1
            }

            // console.log(localMovie.likes,'dadada');
            setLocalMovie({...localMovie, likes:localMovie.likes + 1, dislikes: dislikes, liked : true, disliked : false})
        } else if (_valuelike == 'Dislike') {
            let likes = localMovie.likes
            if (localMovie.liked){
                likes -= 1
            }
            setLocalMovie({...localMovie,likes:likes, dislikes:localMovie.dislikes + 1, disliked : true, liked : false})
        } else {
            let likes = localMovie.likes
            if (localMovie.liked){
                likes -= 1
            }
            let dislikes = localMovie.dislikes
            if (localMovie.disliked){
                dislikes -= 1
            }
            setLocalMovie({...localMovie, likes:likes, dislikes:dislikes, disliked : false, liked : false})
        }
    }

    // const handleLikeDislike = (id) => {
    //     setMovies(movies.map(movie => movie.id == id ? {...movie,likes:movie.likes+1} : movie))
    //     setMovies(movies.map(movie => {
    //         if (movie?.id == id) {
    //             if (movie?.likedalready == false) {
    //                 return { ...movie, likes: movie.likes - 1, likedalready: true }
    //             } else {
    //                 return { ...movie, likes: movie.likes + 1, likedalready: false }
    //             }
    //         } else return movie
    //     }))
    //     console.log('number is liked/disliked', id)
    // }



    return (

        <div className='movie' >
            <h3> {localMovie?.title} </h3>
            <h5> {localMovie?.category} </h5>
            <h5> {localMovie?.liked} </h5>
            <p> 👍 {localMovie?.likes} 👎 {localMovie?.dislikes} </p>
            {/* <Switch defaultChecked={movie?.likedalready} onClick={()=>handleLikeDislike(movie?.id)} /> */}
            <Radio.Group
                options={options}
                onChange={(e) => handlelikeandDislike(e)}
                value={valueLikeDislike}
                optionType="button"
                buttonStyle="solid"
                defaultValue='Nothing'
            />
            <Progress strokeLinecap="square" percent={localMovie?.likes / (localMovie?.likes + localMovie?.dislikes) * 100} showInfo={false} status='normal' />
            <div className='movie__delete__button' >
                <Button danger onClick={() => handleDelete(localMovie?.id)} >Delete</Button>
            </div>

        </div>
    )
}

export default Movie
