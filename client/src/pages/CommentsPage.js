import CreateComment from "../components/createComment/CreateComment";
import Comment from "../components/comment/Comment";
import useCommentService from "../services/CommentService";
import { useEffect, useState } from "react";

const CommentsPage = () => {
    const [comments, setComments] = useState([]);
    const { getComment, process, setProcess, error } = useCommentService();

    useEffect(() => {
        getComment()
            .then(data => {
                setComments(data);
                setProcess('confirmed');
            })
            .catch(err => console.log(err));
    }, []);

    return (
        <div className="comment">
            <div className="comment__wrapper">
                <CreateComment />
                {comments.reverse().map(item => <Comment key={item.id} data={item}/>)}
            </div>
        </div>
    );
};

export default CommentsPage;