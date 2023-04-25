import { FC } from 'react';
import { Form, FormGroupProps } from 'react-bootstrap';

interface FormLabeledGroupProps extends FormGroupProps {
  label: string;
}

const FormLabeledGroup: FC<FormLabeledGroupProps> = ({ className, controlId, label, children, ...props }) => {
  return (
    <Form.Group className={className} controlId={controlId} {...props}>
      <Form.Label>{label}</Form.Label>
      {children}
    </Form.Group>
  );
};

export default FormLabeledGroup;

