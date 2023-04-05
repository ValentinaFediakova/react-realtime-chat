/* eslint-disable */

import React, { useState } from 'react';
import { useStore, useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { wsRemoveChannel } from '../../../redux/actions/websocket.action';

import './ModalDeleteChannel.css';

const ModalDeleteChannel = ({ show, deletedChannelId, onClose }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const handleRemoveChannelClick = () => {
    dispatch(wsRemoveChannel(deletedChannelId));
    onClose();
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{t('chat.deleteChannelModalHeading')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{t('chat.deleteChannelModalText')}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          {t('chat.cancelBtn')}
        </Button>
        <Button variant="danger" onClick={handleRemoveChannelClick}>
          {t('chat.deleteChannelBtn')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalDeleteChannel;
