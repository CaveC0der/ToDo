import { FC, useContext } from 'react';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import GlobalContext from '../GlobalContext';
import { useForm } from 'react-hook-form';
import { IUserLogin } from '../types/IUser';
import { observer } from 'mobx-react-lite';
import FormLabeledGroup from '../components/form_components/FormLabeledGroup';

const Login: FC = observer(() => {
  const { userStore } = useContext(GlobalContext);
  const { register, handleSubmit, reset } = useForm<IUserLogin>();

  const login = async (data: IUserLogin) => {
    await userStore.login(data);
    reset();
  };

  return (
    <Container>
      <Row className='vh-100 d-flex justify-content-center align-items-center'>
        <Col lg={6} md={8} xs={12}>
          <Card className='shadow'>
            <Card.Body>
              <Card.Title className='text-center'>Login</Card.Title>
              <Form onSubmit={handleSubmit(login)}>
                <FormLabeledGroup label='Email address' className='mb-3' controlId='lf-email'>
                  <Form.Control type='email' placeholder='example@mail.com'
                                {...register('email', { required: true })} />
                </FormLabeledGroup>
                <FormLabeledGroup label='Password' className='mb-3' controlId='lf-password'>
                  <Form.Control type='password' placeholder='password'
                                {...register('password', { required: true })} />
                </FormLabeledGroup>
                <Button className='w-100 mb-3' variant='primary' type='submit'>Login</Button>
              </Form>
              <NavLink className='btn btn-secondary w-100' to='/signup'>Sign up</NavLink>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
});

export default Login;
