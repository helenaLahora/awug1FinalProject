// DetailsProperty.jsx
import React from 'react';
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

const iconMapping = {
  age: AgeIcon,
  classification: ClassificationIcon,
  vehicles_class: ClassificationIcon, // Assuming the same icon for "vehicles_class"
  climate: ClimateIcon,
  release_date: DateIcon,
  director: DirectorIcon,
  running_time: DurationIcon,
  eye_color: EyeColorIcon,
  gender: GenderIcon,
  hair_color: HairColorIcon,
  length: LengthIcon,
  producer: ProducerIcon,
  rt_score: RtScoreIcon,
  surface_water: SurfaceWaterIcon,
  terrain: TerrainIcon,
};

const DetailsProperty = ({ propertyName, propertyData }) => {
  const IconComponent = iconMapping[propertyName.toLowerCase()];

  return (
    <div>
      {IconComponent && <IconComponent className="common-icon-style" />}
      {Array.isArray(propertyData) ? (
        <ul>
          {propertyData.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      ) : (
        <p>{propertyData}</p>
      )}
    </div>
  );
};

export default DetailsProperty;