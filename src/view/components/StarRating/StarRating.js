import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';

import './starRating.scss';

const StarRating = ({ counter = 3, size = 16, starred = 3 }) => {
    const [rating, setRating] = useState(starred);

    return (
        <div>
            {[...Array(counter)].map((star, i) => {
                const ratingValue = i + 1;

                return (
                    <label>
                        <input type="radio" name="rating" />
                        {/* <img src={star} className="star__item" alt="" style={{ backgroundColor: { (ratingValue <= rating)} }} /> */}
                        <FaStar size={size} stroke={ratingValue <= rating ? '#FFA84C' : '#999999'} className="star">
                            {/* <FaStar size={size} color={ratingValue <= rating ? '#FFA84C' : '#2f3338'} className="star"> */}
                            <rect stroke={ratingValue <= rating ? '#FFA84C' : '#2f3338'} />
                        </FaStar>
                    </label>
                );
            })}
        </div>
    );
};

export default StarRating;
