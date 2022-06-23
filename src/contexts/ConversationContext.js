import React, { createContext, useContext, useState } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { useContacts } from './ContactsContext';

const ConverastionContext = createContext();

export const useConversations = () => {
  return useContext(ConverastionContext);
};

export function ConversationsProvider({ id, children }) {
  const [conversations, setConversations] = useLocalStorage(
    'conversations',
    []
  );
  const [selectConversationIndex, setSelectConversationIndex] = useState(0);
  const { contacts } = useContacts();

  const createConversation = (recipients) => {
    setConversations((prevConversations) => {
      return [...prevConversations, { recipients, messages: [] }];
    });
  };

  const addMessageToConversation = ({ recipients, text, sender }) => {
    setConversations((prevConversations) => {
      let madeChange = false;
      const newMessage = { sender, text };
      const newConversations = prevConversations.map((conversation) => {
        if (arrayEquality(conversation.recipients, recipients)) {
          madeChange = true;
          return {
            ...conversation,
            messages: [...conversation.messages, newMessage],
          };
        }
        return conversation;
      });

      if (madeChange) {
        return newConversations;
      } else {
        return [...prevConversations, { recipients, messages: [newMessage] }];
      }
    });
  };

  const sendMessage = (recipients, text) => {
    addMessageToConversation({ recipients, text, sender: id });
  };

  const formattedConversations = conversations.map((conversation, idx) => {
    const recipients = conversation.recipients.map((recipient) => {
      const contact = contacts.find((contact) => {
        return contact.id === recipient;
      });
      const name = (contact && contact.name) || recipient;
      return { id: recipient, name };
    });
    const selected = idx === selectConversationIndex;
    return { ...conversation, recipients, selected };
  });

  const value = {
    selectedConversation: formattedConversations[selectConversationIndex],
    conversations: formattedConversations,
    selectConversationIndex: setSelectConversationIndex,
    createConversation,
    sendMessage,
  };

  return (
    <ConverastionContext.Provider value={value}>
      {children}
    </ConverastionContext.Provider>
  );
}

const arrayEquality = (a, b) => {
  if (a.length !== b.length) return false;
  a.sort();
  b.sort();

  return a.every((element, idx) => {
    return element === b[idx];
  });
};
