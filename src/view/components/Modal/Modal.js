// @flow
import React from 'react';
import PropTypes from 'prop-types';
import Portal from '../Portal/Portal';
import Icon from '../Icon/Icon';
import Button from '../Button';
import './modal.scss';

const Modal = ({ title, isOpen, onCancel, onSubmit, children, buttonText }) => (
    <>
        {isOpen && (
            <Portal>
                <div className="modal-overlay">
                    <div className="modal-window">
                        <div className="modal-header">
                            <div className="modal-title ">{title}</div>
                            <Icon name="times" onClick={onCancel} />
                        </div>
                        <div className="modal-body">{children}</div>
                        <div className="modal-footer">
                            <Button className="buy-btn purple" onClick={onSubmit}>
                                {buttonText}
                            </Button>
                        </div>
                    </div>
                </div>
            </Portal>
        )}
    </>
);

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
