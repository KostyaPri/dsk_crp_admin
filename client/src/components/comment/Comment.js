import moreIcon from "../../assets/more-icon.svg"
import heartIcon from "../../assets/heart-icon.svg"
import heartEmptyIcon from "../../assets/heart-empty-icon.svg"
import { useEffect, useRef, useState } from "react";
import useCommentService from "../../services/CommentService";

const Comment = ({ data }) => {
    const [openMenu, setOpenMenu] = useState(false);
    const popupRef = useRef(null);
    const {deleteComment, process, setProcess, error} = useCommentService();

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (popupRef.current && !popupRef.current.contains(e.target)) {
                setOpenMenu(false);
            }
        };

        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    const toggleMenu = () => {
        setOpenMenu(!openMenu);
    }

    const onDelete = (id) => {
        deleteComment(id)
        .then(data => {
            setProcess('confirmed');
            window.location.reload();
        })
        .catch(err => {
            console.log(err);
            alert(err);
        })
    }

    return (
        <div className="comment__item">
            <div className="comment__item__header" ref={popupRef}>
                <p className="comment__item__name">{data.username}</p>
                <img
                    className="comment__item__more"
                    src={moreIcon}
                    alt="more"
                    onClick={() => toggleMenu()}
                />
                {openMenu &&
                    <ul className="comment__more-list">
                        {
                            process === "loading" ? <li className="table__more-list-first">Loading...</li> :
                            <>
                                <li
                                    className="table__more-list-first"
                                    onClick={() => onDelete(data.id)}
                                >Remove</li>
                            </>
                        }
                    </ul>
                }
            </div>
            <p className="comment__item__descr">{data.text}</p>
            <div className="comment__rating">
                {[...Array(5)].map((_, index) => {
                    if (index < data.rating) {
                        return <img src={heartIcon} alt="" />
                    } else {
                        return <img src={heartEmptyIcon} alt="" />
                    }
                })}
            </div>
        </div>
    );
};

export default Comment;