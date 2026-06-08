<?php

namespace Database\Seeders;

use App\Models\Slider;
use Illuminate\Database\Seeder;

class SliderSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $sliders = [
            [
                'id' => 1,
                'title' => 'Fresh Vegetables',
                'image' => '/images/slider1.jpg'
            ],
            [
                'id' => 2,
                'title' => 'Organic Fruits',
                'image' => '/images/slider2.jpg'
            ],
            [
                'id' => 3,
                'title' => 'Daily Grocery',
                'image' => '/images/slider3.jpg'
            ]
        ];

        foreach ($sliders as $slider) {
            Slider::updateOrCreate(['id' => $slider['id']], $slider);
        }
    }
}
