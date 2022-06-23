import React, { useState } from 'react';
import Login from './Login';
import useLocalStorage from '../hooks/useLocalStorage';
import Dashboard from './Dashboard';
import { ContactsProvider } from '../contexts/ContactsContext';
import { ConversationsProvider } from '../contexts/ConversationContext';

function App() {
  const [id, setId] = useLocalStorage('id');

  const dashboard = (
    <ContactsProvider>
      <ConversationsProvider id={id}>
        <Dashboard id={id} />
      </ConversationsProvider>
    </ContactsProvider>
  );

  return <div>{id ? dashboard : <Login onIdSubmit={setId} />}</div>;
}

export default App;
