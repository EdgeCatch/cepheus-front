// @flow
import * as React from 'react';
import Card from 'react-bootstrap/esm/Card';
import styled from 'styled-components';
import StarRating from '../StarRating/StarRating';
import './bagItem.scss';
import store from '../../../store/index';

type Props = {
    title: String,
    price: String,
    addToCart: Function,
};
const GoodsTileStyle = styled.div`
    height: 400px;
    margin: 15px;
    padding: 0;
    text-align: center;
    background-blend-mode: soft-light, normal;
    display: flex;
    flex-direction: column;
`;

const CardWrapper = styled(Card)`
    border-radius: 10px 10px 0 0;
    height: 85%;
    max-width: 250px;
    border: none;
`;

const CardBodyWrapper = styled(Card.Body)`
    padding: 0;
`;

const BagItem = (bag: Props) => {
    const {
        value: {
            title,
            price,
            addToCart,
            images: [firstImage],
        },
    } = bag;

    function handleAddToCart() {
        store.dispatch({ type: 'ADD_TO_CART', payload: bag.cid });
    }

    return (
        <GoodsTileStyle>
            <CardWrapper>
                <CardBodyWrapper className="item__body">
                    <Card.Img style={{ margin: '10px auto', height: '70%' }} variant="top" src={firstImage} />
                    <p>{title}</p>
                    <StarRating />
                    <p>${price}</p>
                </CardBodyWrapper>
            </CardWrapper>
            <div className="add-to-card_btn purple" onClick={() => handleAddToCart()}>
                <p> Add to cart</p>
            </div>
        </GoodsTileStyle>
    );
};

export default BagItem;
