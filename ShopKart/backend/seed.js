import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import Product from './models/product.model.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '.env') });

const products = [
  {
    name: "Retro Mechanical Keyboard",
    description: "Clicky blue switches with a custom neo-brutalist yellow and black keycap set. Perfect for loud typing.",
    price: 4999,
    category: "Electronics",
    image: "/product-images/keyboard.svg",
    stock: 15
  },
  {
    name: "Brutalist Graphic Tee",
    description: "100% heavy cotton oversized tee with a bold, blocky typography design on the back.",
    price: 1299,
    category: "Fashion",
    image: "/product-images/graphic-tee.svg",
    stock: 42
  },
  {
    name: "Noise Cancelling Headphones",
    description: "Block out the haters. High-fidelity audio with active noise cancellation and bold cyan accents.",
    price: 8999,
    category: "Electronics",
    image: "/product-images/headphones.svg",
    stock: 8
  },
  {
    name: "Grid Notebook",
    description: "A5 notebook with thick grid paper. Perfect for wireframing your next brutalist web app.",
    price: 399,
    category: "Books",
    image: "/product-images/notebook.svg",
    stock: 100
  },
  {
    name: "Blocky Desk Lamp",
    description: "A solid concrete base with an exposed bulb. It doesn't get more brutal than this.",
    price: 2499,
    category: "Home",
    image: "/product-images/desk-lamp.svg",
    stock: 23
  },
  {
    name: "Cyberpunk Sneakers",
    description: "Chunky sole sneakers with high-contrast yellow laces and reflective panels.",
    price: 6599,
    category: "Fashion",
    image: "/product-images/sneakers.svg",
    stock: 0 
  },
  {
    name: "Vintage Camera",
    description: "35mm film camera with a solid metal body. Captures the world in gritty, high-contrast tones.",
    price: 12500,
    category: "Electronics",
    image: "/product-images/camera.svg",
    stock: 5
  },
  {
    name: "Oversized Hoodie",
    description: "Thick, comfortable, and aggressively boxy. The ultimate developer uniform.",
    price: 2999,
    category: "Fashion",
    image: "/product-images/hoodie.svg",
    stock: 30
  },
  {
    name: "Smart Watch",
    description: "Track your time with pixel-perfect precision on a stark, monochrome display.",
    price: 14999,
    category: "Electronics",
    image: "/product-images/smartwatch.svg",
    stock: 12
  },
  {
    name: "Design Systems Book",
    description: "The definitive guide to building bulletproof UI libraries.",
    price: 1499,
    category: "Books",
    image: "/product-images/design-book.svg",
    stock: 50
  },
  {
    name: "Minimalist Plant Pot",
    description: "Concrete cube for your desk succulent. Contrast the brutal with the natural.",
    price: 599,
    category: "Home",
    image: "/product-images/plant-pot.svg",
    stock: 18
  },
  {
    name: "Aviator Sunglasses",
    description: "Block the glare of your 3 monitors. Thick frames with yellow-tinted lenses.",
    price: 1899,
    category: "Fashion",
    image: "/product-images/sunglasses.svg",
    stock: 25
  }
];

mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log('Connected to DB. Clearing old products...');
    await Product.deleteMany({});
    console.log('Inserting new products...');
    await Product.insertMany(products);
    console.log('✅ Products seeded successfully!');
    process.exit(0);
  })
  .catch(err => {
    console.error('Error:', err);
    process.exit(1);
  });
