
import { useSwipeable } from "react-swipeable";
import { useDispatch } from "react-redux";
import { setFrameCount } from "../redux/userSlice";
import "bootstrap/dist/css/bootstrap.min.css";
import CommentList from "../Comment/CommentList";

const MobileCard = ({ onSwipeLeft, onSwipeRight, children }) => {
  const handlers = useSwipeable({
    onSwipedLeft: () => onSwipeLeft(),
    onSwipedRight: () => onSwipeRight(),
  });

  const dispatch = useDispatch();
  const earthquake = children;
  const mapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${earthquake.coordinates.longitude},${earthquake.coordinates.latitude}`;

  return (
    <article className="d-md-none">
      <div {...handlers}>
      
        <div className="row row-cols-1 g-4 mx-4">
          <div className="col">
          <p className="lead text-center" >{`<-- Swipe left or Right -->`}</p>
            <div className="card h-auto shadow-lg p-3 mb-5 bg-body-tertiary rounded">
              <iframe
                width="100%"
                height="100%"
                src={mapUrl}
                onLoad={() => dispatch(setFrameCount(1))}
              />
              <div className="card-body h-auto">
                <h5 className="card-title">{earthquake.attributes.title}</h5>
                <p className="card-text">
                  Magnitude:{" "}
                  {`${earthquake.attributes.magnitude} ${earthquake.attributes.mag_type}`}
                  <br />
                  Place: {earthquake.attributes.place}
                  <br />
                  Coordinates: {earthquake.coordinates.latitude},{" "}
                  {earthquake.coordinates.longitude}
                  <br />
                  Tsunami Alert: {earthquake.attributes.tsunami
                    ? "Yes"
                    : "No"}{" "}
                  <br />
                  external id:{" "}
                  <data value={earthquake.attributes.external_id}>
                    {earthquake.attributes.external_id}
                  </data>
                </p>
              </div>
              <div className="card-footer">
                <small className="text-body-secondary">
                  <strong>Date & Time:</strong>{" "}
                  <time dateTime={earthquake.attributes.time}>
                    {new Date(earthquake.attributes.time).toLocaleString()}
                  </time>
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-center"><CommentList/></div>
    </article>
  );
};

export default MobileCard;
