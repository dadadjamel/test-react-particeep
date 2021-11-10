import logo from './logo.svg';
import './App.css';
import Movie from './components/movie/Movie';
import { useState } from 'react';
import { movies$ } from './api/movies';
import { Button, Progress, Spin, Select } from 'antd';
// import useState from 'react-usestateref'




const { Option } = Select;
function App() {
  // {Promise.all([movies]).then(data=>{console.log(data)})}

  let [movies, setMovies] = useState({})
  const [isloading, setIsloading] = useState(true)
  const [numberOfItemInPage, setNumberOfItemInPage] = useState(12)
  const [pages] = useState(Math.round(movies.length / numberOfItemInPage));
  const [currentPage, setCurrentPage] = useState(1)
  const [categoryTable, setCategoryTable] = useState([{ value: 'ff', label: 'ffss' }, { value: 'ffaa', label: 'ffssaa' }])


  const getAllMovies = () => {
    movies$.then(movie => {
      setMovies(movie)
    });
  }

  useState(() => {
    // setIsloading(true)
    getAllMovies()

    console.log(movies, '😎😎😎');
    // setIsloading(false)
  }, [])


  // setCategoryTable(movie => categoryTable.includes(movie.category) ? [...categoryTable, movie.category] : { ...categoryTable })

  const getCategoryFilter = () => {

    if (movies.length != 0) {
      // setCategoryTable([{value:'Thriller',label:'Thriller'},{value:'Comedy',label:'Comedy'}])      
      setCategoryTable([])
    }
    console.log(movies, '😍😍😍')
  }

  useState(() => {
    getCategoryFilter()
  }, [movies])



  // movies$.then(movie => {
  //   setMovies(movie)
  // });

  const handleDelete = (id) => {
    setMovies(movies.filter(movie => movie.id != id))
    console.log('number is deleted', id)
  }

 


  return (
    <div className="App">
      {/* {console.log((movies), '🍿🍿🍿🍿')} */}
      {/* {getCategoryFilter()} */}
      <Select
        mode="multiple"
        allowClear
        style={{ width: '100%' }}
        placeholder="Please select"
      >

        {categoryTable.length != 0 ? categoryTable?.map((cat, index) => (
          <Option key={index} value={cat}>{cat}</Option>
        )) : console.log('❌❌❌')}
        {/* <Option value="{cat}">"cat"</Option> */}

      </Select>


      {!movies.length == 0 ? <div className='movies' >
        {movies.slice(currentPage * numberOfItemInPage - numberOfItemInPage, currentPage * numberOfItemInPage).map((movie, index) => {
          if (categoryTable.length == 0) {
            return (<Movie key={index} movie={movie} handleDelete={handleDelete}  />)
          } else {
            if (categoryTable.includes(movie.category)) {
              return (<Movie key={index} movie={movie} handleDelete={handleDelete} />)
            }
          }
        })}
      </div> : <div><Spin size="large" /></div>}


      <div>
        <Button onClick={() => { setNumberOfItemInPage(4) }} >4</Button>
        <Button onClick={() => setNumberOfItemInPage(8)} >8</Button>
        <Button onClick={() => setNumberOfItemInPage(12)} >12</Button>
      </div>


      <div>
        <Button onClick={() => setCurrentPage(currentPage => currentPage - 1)} disabled={currentPage == 1} >Back</Button>
        <Button onClick={() => setCurrentPage(currentPage => currentPage + 1)} disabled={currentPage == Math.ceil(movies.length / numberOfItemInPage)}>Next</Button>
      </div>


    </div>
  );
}

export default App;
