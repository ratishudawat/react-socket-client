import React, { useRef } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { useContacts } from '../contexts/ContactsContext';

function NewContactModal({ closeModal }) {
  const idRef = useRef();
  const nameRef = useRef();
  const { createContact } = useContacts();

  const onFormSubmit = (e) => {
    e.preventDefault();
    createContact(idRef.current.value, nameRef.current.value);
    closeModal();
  };

  return (
    <>
      <Modal.Header>Create a Contact</Modal.Header>
      <Modal.Body>
        <Form onSubmit={onFormSubmit}>
          <Form.Group>
            <Form.Label>Id</Form.Label>
            <Form.Control type='text' ref={idRef} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control type='text' ref={nameRef} />
          </Form.Group>
          <Button type='submit'>Create</Button>
        </Form>
      </Modal.Body>
    </>
  );
}

export default NewContactModal;
