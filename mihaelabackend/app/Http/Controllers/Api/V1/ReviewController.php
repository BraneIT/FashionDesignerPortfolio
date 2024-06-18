<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\Review\StoreReviewRequest;
use App\Http\Resources\V1\ReviewCollection;
use App\Http\Resources\V1\ReviewResource;
use App\Models\Review;
use App\Services\ReviewService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ReviewController extends Controller
{
    protected ReviewService $reviewService;

    public function __construct(ReviewService $reviewService){
        $this->reviewService = $reviewService;
    }

    /**
     * Retrieves a paginated list of reviews.
     *
     * @return JsonResponse Returns a JSON response containing the reviews data and a success message if successful. If no reviews are found, returns a JSON response with an error message and a 404 status code. If an error occurs while fetching the reviews, returns a JSON response with an error message and a 500 status code.
     */
    public function index() : JsonResponse
    {
        try{
        $reviews = Review::select('id', 'full_name', 'rate', 'comment')->paginate(10);

        if($reviews->isEmpty()){
            return response()->json([
                'message' => 'No reviews found',
            ], 404);
        }
        return response()->json([
            'message' => 'Reviews fetched successfully',
            'data' => new ReviewCollection($reviews)
        ], 200);
        }catch(\Exception $e){
            return response()->json([
                'message' => 'Error while fetching reviews',
                'error' => $e
            ], 500);
        }
    }

    /**
     * Retrieves a single review.
     *
     * @param Review $review The review object to retrieve.
     * @throws \Exception Error while getting review
     * @return JsonResponse Returns a JSON response with the fetched review data if successful. If the review is not found, returns a JSON response with a 404 status code. If an error occurs, returns a JSON response with a 500 status code.
     */
    public function show(Review $review){
        try{
            $review = $this->reviewService->getSingleReview($review->id);

            if(!$review){
                return response()->json([
                    'message' => 'Review not found',
                ], 404);
            }
            return response()->json([
                'data' => new ReviewResource($review)
            ], 200);
        }catch(\Exception $e){
            return response()->json([
                'message' => 'Error while getting review',
                'error' => $e
            ], 500);
        }
    }

    /**
     * Stores a review based on the validated request data.
     *
     * @param StoreReviewRequest $request The validated request data for storing the review.
     * @return JsonResponse The JSON response containing the stored review data or an error message.
     * @throws \Exception If an error occurs while creating the review.
     */
    public function store(StoreReviewRequest $request){
        try{
            $review = $this->reviewService->store($request->validated());
            return response()->json([
                'data' => new ReviewResource($review)
            ], 200);

        }catch(\Exception $e){
            return response()->json([
                'message' => 'Error while creating review',
                'error' => $e
            ], 500);
        }
    }

    public function destroy(Review $review){
        try{
            if(!$review){
                return response()->json([
                    'message' => 'Review not found',
                ], 404);
            } 

            $review->delete();
            return response()->json([
                'message' => 'Review deleted successfully',
            ], 200);

        }catch(\Exception $e){
            return response()->json([
                'message' => 'Review while getting review',
                'error' => $e
            ], 500);
        }
    }
}
