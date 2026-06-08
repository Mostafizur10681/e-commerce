<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $products = [
            [
                'id' => 1,
                'name' => 'Fresh Tomato',
                'description' => 'Organic fresh tomato from local farms.',
                'price' => 120,
                'image' => '/images/product1.jpg'
            ],
            [
                'id' => 2,
                'name' => 'Apple',
                'description' => 'Imported premium quality apples.',
                'price' => 250,
                'image' => '/images/product2.jpg'
            ],
            [
                'id' => 3,
                'name' => 'Organic Honey',
                'description' => 'Pure raw organic forest honey.',
                'price' => 650,
                'image' => '/images/product3.jpg'
            ],
            [
                'id' => 4,
                'name' => 'Fresh Spinach',
                'description' => 'Crisp and fresh organic spinach leaves.',
                'price' => 45,
                'image' => '/images/product4.jpg'
            ],
            [
                'id' => 5,
                'name' => 'River Hilsa Fish',
                'description' => 'Freshly caught premium river Hilsa fish.',
                'price' => 1200,
                'image' => '/images/product5.jpg'
            ],
            [
                'id' => 6,
                'name' => 'Organic Ghee',
                'description' => 'Pure cow ghee made with traditional methods.',
                'price' => 950,
                'image' => '/images/product6.jpg'
            ],
            [
                'id' => 7,
                'name' => 'Country Chicken',
                'description' => 'Fresh premium antibiotic-free country chicken.',
                'price' => 380,
                'image' => '/images/product7.jpg'
            ],
            [
                'id' => 8,
                'name' => 'Organic Dates',
                'description' => 'Premium quality sweet organic dates.',
                'price' => 450,
                'image' => '/images/product8.jpg'
            ]
        ];

        foreach ($products as $product) {
            Product::updateOrCreate(['id' => $product['id']], $product);
        }
    }
}
