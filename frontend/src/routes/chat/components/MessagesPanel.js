import { useDispatch, useSelector } from 'react-redux';
import { useState, useRef, useEffect } from 'react';
import { flushSync } from 'react-dom';
import { useTranslation } from 'react-i18next';

import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { wsSendMessage } from '../../../redux/actions/websocket.action';

import './MessagesPanel.css';

const svgSendMessage = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor"><path fillRule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z" /></svg>;

const MessagesPanel = (props) => {
  const currentChannelId = useSelector((state) => state.channels.currentChannelId);
  const messages = useSelector((state) => state.messages.items);
  const channels = useSelector((state) => state.channels.items);
  const wsLoading = useSelector((state) => state.loading.wsLoading);
  const dispatch = useDispatch();
  const [message, setMessage] = useState();
  const scrollRef = useRef(null);
  const { t } = useTranslation();

  const currentChannelInfo = channels.find(({ id }) => id === currentChannelId);
  const messagesForCurrentChannel = messages.filter((item) => item.channelId === currentChannelId);

  useEffect(() => {
    scrollRef.current?.lastElementChild?.scrollIntoView();
  }, [messagesForCurrentChannel]);

  if (!currentChannelInfo) {
    return null;
  }

  const handleSendMessageClick = () => {
    dispatch(wsSendMessage({ message }));
    setMessage('');
    props.onFocus();
  };

  const checkPress = (e) => {
    if (e.charCode == 13) {
      handleSendMessageClick();
    }
  };

  return (
    <Card
      style={{ width: '80%' }}
    >
      <Card.Header>
        <strong>
          #
          {currentChannelInfo.name}
        </strong>
        {' '}
        <br />
        {t('chat.counter.count', { count: messagesForCurrentChannel.length })}
      </Card.Header>
      <Card.Body className="MessagesPanel__Card-Body" ref={scrollRef}>
        {messagesForCurrentChannel.map((item) => (
          <Card.Text key={item.id}>
            <strong>
              {item.username}
              :
              {' '}
            </strong>
            {item.message}
          </Card.Text>
        ))}

      </Card.Body>
      <Container className="Chat-container_btn-container">
        <InputGroup>
          {!wsLoading
            && (
            <Form.Control
              ref={props.onRef}
              type="text"
              placeholder=""
              aria-describedby="btnGroupAddon"
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              onKeyPress={(e) => checkPress(e)}
            />
            )}
          {!wsLoading
            && (
            <Button
              variant="light"
              onClick={handleSendMessageClick}
            >
              {svgSendMessage}
            </Button>
            )}
        </InputGroup>
      </Container>
    </Card>
  );
};

export default MessagesPanel;
