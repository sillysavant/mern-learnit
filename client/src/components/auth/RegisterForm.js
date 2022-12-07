import { useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

const RegisterForm = () => {
  // Context
  const { registerUser } = useContext(AuthContext);

  // Local state
  const [registerForm, setRegisterForm] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [alert, setAlert] = useState(null);

  const { email, username, password, confirmPassword } = registerForm;

  const onChangeRegisterForm = async (event) => {
    setRegisterForm({
      ...registerForm,
      [event.target.name]: event.target.value,
    });
  };

  const register = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setAlert({ type: "danger", message: "Password does not match" });
      setTimeout(() => setAlert(null), 5000);
      return;
    }

    try {
      const registerData = await registerUser(registerForm);
      if (!registerData.success) {
        setAlert({ type: "danger", message: registerData.message });
        setTimeout(() => setAlert(null), 5000);
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

        <Form.Group className='mt-2'>
          <Form.Control
            type='password'
            placeholder='Confirm Password'
            name='confirmPassword'
            onChange={onChangeRegisterForm}
            value={confirmPassword}
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
          <Button variant='info' size='sm' className='ms-2'>
            Login
          </Button>
        </Link>
      </p>
    </>
  );
};

export default RegisterForm;
