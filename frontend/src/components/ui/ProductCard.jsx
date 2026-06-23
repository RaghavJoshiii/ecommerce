import { Plus } from 'lucide-react';
import useStore from '../../store/useStore';

export default function ProductCard({ product }) {
  const addToCart = useStore((state) => state.addToCart);

  return (
    <div className="group bg-white rounded-2xl border border-gray-100 p-4 transition-all duration-300 hover:shadow-xl hover:border-blue-100 flex flex-col h-full">
      <div className="relative aspect-square overflow-hidden rounded-xl bg-gray-100 mb-4">
        {/* Placeholder image logic, replace with product.image */}
        <img 
          src={product.image || "https://placehold.co/400x400/png"} 
          alt={product.name}
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      
      <div className="flex flex-col flex-grow">
        <span className="text-xs font-semibold tracking-wider text-blue-600 uppercase mb-1">
          {product.category}
        </span>
        <h3 className="text-lg font-bold text-gray-900 leading-tight mb-2 line-clamp-2">
          {product.name}
        </h3>
        
        <div className="mt-auto flex items-end justify-between pt-4">
          <div className="flex flex-col">
            <span className="text-sm text-gray-500 line-through">${(product.price * 1.2).toFixed(2)}</span>
            <span className="text-xl font-black text-gray-900">${product.price.toFixed(2)}</span>
          </div>
          
          <button 
            onClick={() => addToCart(product)}
            className="bg-gray-900 text-white p-2.5 rounded-full hover:bg-blue-600 transition-colors duration-200"
          >
            <Plus className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}