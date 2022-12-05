import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

const LoginForm = () => {
  // Context
  const { loginUser } = useContext(AuthContext);

  // Router
  const navigate = useNavigate();

  // Local state
  const [loginForm, setLoginForm] = useState({
    username: "",
    password: "",
  });

  const { username, password } = loginForm;

  const onChangeLoginForm = (event) =>
    setLoginForm({ ...loginForm, [event.target.name]: event.target.value });

  const login = async (event) => {
    event.preventDefault();

    try {
      const loginData = await loginUser(loginForm);
      if (loginData.success) {
        navigate("/dashboard");
      } else {
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Form className='my-4' onSubmit={login}>
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
