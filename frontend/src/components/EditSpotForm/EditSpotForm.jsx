import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getOneSpot } from "../../store/spot";
import { useState, useEffect } from "react";
import { editSpot } from "../../store/spot";
// import './EditSpotForm.css'

const EditSpot = () => {
  const { spotId } = useParams();
  const dispatch = useDispatch();
  const spot = useSelector((state) => state.spots[spotId]);
  const navigate = useNavigate();
  const [country, setCountry] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    dispatch(getOneSpot(spotId));
  }, [dispatch, spotId]);

  useEffect(() => {
    if (spot) {
      setCountry(spot.country || "");
      setAddress(spot.address || "");
      setCity(spot.city || "");
      setState(spot.state || "");
      setLat(spot.lat || "");
      setLng(spot.lng || "");
      setDescription(spot.description || "");
      setName(spot.name || "");
      setPrice(spot.price || "");
    }
  }, [spot]);

  if (!spot) return null;

  const validateForm = () => {
    let error = {};
    if (!country) error.country = "Country is required";
    if (!address) error.address = "Street address is required";
    if (!city) error.city = "City is required";
    if (!state) error.state = "State is required";
    if (!lat || lat > 90 || lat < -90)
      error.lat = "Latitude must be within -90 and 90";
    if (!lng || lng > 180 || lng < -180)
      error.lng = "Longitude must be within -180 and 180";
    if (!description || description.length < 30)
      error.description = "Description needs 30 or more characters";
    if (!price) error.price = "Price is required";
    if (!name) error.name = "Name is required";
    return error;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.values(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setErrors({});
    const spotData = {
      ...spot,
      country,
      address,
      city,
      state,
      lat,
      lng,
      description,
      name,
      price,
    };

    let newSpot;
    newSpot = await dispatch(editSpot(spotData));

    if (newSpot.errors) {
      setErrors(newSpot.errors);
    } else {
      navigate(`/spots/${newSpot.id}`);
    }
  };

  return (
    Object.keys(spot).length > 1 && (
      <>
        <div className="spot_form">
          <form onSubmit={handleSubmit}>
            <h1>Update Your Spot</h1>

            <div className="spot_location">
              <h2>Where&apos;s your place located?</h2>
              <p>
                Guests will only get your exact address once they booked a
                reservation.
              </p>
              <label>
                Country
                <input
                  value={country}
                  placeholder="Country"
                  onChange={(e) => setCountry(e.target.value)}
                />
              </label>
              {errors.country && (
                <p className="error_message">{errors.country}</p>
              )}

              <label>
                Street Address
                <input
                  value={address}
                  placeholder="Address"
                  onChange={(e) => setAddress(e.target.value)}
                />
              </label>
              {errors.address && (
                <p className="error_message">{errors.address}</p>
              )}

              <div className="city_state">
                <label>
                  City
                  <input
                    value={city}
                    placeholder="City"
                    onChange={(e) => setCity(e.target.value)}
                  />
                </label>
                {errors.city && <p className="error_message">{errors.city}</p>}

                <label>
                  State
                  <input
                    value={state}
                    placeholder="State"
                    onChange={(e) => setState(e.target.value)}
                  />
                </label>
              </div>
              {errors.state && <p className="error_message">{errors.state}</p>}

              <div className="lat_lng">
                <label>
                  Latitude
                  <input
                    type="number"
                    value={lat}
                    placeholder="Latitude"
                    onChange={(e) => setLat(e.target.value)}
                  />
                </label>
                {errors.lat && <p className="error_message">{errors.lat}</p>}

                <label>
                  Longitude
                  <input
                    type="number"
                    value={lng}
                    placeholder="Longitude"
                    onChange={(e) => setLng(e.target.value)}
                  />
                </label>
                {errors.lng && <p className="error_message">{errors.lng}</p>}
              </div>
            </div>

            <div className="spot_detailed_description">
              <h2>Describe your place to guests</h2>
              <p>
                Mention the best features of your space, any special amentities
                like fast wifi or parking, and what you love about the
                neighborhood.
              </p>
              <label>
                <textarea
                  value={description}
                  placeholder="Please write at least 30 characters"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </label>
              {errors.description && (
                <p className="error_message">{errors.description}</p>
              )}
            </div>

            <div className="spot_name">
              <h2>Create a title for your spot</h2>
              <p>
                Catch guests&apos; attention with a spot title that highlights
                what makes your place special.
              </p>
              <label>
                <input
                  value={name}
                  placeholder="Name of your spot"
                  onChange={(e) => setName(e.target.value)}
                />
              </label>
              {errors.name && <p className="error_message">{errors.name}</p>}
            </div>

            <div className="update_spot_price">
              <h2>Set a base price for your spot</h2>
              <p>
                Competitive pricing can help your listing stand out and rank
                higher in search results.
              </p>
              <label>
                <input
                  type="number"
                  value={price}
                  placeholder="Price per night (USD)"
                  onChange={(e) => setPrice(e.target.value)}
                />
              </label>
              {errors.price && <p className="error_message">{errors.price}</p>}
            </div>

            <button type="submit">Update your Spot</button>
          </form>
        </div>
      </>
    )
  );
};

export default EditSpot;
