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
    margin: 15px;
    padding: 0;
    text-align: center;
    background-blend-mode: soft-light, normal;
    display: flex;
    flex-direction: column;
`;

const CardWrapper = styled(Card)`
    max-width: 250px;
    border: none;
    max-height: 380px;
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
        console.log(bag.cid);

        store.dispatch({ type: 'ADD_TO_CART', payload: bag.cid });
    }

    return (
        <GoodsTileStyle>
            <CardWrapper>
                <CardBodyWrapper className="item__body">
                    <Card.Img style={{ margin: '10px auto' }} variant="top" src="/bag.jpg" />
                    <img src="" alt="" />
                    <p>{title}</p>
                    <StarRating />
                    <p>{price || 0}$</p>
                </CardBodyWrapper>
            </CardWrapper>
            <div className="add-to-card_btn purple" onClick={() => handleAddToCart()}>
                Add to cart
            </div>
        </GoodsTileStyle>
    );
};

export default BagItem;
