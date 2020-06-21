import React from 'react';
import Checkbox from '../CheckBox/Checkbox';

import './filterItem.scss';

const FilterItem = ({ name }) => {
    return (
        <div className="filter__item">
            <Checkbox label={name} id={name} />
        </div>
    );
};

export default FilterItem;
