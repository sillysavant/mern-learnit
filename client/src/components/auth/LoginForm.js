import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

const LoginForm = () => {
  return <Form>
      <Form.Group>
        <Form.Control type='text' placeholder='Username' name='username' required />
      </Form.Group>

      <Form.Group>
        <Form.Control type='text' placeholder='Password' name='password' required />
      </Form.Group>

      <Form.Group>
        <Button variant='success' type='submit'>Login</Button>
      </Form.Group>
    </Form>
}

export default LoginForm