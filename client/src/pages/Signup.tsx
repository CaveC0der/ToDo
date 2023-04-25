import { FC, useContext } from 'react';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import GlobalContext from '../GlobalContext';
import { IUserSignup } from '../types/IUser';
import { useForm } from 'react-hook-form';
import FormLabeledGroup from '../components/form_components/FormLabeledGroup';

const Signup: FC = observer(() => {
  const { userStore } = useContext(GlobalContext);
  const { register, handleSubmit, reset } = useForm<IUserSignup>();

  const signup = async (data: IUserSignup) => {
    await userStore.signup(data);
    reset();
  };

  return (
    <Container>
      <Row className='vh-100 d-flex justify-content-center align-items-center'>
        <Col lg={6} md={8} xs={12}>
          <Card className='shadow'>
            <Card.Body>
              <Card.Title className='text-center'>Sign up</Card.Title>
              <Form onSubmit={handleSubmit(signup)}>
                <FormLabeledGroup label='Email address' className='mb-3' controlId='sf-username'>
                  <Form.Control type='text' placeholder='username'
                                {...register('username', { required: true })} />
                </FormLabeledGroup>
                <FormLabeledGroup label='Email address' className='mb-3' controlId='sf-email'>
                  <Form.Control type='email' placeholder='example@mail.com'
                                {...register('email', { required: true })} />
                </FormLabeledGroup>
                <FormLabeledGroup label='Password' className='mb-3' controlId='sf-password'>
                  <Form.Control type='password' placeholder='password'
                                {...register('password', { required: true })} />
                </FormLabeledGroup>
                <Button className='w-100 mb-3' variant='primary' type='submit'>Sign up</Button>
              </Form>
              <NavLink className='btn btn-secondary w-100' to='/login'>Login</NavLink>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
});

export default Signup;
