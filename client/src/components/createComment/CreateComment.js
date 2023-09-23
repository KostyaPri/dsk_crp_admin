import { Formik, Form, Field } from "formik";
import HeartRating from "../heartRating/HeartRating";
import { useState } from "react";
import useCommentService from "../../services/CommentService";

const initialValues = {
    username: '',
    text: '',
};

const CreateComment = () => {
    const [rating, setRating] = useState(0);
    const {addComment, process, setProcess, error} = useCommentService();

    const handleSubmit = (values) => {
        const data = {...values, rating}
        
        addComment(data)
        .then(data => {
            setProcess('confirmed');
            window.location.reload();
        })
        .catch((err) => {
            console.log(err);
        })
    };

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
        >
            <Form className="comment__form">
                <Field
                    type="text"
                    id="username"
                    name="username"
                    className="comment__form__input"
                />
                <Field
                    id="text"
                    name="text"
                    component="textarea"
                    className="comment__form__input"
                />
                <div className="comment__form__footer">
                    <HeartRating rating={rating} setRating={setRating}/>
                    <button className="comment__form__btn">Save</button>
                </div>
            </Form>
        </Formik>
    );
};

export default CreateComment;