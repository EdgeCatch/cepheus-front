// @flow
import * as React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import imgHomeArray from './img/index';
import HomeImgBlock from '../../components/HomeImgBlock';
import './homePage.scss';

type AppProps = {};

type AppState = {};

class HomePage extends React.Component<AppProps, AppState> {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <Container className="home-page flex">
        <h2 className="">What are you looking for?</h2>
        <div className="home-page__nav">
          <HomeImgBlock
            imgElement={imgHomeArray[0]}
            text="Bags And Cases"
            link="/bags-and-cases"
          />
          <HomeImgBlock imgElement={imgHomeArray[1]} text="Parfumes " />
          <HomeImgBlock imgElement={imgHomeArray[2]} text=" Ties And Belts" />
          <HomeImgBlock
            imgElement={imgHomeArray[3]}
            text="  Phone Accessories"
          />
          <HomeImgBlock imgElement={imgHomeArray[4]} text=" Alcohol" />
          <HomeImgBlock imgElement={imgHomeArray[5]} text=" E-cigarettes" />
        </div>
      </Container>
    );
  }
}

export default HomePage;
