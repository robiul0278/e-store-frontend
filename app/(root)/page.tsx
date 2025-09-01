'use client';

import HeroSection from '@/components/hero/HeroSection';
import FAQ from '@/components/FAQ';
import ProductCard from '@/components/ProductCard';
import CarCategories from '@/components/CarCategories';

const products = [
  {
    id: '1',
    name: 'Ford Mustang GT Toy',
    price: 12.99,
    image: 'https://images-cdn.ubuy.com.sa/66ab89de07956d01a45e73c3-2015-ford-mustang-gt-5-0-orange-metallic.jpg',
    description: 'Metallic die-cast Mustang GT model with detailed interior',
  },
  {
    id: '2',
    name: 'Chevrolet Camaro SS Toy',
    price: 11.99,
    image: 'https://www.rmtoys.co.uk/cdn/shop/products/l1rqmfddxpb_75319c15-9cb2-4c72-ac5d-3cce969ec13c.jpg?v=1745233598',
    description: 'Camaro SS metal toy with opening doors and pull-back action',
  },
  {
    id: '3',
    name: 'Dodge Challenger SRT Toy',
    price: 13.49,
    image: 'https://i.ytimg.com/vi/lpzirYgi9HU/maxresdefault.jpg',
    description: 'Realistic die-cast Dodge Challenger with sleek finish',
  },
{
  id: '4',
  name: 'Tesla Model S Toy Car',
  price: 14.99,
  image: 'https://rukminim2.flixcart.com/image/850/1000/xif0q/vehicle-pull-along/m/3/1/tesla-model-s-toy-car-1-32-scale-alloy-car-diecast-model-toys-original-imagpceutwpf6aap.jpeg?q=90&crop=false',
  description: 'Eco-friendly metallic Tesla Model S miniature car',
},
  {
    id: '5',
    name: 'Ford F-150 Pickup Toy',
    price: 10.99,
    image: 'https://diecastmodelcentre.co.uk/cdn/shop/files/Ford-F-150-Lightning-2022-red-143-Scale-Diecast-Toy-Car-Bburago.png?v=1713565364',
    description: 'Durable die-cast Ford F-150 truck toy for collectors',
  },
  {
    id: '6',
    name: 'Jeep Wrangler Off-Road Toy',
    price: 9.99,
    image: 'https://images.pexels.com/photos/1149137/pexels-photo-1149137.jpeg',
    description: 'Jeep Wrangler off-road edition with realistic suspension',
  },
  {
    id: '7',
    name: 'Cadillac CTS-V Luxury Toy Car',
    price: 13.99,
    image: 'https://i.ytimg.com/vi/U8z0hOURscs/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLBmSt283IKqjWNq8lqStq4OHVe-7w',
    description: 'High-end Cadillac CTS-V die-cast with metallic sheen',
  },
  {
    id: '8',
    name: 'Lincoln Continental Classic Toy',
    price: 15.49,
    image: 'https://i.ebayimg.com/thumbs/images/g/RnsAAOSw~iBniivU/s-l1200.jpg',
    description: 'Vintage Lincoln Continental replica with fine chrome detailing',
  }
];


export default function Home() {
  return (
    <div className="flex flex-col">
      <main className="flex-grow">
        <HeroSection />
        
        <CarCategories/>
        <div className="max-w-7xl mx-auto pt-4 pb-12 px-4 md:p-0 lg:p-0">
          <div className="flex mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-center whitespace-nowrap">
              Featured Products
            </h2>
      
          </div>

          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-5 gap-2 md:gap-5">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>

      </main>
      <FAQ />
    </div>
  );
}