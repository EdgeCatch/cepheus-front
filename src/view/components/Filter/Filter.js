import React from 'react';
import styled from 'styled-components';
import FilterItem from '../FilterItem';
import Divider from '../Divider';
import './filter.scss';
import {
  FilterTypes,
  FilterColors,
  FilterSizes,
  FilterStyles
} from '../../constants';
import PriceRangeSilder from '../PriceRangeSilder/PriceRangeSilder';
import StarRating from '../StarRating/StarRating';
import FilterRateComponent from '../FilterRateComponent/FilterRateComponent';

export class Filter extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const FilterItemDecorator = ({
      component: Component,
      title,
      nameClass = 'filter__list',
      enableDivider = true
    }) => {
      return (
        <div className={nameClass}>
          <p>{title}</p>

          <Component />
          {enableDivider && <Divider />}
        </div>
      );
    };

    const Wrapper = styled.div`
      padding: 24px;
    `;

    const FilterTypeTemplate = object =>
      Object.keys(object).map(i => <FilterItem name={i} />);

    const FilterTypeComponent = () => FilterTypeTemplate(FilterTypes);

    const FilterColorComponent = () => FilterTypeTemplate(FilterColors);

    const FilterSizeComponent = () => FilterTypeTemplate(FilterSizes);

    const FilterStyleComponent = () => FilterTypeTemplate(FilterStyles);

    return (
      <aside className="products__filter">
        <Wrapper>
          <FilterItemDecorator component={FilterTypeComponent} title="Type" />
          <PriceRangeSilder maxPrice={1000} minPrice={1} />
          <FilterItemDecorator component={FilterColorComponent} title="Color" />
          <FilterItemDecorator component={FilterSizeComponent} title="Size" />
          <FilterItemDecorator component={FilterStyleComponent} title="Style" />
          <FilterItemDecorator component={FilterStyleComponent} title="Style" />
          <FilterItemDecorator
            component={FilterRateComponent}
            enableDivider={false}
            title="Rating"
          />
        </Wrapper>

        <div className="filter__reset">
          <span>CLEAR ALL FILTERS</span>
        </div>
      </aside>
    );
  }
}

export default Filter;
