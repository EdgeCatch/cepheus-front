// @flow
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Portal from '../Portal/Portal';
import Icon from '../Icon/Icon';
import Button from '../Button';
import './modal.scss';

type ModalProps = {
    title: string,
    onCancel: Function,
    onSubmit: Function,
    children: Array<Object>,
    buttonText: string,
    children: Object,
    isOpen: boolean,
};

const ModalHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem 1rem;
    border-bottom: none;
`;

const Modal = (props: ModalProps) => {
    const { title, isOpen, onCancel, onSubmit, children, buttonText } = props;

    return (
        <>
            {isOpen && (
                <Portal>
                    <div className="modal-overlay">
                        <div className="modal-window">
                            <ModalHeader>
                                <div className="modal-title ">{title}</div>
                                <Icon name="times" onClick={onCancel} />
                            </ModalHeader>
                            <div className="modal-body">{children}</div>
                            <div className="modal-footer">
                                <Button className=" purple buy-btn " onClick={onSubmit}>
                                    {buttonText}
                                </Button>
                            </div>
                        </div>
                    </div>
                </Portal>
            )}
        </>
    );
};

Modal.propTypes = {
    title: PropTypes.string,
    isOpen: PropTypes.bool,
    onCancel: PropTypes.func,
    onSubmit: PropTypes.func,
    children: PropTypes.node,
    buttonText: PropTypes.string,
};

Modal.defaultProps = {
    title: 'Modal title',
    isOpen: false,
    onCancel: () => {},
    onSubmit: () => {},
    children: null,
    buttonText: 'Submit',
};

export default Modal;
