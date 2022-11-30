import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

const LoginForm = () => {
  const [loginForm, setLoginForm] = useState({
    username: "",
    password: "",
  });

  const { username, password } = loginForm;

  const onChangeLoginForm = (event) =>
    setLoginForm({ ...loginForm, [event.target.name]: event.target.value });

  return (
    <>
      <Form className='my-4'>
        <Form.Group>
          <Form.Control
            type='text'
            placeholder='Username'
            name='username'
            value={username}
            onChange={onChangeLoginForm}
            required
          />
        </Form.Group>

        <Form.Group className='mt-2'>
          <Form.Control
            type='password'
            placeholder='Password'
            name='password'
            value={password}
            onChange={onChangeLoginForm}
            required
          />
        </Form.Group>

        <Form.Group className='mt-4'>
          <Button variant='success' type='submit'>
            Login
          </Button>
        </Form.Group>
      </Form>

      <p>
        Don't have an account?
        <Link to='/register'>
          <Button variant='info' size='sm' className='ml-2'>
            Register
          </Button>
        </Link>
      </p>
    </>
  );
};

export default LoginForm;
