/* eslint-disable */

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

import { createChannelNameSchema } from '../../../schemas/channelName.schema';
import { wsRenameChannel } from '../../../redux/actions/websocket.action';

import './ModalRenameChannel.css';

const ModalRenameChannel = ({
  show, onClose, nameChannel, idChannel, onChangeNameChannel,
}) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [validated, setValidated] = useState(true);
  const [errorsValidation, setErrorsValidation] = useState([]);
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

  const handleRenameChannel = (e) => {
    e.preventDefault();
    validate(e.target.value);
    const data = { name: nameChannel, id: idChannel };
    dispatch(wsRenameChannel(data));
    setValidated(true);
    onClose();
  };

  const handleInputChange = (e) => {
    onChangeNameChannel(e.target.value);
    validate(e.target.value);
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>{t('chat.renameChannelModalHeading')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleRenameChannel}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label className="visually-hidden" htmlFor="channelName">{t('chat.inputNameChannel')}</Form.Label>
            <Form.Control
              isInvalid={!validated}
              type="text"
              name="channelName"
              value={nameChannel}
              autoFocus
              onChange={handleInputChange}
              id="channelName"
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
                {t('chat.renameChannelBtn')}
              </Button>
            </Modal.Footer>
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ModalRenameChannel;
