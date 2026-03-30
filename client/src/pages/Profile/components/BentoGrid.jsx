import React from 'react';

// Mock images reflecting the diverse aspect ratios in your screenshot
const POSTS = [
  { id: 1, img: "https://images.unsplash.com/photo-1605367030807-6cb16016e1ae?auto=format&fit=crop&w=800&q=80", span: "md:col-span-2 md:row-span-2" }, 
  { id: 2, img: "https://images.unsplash.com/photo-1518382473166-73dcf06850fa?auto=format&fit=crop&w=600&q=80", span: "md:col-span-1 md:row-span-2" }, 
  { id: 3, img: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=600&q=80", span: "md:col-span-1 md:row-span-1" }, 
  { id: 4, img: "https://images.unsplash.com/photo-1604537466158-719b1972027b?auto=format&fit=crop&w=800&q=80", span: "md:col-span-2 md:row-span-1" }, 
];

export default function BentoGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 auto-rows-[250px] gap-4">
      {POSTS.map((post) => (
        <div 
          key={post.id} 
          className={`relative rounded-xl overflow-hidden bg-zinc-100 dark:bg-zinc-800 group cursor-pointer transition-colors duration-300 ${post.span}`}
        >
          <img 
            src={post.img} 
            alt="Artwork" 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          {/* Hover overlay adapting slightly for light/dark */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 dark:group-hover:bg-black/30 transition-colors duration-300" />
        </div>
      ))}
    </div>
  );
}