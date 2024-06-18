<?php

namespace App\Services;
use App\Models\Review;

class ReviewService{
    
    public function store(array $data){
        $review = Review::create($data);
        return $review;
    }
    public function getSingleReview($id){
        return Review::findOrFail($id);
    }
}