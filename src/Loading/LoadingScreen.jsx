import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setIsLoading } from "../redux/userSlice";

const LoadingScreen = () => {

  const {frameCount,earthquakes, quakesLoaded, isLoading, Pagination:{itemsPerPage}} = useSelector((state) => state.user);
  const [percent, setPercent] = useState(10);

  const dispatch = useDispatch();

  useEffect(() => {
    if(earthquakes !== undefined && percent < 100 && frameCount < itemsPerPage)
    setPercent(percent +10);
  } , [earthquakes,frameCount]);

  useEffect(() => {
    if(frameCount >= (itemsPerPage*0.75) ){ // 75% of the itemsPerPage at least to show cards cause of dependencies check
      dispatch(setIsLoading(false));
    }
  }, [frameCount,itemsPerPage,isLoading,quakesLoaded,dispatch]);

  return (
    <div>
      <div
        className={`progress text-center w-75 align-middle mx-auto my-5 ${quakesLoaded && !isLoading ? "invisible" : "visible"}`}
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
