/* eslint-disable */

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

import { wsAddChannel } from '../../../redux/actions/websocket.action';
import { createChannelNameSchema } from '../../../schemas/channelName.schema';

import './ModalAddChannel.css';

const ModalAddChannel = ({ show, onClose }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [inputValue, setInputValue] = useState('');
  const [errorsValidation, setErrorsValidation] = useState([]);
  const [validated, setValidated] = useState(true);
  const currentUserName = useSelector((state) => state.user.username);
  const channels = useSelector((state) => state.channels.items);

  const channelsNameForValidate = channels.map((item) => item.name);

  const schema = createChannelNameSchema(channelsNameForValidate);

  const validate = (value) => {
    try {
      schema.validateSync(
        { channelName: value },
        { abortEarly: false },
      );
      setValidated(true);
      setErrorsValidation([]);
    } catch (error) {
      let errorArray = [];
      error.inner.forEach((element) => {
        errorArray = [...errorArray, element.message];
      });
      setValidated(false);
      setErrorsValidation(errorArray);
    }
  };

  const handleAddNewChannel = (e) => {
    e.preventDefault();
    validate(e.target.value);
    const data = { name: inputValue, creator: currentUserName };
    dispatch(wsAddChannel(data));
    setInputValue('');
    setValidated(true);
    onClose();
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    validate(e.target.value);
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>{t('chat.addChannelModalHeading')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleAddNewChannel}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label className="visually-hidden" htmlFor="channelName">{t('chat.inputNameChannel')}</Form.Label>
            <Form.Control
              isInvalid={!validated}
              type="text"
              name="channelName"
              value={inputValue}
              autoFocus
              onChange={handleInputChange}
              id='channelName'
            />
            <Form.Control.Feedback type="invalid" tooltip>
              {errorsValidation.map((item, index) => (
                <p key={index}>{item}</p>
              ))}
            </Form.Control.Feedback>
            <Modal.Footer>
              <Button variant="secondary" onClick={onClose}>
                {t('chat.cancelBtn')}
              </Button>
              <Button variant="primary" type="submit">
                {t('chat.addBtn')}
              </Button>
            </Modal.Footer>
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ModalAddChannel;
