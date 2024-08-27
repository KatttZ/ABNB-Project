import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllSpots } from "../../store/spot";
import "./SpotList.css";

const SpotList = () => {
  const dispatch = useDispatch();

  const spots = useSelector((state) => state.spots);
  console.log("homepage", spots);

  const spotsArray = Object.values(spots)
  useEffect(() => {
    dispatch(getAllSpots());
  }, [dispatch]);

  if (!spots) return null;

  return (
    <>
      <div className="spotsList_container">
      {spotsArray?.map((spot) => (
        <div key={spot?.id}
        className="each_spot_container">
          <Link key={spot?.id} to={`/spots/${spot?.id}`}>
            <img src={spot.previewImage} alt={spot.name} />
            <div>
              <div>
                {spot.city}, {spot.state}
              </div>
              <div>⭐️ {spot.avgRating && spot.avgRating !== "No rating yet." ? spot.avgRating : "New"}</div>
              <span>${spot.price}</span>
              <span> night</span>
            </div>
          </Link>
        </div>
      ))}
      </div>
    </>
  );
};

export default SpotList;
