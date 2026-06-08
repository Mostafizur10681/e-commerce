<?php

namespace Database\Seeders;

use App\Models\Review;
use Illuminate\Database\Seeder;

class ReviewSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $reviews = [
            [
                'id' => 1,
                'name' => 'Rahim',
                'rating' => 5,
                'comment' => 'Excellent service and fresh products.',
                'image' => '/images/customer1.jpg'
            ],
            [
                'id' => 2,
                'name' => 'Karim',
                'rating' => 4,
                'comment' => 'Fast delivery and good packaging.',
                'image' => '/images/customer2.jpg'
            ],
            [
                'id' => 3,
                'name' => 'Sadia',
                'rating' => 5,
                'comment' => 'The organic honey and ghee are top notch! Recommended.',
                'image' => '/images/customer3.jpg'
            ],
            [
                'id' => 4,
                'name' => 'Anis',
                'rating' => 5,
                'comment' => 'Very fresh vegetables. The tomato was extremely sweet.',
                'image' => '/images/customer4.jpg'
            ]
        ];

        foreach ($reviews as $review) {
            Review::updateOrCreate(['id' => $review['id']], $review);
        }
    }
}
