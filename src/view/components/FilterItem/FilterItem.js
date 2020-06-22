import React from 'react';
import Checkbox from '../CheckBox/Checkbox';

import './filterItem.scss';

const FilterItem = ({ name, count = 10 }) => {
    return (
        <div className="filter__item">
            <Checkbox label={name} id={name} count={count} />
        </div>
    );
};

export default FilterItem;
