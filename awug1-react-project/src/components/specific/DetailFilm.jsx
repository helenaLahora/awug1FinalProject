// components/specific/DetailFilm.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const DetailFilm = ({ fetchFilms }) => {
  const { id } = useParams();
  const [film, setFilm] = useState(null);

  useEffect(() => {
    // Fetch films first to ensure that the film data is available
    fetchFilms();

    // Fetch data for the specific Film when the component mounts or when the ID changes
    const fetchData = async () => {
      try {
        const response = await fetch(`https://ghibliapi.vercel.app/films/${id}`);
        const data = await response.json();
        setFilm(data.data); // Use data.data to access the array of Films
      } catch (error) {
        console.error('Error fetching Film details:', error);
      }
    };

    fetchData();
  }, [id, fetchFilms]);

  return (
    <div>
      <h2>Film Detail</h2>
      <div>
        {film && (
          <>
            <img src={film.image} alt={film.title} style={{ maxWidth: '100%' }} />
            <p>{film.name}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default DetailFilm;
