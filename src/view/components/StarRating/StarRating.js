import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';

import './starRating.scss';

const StarRating = () => {
    const [rating, setRating] = useState(null);

    return (
        <div>
            {[...Array(3)].map((star, i) => {
                const ratingValue = i + 1;

                return (
                    <label>
                        <input type="radio" name="rating" onClick={() => setRating(ratingValue)} />
                        {/* <img src={star} className="star__item" alt="" style={{ backgroundColor: { (ratingValue <= rating)} }} /> */}
                        <FaStar size={16} color={ratingValue <= rating ? '#FFA84C' : '#2f3338'} className="star">
                            <rect stroke="#FFA84C" />
                        </FaStar>
                    </label>
                );
            })}
        </div>
    );
};

export default StarRating;
