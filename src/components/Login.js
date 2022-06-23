import React, { useRef } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { v4 as uuidV4 } from 'uuid';

function Login({ onIdSubmit }) {
  const idRef = useRef();

  const onSubmit = (e) => {
    e.preventDefault();
    onIdSubmit(idRef.current.value);
  };

  const createNewId = (e) => {
    onIdSubmit(uuidV4());
  };

  return (
    <Container
      className='align-items-center d-flex'
      style={{ height: '100vh' }}
    >
      <Form onSubmit={onSubmit} className='w-100'>
        <Form.Group>
          <Form.Label>Enter your Id</Form.Label>
          <Form.Control type='text' ref={idRef} required></Form.Control>
        </Form.Group>
        <Button className='mr-2' type='Submit'>
          Login
        </Button>
        <Button onClick={createNewId} variant='secondary'>
          Create a new Id
        </Button>
      </Form>
    </Container>
  );
}

export default Login;
