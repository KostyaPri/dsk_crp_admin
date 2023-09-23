import { useState } from "react";


const HeartRating = ({rating, setRating}) => {
    // const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);

    const handleRating = (value) => {
        setRating(value);
    };

    const handleMouseEnter = (value) => {
        setHoverRating(value);
    };

    const handleMouseLeave = () => {
        setHoverRating(0);
    };

    return (
        <div className="rating">
            <div className="rating__wrapper">
                {[...Array(5)].map((_, index) => (
                    <Heart
                        key={index}
                        filled={index < (hoverRating || rating)}
                        onClick={() => handleRating(index + 1)}
                        onMouseEnter={() => handleMouseEnter(index + 1)}
                        onMouseLeave={handleMouseLeave}
                    />
                ))}
            </div>
        </div>
    );
};

const Heart = ({ filled, onClick, onMouseEnter, onMouseLeave }) => {
    return (
        <span
            className="heart"
            style={{ "width": "40px" }}
            onClick={onClick}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            {filled ?
                <svg xmlns="http://www.w3.org/2000/svg" width="26" height="24" viewBox="0 0 26 24" fill="none">
                    <path fillRule="evenodd" clipRule="evenodd" d="M7.47309 1.01504C9.29309 1.1469 11.1911 2.03647 13.0074 3.83233C14.8237 2.03461 16.7198 1.14875 18.538 1.02061C20.592 0.873897 22.4064 1.70404 23.7194 3.01333C26.3008 5.58733 27.1124 10.2469 23.9088 13.4505C23.8979 13.4613 23.8868 13.4718 23.8754 13.482L13.6314 22.7622C13.4605 22.9172 13.2381 23.0031 13.0074 23.0031C12.7767 23.0031 12.5542 22.9172 12.3834 22.7622L2.13938 13.482C2.12797 13.4718 2.11683 13.4613 2.10595 13.4505C-1.11434 10.2302 -0.308335 5.57061 2.28238 2.99847C3.59909 1.69104 5.41724 0.866468 7.47309 1.01504Z" fill="#13A4BD" />
                </svg>
                :
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14"  width="26" height="24"><g id="heart--reward-social-rating-media-heart-it-like-favorite-love"><path id="Vector" stroke="#13A4BD" strokeLinecap="round" strokeLinejoin="round" d="M7.004 12.383 1.53 7.424c-2.975-2.975 1.398-8.688 5.474-4.066 4.076-4.622 8.43 1.11 5.475 4.066l-5.475 4.959Z"></path></g></svg>
            }
        </span>
    )
}

export default HeartRating;