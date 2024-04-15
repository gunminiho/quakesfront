import { useState } from 'react';
import MobileCard from '../Card/MobileCard';
import { useSelector } from 'react-redux';

const CardContainer = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { earthquakes } = useSelector((state) => state.user); //[/* Aquí estarían tus datos de earthquakes */];

  const handleSwipeLeft = () => {
    setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, earthquakes.data.length - 1));
  };

  const handleSwipeRight = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  return (
    <>
      <MobileCard
        onSwipeLeft={handleSwipeLeft}
        onSwipeRight={handleSwipeRight}
        
      >
        {earthquakes.data[currentIndex]}
        {console.log("")}
      </MobileCard>
      
    </>
  );
};

export default CardContainer;