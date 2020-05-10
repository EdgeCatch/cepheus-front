import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import imgHomeArray from './img/index';
import HomeImgBlock from './HomeImgBlock';
import './homePage.scss';

const HomePage = () => (
    <Container>
        <Row className="homePage__block">
            <HomeImgBlock imgElement={imgHomeArray[0]} text="Bags And Cases" />
            <HomeImgBlock imgElement={imgHomeArray[1]} text=" Ties And Belts " />
        </Row>
        <Row className="homePage__block">
            <HomeImgBlock imgElement={imgHomeArray[2]} text=" Ties And Belts " />
            <HomeImgBlock imgElement={imgHomeArray[3]} text=" Ties And Belts " />
        </Row>
        <Row className="homePage__block">
            <HomeImgBlock imgElement={imgHomeArray[4]} text=" Ties And Belts " />
            <HomeImgBlock imgElement={imgHomeArray[5]} text=" Ties And Belts " />
        </Row>
    </Container>
);

export default HomePage;
