import React from 'react';
import Nouislider from 'nouislider-react';
import styled from 'styled-components';
import Divider from '../Divider';
import './style.scss';

const SliderBlock = styled.div`
    display: flex;
    justify-content: space-between;
`;

export default class PriceRangeSlider extends React.Component {
    state = {
        textValue: 1,
    };

    onSlide = (render, handle, value) => {
        this.setState({
            textValue1: value[1].toFixed(0),
            textValue: value[0].toFixed(1),
        });
    };

    render() {
        const { maxPrice, minPrice, title = 'Price' } = this.props;

        const { textValue, textValue1 } = this.state;

        return (
            <div className="">
                <SliderBlock>
                    <p>{title}</p>
                    <p>
                        ${textValue} - ${textValue1 === undefined ? maxPrice : textValue1}
                    </p>
                </SliderBlock>
                <Nouislider
                    connect
                    start={[minPrice, maxPrice]}
                    behaviour="tap"
                    range={{
                        min: [minPrice],
                        max: [maxPrice],
                    }}
                    onSlide={this.onSlide}
                />
                <Divider />
            </div>
        );
    }
}
