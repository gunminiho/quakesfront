import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import axios from "axios";
import baseUrl from "../endpoint";
import Alert from 'react-bootstrap/Alert';

function CommentList({ earthquakeId }) {
  const [show, setShow] = useState(false);
  const [comments, setComments] = useState([]);
  const [commentLoaded, setCommentLoaded] = useState(false);
  const [newComment, setNewComment] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    
    if (show) {
      axios
        .get(`${baseUrl()}/${earthquakeId}/comments`)
        .then(({ data }) => {
            if(data.message === "No comments found"){
                setCommentLoaded(false);
                return false;
            } 
          setComments(data.data);
          setCommentLoaded(true);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [show, earthquakeId]);

  const postComment = async () => {
    try {
      if (newComment.length < 10) return alert("Comments should be longer than 10 characters");
      const response = await axios.post(
        `${baseUrl()}/${earthquakeId}/comments`,
        {
          body: newComment,
        }
      );
      console.log(response);
      if (response.status === 200) {
        alert("Comment posted successfully");
        setNewComment("");
      } else {
        alert("Comment not posted");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Button variant="primary p-2 m-2" onClick={handleShow}>
        comment here!
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Tell us about this 'quake!</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ maxHeight: "350px", overflowY: "auto" }}>
            {!commentLoaded && <Alert variant="primary">No comments found be the first using the box bellow!</Alert>}
          <ol className="list-group list-group-numbered">
            {commentLoaded &&
              comments.map((comment, index) => {
                const commentDate = new Date(comment.created_at);
                const currentDate = new Date();
                const timeDiff = Math.abs(currentDate - commentDate);
                const hoursDiff = Math.ceil(timeDiff / (1000 * 60 * 60));

                return (
                  <li
                    key={index}
                    className="list-group-item d-flex justify-content-between align-items-start"
                  >
                    <div className="ms-2 me-auto">
                      <div className="fw-bold">{comment.body}</div>
                      Commented on:{" "}
                      <time dateTime={comment.created_at}>
                        {new Date(comment.created_at).toLocaleString()}
                      </time>
                      {hoursDiff <= 1 && (
                        <span className="badge text-bg-primary rounded-pill">
                          New{" "}
                          {/*Si el comentario tiene menos de 1 hora de comentado le pone "New"*/}
                        </span>
                      )}
                    </div>
                  </li>
                );
              })}
          </ol>
        </Modal.Body>
        <Modal.Footer className="d-flex flex-column mb-1">
          <div>
            <FloatingLabel
              controlId="floatingTextarea2"
              label="Leave a comment here"
            >
              <Form.Control
                as="textarea"
                placeholder="Leave a comment here"
                style={{ resize: "vertical", minHeight: "150px" }} // no funciona el field-sizing: content  T.T aun
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />
            </FloatingLabel>
          </div>
          <div>
            <Button variant="secondary" onClick={handleClose} className="mx-2">
              Close
            </Button>
            <Button
              variant="primary"
              onClick={() => postComment()}
              className="mx-2"
            >
              comment
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CommentList;
