import { useEffect, useState } from "react"
import { movies$ } from "../../api/movies"
import './movie.css'
import { Progress, Button, Switch, Radio } from 'antd';
import { LikeOutlined, DislikeOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from "react-redux";
import { getMovies } from "../../redux/actions/movies";

// options of all cases
const options = [
    { label: 'Like', value: 'like' },
    // { label: '/', value: 'Nothing' },
    { label: 'Dislike', value: 'Dislike' },
];
const Movie = ({ movie, handleDelete }) => {
    const newmovies = useSelector(state => state.movies.movies);
    const dispatch = useDispatch();
    const [valueLikeDislike, setValueLikeDislike] = useState('Nothing')
    const [localMovie, setLocalMovie] = useState(movie)

    // Method 1 :

    // const handlelikeandDislike = (e) => {
    //     const _valuelike = e.target.value
    //     setValueLikeDislike(_valuelike)
    //     if (_valuelike == 'like') {

    //         let dislikes = localMovie.dislikes
    //         if (localMovie.disliked){
    //             dislikes -= 1
    //         }

    //         setLocalMovie({...localMovie, likes:localMovie.likes + 1, dislikes: dislikes, liked : true, disliked : false})

    //     } else if (_valuelike == 'Dislike') {

    //         let likes = localMovie.likes
    //         if (localMovie.liked){
    //             likes -= 1
    //         }

    //         setLocalMovie({...localMovie,likes:likes, dislikes:localMovie.dislikes + 1, disliked : true, liked : false})

    //     } else {

    //         let likes = localMovie.likes
    //         if (localMovie.liked){
    //             likes -= 1
    //         }
    //         let dislikes = localMovie.dislikes
    //         if (localMovie.disliked){
    //             dislikes -= 1
    //         }

    //         setLocalMovie({...localMovie, likes:likes, dislikes:dislikes, disliked : false, liked : false})

    //     }
    //     // newmovies[0].category = '0'
    //     // dispatch(getMovies())
    //     console.log(newmovies[movie.id - 1].likes = 5);
    //     console.log(newmovies[1].liked = true);
    //     console.log(newmovies[1]);
    // }


    // handle like & dislike with method 2 : redux
    const handlelikeandDislike = (e) => {
        const _valuelike = e.target.value
        setValueLikeDislike(_valuelike)
        if (_valuelike == 'like') {

            let dislikes = movie.dislikes
            if (movie.disliked) {
                dislikes -= 1
            }
            newmovies[movie.id - 1].likes += 1
            newmovies[movie.id - 1].dislikes = dislikes
            newmovies[movie.id - 1].liked = true
            newmovies[movie.id - 1].disliked = false

        } else if (_valuelike == 'Dislike') {

            let likes = movie.likes
            if (movie.liked) {
                likes -= 1
            }

            newmovies[movie.id - 1].likes = likes
            newmovies[movie.id - 1].dislikes += 1
            newmovies[movie.id - 1].liked = false
            newmovies[movie.id - 1].disliked = true

        } else {

            let likes = movie.likes
            if (movie.liked) {
                likes -= 1
            }
            let dislikes = movie.dislikes
            if (movie.disliked) {
                dislikes -= 1
            }

            newmovies[movie.id - 1].likes = likes
            newmovies[movie.id - 1].dislikes = dislikes
            newmovies[movie.id - 1].liked = false
            newmovies[movie.id - 1].disliked = false

        }
        dispatch(getMovies(newmovies))
    }



    return (

        <div className='movie' >
            <div>

                <h3> {movie?.title} </h3>
                <h5> {movie?.category} </h5>
                <h5> {movie?.liked} </h5>
                <h3> <LikeOutlined /> {movie?.likes} <DislikeOutlined /> {movie?.dislikes} </h3>
                {/* <Switch defaultChecked={movie?.likedalready} onClick={()=>handleLikeDislike(movie?.id)} /> */}
                <Radio.Group
                    options={options}
                    onChange={(e) => handlelikeandDislike(e)}
                    value={valueLikeDislike}
                    optionType="button"
                    buttonStyle="solid"
                    defaultValue='Nothing'
                />
                <Progress strokeLinecap="square" percent={movie?.likes / (movie?.likes + movie?.dislikes) * 100} showInfo={false} status='normal' />
            </div>
            <div  >
                <Button className='movie__delete__button' danger onClick={() => handleDelete(movie?.id)} >Delete</Button>
            </div>

        </div>
    )
}

export default Movie
