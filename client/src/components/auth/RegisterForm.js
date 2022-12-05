import { useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

const RegisterForm = () => {
  // Context
  const { registerUser } = useContext(AuthContext);

  // Router
  const navigate = useNavigate();

  // Local state
  const [registerForm, setRegisterForm] = useState({
    email: "",
    username: "",
    password: "",
  });

  const { email, username, password } = registerForm;

  const onChangeRegisterForm = async (event) => {
    setRegisterForm({
      ...registerForm,
      [event.target.name]: event.target.value,
    });
  };

  const register = async (event) => {
    event.preventDefault();

    try {
      const registerData = await registerUser(registerForm);
      if (registerData.success) {
        navigate("/dashboard");
      } else {
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Form className='my-4' onSubmit={register}>
        <Form.Group>
          <Form.Control
            type='text'
            placeholder='Email'
            name='email'
            onChange={onChangeRegisterForm}
            value={email}
          />
        </Form.Group>

        <Form.Group className='mt-2'>
          <Form.Control
            type='text'
            placeholder='Username'
            name='username'
            onChange={onChangeRegisterForm}
            value={username}
            required
          />
        </Form.Group>

        <Form.Group className='mt-2'>
          <Form.Control
            type='password'
            placeholder='Password'
            name='password'
            onChange={onChangeRegisterForm}
            value={password}
            required
          />
        </Form.Group>

        <Form.Group className='mt-4'>
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
  );
};

export default RegisterForm;
