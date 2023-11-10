import {UserId} from "../../value-object/user-id";
import {Rating} from "../value-object/rating";
import {RestaurantId} from "../../value-object/restuarant-id";
import {ReviewId} from "../value-object/review-id";

export class Review{
    private constructor(
        public id: ReviewId,
        public userID: UserId,
        public restaurantID: RestaurantId,
        public title: string,
        public reviewText: string,
        public rating: Rating
    ) {
    }
    static create(reviewID: ReviewId,userID: UserId, restaurantID: RestaurantId, title: string, reviewText: string, rating: Rating): Review{
        return new Review(reviewID,userID, restaurantID, title, reviewText, rating);
    }
    updateTitle(newTitle: string): void{
        this.title = newTitle;
    }
    updateReviewText(newReviewText: string): void{
        this.reviewText = newReviewText
    }
    updateRating(newRating: Rating): void{
        this.rating = newRating
    }
    updateRestaurantId(newRestaurantId: RestaurantId): void{
        this.restaurantID = newRestaurantId
    }
}
