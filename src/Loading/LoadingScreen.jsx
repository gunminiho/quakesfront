import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const LoadingScreen = () => {

  const {frameCount,earthquakes} = useSelector((state) => state.user);
  const [percent, setPercent] = useState(10);

  useEffect(() => {
    if(earthquakes !== undefined && percent < 100 && frameCount < earthquakes.pagination.per_page)
    setPercent(percent +10);
  } , [earthquakes,frameCount]);

  return (
    <div>
      <div
        className="progress text-center w-75 align-middle mx-auto my-5"
        role="progressbar"
        aria-label="Animated striped example"
        aria-valuenow="75"
        aria-valuemin="0"
        aria-valuemax="100"
      >
        <div
          className="progress-bar progress-bar-striped progress-bar-animated"
          style={{ width: `${percent}%` }}
        >
          LOADING {percent}%
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
