// @flow
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Portal from '../Portal/Portal';
import Icon from '../Icon/Icon';
import Button from '../Button';
import './modal.scss';
import Loader from '../Loader/Loader';

type ModalProps = {
  title: string,
  onCancel: Function,
  onSubmit: Function,
  children: Array<Object>,
  buttonText: string,
  children: Object,
  isOpen: boolean
};


const ModalHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem 1rem;
    border-bottom: none;
`;

export const ModalContext = React.createContext();

const Modal = (props: ModalProps) => {
  const { title, isOpen, onCancel, onSubmit, children, buttonText } = props;
  const [loading, setLoading] = React.useState(false);
  return (
    <>
      {isOpen && (
        <ModalContext.Provider value={{ setLoading }}>
          <Portal>
            <div className="modal-overlay">
              {loading && (
                <div
                  style={{
                    transform: 'translate(-50%, -50%)',
                    position: 'absolute',
                    left: ' 50%',
                    top: '50%',
                    zIndex: 99
                  }}
                >
                  <Loader />
                </div>
              )}
              <div
                className="modal-window"
                style={
                  loading
                    ? {
                        filter: 'blur(1px)'
                      }
                    : { filter: 'blur(0px)' }
                }
              >
                  <ModalHeader>
                  <div className="modal-title ">{title}</div>
                  <Icon name="times" onClick={onCancel} />
                </ModalHeader>
                <div className="modal-body">{children}</div>
                {/* {onSubmit && buttonText.length && (
                <div className="modal-footer">
                  <Button className=" purple buy-btn " onClick={onSubmit}>
                    {buttonText}
                  </Button>
                </div>
              )} */}
              </div>
            </div>
          </Portal>
        </ModalContext.Provider>
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
  buttonText: PropTypes.string
};

Modal.defaultProps = {
  title: 'Modal title',
  isOpen: false,
  onCancel: () => {},
  onSubmit: () => {},
  children: null,
  buttonText: 'Submit'
};

export default Modal;
