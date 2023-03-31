import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Container from 'react-bootstrap/Container';
import { addUser } from '../../redux/actions/user.action';

import { getDataForChannels } from '../../redux/asyncActions/getChannels';
import { wsConnect } from '../../redux/actions/websocket.action';
import ChannelPanel from './components/ChannelPanel';
import MessagesPanel from './components/MessagesPanel';
import ModalAddChannel from './components/ModalAddChannel';
import ModalDeleteChannel from './components/ModalDeleteChannel';
import ModalRenameChannel from './components/ModalRenameChannel';
import Header from '../generalComponents/Header';

import './Chat.css';

const Chat = () => {
  const dispatch = useDispatch();
  const username = localStorage.getItem('username');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showRenameModal, setShowRenameModal] = useState(false);
  const [deletedChannel, setDeletedChannel] = useState(null);
  const [channelWillRenameName, setChannelWillRenameName] = useState('');
  const [channelWillRenameId, setChannelWillRenameId] = useState(null);

  const wsLoading = useSelector((state) => state.loading.wsLoading);
  const channels = useSelector((state) => state.channels.items);
  const inputRef = useRef(null);

  const handleFocus = () => {
    inputRef.current.focus();
  };

  const handleCloseAddChannelModal = () => {
    setShowAddModal(false);
  };

  const handleShowAddChannelModal = () => {
    setShowAddModal(true);
    handleFocus();
  };

  const handleCloseDeletedModal = () => {
    setShowDeleteModal(false);
  };

  const handleShowDeletedModal = (chanelId) => {
    setDeletedChannel(chanelId);
    setShowDeleteModal(true);
    handleFocus();
  };

  const handleShowRenameModal = (willRenameId) => {
    const nameById = channels.find(({ id }) => id === willRenameId).name;
    setChannelWillRenameName(nameById);
    setChannelWillRenameId(willRenameId);
    setShowRenameModal(true);
    handleFocus();
  };

  const handleCloseRenameModal = () => {
    setShowRenameModal(false);
  };

  useEffect(() => {
    try {
      dispatch(getDataForChannels());
    } catch (error) {
      console.log('ERROR IN CHAT');
    }

    dispatch(wsConnect());
    dispatch(addUser(username));
  }, []);

  useEffect(() => {
    if (wsLoading === false) {
      handleFocus();
    }
  }, [wsLoading]);

  return (
    <>
      <Header />

      <Container className="Chat-container">
        <ChannelPanel
          onFocus={handleFocus}
          onShowAddChannelModal={handleShowAddChannelModal}
          onShowDeletedModal={handleShowDeletedModal}
          onShowRenameModal={handleShowRenameModal}
        />
        <MessagesPanel onFocus={handleFocus} onRef={inputRef} />
        <ModalAddChannel
          show={showAddModal}
          onClose={handleCloseAddChannelModal}
        />

        <ModalDeleteChannel
          deletedChannelId={deletedChannel}
          show={showDeleteModal}
          onClose={handleCloseDeletedModal}
        />
        <ModalRenameChannel
          show={showRenameModal}
          nameChannel={channelWillRenameName}
          idChannel={channelWillRenameId}
          onChangeNameChannel={setChannelWillRenameName}
          onClose={handleCloseRenameModal}
        />
      </Container>

    </>
  );
};

export default Chat;
