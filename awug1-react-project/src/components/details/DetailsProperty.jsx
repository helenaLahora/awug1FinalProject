// DetailsProperty.jsx
import React, { useState, useEffect } from 'react';
import { ReactComponent as AgeIcon } from '../../assets/icons/Age.svg'; 
import { ReactComponent as ClassificationIcon } from '../../assets/icons/Class.svg'; 
import { ReactComponent as ClimateIcon } from '../../assets/icons/Climate.svg';
import { ReactComponent as DateIcon } from '../../assets/icons/Date.svg';
import { ReactComponent as DirectorIcon } from '../../assets/icons/Director.svg'; 
import { ReactComponent as DurationIcon } from '../../assets/icons/Duration.svg'; 
import { ReactComponent as EyeColorIcon } from '../../assets/icons/EyeColor.svg';
import { ReactComponent as GenderIcon } from '../../assets/icons/Gender.svg';
import { ReactComponent as HairColorIcon } from '../../assets/icons/HairColor.svg'; 
import { ReactComponent as LengthIcon } from '../../assets/icons/Length.svg';
import { ReactComponent as ProducerIcon } from '../../assets/icons/Producer.svg';
import { ReactComponent as RtScoreIcon } from '../../assets/icons/RtScore.svg';
import { ReactComponent as SurfaceWaterIcon } from '../../assets/icons/SurfaceWater.svg';
import { ReactComponent as TerrainIcon } from '../../assets/icons/Terrain.svg';
import { ReactComponent as SpeciesIcon } from '../../assets/icons/Species.svg';
import { ReactComponent as PilotIcon } from '../../assets/icons/Pilot.svg';
import '../../assets/styles/Details.css';

/**
 * DetailsProperty Component
 * 
 * Main Goal/Task: Displays a property of an item with an associated icon.
 * 
 * Component Structure:
 * - Uses icons for different properties based on an iconMapping object.
 * - Fetches additional data for properties like "species" or "pilot" and displays the corresponding name.
 * - Handles different property types including single values and arrays.
 * 
 * @param {string} propertyName - The name of the property.
 * @param {string | Array} propertyData - The value or values of the property.
 */
const DetailsProperty = ({ propertyName, propertyData }) => {
  // Icon mapping for different properties
  const iconMapping = {
    age: AgeIcon,
    classification: ClassificationIcon,
    vehicle_class: ClassificationIcon, // Assuming the same icon for "vehicles_class"
    climate: ClimateIcon,
    release_date: DateIcon,
    director: DirectorIcon,
    running_time: DurationIcon,
    eye_color: EyeColorIcon,
    eye_colors: EyeColorIcon,
    gender: GenderIcon,
    hair_color: HairColorIcon,
    hair_colors: HairColorIcon,
    length: LengthIcon,
    producer: ProducerIcon,
    rt_score: RtScoreIcon,
    surface_water: SurfaceWaterIcon,
    terrain: TerrainIcon,
    species: SpeciesIcon,
    pilot: PilotIcon,
  };

  // Get the corresponding icon component based on the property name
  const IconComponent = iconMapping[propertyName.toLowerCase()];

  // State variable to store fetched data for properties like "species" or "pilot"
  const [fetchedData, setFetchedData] = useState(null);

  // useEffect to fetch additional data when the property is "species" or "pilot"
  useEffect(() => {
    if (propertyName.toLowerCase() === 'species' || propertyName.toLowerCase() === 'pilot') {
      // Assuming propertyData is a URL to fetch data
      fetch(propertyData)
        .then(response => response.json())
        .then(data => {
          setFetchedData(data);
        })
        .catch(error => console.error('Error fetching data:', error));
    }
  }, [propertyName, propertyData]);

  return (
    <div className="DetailProperty">
      {/* Display the icon if available */}
      {IconComponent && <IconComponent className="DetailsPropertiesIcon" />}
      
      {/* Display the property value or values */}
      {fetchedData ? (
        <p className="DetailsPropertyText">{fetchedData.name}</p>
      ) : Array.isArray(propertyData) ? (
        <ul>
          {propertyData.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      ) : (
        <p className="DetailsPropertyText">{propertyData}</p>
      )}
    </div>
  );
};

export default DetailsProperty;