import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import imgHomeArray from './img/index';
import HomeImgBlock from '../../components/pageComponents/CartPage/HomeImgBlock/HomeImgBlock';
import './homePage.scss';

const HomePage = () => (
    <Container id="home-page">
        <h2>What are you looking for?</h2>
        <Row className="homePage__block  justify-content-center">
            <HomeImgBlock imgElement={imgHomeArray[0]} text="Bags And Cases" />
            <HomeImgBlock imgElement={imgHomeArray[1]} text="Parfumes " />
        </Row>
        <Row className="homePage__block  justify-content-center">
            <HomeImgBlock imgElement={imgHomeArray[2]} text=" Ties And Belts " />
            <HomeImgBlock imgElement={imgHomeArray[3]} text="  Phone Accessories  " />
        </Row>
        <Row className="homePage__block  justify-content-center">
            <HomeImgBlock imgElement={imgHomeArray[4]} text=" Alcohol " />
            <HomeImgBlock imgElement={imgHomeArray[5]} text=" E-cigarettes " />
        </Row>
        <div className="homePage__divider" />
    </Container>
);

export default HomePage;
