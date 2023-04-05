import React, { useState, useEffect } from 'react';
import { useStore, useDispatch, useSelector } from 'react-redux';
import cn from 'classnames';
import { useTranslation } from 'react-i18next';

import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import { channelSetActive } from '../../../redux/actions/channels.action';

import './ChannelButton.css';

const ChannelButton = ({
  onFocus, active, removable, text, id, onShowDeletedModal, onShowRenameModal,
}) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const handleChangeCurrentChannelClick = (id) => {
    dispatch(channelSetActive(id));
    onFocus();
  };

  const isActive = active;
  const classesButton = cn('Chat__button_withoutRadius', {
    Chat__button_active: isActive,
  });

  return (
    <>
      {removable && (
        <Dropdown as={ButtonGroup} className={classesButton}>
          <Button variant="light" onClick={() => handleChangeCurrentChannelClick(id)}>
            #&nbsp;
            {text}
          </Button>

          <Dropdown.Toggle
            className="Chat__button-dropdown-menu"
            split
            variant="light"
            id="dropdown-split-basic"
          />
          <Dropdown.Menu>
            <Dropdown.Item eventKey="1" onClick={() => onShowDeletedModal(id)}>{t('chat.deleteChannelBtn')}</Dropdown.Item>
            <Dropdown.Item eventKey="2" onClick={() => onShowRenameModal(id)}>{t('chat.renameChannelBtn')}</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      )}

      {!removable && (
        <Button
          variant="light"
          className={classesButton}
          onClick={() => handleChangeCurrentChannelClick(id)}
        >
          #&nbsp;
          {text}
        </Button>
      )}
    </>
  );
};

export default ChannelButton;
