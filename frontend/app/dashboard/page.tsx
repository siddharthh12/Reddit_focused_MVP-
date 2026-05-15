"use client";

import { useEffect, useState } from "react";
import api from "../../src/services/api";
import toast from "react-hot-toast";

export default function DashboardPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await api.get("/products/dashboard");
      setProducts(response.data.products);
    } catch (error) {
      toast.error("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
          <p className="text-zinc-400">Loading your products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-6xl mx-auto">
        <header className="flex justify-between items-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight">Product Dashboard</h1>
          <a 
            href="/onBorading" 
            className="bg-white text-black px-6 py-2 rounded-full font-bold hover:bg-zinc-200 transition-colors"
          >
            + Add Product
          </a>
        </header>
        
        {products.length === 0 ? (
          <div className="bg-zinc-900/50 p-16 rounded-3xl text-center border border-zinc-800 border-dashed">
            <p className="text-zinc-400 text-lg mb-8">Your dashboard is looking a bit empty.</p>
            <a 
              href="/onBorading" 
              className="bg-white text-black px-8 py-4 rounded-xl font-bold inline-block"
            >
              Start Onboarding
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product: any) => (
              <div 
                key={product.id} 
                className="bg-zinc-900 p-8 rounded-3xl border border-zinc-800 hover:border-zinc-700 transition-all group"
              >
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-2xl font-bold group-hover:text-zinc-200 transition-colors">
                    {product.productName}
                  </h2>
                </div>
                
                <a 
                  href={product.website} 
                  target="_blank" 
                  className="text-zinc-500 text-sm mb-6 block hover:text-zinc-300 transition-colors"
                >
                  {product.website}
                </a>
                
                <p className="text-zinc-400 mb-8 line-clamp-3 leading-relaxed">
                  {product.description}
                </p>
                
                <div className="flex flex-wrap gap-2">
                  {product.keywords?.map((kw: any) => (
                    <span 
                      key={kw.id} 
                      className="bg-zinc-800/50 border border-zinc-700/50 px-3 py-1 rounded-full text-[10px] uppercase tracking-wider text-zinc-500"
                    >
                      {kw.keyword}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
