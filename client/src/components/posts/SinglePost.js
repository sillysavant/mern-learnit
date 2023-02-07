import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import ActionButtons from "./ActionButtons";

const SinglePost = ({ post: { _id, status, title, description, url } }) => {
  return (
    <>
      <Card
        className='shadow'
        border={
          status === "LEARNING"
            ? "warning"
            : status === "LEARNED"
            ? "success"
            : "danger"
        }
      >
        <Card.Body>
          <Card.Title>
            <Container fluid='true'>
              <Row>
                <Col>
                  <p className='post-title'>{title}</p>
                  <Badge
                    pill
                    bg={
                      status === "LEARNING"
                        ? "warning"
                        : status === "LEARNED"
                        ? "success"
                        : "danger"
                    }
                  >
                    {status}
                  </Badge>
                </Col>

                <Col className='pe-0'>
                  <ActionButtons url={url} id={_id} />
                </Col>
              </Row>
            </Container>
          </Card.Title>

          <Card.Text>{description}</Card.Text>
        </Card.Body>
      </Card>
    </>
  );
};

export default SinglePost;
