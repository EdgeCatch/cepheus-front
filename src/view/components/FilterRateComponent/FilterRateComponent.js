import React from 'react';
import StarRating from '../StarRating/StarRating';
import './filterRate.scss';

const FilterRateComponent = () => {
    return (
        <div className="filter__rate">
            <div className="filter_rate__item">
                <div className="filter_rate__item_block">
                    <StarRating counter={5} size={30} starred={5} />
                    <p>& Up</p>
                </div>
                <div className="filter_rate__item_block">
                    <p>10</p>
                </div>
            </div>
            <div className="filter_rate__item">
                <div className="filter_rate__item_block">
                    <StarRating counter={5} size={30} starred={4} />
                    <p>& Up</p>
                </div>
                <div className="filter_rate__item_block">
                    <p>10</p>
                </div>
            </div>
            <div className="filter_rate__item">
                <div className="filter_rate__item_block">
                    <StarRating counter={5} size={30} starred={3} />
                    <p>& Up</p>
                </div>
                <div className="filter_rate__item_block">
                    <p>10</p>
                </div>
            </div>
            <div className="filter_rate__item">
                <div className="filter_rate__item_block">
                    <StarRating counter={5} size={30} starred={2} />
                    <p>& Up</p>
                </div>
                <div className="filter_rate__item_block">
                    <p>10</p>
                </div>
            </div>
            <div className="filter_rate__item">
                <div className="filter_rate__item_block">
                    <StarRating counter={5} size={30} starred={1} />
                    <p>& Up</p>
                </div>
                <div className="filter_rate__item_block">
                    <p>10</p>
                </div>
            </div>
        </div>
    );
};

export default FilterRateComponent;
