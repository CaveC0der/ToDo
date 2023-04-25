import { FC } from 'react';
import { Col, Container, Row, Spinner } from 'react-bootstrap';
import './Loader.css';

interface LoaderProps {
  size: 'lg' | 'sm';
}

const Loader: FC<LoaderProps> = ({ size }) => {
  return (
    <Container>
      <Row className={`${size === 'lg' ? 'vh-100' : ''} d-flex justify-content-center align-items-center`}>
        <Col lg={6} md={8} xs={12} className='d-flex justify-content-center align-items-center'>
          <Spinner className={size} animation='border' role='status' />
        </Col>
      </Row>
    </Container>
  );
};

export default Loader;

