
import { useState, useEffect } from 'react';


import Movie from './components/Movie';

export default function App() {


  const [movies, setMovies] = useState([]);

  
  useEffect(() => {
    
    (async () => {
      setMovies(await (await (fetch('/api/movies'))).json());
    })();
  }, []);
  
  return <div className="App">
    {movies.map(({ id, title, description}) => <Movie
      key={id}
      title={title}
      description={description}
    />)}
  </div>;

}