import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOneSpot } from "../../store/spot";
import './SpotImage.css'

const SpotImage = ({spotId}) => {
    const dispatch = useDispatch();
    const spot = useSelector((state) => state.spots[spotId]);

    useEffect(() => {
        dispatch(getOneSpot(spotId));
    }, [dispatch, spotId]);

    if (!spot || !spot.SpotImages) return null;

    const largeImage = spot.SpotImages.find(image => image.preview === true);
    const smallImages = spot.SpotImages.filter(image => image.preview === false);
  
    return (
        <div className="spotImages_container">
            <div className="large_image">
                <img src={largeImage.url} alt={spot.name} />
            </div>
            {smallImages.map((image) => (
                <div className="small_images" key={image.id}>
                    <img src={image.url} alt={image.id} />
                </div>
            ))}
        </div>
    )
    
}

export default SpotImage;