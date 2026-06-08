<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            [
                'id' => 1,
                'name' => 'Vegetables',
                'image' => '/images/category1.png'
            ],
            [
                'id' => 2,
                'name' => 'Fruits',
                'image' => '/images/category2.png'
            ],
            [
                'id' => 3,
                'name' => 'Fish',
                'image' => '/images/category3.png'
            ],
            [
                'id' => 4,
                'name' => 'Meat',
                'image' => '/images/category4.png'
            ],
            [
                'id' => 5,
                'name' => 'Dairy & Eggs',
                'image' => '/images/category5.png'
            ],
            [
                'id' => 6,
                'name' => 'Honey & Nuts',
                'image' => '/images/category6.png'
            ]
        ];

        foreach ($categories as $category) {
            Category::updateOrCreate(['id' => $category['id']], $category);
        }
    }
}
