import React, { useContext, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { PostContext } from "../../contexts/PostContext";

const AddPostModal = () => {
  // Context
  const { showAddPostModal, setShowAddPostModal, addPost, setShowToast } =
    useContext(PostContext);

  // State
  const [newPost, setNewPost] = useState({
    title: "",
    description: "",
    url: "",
    status: "TO LEARN",
  });

  const { title, description, url } = newPost;

  const onChangeNewPostForm = (event) =>
    setNewPost({ ...newPost, [event.target.name]: event.target.value });

  const resetAddPostModal = () => {
    setNewPost({ title: "", description: "", url: "" });
    setShowAddPostModal(false);
  };

  const addNewPost = async (event) => {
    event.preventDefault();

    const { success, message } = await addPost(newPost);

    resetAddPostModal();

    setShowToast({ show: true, message, type: success ? "success" : "danger" });
  };

  return (
    <Modal show={showAddPostModal} onHide={resetAddPostModal}>
      <Modal.Header closeButton>
        <Modal.Title>What do you want to learn?</Modal.Title>
      </Modal.Header>

      <Form onSubmit={addNewPost}>
        <Modal.Body>
          <Form.Group>
            <Form.Control
              type='text'
              placeholder='Title'
              name='title'
              value={title}
              onChange={onChangeNewPostForm}
              required
              aria-describedby='title-help'
            />
            <Form.Text id='title-help' muted>
              Required
            </Form.Text>
          </Form.Group>
          <Form.Group className='my-3'>
            <Form.Control
              as='textarea'
              rows={3}
              placeholder='Description'
              name='description'
              value={description}
              onChange={onChangeNewPostForm}
            />
          </Form.Group>
          <Form.Group className='mt-3'>
            <Form.Control
              type='text'
              placeholder='Documents URL'
              name='url'
              value={url}
              onChange={onChangeNewPostForm}
            />
          </Form.Group>
        </Modal.Body>

        <Modal.Footer>
          <Button variant='secondary' onClick={resetAddPostModal}>
            Cancel
          </Button>
          <Button variant='primary' type='submit'>
            LearnIt!
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default AddPostModal;
