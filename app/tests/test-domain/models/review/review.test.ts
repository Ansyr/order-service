import {UserId} from "../../../../src/domain/value-object/user-id";
import {Rating} from "../../../../src/domain/review/value-object/rating";
import {Review} from "../../../../src/domain/review/entity/review";
import {RestaurantId} from "../../../../src/domain/value-object/restuarant-id";
import {ReviewId} from "../../../../src/domain/review/value-object/review-id";
import {randomUUID} from "crypto";

describe('Review', () => {
    const userId = new UserId(randomUUID())
    const restaurantId = new RestaurantId(randomUUID())
    const title = 'title'
    const reviewText = 'reviewText'
    const rating = new Rating(5)
    const reviewId = new ReviewId(randomUUID())
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
