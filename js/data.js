// ── SESSION ──────────────────────────────────────────────
const session = { role: null, uid: null, name: null, vid: null };

// ── USERS ────────────────────────────────────────────────
const admins = [{ id: 'admin', pwd: 'admin123' }];

const users = [
  { id: 'user1', pwd: 'user123', name: 'Alice', email: 'alice@example.com' },
  { id: 'user2', pwd: 'user123', name: 'Bob',   email: 'bob@example.com'   }
];

const vendors = [
  { id: 'vendor1', pwd: 'vendor123', name: 'Royal Catering', cat: 'Catering',   email: 'royal@catering.com',  contact: '9800000001' },
  { id: 'vendor2', pwd: 'vendor123', name: 'Blooms Florist',  cat: 'Florist',    email: 'blooms@florist.com',  contact: '9800000002' },
  { id: 'vendor3', pwd: 'vendor123', name: 'Deco Dreams',     cat: 'Decoration', email: 'deco@dreams.com',     contact: '9800000003' },
  { id: 'vendor4', pwd: 'vendor123', name: 'Bright Lights',   cat: 'Lighting',   email: 'bright@lights.com',   contact: '9800000004' }
];

// ── DATA ─────────────────────────────────────────────────
let products = [
  { id:'p1', vid:'vendor1', name:'Veg Platter',    price:2500, img:'🍱' },
  { id:'p2', vid:'vendor1', name:'Non-Veg Platter',price:3500, img:'🍗' },
  { id:'p3', vid:'vendor2', name:'Rose Bouquet',   price:500,  img:'🌹' },
  { id:'p4', vid:'vendor2', name:'Mixed Flowers',  price:800,  img:'💐' },
  { id:'p5', vid:'vendor3', name:'Stage Decor',    price:5000, img:'🎭' },
  { id:'p6', vid:'vendor4', name:'LED Setup',      price:3000, img:'💡' }
];

let cart       = [];
let orders     = [];
let guestList  = [];

// Sheet 16 — Item 1 | Item 2 | Item 3 | Item 4
let itemRequests = [
  { id:'r1', item:'Item 1', from:'User' },
  { id:'r2', item:'Item 2', from:'User' },
  { id:'r3', item:'Item 3', from:'User' },
  { id:'r4', item:'Item 4', from:'User' }
];

// Memberships
let userMem   = [{ num:'UM001', name:'Alice', email:'alice@example.com', phone:'9876543210', dur:12, expiry:'2025-06-01', status:'Active' }];
let vendorMem = [{ num:'VM001', name:'Royal Catering', email:'royal@catering.com', cat:'Catering', dur:12, expiry:'2025-06-01', status:'Active' }];
let umC=2, vmC=2, pC=7, oC=1001, gC=1;

// ── HELPERS ──────────────────────────────────────────────
function addMonths(base, m) {
  const d = base ? new Date(base) : new Date();
  d.setMonth(d.getMonth() + parseInt(m));
  return d.toISOString().split('T')[0];
}
function isEmail(v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); }
function bClass(s) {
  if (s==='Recieved'||s==='Received')   return 'b-rec';
  if (s==='Ready for Shipping')          return 'b-ship';
  if (s==='Out For Delivery')            return 'b-del';
  if (s==='Cancelled')                   return 'b-can';
  if (s==='Active')                      return 'b-act';
  return 'b-ina';
}
function catIcon(c) {
  return {Catering:'🍽️',Florist:'🌸',Decoration:'🎭',Lighting:'💡'}[c]||'🏪';
}
