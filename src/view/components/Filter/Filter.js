import React from 'react';
import FilterItem from '../FilterItem';
import './filter.scss';
import { FilterTypes, FilterColors, FilterSizes, FilterStyles } from '../../constants';

export class Filter extends React.Component {
    constructor() {
        super();
        this.state = {};
    }

    render() {
        const FilterItemDecorator = ({ component: Component, title, nameClass = 'filter__list' }) => {
            return (
                <div className={nameClass}>
                    <p>{title}</p>
                    <Component />
                </div>
            );
        };

        const FilterTypeTemplate = object => Object.keys(object).map(i => <FilterItem name={i} />);

        const FilterTypeComponent = () => FilterTypeTemplate(FilterTypes);

        const FilterColorComponent = () => FilterTypeTemplate(FilterColors);

        const FilterSizeComponent = () => FilterTypeTemplate(FilterSizes);

        const FilterStyleComponent = () => FilterTypeTemplate(FilterStyles);

        return (
            <aside className="products__filter">
                <FilterItemDecorator component={FilterTypeComponent} title="Type" />
                {/*
                    PriceSlider should be different
                  */}
                <FilterItemDecorator component={FilterColorComponent} title="Color" />
                <FilterItemDecorator component={FilterSizeComponent} title="Size" />
                <FilterItemDecorator component={FilterStyleComponent} title="Style" />
                {/*
                    FilterRatingComponent should be different
                */}
                <FilterItemDecorator component={FilterSizeComponent} title="Rating" />
            </aside>
        );
    }
}

export default Filter;
