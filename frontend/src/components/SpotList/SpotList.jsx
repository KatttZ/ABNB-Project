import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllSpots } from "../../store/spot";
import "./SpotList.css";

const SpotList = () => {
  const dispatch = useDispatch();
  const [toolTip, setToolTip] = useState(null);

  const spots = useSelector((state) => state.spots);
  const spotsArray = Object.values(spots).filter((spot) => spot !== undefined);

  useEffect(() => {
    dispatch(getAllSpots());
  }, [dispatch]);

  if (!spotsArray.length) return null;
  return (
    <div className="spotsList_container">
      {spotsArray.map((spot) => (
        <div
          key={spot?.id}
          className="spot_container"
          onMouseOut={() => setToolTip(null)}
          onMouseOver={() => setToolTip(spot.id)}
        >
          <Link key={spot?.id} to={`/spots/${spot.id}`} className="spot_link">
            <img src={spot.previewImage} alt={spot.name} />

            <div className="spot_info">
              <div>
                {spot.city}, {spot.state}
              </div>
              <div>
                ⭐️{" "}
                {spot.avgRating && spot.avgRating !== "No rating yet."
                  ? spot.avgRating.toFixed(1)
                  : "New"}
              </div>
            </div>

            <span className="spot_price">${spot.price}</span>
            <span> night</span>
          </Link>

          {toolTip === spot.id ? (
            <h4>{spot.name}</h4>
          ) : (
            <h2>Spacing</h2>
          )}
        </div>
      ))}
    </div>
  );
};

export default SpotList;
