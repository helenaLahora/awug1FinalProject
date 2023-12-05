import './App.css';
import React, { useEffect, useState } from 'react';

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('https://ghibliapi.vercel.app/films')
      .then(response => response.json())
      .then(apiData => {
        const films = apiData.map(film => ({
          id: film.id,
          title: film.title,
          original_title: film.original_title,
          original_title_romanised: film.original_title_romanised,
          image: film.image,
          movie_banner: film.movie_banner,
          description: film.description,
          director: film.director,
          producer: film.producer,
          release_date: film.release_date,
          running_time: film.running_time,
          rt_score: film.rt_score,
        }));

        setData(films);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div>
      <h2>film List</h2>
      <ul>
        {data.map(film => (
          <li key={film.id}>
            <h3>{film.title}</h3>
            <img src={film.image} alt={film.title} />
            <p>{film.original_title}</p>
            <p>{film.original_title_romanised}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;