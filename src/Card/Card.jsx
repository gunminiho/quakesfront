import { useDispatch, useSelector } from "react-redux";
import { setFrameCount, setQuakesLoaded } from "../redux/userSlice";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect } from "react";
import CommentList from "../Comment/CommentList";


const Card = () => {
  const { earthquakes,isLoading,frameCount,quakesLoaded,loadedQuakes  } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if(earthquakes !== undefined){
    dispatch(setQuakesLoaded(true));
  }
  }, [earthquakes,dispatch]);

  return (
    <article className={`d-none d-md-block ${isLoading ? "invisible" : "visible"}`}>
      <div className="row row-cols-1 row-cols-md-3 g-4 mx-4 my-1">
        {/*muestra cada uno de los sismos en una card */}
        { quakesLoaded && loadedQuakes && loadedQuakes.map((earthquake, key) => {
            const mapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${earthquake.coordinates.longitude},${earthquake.coordinates.latitude}`;
            return (
              <div key={key} className="col">
                <div className="card h-100 shadow p-3 mb-5 bg-body-tertiary rounded">
                  <iframe
                    width="100%"
                    height="200"
                    src={mapUrl}
                    onLoad={async () => dispatch(setFrameCount(1))}
                  />
                  <div className="card-body">
                    <h5 className="card-title">
                      {earthquake.attributes.title}
                    </h5>
                    <p className="card-text">
                      Magnitude:{" "}
                      {`${earthquake.attributes.magnitude} ${earthquake.attributes.mag_type}`}
                      <br />
                      Place: {earthquake.attributes.place}
                      <br />
                      Coordinates: {earthquake.coordinates.latitude},{" "}
                      {earthquake.coordinates.longitude}
                      <br />
                      Tsunami Alert:{" "}
                      {earthquake.attributes.tsunami ? "Yes" : "No"} <br />
                      external id:{" "}
                      <data value={earthquake.attributes.external_id}>
                        {earthquake.attributes.external_id}
                      </data>
                    </p>
                  </div>
                  <div className="card-footer">
                    <small className="text-body-secondary">
                    <div className="d-flex justify-content-center">
                      <strong>Date & Time:</strong>{" "}
                      <time dateTime={earthquake.attributes.time}>
                        {new Date(earthquake.attributes.time).toLocaleString()}
                      </time>
                      </div>
                      <div className="d-flex justify-content-center">
                      <CommentList earthquakeId={earthquake.id}/>
                      </div>
                    </small>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </article>
  );
};

export default Card;
