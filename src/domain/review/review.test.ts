import {UserId} from "../value-object/user-id";
import {Rating} from "./value-object/rating";
import {Review} from "./entity/review";
import {RestaurantId} from "../value-object/restuarant-id";
import {ReviewId} from "./value-object/review-id";

describe('Review', () => {
    const userId = new UserId(1)
    const restaurantId = new RestaurantId(1)
    const title = 'title'
    const reviewText = 'reviewText'
    const rating = new Rating(5)
    const reviewId = new ReviewId(1)
    let review: Review;

    beforeEach(() => {
        review = Review.create(reviewId,userId, restaurantId, title, reviewText, rating)
    })

    it('should create a review', () => {
        expect(review.reviewText).toEqual(reviewText)
        expect(review.title).toEqual(title)
        expect(review.rating).toEqual(rating)
        expect(review.userID).toEqual(userId)
        expect(review.restaurantID).toEqual(restaurantId)
    })

    it('should update the title', () => {
        const newTitle = 'newTitle'
        review.updateTitle(newTitle)
        expect(review.title).toEqual(newTitle)
    })

    it('should update the review text', () => {
        const newReviewText = 'newReviewText'
        review.updateReviewText(newReviewText)
        expect(review.reviewText).toEqual(newReviewText)
    })

    it('should update the rating', () => {
        const newRating = new Rating(6)
        review.updateRating(newRating)
        expect(review.rating).toEqual(newRating)
    })

    it('should update the restaurant id', () => {
        const newRestaurantId = new RestaurantId(2)
        review.updateRestaurantId(newRestaurantId)
        expect(review.restaurantID).toEqual(newRestaurantId)
    })

    it('should incorrect rating', function () {
        const t = () => {
            const newRating = new Rating(11)
            review.updateRating(newRating)
        }
        expect(t).toThrowError('Неверный рейтинг')
    });
})
