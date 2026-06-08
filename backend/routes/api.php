<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ApiController;

Route::get('/sliders', [ApiController::class, 'sliders']);
Route::get('/categories', [ApiController::class, 'categories']);
Route::get('/products', [ApiController::class, 'products']);
Route::get('/reviews', [ApiController::class, 'reviews']);
