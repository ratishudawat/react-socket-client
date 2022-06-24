import React from 'react';
import { ListGroup } from 'react-bootstrap';
import { useConversations } from '../contexts/ConversationProvider';

function Conversations() {
  const { conversations, selectConversationIndex } = useConversations();

  return (
    <ListGroup variant='flush'>
      {conversations.map((conversation, idx) => (
        <ListGroup.Item
          key={idx}
          action
          active={conversation.selected}
          onClick={() => selectConversationIndex(idx)}
        >
          {conversation.recipients.map((r) => r.name).join(', ')}
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
}

export default Conversations;
