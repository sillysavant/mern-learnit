import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import {Link} from "react-router-dom"

const RegisterForm = () => {
  return (
  <>
    <Form className="my-4">
      <Form.Group>
        <Form.Control 
          type='text'
          placeholder='Email'
          name='email'
          required
        />
      </Form.Group>

      <Form.Group className="mt-2">
        <Form.Control
          type='text'
          placeholder='Username'
          name='username'
          required
        />
      </Form.Group>

      <Form.Group className="mt-2">
        <Form.Control
          type='text'
          placeholder='Password'
          name='password'
          required
        />
      </Form.Group>

      <Form.Group className="mt-4">
        <Button variant='success' type='submit'>
          Register
        </Button>
      </Form.Group>
    </Form>

    <p>
      Already have an account?
      <Link to='/login'>
        <Button variant='info' size='sm' className='ml-2'>
          Login
        </Button>
      </Link>
    </p>
  </>
  )
};

export default RegisterForm;
