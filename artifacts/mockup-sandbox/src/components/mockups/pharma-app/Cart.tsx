import React from 'react';
import { ArrowLeft, Trash2, Plus, Minus, Tag, ChevronRight, Info } from 'lucide-react';

export function Cart() {
  return (
    <div style={{ width: 390, height: 844, overflow: 'hidden', position: 'relative', backgroundColor: '#F8FAFC', fontFamily: "'Inter', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Poppins:wght@600;700&display=swap');
        .hide-scrollbar::-webkit-scrollbar { display: none; }
      `}</style>

      {/* Header */}
      <div className="bg-white px-5 pt-12 pb-4 shadow-sm flex items-center gap-4 sticky top-0 z-20">
        <div className="w-10 h-10 rounded-full flex items-center justify-center">
          <ArrowLeft size={24} className="text-gray-900" />
        </div>
        <div>
          <h1 className="text-[18px] text-gray-900" style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700 }}>
            My Cart
          </h1>
          <p className="text-[12px] text-gray-500 font-medium">3 items</p>
        </div>
      </div>

      <div className="overflow-y-auto h-[calc(844px-80px-180px)] px-5 pt-6 pb-6 hide-scrollbar">
        
        {/* Cart Items */}
        <div className="flex flex-col gap-4 mb-6">
          {/* Item 1 */}
          <div className="bg-white p-4 rounded-[16px] shadow-[0_2px_10px_rgba(0,0,0,0.03)] border border-gray-100 flex gap-4">
            <div className="w-16 h-16 bg-gray-50 rounded-[10px] border border-gray-100 flex items-center justify-center p-2 flex-shrink-0">
               <div className="w-full h-full border border-gray-200 bg-white rounded-sm"></div>
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start mb-1">
                <h3 className="font-bold text-[14px] text-gray-900 leading-tight">Amoxicillin 500mg</h3>
                <button className="text-gray-400 hover:text-red-500">
                  <Trash2 size={16} />
                </button>
              </div>
              <p className="text-[11px] text-gray-500 mb-2">Sun Pharma · Box of 100</p>
              <div className="flex justify-between items-end">
                <span className="font-bold text-[15px] text-[#0F9D58]">₹4,450 <span className="text-[10px] font-normal text-gray-500">@ ₹890/box</span></span>
                <div className="flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-lg p-1">
                  <button className="w-6 h-6 flex items-center justify-center text-[#0F9D58]"><Minus size={14} /></button>
                  <span className="text-[13px] font-bold text-gray-900 min-w-[16px] text-center">5</span>
                  <button className="w-6 h-6 flex items-center justify-center text-[#0F9D58]"><Plus size={14} /></button>
                </div>
              </div>
            </div>
          </div>

          {/* Item 2 */}
          <div className="bg-white p-4 rounded-[16px] shadow-[0_2px_10px_rgba(0,0,0,0.03)] border border-gray-100 flex gap-4">
            <div className="w-16 h-16 bg-gray-50 rounded-[10px] border border-gray-100 flex items-center justify-center p-2 flex-shrink-0">
               <div className="w-full h-full border border-gray-200 bg-white rounded-sm"></div>
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start mb-1">
                <h3 className="font-bold text-[14px] text-gray-900 leading-tight">Dolo 650mg</h3>
                <button className="text-gray-400 hover:text-red-500">
                  <Trash2 size={16} />
                </button>
              </div>
              <p className="text-[11px] text-gray-500 mb-2">Micro Labs · Strip of 15</p>
              <div className="flex justify-between items-end">
                <span className="font-bold text-[15px] text-[#0F9D58]">₹2,450 <span className="text-[10px] font-normal text-gray-500">@ ₹245/strip</span></span>
                <div className="flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-lg p-1">
                  <button className="w-6 h-6 flex items-center justify-center text-[#0F9D58]"><Minus size={14} /></button>
                  <span className="text-[13px] font-bold text-gray-900 min-w-[16px] text-center">10</span>
                  <button className="w-6 h-6 flex items-center justify-center text-[#0F9D58]"><Plus size={14} /></button>
                </div>
              </div>
            </div>
  
          {/* Item 3 */}
          <div className="bg-white p-4 rounded-[16px] shadow-[0_2px_10px_rgba(0,0,0,0.03)] border border-gray-100 flex gap-4">
            <div className="w-16 h-16 bg-gray-50 rounded-[10px] border border-gray-100 flex items-center justify-center p-2 flex-shrink-0">
               <div className="w-full h-full border border-gray-200 bg-white rounded-sm"></div>
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start mb-1">
                <h3 className="font-bold text-[14px] text-gray-900 leading-tight">Cipla Azithromycin 500</h3>
                <button className="text-gray-400 hover:text-red-500">
                  <Trash2 size={16} />
                </button>
              </div>
              <p className="text-[11px] text-gray-500 mb-2">Cipla Ltd · Strip of 5</p>
              <div className="flex justify-between items-end">
                <span className="font-bold text-[15px] text-[#0F9D58]">₹2,450 <span className="text-[10px] font-normal text-gray-500">@ ₹490/strip</span></span>
                <div className="flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-lg p-1">
                  <button className="w-6 h-6 flex items-center justify-center text-[#0F9D58]"><Minus size={14} /></button>
                  <span className="text-[13px] font-bold text-gray-900 min-w-[16px] text-center">5</span>
                  <button className="w-6 h-6 flex items-center justify-center text-[#0F9D58]"><Plus size={14} /></button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Coupon */}
        <div className="bg-white p-2 pl-4 rounded-[14px] shadow-[0_2px_10px_rgba(0,0,0,0.03)] border border-gray-100 flex items-center mb-6">
          <Tag size={20} className="text-[#0F9D58] mr-3" />
          <input type="text" placeholder="Enter coupon code" className="flex-1 bg-transparent border-none outline-none text-[14px]" />
          <button className="bg-gray-900 text-white font-semibold text-[13px] px-4 py-2 rounded-[10px]">Apply</button>
        </div>

        {/* Bill Summary */}
        <div className="bg-white p-5 rounded-[16px] shadow-[0_2px_10px_rgba(0,0,0,0.03)] border border-gray-100 mb-6">
          <h3 className="font-bold text-[15px] text-gray-900 mb-4" style={{ fontFamily: "'Poppins', sans-serif" }}>Bill Summary</h3>
          
          <div className="flex justify-between text-[13px] text-gray-600 mb-3">
            <span>Item Total (3 items)</span>
            <span className="font-medium text-gray-900">₹6,900</span>
          </div>
          <div className="flex justify-between text-[13px] text-gray-600 mb-3">
            <span>Bulk Discount</span>
            <span className="font-medium text-[#0F9D58]">-₹2,650</span>
          </div>
          <div className="flex justify-between text-[13px] text-gray-600 mb-3">
            <span>Subtotal</span>
            <span className="font-medium text-gray-900">₹4,250</span>
          </div>
          <div className="flex justify-between text-[13px] text-gray-600 mb-3">
            <span className="flex items-center gap-1">GST (12%) <Info size={12} className="text-gray-400" /></span>
            <span className="font-medium text-gray-900">₹510</span>
          </div>
          <div className="flex justify-between text-[13px] text-gray-600 mb-4 pb-4 border-b border-dashed border-gray-200">
            <span>Delivery Fee</span>
            <span className="font-medium text-[#0F9D58]">FREE</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-bold text-[16px] text-gray-900">To Pay</span>
            <span className="font-bold text-[18px] text-[#0F9D58]">₹4,760</span>
          </div>
        </div>

      </div>

      {/* Checkout Button */}
      <div className="absolute bottom-0 w-full bg-white border-t border-gray-100 px-5 pt-4 pb-8 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] z-20">
        <button className="w-full bg-[#0F9D58] text-white h-[56px] rounded-[16px] flex items-center justify-between px-6 shadow-[0_4px_16px_rgba(15,157,88,0.25)]">
          <div className="flex flex-col items-start">
            <span className="text-[12px] font-medium text-white/80">Total Amount</span>
            <span className="text-[16px] font-bold">₹4,760</span>
          </div>
          <div className="flex items-center gap-2 font-bold text-[15px]">
            Proceed to Checkout <ChevronRight size={18} />
          </div>
        </button>
      </div>
    </div>
  );
}