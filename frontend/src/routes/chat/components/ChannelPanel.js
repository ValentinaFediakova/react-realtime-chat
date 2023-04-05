import React, { useState, useEffect } from 'react';
import { useStore, useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ChannelButton from './ChannelButton';

import './ChannelPanel.css';

const svgAddChannel = (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
    <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
  </svg>
);

const ChannelPanel = ({
  onShowAddChannelModal, onShowDeletedModal, onShowRenameModal, onFocus,
}) => {
  const channels = useSelector((state) => state.channels.items);
  const currentChannelId = useSelector((state) => state.channels.currentChannelId);
  const { t } = useTranslation();

  return (
    <Card
      bg="Light"
    >
      <Card.Header className="h-100">
        <ButtonGroup className="ChannelButtons__wrap" vertical>
          <Container>
            <Row className="ChannelButtons__header">
              <Col sm={8}>{t('chat.channel')}</Col>
              <Col sm={1}>
                <div>
                  <></>
                  <Button onClick={onShowAddChannelModal} variant="link" className="Chat__button_marginTop">{svgAddChannel}
                    <span class="visually-hidden">+</span>
                  </Button>
                </div>
              </Col>
            </Row>
          </Container>
          <ButtonGroup className="ChannelButtons__wrap" vertical>
            {channels.map((channelButton) => (
              <ChannelButton
                key={channelButton.id}
                id={channelButton.id}
                text={channelButton.name}
                active={channelButton.id === currentChannelId}
                removable={channelButton.removable}
                onFocus={onFocus}
                onShowDeletedModal={onShowDeletedModal}
                onShowRenameModal={onShowRenameModal}
              />
            ))}
          </ButtonGroup>
        </ButtonGroup>
      </Card.Header>
    </Card>
  );
};

export default ChannelPanel;
