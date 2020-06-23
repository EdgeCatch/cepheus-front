// @flow
import React from 'react';
import Container from 'react-bootstrap/Container';
import styled from 'styled-components';
import './divider.scss';

const DividerWrapper = styled(Container)`
    padding: 0;
`;

const Divider = () => (
    <DividerWrapper>
        <div className="page-divider" />
    </DividerWrapper>
);

export default Divider;
