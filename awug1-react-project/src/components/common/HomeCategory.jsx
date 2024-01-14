// HomeCategory.jsx
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Card from '../atomic/Card';
import JsonFile from '../../assets/information.json';
import '../../assets/styles/HomeCategory.css';

const HomeCategory = ({ categoryIndex }) => {
  const [resultArray, setResultArray] = useState([]);

  const fetchData = useCallback(async () => {
    try {
      const apiUrl = JsonFile.endpoints?.[categoryIndex]?.url;
      const response = await fetch(apiUrl);
      const data = await response.json();
      setResultArray(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }, [categoryIndex]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const placeHolder = useMemo(
    () => require(`../../assets/placeholders/${JsonFile.endpoints?.[categoryIndex]?.placeholder}`),
    [categoryIndex]
  );
  
  const categoryTitle = useMemo(
    () => `${JsonFile.endpoints?.[categoryIndex]?.title}`,
    [categoryIndex]
  );

  return (
    <div className="wrapperCategory">
        <h2 className="categoryTitle">{categoryTitle}</h2>
        <div className="cardWrapper">
            {resultArray.length > 0 &&
            resultArray.map((item) => (
            <Card
                key={item.id}
                title={item.title || item.name}
                originalTitle={item.original_title}
                image={item.image || placeHolder}
                id={item.id}
                categoryIndex={categoryIndex}
            />
            ))}
        </div>
    </div>
  );
};

export default HomeCategory;