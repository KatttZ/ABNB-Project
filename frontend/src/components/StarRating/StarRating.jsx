import { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import './StarRating.css';

const StarRating = ({rating, setRating}) => {
    const [hover, setHover] = useState(0);

    return (
        <div className='star-rating'>
            {[...Array(5)].map((star, index) => {
                const currentRate = index + 1;

                return (
                    <label key={index}>
                        <input
                            type='radio'
                            name='rating'
                            value={currentRate}
                            onClick={() => setRating(currentRate)}
                        />
                        <FaStar
                            className='star'
                            color={currentRate <= (hover || rating) ? '#ffc107' : '#e4e5e9'}
                            size={30}
                            onMouseEnter={() => setHover(currentRate)}
                            onMouseLeave={() => setHover(0)}
                        />
                    </label>
                );
            })}
        </div>
    );
};

export default StarRating;