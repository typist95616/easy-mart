"use client";

import "./ProductReview.scss";
import star from "../../../public/images/star.png";
import filledStar from "../../../public/images/filled-star.png";
import Image from "next/image";
import SingleReviewBox from "./SingleReviewBox";

export default function ProductReview() {

    const fiveStarRating = 90;
    const fourStarRating = 80;
    const threeStarRating = 30;
    const twoStarRating = 10;
    const oneStarRating = 8;

    const Review = {
        header: "Perfect Combination!!",
        star: 4,
        detail: "This review was collected as part of a promotion.] I forgot to post my photos from my review! So here is my review again. A perfect combination of softness, strength, and proper friction to make any user leaving clean and spotless!! I have been purchasing for years and Angel Soft isn't too thick where you think you are using a towel and it's not too thin leaving you with unexpected tears during use!! Some say I have an addition to Angel Soft, I say it's dedication for a great product!! See the attached photos from my last purchase!"
    }

    return (
        <div className="productReview-root">
            <div className="productReview-customerReview">
                <div className="productReview-customerReview-header">Customer Reviews</div>
                <div className="productReview-customerReview-rating">Average rating: 4.5 (5391)</div>
                <div className="productReview-5star rating-row">
                    <div className="productReview-rating-text">5</div>
                    <Image src={star} alt="empty-star" className="productReview-star"></Image>
                    <div className="productReview-5star-bar star-bar">
                        <div className="productReview-5star-bar-fill" style={{ width: `${fiveStarRating}%` }}></div>
                    </div>
                    <div className="productReview-ratingCount">• 4.28K</div>
                </div>
                <div className="productReview-4star rating-row">
                    <div className="productReview-rating-text">4</div>
                    <Image src={star} alt="empty-star" className="productReview-star"></Image>
                    <div className="productReview-4star-bar star-bar">
                        <div className="productReview-4star-bar-fill" style={{ width: `${fourStarRating}%` }}></div>
                    </div>
                    <div className="productReview-ratingCount">• 4.28K</div>
                </div>
                <div className="productReview-3star rating-row">
                    <div className="productReview-rating-text">3</div>
                    <Image src={star} alt="empty-star" className="productReview-star"></Image>
                    <div className="productReview-3star-bar star-bar">
                        <div className="productReview-3star-bar-fill" style={{ width: `${threeStarRating}%` }}></div>
                    </div>
                    <div className="productReview-ratingCount">• 4.28K</div>
                </div>
                <div className="productReview-2star rating-row">
                    <div className="productReview-rating-text">2</div>
                    <Image src={star} alt="empty-star" className="productReview-star"></Image>
                    <div className="productReview-2star-bar star-bar">
                        <div className="productReview-2star-bar-fill" style={{ width: `${twoStarRating}%` }}></div>
                    </div>
                    <div className="productReview-ratingCount">• 4.28K</div>
                </div>
                <div className="productReview-1star rating-row">
                    <div className="productReview-rating-text">1</div>
                    <Image src={star} alt="empty-star" className="productReview-star"></Image>
                    <div className="productReview-1star-bar star-bar">
                        <div className="productReview-1star-bar-fill" style={{ width: `${oneStarRating}%` }}></div>
                    </div>
                    <div className="productReview-ratingCount">• 4.28K</div>
                </div>
            </div>
            <div className="productReview-recentReview">
                <div className="productReview-recentReview-header">Reviews</div>
                <SingleReviewBox review={Review} ></SingleReviewBox>
                <SingleReviewBox review={Review}></SingleReviewBox>
            </div>
        </div>
    )
}