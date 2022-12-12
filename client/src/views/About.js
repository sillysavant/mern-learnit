import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const About = () => {
  return (
    <Row className='mt-5' style={{ marginRight: 0 }}>
      <Col className='text-center'>
        <div className='mb-4'>My first MERN project.</div>

        <div className='mb-4'>
          This app is to help you track what you study.
        </div>

        <Button
          variant='primary'
          href='https://github.com/sillysavant'
          size='lg'
        >
          My Github
        </Button>
      </Col>
    </Row>
  );
};

export default About;
