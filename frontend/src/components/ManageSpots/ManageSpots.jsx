import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { loadCurrentSpots, deleteSpot } from "../../store/spot";
import { useModal } from '../../context/Modal';
import ConfirmDeleteModal from '../ConfirmDeletionModal';
import './ManageSpots.css'

const ManageSpots = () => {
    const { setModalContent, closeModal } = useModal();

    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.session.user);
    const spots = useSelector((state) => state.spots);
    const spotsArray = Object.values(spots);
    const filteredSpots = spotsArray.filter(spot => spot?.ownerId === currentUser?.id)
    console.log("spotsArray", spotsArray);


    useEffect(() => {
        dispatch(loadCurrentSpots());
    }, [dispatch]);

    if (!spots) return null;

    const handleDeleteClick = (spotId) => {
        setModalContent(
          <ConfirmDeleteModal
            onDelete={() => handleDeleteConfirm(spotId)}
            onClose={closeModal}
            message="Are you sure you want to remove this spot?"
            type="Spot"
          />
        );
    };
    
    const handleDeleteConfirm = async (spotId) => {
        await dispatch(deleteSpot(spotId));
        closeModal();
    };

    return (
        <div className="current_spotList_container">
            <h1>Manage Spots</h1>
            <button className="create_spot"><Link to={"/spots/new"}>Create a New Spot</Link></button>

            <div className="current_image_container">
            {filteredSpots
            .sort((a, b) => b.id - a.id)
            .map((spot) => (
            <div key={spot.id} className="spotList_small_container">
            <Link key={spot.id} to={`/spots/${spot.id}`} className="spotList_small_container_link">
            <img src={spot.previewImage} alt={spot.name} />

                <div className='spotList_preview'>
                <span>{spot.city}, {spot.state}</span>
                <span>⭐️ {spot.avgRating && spot.avgRating !== "No rating yet." ? spot.avgRating : "New"}</span>
                </div>
                <span className='spotList_price'>${spot.price}</span><span> night</span>
            </Link>

            <div className="current_spotList_buttons">
                <button><Link to={`/spots/${spot.id}/edit`}>Update</Link></button>
                <button onClick={() => handleDeleteClick(spot.id)}>Delete</button>
            </div>

            
            </div>

            ))}
            </div>
        </div>
)};
    
export default ManageSpots;