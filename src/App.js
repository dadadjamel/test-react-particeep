import logo from './logo.svg';
import './App.css';
import Movie from './components/movie/Movie';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getMovies } from './redux/actions/movies';
import { movies$ } from './api/movies';
import { Button, Progress, Spin, Select } from 'antd';




const { Option } = Select;
function App() {
  const dispatch = useDispatch();
  const newmovies = useSelector(state => state.movies.movies);  // movies from redux stae
  const [movies, setMovies] = useState([]) // state of movies from movies.js
  const [numberOfItemInPage, setNumberOfItemInPage] = useState(12) // to switch between 12 8 4
  const [currentPage, setCurrentPage] = useState(1) // keep track of the current page
  const [categoryTable, setCategoryTable] = useState([]) // get all categories from the movies
  const [selctedcategoryTable, setselctedCategoryTable] = useState([]) // keep track of the selected categories

  // method 1 : get all movies from movies.js
  const getAllMovies = () => {
    movies$.then(movieList => {
      setMovies(movieList)
    });
  }

  useEffect(() => {
    // method 1
    getAllMovies()

    // method 2 : using redux
    movies$.then(movieList => {
      dispatch(getMovies(movieList));
    });
  }, [])




  const getCategoryFilter = () => {
    // get all categories of all movies
    if (movies?.length != 0) {
      let list = []
      movies?.map(movie => {
        if (!list.includes(movie.category)) {
          list.push(movie.category);
        }
      })
      setCategoryTable(list)
    }
  }


  useEffect(() => {
    // get the categories each time something is changed in movies list
    getCategoryFilter()
  }, [newmovies])

  // delete one item by id
  const handleDelete = (id) => {
    // method 1
    setMovies(movies.filter(movie => movie.id != id))
    

    // method 2 : using redux
    dispatch(getMovies(newmovies.filter(movie => movie.id != id)))
  }

  // keep track of changes in Select input
  const handlechangeCategories = (v) => {
    setselctedCategoryTable(v)
  }




  return (
    <div className="App">
      <Select
        mode="multiple"
        allowClear
        style={{ width: '100%' }}
        placeholder="Please select"
        onChange={(v) => handlechangeCategories(v)}
      >

        {categoryTable.length != 0 ? categoryTable?.map((cat, index) => (
          <Option key={index} value={cat}>{cat}</Option>
        )) : <div></div>}
      </Select>


      {!newmovies.length == 0 ? <div className='movies' >
        {/* slice is used to just show movies based on page number and numbers of movies per page */}
        {newmovies.slice(currentPage * numberOfItemInPage - numberOfItemInPage, currentPage * numberOfItemInPage).map((movie, index) => {
          if (selctedcategoryTable.length == 0) {
            return (<Movie key={index} movie={movie} handleDelete={handleDelete} />)
          } else {
            if (selctedcategoryTable.includes(movie.category)) {
              return (<Movie key={index} movie={movie} handleDelete={handleDelete} />)
            }
          }
        })}
      </div> : <div><Spin size="large" /></div>}


      <div className='app__button__pages' >
        <Button onClick={() => { setNumberOfItemInPage(4) }} >4</Button>
        <Button onClick={() => setNumberOfItemInPage(8)} >8</Button>
        <Button onClick={() => setNumberOfItemInPage(12)} >12</Button>
      </div>


      <div className='app__button__pages__number' >
        <Button onClick={() => setCurrentPage(currentPage => currentPage - 1)} disabled={currentPage == 1} >Back</Button>
        <Button onClick={() => setCurrentPage(currentPage => currentPage + 1)} disabled={currentPage == Math.ceil(movies.length / numberOfItemInPage)}>Next</Button>
      </div>


    </div>
  );
}

export default App;
