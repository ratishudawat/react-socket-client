import React, { useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { useContacts } from '../contexts/ContactsProvider';
import { useConversations } from '../contexts/ConversationProvider';

function NewConversationModal({ closeModal }) {
  const [selectedContactIds, setSelectedContactIds] = useState([]);
  const { contacts } = useContacts();
  const { createConversation } = useConversations();

  const onFormSubmit = (e) => {
    e.preventDefault();
    createConversation(selectedContactIds);
    closeModal();
  };

  const onCheckboxChange = (contactId) => {
    setSelectedContactIds((prevSelectedIds) => {
      if (prevSelectedIds.includes(contactId)) {
        // remove from selectedIds
        return prevSelectedIds.filter((prevId) => {
          return contactId === prevId;
        });
      } else {
        // add into selectedIds
        return [...prevSelectedIds, contactId];
      }
    });
  };

  return (
    <>
      <Modal.Header>Create Conversation</Modal.Header>
      <Modal.Body>
        <Form onSubmit={onFormSubmit}>
          {contacts.map((contact) => (
            <Form.Group controlId={contact.id} key={contact.id}>
              <Form.Check
                type='checkbox'
                value={selectedContactIds.includes(contact.id)}
                label={contact.name}
                onChange={() => onCheckboxChange(contact.id)}
              />
            </Form.Group>
          ))}
          <Button type='submit'>Create</Button>
        </Form>
      </Modal.Body>
    </>
  );
}

export default NewConversationModal;
