import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getOneSpot } from "../../store/spot";

const SpotDetail = () => {
  const { spotId } = useParams();
  const dispatch = useDispatch();

  const spot = useSelector((state) => state.spots[spotId]);

  useEffect(() => {
    dispatch(getOneSpot(spotId));
  }, [dispatch, spotId]);

  if (!spot || !spot.Owner) return null;

  console.log("spot--->", spot);

  return (
    <div>
      <h2>{spot.name}</h2>
      <p>
        {spot.city}, {spot.state}, {spot.country}
      </p>
      <div>
        <div>
          <h2>
            Hosted by {spot.Owner.firstName} {spot.Owner.lastName}
          </h2>
          <p>{spot.description}</p>
        </div>

        <span id="spot_price">${spot.price}</span>
        <span>night</span>
      </div>
    </div>
  );
};

export default SpotDetail;
