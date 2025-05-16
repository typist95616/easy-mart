"use client";

import { SingleReview } from "@/app/types/SingleReview";
import "./SingleReviewBox.scss";
import star from "../../../public/images/star.png";
import filledStar from "../../../public/images/filled-star.png";
import Image from "next/image";

interface SingleReviewBoxProps {
    review: SingleReview;
}

export default function SingleReviewBox(props: SingleReviewBoxProps) {

    const totalStarCount = 5;
    const emptyStarCount = 5 - props.review.star;

    return (
        <div className="singleReviewBox-root">
            <div className="singleReviewBox-header">{props.review.header}</div>
            <div className="singleReviewBox-starBox">
                {Array.from({ length: props.review.star }).map((_, idx) => (
                    <Image src={filledStar} alt="filled-star" className="singleReviewBox-star"></Image>
                ))}
                {Array.from({ length: emptyStarCount }).map((_, idx) => (
                    <Image src={star} alt="empty-star" className="singleReviewBox-star"></Image>
                ))}
            </div>
            <div className="singleReviewBox-detail">{props.review.detail}</div>
        </div>
    )
}