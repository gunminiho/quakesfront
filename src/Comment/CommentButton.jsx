import Button from 'react-bootstrap/Button';
import CommentList from './CommentList';

const CommentButton = ({earthquakeId}) => {
    return (
        <Button variant="primary">
        <CommentList earthquakeId={earthquakeId}/>
        </Button>
    );
    };

export default CommentButton;