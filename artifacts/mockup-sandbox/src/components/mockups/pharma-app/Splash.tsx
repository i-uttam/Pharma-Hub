import React from 'react';
import { Plus } from 'lucide-react';

export function Splash() {
  return (
    <div style={{ width: 390, height: 844, overflow: 'hidden', position: 'relative', fontFamily: "'Inter', sans-serif" }} className="bg-gradient-to-br from-[#0F9D58] to-[#34A853] flex flex-col items-center justify-center">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Poppins:wght@600;700&display=swap');
      `}</style>
      
      {/* Decorative pills in background */}
      <div className="absolute top-20 left-10 w-12 h-6 rounded-full border-2 border-white/20 rotate-45" />
      <div className="absolute bottom-40 right-12 w-8 h-16 rounded-full border-2 border-white/20 -rotate-12" />
      <div className="absolute top-1/3 right-8 w-10 h-10 rounded-full border-2 border-white/20" />

      <div className="flex flex-col items-center z-10">
        <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mb-6 backdrop-blur-sm shadow-[0_0_30px_rgba(255,255,255,0.3)]">
          <Plus size={40} color="white" strokeWidth={3} />
        </div>
        
        <h1 className="text-white text-[28px] mb-2" style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700 }}>
          MediWholesale
        </h1>
        
        <p className="text-white/90 text-[14px] font-medium mb-12">
          Your Trusted Wholesale Pharmacy
        </p>
        
        <div className="px-4 py-1.5 bg-white/20 backdrop-blur-sm rounded-full text-white text-xs font-semibold uppercase tracking-wider mb-20">
          B2B Platform
        </div>
      </div>
      
      <div className="absolute bottom-24 flex justify-center w-full">
        <div className="w-8 h-8 border-4 border-white/30 border-t-white rounded-full animate-spin" />
      </div>
    </div>
  );
}