import React, { useContext } from "react";
import Button from "react-bootstrap/Button";
import playIcon from "../../assets/link-svgrepo-com.svg";
import editIcon from "../../assets/pencil.svg";
import deleteIcon from "../../assets/trash.svg";
import { PostContext } from "../../contexts/PostContext";

const ActionButtons = ({ url, _id }) => {
  const { deletePost } = useContext(PostContext);

  return (
    <>
      <Button className='post-button' href={url} target='_blank'>
        <img src={playIcon} alt='play' width='24' height='24' />
      </Button>

      <Button className='post-button'>
        <img src={editIcon} alt='edit' width='24' height='24' />
      </Button>

      <Button className='post-button' onClick={deletePost.bind(this, _id)}>
        <img src={deleteIcon} alt='delete' width='24' height='24' />
      </Button>
    </>
  );
};

export default ActionButtons;
