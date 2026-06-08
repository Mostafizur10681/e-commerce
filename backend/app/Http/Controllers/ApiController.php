<?php

namespace App\Http\Controllers;

use App\Models\Slider;
use App\Models\Category;
use App\Models\Product;
use App\Models\Review;
use Illuminate\Http\JsonResponse;

class ApiController extends Controller
{
    /**
     * Get all sliders.
     */
    public function sliders(): JsonResponse
    {
        $sliders = Slider::all();
        return response()->json($sliders);
    }

    /**
     * Get all categories.
     */
    public function categories(): JsonResponse
    {
        $categories = Category::all();
        return response()->json($categories);
    }

    /**
     * Get all products.
     */
    public function products(): JsonResponse
    {
        $products = Product::all();
        return response()->json($products);
    }

    /**
     * Get all reviews.
     */
    public function reviews(): JsonResponse
    {
        $reviews = Review::all();
        return response()->json($reviews);
    }
}
