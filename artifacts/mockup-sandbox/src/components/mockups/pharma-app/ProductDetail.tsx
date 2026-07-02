import React, { useState } from 'react';
import {
  ArrowLeft, Share2, Heart, Check, Info, Package, ShoppingCart,
  Star, ChevronRight, Minus, Plus, Shield, Truck, RefreshCw, Home, Grid, User
} from 'lucide-react';

const tabs = ['Description', 'Composition', 'Uses', 'Side Effects', 'Storage'];

const tabContent: Record<string, React.ReactNode> = {
  Description: (
    <div>
      <p style={{ marginBottom: 10 }}>
        Amoxicillin 500mg Capsules is a broad-spectrum penicillin antibiotic used to treat a wide range of bacterial infections. It works by stopping the growth of bacteria.
      </p>
      <p style={{ marginBottom: 10 }}>
        This medicine is effective against gram-positive and gram-negative bacteria, making it suitable for respiratory, urinary, skin, and ear infections.
      </p>
      <div style={{ background: '#F0FDF4', borderRadius: 10, padding: '10px 14px', border: '1px solid #BBF7D0' }}>
        <p style={{ fontSize: 11, color: '#166534', fontWeight: 600 }}>
          ⚠ For B2B wholesale purchase only. Valid drug license (Form 20/21) required.
        </p>
      </div>
    </div>
  ),
  Composition: (
    <div>
      <div style={{ marginBottom: 12 }}>
        <div style={{ fontWeight: 700, fontSize: 13, color: '#111', marginBottom: 6 }}>Active Ingredient</div>
        <div style={{ background: '#F8FAFC', borderRadius: 10, padding: '10px 14px', border: '1px solid #E5E7EB' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
            <span style={{ fontSize: 13, color: '#374151' }}>Amoxicillin Trihydrate</span>
            <span style={{ fontSize: 13, fontWeight: 700, color: '#0F9D58' }}>500 mg</span>
          </div>
        </div>
      </div>
      <div>
        <div style={{ fontWeight: 700, fontSize: 13, color: '#111', marginBottom: 6 }}>Excipients</div>
        {['Magnesium Stearate', 'Microcrystalline Cellulose', 'Talc', 'Gelatin (Capsule Shell)'].map(e => (
          <div key={e} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 0', borderBottom: '1px solid #F3F4F6' }}>
            <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#9CA3AF', flexShrink: 0 }} />
            <span style={{ fontSize: 12, color: '#6B7280' }}>{e}</span>
          </div>
        ))}
      </div>
    </div>
  ),
  Uses: (
    <div>
      {[
        { icon: '🫁', title: 'Respiratory Infections', desc: 'Pneumonia, bronchitis, sinusitis' },
        { icon: '👂', title: 'ENT Infections', desc: 'Ear infections, tonsillitis, pharyngitis' },
        { icon: '🫀', title: 'Urinary Tract Infections', desc: 'Cystitis, urethritis' },
        { icon: '🩹', title: 'Skin & Soft Tissue', desc: 'Cellulitis, impetigo, wound infections' },
        { icon: '🦷', title: 'Dental Infections', desc: 'Dental abscess, periodontitis' },
      ].map(u => (
        <div key={u.title} style={{ display: 'flex', gap: 12, padding: '10px 0', borderBottom: '1px solid #F3F4F6' }}>
          <div style={{ fontSize: 20, flexShrink: 0 }}>{u.icon}</div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#111', marginBottom: 2 }}>{u.title}</div>
            <div style={{ fontSize: 11, color: '#6B7280' }}>{u.desc}</div>
          </div>
        </div>
      ))}
    </div>
  ),
  'Side Effects': (
    <div>
      <div style={{ background: '#FEF9C3', borderRadius: 10, padding: '10px 14px', border: '1px solid #FDE68A', marginBottom: 12 }}>
        <p style={{ fontSize: 11, color: '#92400E', fontWeight: 600 }}>Consult a physician if side effects persist or worsen.</p>
      </div>
      {[
        { severity: 'Common', color: '#FBBC05', items: ['Nausea', 'Vomiting', 'Diarrhoea', 'Stomach upset'] },
        { severity: 'Less Common', color: '#EA4335', items: ['Skin rash', 'Itching', 'Headache'] },
        { severity: 'Rare', color: '#9CA3AF', items: ['Severe allergic reaction', 'Jaundice', 'Seizures'] },
      ].map(s => (
        <div key={s.severity} style={{ marginBottom: 12 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: s.color, marginBottom: 6 }}>{s.severity}</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {s.items.map(i => (
              <span key={i} style={{ fontSize: 11, background: '#F3F4F6', color: '#374151', borderRadius: 20, padding: '3px 10px' }}>{i}</span>
            ))}
          </div>
        </div>
      ))}
    </div>
  ),
  Storage: (
    <div>
      {[
        { icon: '🌡️', label: 'Temperature', value: 'Store below 25°C' },
        { icon: '💧', label: 'Humidity', value: 'Keep in a dry place' },
        { icon: '☀️', label: 'Light', value: 'Protect from direct sunlight' },
        { icon: '📦', label: 'Packaging', value: 'Keep in original sealed box' },
        { icon: '👶', label: 'Safety', value: 'Keep out of reach of children' },
        { icon: '📅', label: 'Expiry', value: 'Do not use after expiry date' },
      ].map(s => (
        <div key={s.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid #F3F4F6' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontSize: 18 }}>{s.icon}</span>
            <span style={{ fontSize: 12, color: '#6B7280', fontWeight: 500 }}>{s.label}</span>
          </div>
          <span style={{ fontSize: 12, color: '#111', fontWeight: 600 }}>{s.value}</span>
        </div>
      ))}
    </div>
  ),
};

const reviews = [
  { name: 'Rajesh Medical', rating: 5, text: 'Excellent quality, genuine product. Fast delivery and well packaged.', time: '2 days ago', verified: true },
  { name: 'City Pharma Store', rating: 4, text: 'Good product at competitive wholesale price. MOQ is reasonable.', time: '1 week ago', verified: true },
  { name: 'HealthPlus Clinic', rating: 5, text: 'Best supplier for bulk antibiotics. Trusted brand, always in stock.', time: '2 weeks ago', verified: false },
];

const similar = [
  { name: 'Augmentin 625mg', brand: 'GSK', price: 1450, discount: 18 },
  { name: 'Amox-Clav 500mg', brand: 'Cipla', price: 980, discount: 22 },
  { name: 'Mox 500mg', brand: 'Ranbaxy', price: 820, discount: 15 },
];

export function ProductDetail() {
  const [activeTab, setActiveTab] = useState('Description');
  const [qty, setQty] = useState(5);
  const [wishlisted, setWishlisted] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);

  const unitPrice = qty >= 25 ? 790 : qty >= 10 ? 840 : 890;
  const totalPrice = unitPrice * qty;

  return (
    <div style={{
      width: 390, height: 844, overflow: 'hidden', position: 'relative',
      backgroundColor: '#F8FAFC', fontFamily: "'Inter', sans-serif",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Poppins:wght@600;700;800&display=swap');
        .hide-scrollbar::-webkit-scrollbar { display: none; }
      `}</style>

      {/* ── Floating Header ── */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, zIndex: 30,
        padding: '44px 16px 12px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(0,0,0,0.06)',
      }}>
        <div style={{
          width: 38, height: 38, borderRadius: 12, background: '#fff',
          border: '1px solid #E5E7EB', display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 1px 6px rgba(0,0,0,0.08)',
        }}>
          <ArrowLeft size={20} color="#111" />
        </div>
        <span style={{ fontSize: 15, fontWeight: 700, color: '#111', fontFamily: "'Poppins', sans-serif" }}>Product Detail</span>
        <div style={{ display: 'flex', gap: 8 }}>
          {[Share2, Heart].map((Icon, i) => (
            <div key={i} onClick={i === 1 ? () => setWishlisted(w => !w) : undefined} style={{
              width: 38, height: 38, borderRadius: 12, background: '#fff',
              border: '1px solid #E5E7EB', display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 1px 6px rgba(0,0,0,0.08)', cursor: 'pointer',
            }}>
              <Icon size={18} color={i === 1 && wishlisted ? '#EA4335' : '#374151'}
                fill={i === 1 && wishlisted ? '#EA4335' : 'none'} />
            </div>
          ))}
        </div>
      </div>

      {/* ── Scrollable Body ── */}
      <div className="hide-scrollbar" style={{ overflowY: 'auto', height: 'calc(844px - 96px)', paddingTop: 88 }}>

        {/* Image Gallery */}
        <div style={{ background: '#fff', marginBottom: 8 }}>
          <div style={{
            height: 220, display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: 'linear-gradient(145deg, #E8F5E9 0%, #F1F8E9 100%)',
            position: 'relative',
          }}>
            {/* Bestseller ribbon */}
            <div style={{
              position: 'absolute', top: 16, left: 0,
              background: '#0F9D58', color: '#fff',
              fontSize: 10, fontWeight: 700, letterSpacing: '0.04em',
              padding: '4px 12px 4px 12px', borderRadius: '0 20px 20px 0',
            }}>BESTSELLER</div>

            {/* Rx tag */}
            <div style={{
              position: 'absolute', top: 16, right: 16,
              background: 'rgba(66,133,244,0.1)', color: '#4285F4',
              fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 6,
              border: '1px solid rgba(66,133,244,0.3)',
            }}>Rx Required</div>

            {/* Medicine SVG */}
            <svg width="140" height="120" viewBox="0 0 140 120" fill="none">
              {/* Box */}
              <rect x="20" y="20" width="100" height="80" rx="10" fill="white" stroke="#E5E7EB" strokeWidth="1.5"/>
              <rect x="20" y="20" width="100" height="22" rx="10" fill="#0F9D58" />
              <rect x="20" y="32" width="100" height="10" fill="#0F9D58" />
              {/* Label */}
              <rect x="30" y="52" width="80" height="6" rx="3" fill="#E5E7EB" />
              <rect x="36" y="64" width="60" height="4" rx="2" fill="#D1FAE5" />
              <rect x="36" y="74" width="44" height="4" rx="2" fill="#E5E7EB" />
              {/* Pills illustration */}
              {[0,1,2].map(i => (
                <ellipse key={i} cx={46 + i * 18} cy={88} rx="7" ry="5" fill="#34A853" opacity="0.7" />
              ))}
              {/* Plus icon on box */}
              <rect x="58" y="26" width="4" height="12" rx="2" fill="white" />
              <rect x="54" y="30" width="12" height="4" rx="2" fill="white" />
            </svg>
          </div>
          {/* Thumbnail strip */}
          <div style={{ display: 'flex', gap: 8, padding: '12px 16px', overflowX: 'auto' }} className="hide-scrollbar">
            {['#E8F5E9', '#E3F2FD', '#FFF8E1', '#F3E5F5'].map((bg, i) => (
              <div key={i} style={{
                width: 52, height: 52, borderRadius: 10, background: bg, flexShrink: 0,
                border: i === 0 ? '2px solid #0F9D58' : '1.5px solid #E5E7EB',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Package size={20} color={i === 0 ? '#0F9D58' : '#9CA3AF'} />
              </div>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div style={{ background: '#fff', padding: '16px 16px 12px', marginBottom: 8 }}>
          {/* Badges */}
          <div style={{ display: 'flex', gap: 6, marginBottom: 10, flexWrap: 'wrap' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 4, background: '#F0FDF4', color: '#0F9D58', fontSize: 10, fontWeight: 700, padding: '3px 8px', borderRadius: 6, border: '1px solid #BBF7D0' }}>
              <Check size={9} strokeWidth={3} /> Verified Seller
            </span>
            <span style={{ background: '#EFF6FF', color: '#4285F4', fontSize: 10, fontWeight: 700, padding: '3px 8px', borderRadius: 6, border: '1px solid #BFDBFE' }}>CDSCO Approved</span>
            <span style={{ background: '#FFF7ED', color: '#EA580C', fontSize: 10, fontWeight: 700, padding: '3px 8px', borderRadius: 6, border: '1px solid #FED7AA' }}>Prescription Required</span>
          </div>

          <h1 style={{ fontSize: 20, fontWeight: 800, color: '#111', lineHeight: 1.25, marginBottom: 4, fontFamily: "'Poppins', sans-serif" }}>
            Amoxicillin 500mg Capsules
          </h1>
          <p style={{ fontSize: 13, color: '#9CA3AF', marginBottom: 8 }}>Amoxicillin Trihydrate · Capsules</p>

          {/* Brand row */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <div style={{ width: 28, height: 28, borderRadius: 8, background: '#E8F5E9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontSize: 11, fontWeight: 800, color: '#0F9D58' }}>SP</span>
              </div>
              <span style={{ fontSize: 13, fontWeight: 700, color: '#111' }}>Sun Pharma</span>
              <Shield size={13} color="#0F9D58" />
            </div>
            {/* Rating */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, background: '#FFF8E1', padding: '4px 10px', borderRadius: 20 }}>
              <Star size={12} fill="#FBBC05" color="#FBBC05" />
              <span style={{ fontSize: 12, fontWeight: 700, color: '#92400E' }}>4.6</span>
              <span style={{ fontSize: 11, color: '#B45309' }}>(214)</span>
            </div>
          </div>

          {/* Price block */}
          <div style={{ background: 'linear-gradient(135deg, #F0FDF4, #DCFCE7)', borderRadius: 14, padding: '14px 16px', marginBottom: 12, border: '1px solid #BBF7D0' }}>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 10, marginBottom: 4 }}>
              <span style={{ fontSize: 30, fontWeight: 800, color: '#0F9D58', fontFamily: "'Poppins', sans-serif", lineHeight: 1 }}>
                ₹{unitPrice}
              </span>
              <span style={{ fontSize: 13, color: '#6B7280', marginBottom: 4 }}>/box</span>
              <span style={{ fontSize: 11, fontWeight: 700, background: '#EA4335', color: '#fff', padding: '3px 8px', borderRadius: 6, marginBottom: 4 }}>26% OFF</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 12, color: '#9CA3AF', textDecoration: 'line-through' }}>MRP ₹1,200/box</span>
              <span style={{ fontSize: 11, color: '#0F9D58', fontWeight: 600 }}>You save ₹{1200 - unitPrice} per box</span>
            </div>
          </div>

          {/* Info chips */}
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 12 }}>
            {[
              { label: 'Pack of 100 Caps', icon: Package },
              { label: 'GST: 12%', icon: Info },
              { label: 'MOQ: 5 Boxes', icon: Truck },
            ].map(({ label, icon: Icon }) => (
              <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 6, background: '#F3F4F6', border: '1px solid #E5E7EB', borderRadius: 8, padding: '5px 10px' }}>
                <Icon size={12} color="#6B7280" />
                <span style={{ fontSize: 11, fontWeight: 600, color: '#374151' }}>{label}</span>
              </div>
            ))}
          </div>

          {/* Stock */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#0F9D58' }} />
            <span style={{ fontSize: 12, fontWeight: 600, color: '#0F9D58' }}>In Stock</span>
            <span style={{ fontSize: 12, color: '#9CA3AF' }}>· 5,000 units available</span>
          </div>
        </div>

        {/* Trust strip */}
        <div style={{ background: '#fff', padding: '12px 16px', marginBottom: 8, display: 'flex', justifyContent: 'space-around' }}>
          {[
            { icon: Truck,      label: 'Fast Dispatch',  sub: 'Within 24 hrs' },
            { icon: Shield,     label: 'Genuine',        sub: '100% Authentic' },
            { icon: RefreshCw,  label: 'Easy Returns',   sub: '7-day policy' },
          ].map(({ icon: Icon, label, sub }) => (
            <div key={label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: '#F0FDF4', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon size={17} color="#0F9D58" />
              </div>
              <span style={{ fontSize: 11, fontWeight: 700, color: '#111' }}>{label}</span>
              <span style={{ fontSize: 10, color: '#9CA3AF' }}>{sub}</span>
            </div>
          ))}
        </div>

        {/* Quantity + Total */}
        <div style={{ background: '#fff', padding: '14px 16px', marginBottom: 8 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#111', marginBottom: 2 }}>Select Quantity</div>
              <div style={{ fontSize: 11, color: '#9CA3AF' }}>Min. 5 boxes · Max 500 boxes</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 0, border: '1.5px solid #0F9D58', borderRadius: 12, overflow: 'hidden' }}>
              <button onClick={() => setQty(q => Math.max(5, q - 5))} style={{
                width: 38, height: 38, background: '#F0FDF4', border: 'none', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Minus size={15} color="#0F9D58" strokeWidth={2.5} />
              </button>
              <span style={{ width: 44, textAlign: 'center', fontSize: 14, fontWeight: 800, color: '#111', fontFamily: "'Poppins', sans-serif" }}>{qty}</span>
              <button onClick={() => setQty(q => Math.min(500, q + 5))} style={{
                width: 38, height: 38, background: '#F0FDF4', border: 'none', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Plus size={15} color="#0F9D58" strokeWidth={2.5} />
              </button>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 12, padding: '10px 14px', background: '#F8FAFC', borderRadius: 10, border: '1px dashed #D1FAE5' }}>
            <span style={{ fontSize: 12, color: '#6B7280' }}>Total for {qty} boxes</span>
            <span style={{ fontSize: 16, fontWeight: 800, color: '#0F9D58', fontFamily: "'Poppins', sans-serif" }}>₹{totalPrice.toLocaleString('en-IN')}</span>
          </div>
        </div>

        {/* Bulk Pricing */}
        <div style={{ background: '#fff', padding: '14px 16px', marginBottom: 8 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: '#111', marginBottom: 12, fontFamily: "'Poppins', sans-serif" }}>Bulk Wholesale Pricing</div>
          <div style={{ border: '1px solid #E5E7EB', borderRadius: 12, overflow: 'hidden' }}>
            <div style={{ display: 'flex', background: '#F8FAFC', padding: '8px 14px', borderBottom: '1px solid #E5E7EB' }}>
              <span style={{ flex: 1, fontSize: 11, fontWeight: 700, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Quantity</span>
              <span style={{ fontSize: 11, fontWeight: 700, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Price / Box</span>
              <span style={{ width: 70, textAlign: 'right', fontSize: 11, fontWeight: 700, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Savings</span>
            </div>
            {[
              { range: '5 – 9 boxes',  price: 890, savings: '26%', highlight: qty >= 5  && qty < 10  },
              { range: '10 – 24 boxes', price: 840, savings: '30%', highlight: qty >= 10 && qty < 25  },
              { range: '25+ boxes',     price: 790, savings: '34%', highlight: qty >= 25               },
            ].map((row, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', padding: '10px 14px',
                borderBottom: i < 2 ? '1px solid #F3F4F6' : 'none',
                background: row.highlight ? 'linear-gradient(90deg, #F0FDF4, #DCFCE7)' : '#fff',
              }}>
                <span style={{ flex: 1, fontSize: 13, fontWeight: row.highlight ? 700 : 500, color: row.highlight ? '#0F9D58' : '#374151' }}>{row.range}</span>
                <span style={{ fontSize: 13, fontWeight: 800, color: row.highlight ? '#0F9D58' : '#111', fontFamily: "'Poppins', sans-serif" }}>₹{row.price}</span>
                <span style={{ width: 70, textAlign: 'right', fontSize: 11, fontWeight: 700, color: '#EA4335', background: '#FEE2E2', padding: '2px 6px', borderRadius: 4, marginLeft: 8 }}>{row.savings}</span>
                {row.highlight && <div style={{ marginLeft: 8 }}><Check size={14} color="#0F9D58" strokeWidth={3} /></div>}
              </div>
            ))}
          </div>
          <div style={{ fontSize: 11, color: '#9CA3AF', marginTop: 8, display: 'flex', alignItems: 'center', gap: 4 }}>
            <Info size={11} /> Prices exclusive of GST (12%)
          </div>
        </div>

        {/* Tabs */}
        <div style={{ background: '#fff', marginBottom: 8 }}>
          <div style={{ display: 'flex', borderBottom: '1px solid #F3F4F6', overflowX: 'auto' }} className="hide-scrollbar">
            {tabs.map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)} style={{
                flexShrink: 0, padding: '11px 14px',
                fontSize: 12, fontWeight: activeTab === tab ? 700 : 500,
                color: activeTab === tab ? '#0F9D58' : '#6B7280',
                borderBottom: activeTab === tab ? '2.5px solid #0F9D58' : '2.5px solid transparent',
                background: 'none', border: 'none',
                borderBottom: activeTab === tab ? '2.5px solid #0F9D58' : '2.5px solid transparent',
                cursor: 'pointer', transition: 'all 0.15s',
              }}>{tab}</button>
            ))}
          </div>
          <div style={{ padding: '14px 16px', fontSize: 13, color: '#374151', lineHeight: 1.7 }}>
            {tabContent[activeTab]}
          </div>
        </div>

        {/* Reviews */}
        <div style={{ background: '#fff', padding: '14px 16px', marginBottom: 8 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <span style={{ fontSize: 14, fontWeight: 700, color: '#111', fontFamily: "'Poppins', sans-serif" }}>Customer Reviews</span>
            <button style={{ display: 'flex', alignItems: 'center', gap: 3, background: 'none', border: 'none', color: '#0F9D58', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>
              See all <ChevronRight size={13} />
            </button>
          </div>

          {/* Rating summary */}
          <div style={{ display: 'flex', gap: 16, alignItems: 'center', marginBottom: 16, padding: '12px 14px', background: '#F8FAFC', borderRadius: 12 }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 32, fontWeight: 800, color: '#111', fontFamily: "'Poppins', sans-serif", lineHeight: 1 }}>4.6</div>
              <div style={{ display: 'flex', gap: 2, marginTop: 4, justifyContent: 'center' }}>
                {[1,2,3,4,5].map(s => <Star key={s} size={11} fill={s <= 4 ? '#FBBC05' : '#E5E7EB'} color={s <= 4 ? '#FBBC05' : '#E5E7EB'} />)}
              </div>
              <div style={{ fontSize: 10, color: '#9CA3AF', marginTop: 4 }}>214 reviews</div>
            </div>
            <div style={{ flex: 1 }}>
              {[5,4,3,2,1].map(s => (
                <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                  <span style={{ fontSize: 10, color: '#6B7280', width: 8 }}>{s}</span>
                  <Star size={9} fill="#FBBC05" color="#FBBC05" />
                  <div style={{ flex: 1, height: 5, background: '#F3F4F6', borderRadius: 99, overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${[72,18,6,2,2][5-s]}%`, background: '#FBBC05', borderRadius: 99 }} />
                  </div>
                  <span style={{ fontSize: 10, color: '#9CA3AF', width: 24 }}>{[72,18,6,2,2][5-s]}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Review cards */}
          {reviews.map((r, i) => (
            <div key={i} style={{ paddingBottom: 12, marginBottom: 12, borderBottom: i < reviews.length - 1 ? '1px solid #F3F4F6' : 'none' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ width: 32, height: 32, borderRadius: 10, background: '#E8F5E9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ fontSize: 12, fontWeight: 800, color: '#0F9D58' }}>{r.name[0]}</span>
                  </div>
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 700, color: '#111' }}>{r.name}</div>
                    <div style={{ display: 'flex', gap: 1 }}>
                      {[1,2,3,4,5].map(s => <Star key={s} size={9} fill={s <= r.rating ? '#FBBC05' : '#E5E7EB'} color={s <= r.rating ? '#FBBC05' : '#E5E7EB'} />)}
                    </div>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 10, color: '#9CA3AF' }}>{r.time}</div>
                  {r.verified && <div style={{ fontSize: 9, color: '#0F9D58', fontWeight: 700, marginTop: 2 }}>✓ Verified Purchase</div>}
                </div>
              </div>
              <p style={{ fontSize: 12, color: '#374151', lineHeight: 1.6, margin: 0 }}>{r.text}</p>
            </div>
          ))}
        </div>

        {/* Similar Medicines */}
        <div style={{ background: '#fff', padding: '14px 0 14px 16px', marginBottom: 96 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12, paddingRight: 16 }}>
            <span style={{ fontSize: 14, fontWeight: 700, color: '#111', fontFamily: "'Poppins', sans-serif" }}>Similar Medicines</span>
            <button style={{ display: 'flex', alignItems: 'center', gap: 3, background: 'none', border: 'none', color: '#0F9D58', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>
              View all <ChevronRight size={13} />
            </button>
          </div>
          <div style={{ display: 'flex', gap: 10, overflowX: 'auto', paddingRight: 16 }} className="hide-scrollbar">
            {similar.map((m, i) => (
              <div key={i} style={{
                flexShrink: 0, width: 140, background: '#F8FAFC', border: '1px solid #E5E7EB',
                borderRadius: 14, overflow: 'hidden',
              }}>
                <div style={{ height: 70, background: `hsl(${140 + i * 30}, 60%, 93%)`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Package size={28} color={`hsl(${140 + i * 30}, 50%, 45%)`} />
                </div>
                <div style={{ padding: '8px 10px' }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: '#111', marginBottom: 2, lineHeight: 1.3 }}>{m.name}</div>
                  <div style={{ fontSize: 10, color: '#9CA3AF', marginBottom: 6 }}>{m.brand}</div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: 12, fontWeight: 800, color: '#0F9D58', fontFamily: "'Poppins', sans-serif" }}>₹{m.price}</span>
                    <span style={{ fontSize: 9, fontWeight: 700, background: '#FEE2E2', color: '#EA4335', padding: '1px 5px', borderRadius: 4 }}>{m.discount}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Bottom Action Bar ── */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 30,
        background: '#fff', borderTop: '1px solid #F3F4F6',
        padding: '12px 16px 28px',
        boxShadow: '0 -4px 24px rgba(0,0,0,0.08)',
      }}>
        <div style={{ display: 'flex', gap: 10 }}>
          <button
            onClick={() => setAddedToCart(v => !v)}
            style={{
              flex: 1, height: 50, borderRadius: 14,
              border: `2px solid ${addedToCart ? '#34A853' : '#0F9D58'}`,
              background: addedToCart ? '#F0FDF4' : '#fff',
              color: '#0F9D58', fontSize: 14, fontWeight: 700,
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
              cursor: 'pointer', transition: 'all 0.2s',
            }}>
            {addedToCart
              ? <><Check size={16} strokeWidth={3} /> Added!</>
              : <><ShoppingCart size={16} /> Add to Cart</>}
          </button>
          <button style={{
            flex: 1, height: 50, borderRadius: 14, border: 'none', cursor: 'pointer',
            background: 'linear-gradient(135deg, #0F9D58, #34A853)',
            color: '#fff', fontSize: 14, fontWeight: 700,
            boxShadow: '0 4px 16px rgba(15,157,88,0.35)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
          }}>
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}
