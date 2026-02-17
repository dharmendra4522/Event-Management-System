// ══════════════════════════════════════════════════════════
//  APP LOGIC — every function maps to exact Excel sheet text
// ══════════════════════════════════════════════════════════

// ── Sheet 9: Add Item ─────────────────────────────────────
// Welcome 'Vendor Name' | Product Name | Product Price | Product Image
// Table cols: Product Image | Product Name | Product Price | Action (Delete | Update)
// Button: Add The Peoduct  [sic — exact Excel typo kept]
function addTheProduct(ev) {
  ev.preventDefault();
  const f=document.getElementById('f-ai'); clr(f); noMsg('ai-m');
  const name  = document.getElementById('ai-name').value.trim();
  const price = document.getElementById('ai-price').value.trim();
  const img   = document.getElementById('ai-img').value.trim() || '📦';
  let ok=true;
  if(!name)                       { setE('g-ai-name');  ok=false; }
  if(!price||parseFloat(price)<=0){ setE('g-ai-price'); ok=false; }
  if(!ok) return false;
  products.push({ id:'p'+(pC++), vid:session.vid, name, price:parseFloat(price), img });
  msg('ai-m','Product added.',true);
  f.reset();
  renderYourItems();
  return false;
}

function renderYourItems() {
  const tb=document.getElementById('yi-body'); if(!tb) return;
  const list=products.filter(p=>p.vid===session.vid);
  if(!list.length){ tb.innerHTML='<tr><td colspan="4" style="text-align:center;color:#888;">No items added yet.</td></tr>'; return; }
  tb.innerHTML=list.map(p=>`<tr>
    <td style="font-size:1.4rem;text-align:center;">${p.img}</td>
    <td>${p.name}</td>
    <td>Rs/- ${p.price}</td>
    <td>
      <button class="btn btn-danger btn-sm" onclick="deleteItem('${p.id}')">Delete</button>
      <button class="btn btn-warning btn-sm" onclick="openUpd('${p.id}')" style="margin-top:3px;">Update</button>
    </td>
  </tr>`).join('');
}

function deleteItem(id) {
  if(!confirm('Delete this product?')) return;
  products=products.filter(p=>p.id!==id);
  renderYourItems();
}

function openUpd(id) {
  const p=products.find(x=>x.id===id); if(!p) return;
  document.getElementById('upd-id').value    = id;
  document.getElementById('upd-name').value  = p.name;
  document.getElementById('upd-price').value = p.price;
  document.getElementById('upd-img').value   = p.img;
  noMsg('upd-m'); clr(document.getElementById('f-upd'));
  const s=document.getElementById('upd-sec');
  s.style.display='block'; s.scrollIntoView({behavior:'smooth'});
}
function cancelUpd() { document.getElementById('upd-sec').style.display='none'; }

function doUpdate(ev) {
  ev.preventDefault();
  const f=document.getElementById('f-upd'); clr(f);
  const id    = document.getElementById('upd-id').value;
  const name  = document.getElementById('upd-name').value.trim();
  const price = document.getElementById('upd-price').value.trim();
  const img   = document.getElementById('upd-img').value.trim()||'📦';
  let ok=true;
  if(!name)                       { setE('g-upd-name');  ok=false; }
  if(!price||parseFloat(price)<=0){ setE('g-upd-price'); ok=false; }
  if(!ok) return false;
  const i=products.findIndex(p=>p.id===id);
  if(i>-1) products[i]={...products[i],name,price:parseFloat(price),img};
  msg('upd-m','Product updated.',true);
  document.getElementById('upd-sec').style.display='none';
  renderYourItems();
  return false;
}

// ── Sheet 10: User Portal ─────────────────────────────────
// WELCOME USER | Dropdown: Catering | Florist | Decoration | Lighting
// Buttons: Vendor | Cart | Guest List | Order Status | LogOut
function renderVendors() {
  const f=document.getElementById('cat-filter')?.value||'';
  const el=document.getElementById('vendor-list'); if(!el) return;
  const arr=f?vendors.filter(v=>v.cat===f):vendors;
  if(!arr.length){ el.innerHTML='<p style="color:#888;padding:10px;">No vendors found.</p>'; return; }
  el.innerHTML=arr.map(v=>`<div class="vcard">
    <div style="font-size:1.8rem;margin-bottom:6px;">${catIcon(v.cat)}</div>
    <h4>${v.name}</h4>
    <p>Contact Details: ${v.contact}</p>
    <button class="btn btn-primary btn-sm" style="margin-top:8px;" onclick="shopItem('${v.id}')">Shop Item</button>
  </div>`).join('');
  updCartBadge();
}

// ── Sheet 11: Vendor Page ─────────────────────────────────
// Home | LogOut | Vendor [Florist] | Vender 1 Contact Details | Shop Item × 4
function shopItem(vid) {
  sessionStorage.setItem('vid', vid);
  location.href='products.html';
}

// ── Sheet 12: Products ────────────────────────────────────
// Home | LogOut | Vendor Name | Products
// Product 1/2/3/4 Price | Add to Cart × 4
function renderProducts() {
  const vid=sessionStorage.getItem('vid');
  const v=vendors.find(x=>x.id===vid);
  const list=products.filter(p=>p.vid===vid);
  const ttl=document.getElementById('prod-ttl');
  if(ttl) ttl.textContent=v?v.name:'Vendor Name';
  const gr=document.getElementById('prod-grid'); if(!gr) return;
  if(!list.length){ gr.innerHTML='<p style="color:#888;padding:10px;">No products listed.</p>'; return; }
  gr.innerHTML=list.map(p=>`<div class="pcard">
    <div class="img">${p.img}</div>
    <h4>${p.name}</h4>
    <div class="price">Rs/- ${p.price}</div>
    <button class="btn btn-primary btn-sm" onclick="addToCart('${p.id}')">Add to Cart</button>
  </div>`).join('');
}

// ── Sheet 13: Cart ────────────────────────────────────────
// Home | View Product | Request Item | Product Status | LogOut
// Shopping Cart | Image | Name | Price | Quantity (▼) | Total Price | Action (Remove)
// Grand Total | Delete All | Proceed to Check Out
function addToCart(pid) {
  const p=products.find(x=>x.id===pid); if(!p) return;
  const ex=cart.find(c=>c.pid===pid);
  if(ex) ex.qty++;
  else cart.push({pid,name:p.name,price:p.price,img:p.img,qty:1});
  updCartBadge();
  alert('"'+p.name+'" added to cart.');
}

function updCartBadge() {
  const b=document.getElementById('cart-cnt');
  if(b){ const t=cart.reduce((s,c)=>s+c.qty,0); b.textContent=t?'('+t+')':''; }
}

function renderCart() {
  const tb=document.getElementById('cart-body');
  const empty=document.getElementById('cart-empty');
  const tbl=document.getElementById('cart-tbl');
  const gt=document.getElementById('grand-total');
  if(!tb) return;
  if(!cart.length){
    if(empty) empty.style.display='block';
    if(tbl)   tbl.style.display='none';
    if(gt)    gt.style.display='none';
    return;
  }
  if(empty) empty.style.display='none';
  if(tbl)   tbl.style.display='table';
  if(gt)    gt.style.display='block';
  const grand=cart.reduce((s,c)=>s+c.price*c.qty,0);
  tb.innerHTML=cart.map(c=>`<tr>
    <td style="font-size:1.3rem;text-align:center;">${c.img}</td>
    <td>${c.name}</td>
    <td>${c.price}/-</td>
    <td><div class="qty-ctrl">
      <button onclick="chgQty('${c.pid}',-1)">−</button>
      <span>${c.qty}</span>
      <button onclick="chgQty('${c.pid}',1)">+</button>
    </div></td>
    <td>${c.price*c.qty}/-</td>
    <td><button class="btn btn-danger btn-sm" onclick="removeFromCart('${c.pid}')">Remove</button></td>
  </tr>`).join('');
  if(gt) gt.textContent='Grand Total\t\t\t\t\t'+grand+'/-';
}

function chgQty(pid,d) { const i=cart.find(c=>c.pid===pid); if(!i)return; i.qty+=d; if(i.qty<=0)cart=cart.filter(c=>c.pid!==pid); updCartBadge(); renderCart(); }
function removeFromCart(pid) { cart=cart.filter(c=>c.pid!==pid); updCartBadge(); renderCart(); }
function deleteAll() { if(!confirm('Delete all items?'))return; cart=[]; updCartBadge(); renderCart(); }
function proceedToCheckOut() { if(!cart.length){alert('Cart is empty.');return;} location.href='checkout.html'; }

// ── Sheet 14: CheckOut ────────────────────────────────────
// Item Grand Total | Details | Name | Number | E-mail | Payment Method (▼)
// Address | State | City | Pin Code | Order Now
function initCheckout() {
  const grand=cart.reduce((s,c)=>s+c.price*c.qty,0);
  const el=document.getElementById('co-total');
  if(el) el.textContent='Item Grand Total      '+grand+'/-';
  const u=users.find(x=>x.id===session.uid);
  if(u){
    const n=document.getElementById('co-name');   if(n)  n.value=u.name;
    const em=document.getElementById('co-email'); if(em) em.value=u.email;
  }
}

function placeOrder(ev) {
  ev.preventDefault();
  const f=document.getElementById('f-co'); clr(f);
  const name   =document.getElementById('co-name').value.trim();
  const email  =document.getElementById('co-email').value.trim();
  const address=document.getElementById('co-address').value.trim();
  const city   =document.getElementById('co-city').value.trim();
  const state  =document.getElementById('co-state').value.trim();
  const pin    =document.getElementById('co-pin').value.trim();
  const number =document.getElementById('co-number').value.trim();
  const pay    =document.querySelector('input[name="co-pay"]:checked');
  let ok=true;
  if(!name)                            { setE('g-co-name');    ok=false; }
  if(!email||!isEmail(email))          { setE('g-co-email');   ok=false; }
  if(!address)                         { setE('g-co-address'); ok=false; }
  if(!city)                            { setE('g-co-city');    ok=false; }
  if(!state)                           { setE('g-co-state');   ok=false; }
  if(!pin||!/^\d{6}$/.test(pin))       { setE('g-co-pin');     ok=false; }
  if(!number||!/^\d{10}$/.test(number)){ setE('g-co-number');  ok=false; }
  if(!pay)                             { setE('g-co-pay');     ok=false; }
  if(!ok) return false;
  const grand=cart.reduce((s,c)=>s+c.price*c.qty,0);
  const oid='ORD'+(oC++);
  orders.push({ id:oid, uid:session.uid, name, email, address, city, state, pin, number,
    pay:pay.value, items:[...cart], total:grand, status:'Recieved', date:new Date().toLocaleDateString('en-IN') });
  sessionStorage.setItem('lastOid',oid);
  cart=[]; updCartBadge();
  location.href='success.html';
  return false;
}

// ── Sheet 15: Success (PopUp) ─────────────────────────────
// THANK YOU | Total Amount | Name | Number | E-mail | Payment Method
// Address | State | City | OinCode | Continue Shopping
function renderSuccess() {
  const oid=sessionStorage.getItem('lastOid');
  const o=orders.find(x=>x.id===oid);
  const box=document.getElementById('s-box'); if(!box||!o) return;
  box.innerHTML=`
    <p><strong>Total Amount</strong></p>
    <p>${o.total}/-</p>
    <br>
    <p><strong>Name</strong> ${o.name}</p>
    <p><strong>Number</strong> ${o.number}</p>
    <p><strong>E-mail</strong> ${o.email}</p>
    <p><strong>Payment Method</strong> ${o.pay}</p>
    <p><strong>Address</strong> ${o.address}</p>
    <p><strong>State</strong> ${o.state}</p>
    <p><strong>City</strong> ${o.city}</p>
    <p><strong>OinCode</strong> ${o.pin}</p>`;
}

// ── Sheet 19: Order Status (User) ────────────────────────
// User Order Status | Name | E-mail | Address | Status
function renderOrderStatus() {
  const tb=document.getElementById('os-body'); if(!tb) return;
  const my=orders.filter(o=>o.uid===session.uid);
  if(!my.length){ tb.innerHTML='<tr><td colspan="4" style="text-align:center;color:#888;">No orders yet.</td></tr>'; return; }
  tb.innerHTML=my.map(o=>`<tr>
    <td>${o.name}</td>
    <td>${o.email}</td>
    <td>${o.address}</td>
    <td><span class="badge ${bClass(o.status)}">${o.status}</span></td>
  </tr>`).join('');
}

// ── Sheet 17: Product Status (Vendor) ────────────────────
// Product Status | Home | LogOut | Name | E-Mail | Address | Status | Update | Delete
function renderProductStatus() {
  const tb=document.getElementById('ps-body'); if(!tb) return;
  const my=orders.filter(o=>o.items.some(i=>{ const p=products.find(x=>x.id===i.pid); return p&&p.vid===session.vid; }));
  if(!my.length){ tb.innerHTML='<tr><td colspan="6" style="text-align:center;color:#888;">No orders.</td></tr>'; return; }
  tb.innerHTML=my.map(o=>`<tr>
    <td>${o.name}</td>
    <td>${o.email}</td>
    <td>${o.address}</td>
    <td><span class="badge ${bClass(o.status)}">${o.status}</span></td>
    <td><a href="update_status.html?oid=${o.id}" class="btn btn-warning btn-sm">Update</a></td>
    <td><button class="btn btn-danger btn-sm" onclick="delOrd('${o.id}')">Delete</button></td>
  </tr>`).join('');
}

function delOrd(id) { if(!confirm('Delete?'))return; orders=orders.filter(o=>o.id!==id); renderProductStatus(); }

// ── Sheet 18: Update ──────────────────────────────────────
// Home | LogOut | Update | Recieved | Ready for Shipping | Out For Delivery | Update
function initUpdate() {
  const oid=new URLSearchParams(location.search).get('oid');
  const o=orders.find(x=>x.id===oid); if(!o) return;
  document.getElementById('us-oid').value     = oid;
  document.getElementById('us-name').value    = o.name;
  document.getElementById('us-email').value   = o.email;
  document.getElementById('us-address').value = o.address;
  document.querySelectorAll('input[name="new-st"]').forEach(r=>{ if(r.value===o.status) r.checked=true; });
}

function doUpdateStatus(ev) {
  ev.preventDefault();
  const oid=document.getElementById('us-oid').value;
  const st=document.querySelector('input[name="new-st"]:checked');
  if(!st){ msg('us-m','Please select a status.',false); return false; }
  const i=orders.findIndex(o=>o.id===oid);
  if(i>-1) orders[i].status=st.value;
  msg('us-m','Status updated to "'+st.value+'".',true);
  return false;
}

// ── Sheet 16: Request Item (Vendor) ──────────────────────
// Home | Request Item | LogOut | Item 1 | Item 2 | Item 3 | Item 4
function renderRequestItems() {
  const tb=document.getElementById('ri-body'); if(!tb) return;
  tb.innerHTML=itemRequests.map(r=>`<tr>
    <td>${r.item}</td>
    <td>${r.from}</td>
  </tr>`).join('');
}

// ── Vendor Transection (Sheet 7: Transection) ────────────
function renderVendorTx() {
  const tb=document.getElementById('vtx-body'); if(!tb) return;
  const my=orders.filter(o=>o.items.some(i=>{ const p=products.find(x=>x.id===i.pid); return p&&p.vid===session.vid; }));
  if(!my.length){ tb.innerHTML='<tr><td colspan="4" style="text-align:center;color:#888;">No transactions.</td></tr>'; return; }
  tb.innerHTML=my.map(o=>`<tr>
    <td>${o.id}</td>
    <td>${o.name}</td>
    <td>Rs/- ${o.total}</td>
    <td>${o.pay}</td>
  </tr>`).join('');
}

// ── Guest List (Sheet 10 → Guest List) ───────────────────
function renderGuestList() {
  const tb=document.getElementById('gl-body'); if(!tb) return;
  const my=guestList.filter(g=>g.uid===session.uid);
  if(!my.length){ tb.innerHTML='<tr><td colspan="4" style="text-align:center;color:#888;">No guests added.</td></tr>'; return; }
  tb.innerHTML=my.map((g,i)=>`<tr>
    <td>${i+1}</td><td>${g.name}</td>
    <td>${g.email||'—'}</td>
    <td>${g.att?'✅ Yes':'❌ No'}</td>
    <td><button class="btn btn-danger btn-sm" onclick="removeGuest(${g.gid})">Remove</button></td>
  </tr>`).join('');
}

function addGuest(ev) {
  ev.preventDefault();
  const f=document.getElementById('f-gl'); clr(f);
  const name=document.getElementById('gl-name').value.trim();
  const email=document.getElementById('gl-email').value.trim();
  const att=document.getElementById('gl-att').checked;
  if(!name){ setE('g-gl-name'); return false; }
  guestList.push({gid:gC++,uid:session.uid,name,email,att});
  f.reset(); document.getElementById('gl-att').checked=true;
  renderGuestList();
  return false;
}

function removeGuest(gid) { guestList=guestList.filter(g=>g.gid!==gid); renderGuestList(); }

// ── Sheet 21: Maintain User ───────────────────────────────
// Membership [Add | Update] | User Management [Add | Update]
function renderUMTable() {
  const tb=document.getElementById('um-body'); if(!tb) return;
  if(!userMem.length){ tb.innerHTML='<tr><td colspan="6" style="text-align:center;color:#888;">No memberships.</td></tr>'; return; }
  tb.innerHTML=userMem.map(m=>`<tr>
    <td>${m.num}</td><td>${m.name}</td><td>${m.email}</td>
    <td>${m.dur}m</td>
    <td><span class="badge ${bClass(m.status)}">${m.status}</span></td>
    <td>${m.expiry}</td>
  </tr>`).join('');
}

// Add Membership — all fields mandatory | 6 months(default) | 1 year | 2 years | Checkbox Active
function addUM(ev) {
  ev.preventDefault();
  const f=document.getElementById('f-aum'); clr(f); noMsg('aum-m');
  const name  = document.getElementById('um-name').value.trim();
  const email = document.getElementById('um-email').value.trim();
  const phone = document.getElementById('um-phone').value.trim();
  const dur   = document.querySelector('input[name="um-dur"]:checked')?.value;
  const act   = document.getElementById('um-act').checked;
  let ok=true;
  if(!name)               { setE('g-um-name');  ok=false; }
  if(!email||!isEmail(email)){ setE('g-um-email'); ok=false; }
  if(!phone)              { setE('g-um-phone'); ok=false; }
  if(!ok) return false;
  const num='UM'+String(umC++).padStart(3,'0');
  userMem.push({num,name,email,phone,dur:parseInt(dur),expiry:addMonths(null,dur),status:act?'Active':'Inactive'});
  msg('aum-m','Membership added. Number: '+num,true);
  f.reset(); document.querySelector('input[name="um-dur"][value="6"]').checked=true; document.getElementById('um-act').checked=true;
  renderUMTable();
  return false;
}

// Update Membership — Membership Number mandatory → fields populate → Extend(6m default) | Cancel
function lookupUM(ev) {
  ev.preventDefault();
  const f=document.getElementById('f-lum'); clr(f); noMsg('uum-m');
  const num=document.getElementById('uum-num').value.trim();
  if(!num){ setE('g-uum-num'); return false; }
  const m=userMem.find(x=>x.num.toUpperCase()===num.toUpperCase());
  if(!m){ msg('uum-m','Membership Number not found.',false); document.getElementById('uum-flds').style.display='none'; return false; }
  document.getElementById('uum-name').value   = m.name;
  document.getElementById('uum-email').value  = m.email;
  document.getElementById('uum-expiry').value = m.expiry;
  document.getElementById('uum-status').value = m.status;
  document.querySelector('input[name="uum-act"][value="extend"]').checked=true;
  document.querySelector('input[name="uum-ext"][value="6"]').checked=true;
  document.getElementById('uum-ext-sec').style.display='block';
  document.getElementById('uum-flds').style.display='block';
  msg('uum-m','Member found.',true);
  return false;
}

function doUpdateUM(ev) {
  ev.preventDefault();
  const num   =document.getElementById('uum-num').value.trim();
  const action=document.querySelector('input[name="uum-act"]:checked')?.value;
  const i=userMem.findIndex(x=>x.num.toUpperCase()===num.toUpperCase());
  if(i<0) return false;
  if(action==='cancel'){
    userMem[i].status='Cancelled';
    msg('uum-m','Membership cancelled.',true);
  } else {
    const ext=document.querySelector('input[name="uum-ext"]:checked')?.value||'6';
    userMem[i].expiry=addMonths(userMem[i].expiry,ext);
    userMem[i].status='Active';
    msg('uum-m','Extended. New expiry: '+userMem[i].expiry,true);
  }
  document.getElementById('uum-expiry').value=userMem[i].expiry;
  document.getElementById('uum-status').value=userMem[i].status;
  renderUMTable();
  return false;
}

function togExt() {
  const a=document.querySelector('input[name="uum-act"]:checked')?.value;
  const e=document.getElementById('uum-ext-sec');
  if(e) e.style.display=a==='extend'?'block':'none';
}

// ── Sheet 22: Maintain Vendor ─────────────────────────────
// Membership [Add | Update] | User Management [Add | Update]
function renderVMTable() {
  const tb=document.getElementById('vm-body'); if(!tb) return;
  if(!vendorMem.length){ tb.innerHTML='<tr><td colspan="6" style="text-align:center;color:#888;">No memberships.</td></tr>'; return; }
  tb.innerHTML=vendorMem.map(m=>`<tr>
    <td>${m.num}</td><td>${m.name}</td><td>${m.cat}</td>
    <td>${m.dur}m</td>
    <td><span class="badge ${bClass(m.status)}">${m.status}</span></td>
    <td>${m.expiry}</td>
  </tr>`).join('');
}

function addVM(ev) {
  ev.preventDefault();
  const f=document.getElementById('f-avm'); clr(f); noMsg('avm-m');
  const name  = document.getElementById('vm-name').value.trim();
  const email = document.getElementById('vm-email').value.trim();
  const cat   = document.getElementById('vm-cat').value;
  const dur   = document.querySelector('input[name="vm-dur"]:checked')?.value;
  const act   = document.getElementById('vm-act').checked;
  let ok=true;
  if(!name)               { setE('g-vm-name');  ok=false; }
  if(!email||!isEmail(email)){ setE('g-vm-email'); ok=false; }
  if(!cat)                { setE('g-vm-cat');   ok=false; }
  if(!ok) return false;
  const num='VM'+String(vmC++).padStart(3,'0');
  vendorMem.push({num,name,email,cat,dur:parseInt(dur),expiry:addMonths(null,dur),status:act?'Active':'Inactive'});
  msg('avm-m','Membership added. Number: '+num,true);
  f.reset(); document.querySelector('input[name="vm-dur"][value="6"]').checked=true; document.getElementById('vm-act').checked=true;
  renderVMTable();
  return false;
}

function lookupVM(ev) {
  ev.preventDefault();
  const f=document.getElementById('f-lvm'); clr(f); noMsg('uvm-m');
  const num=document.getElementById('uvm-num').value.trim();
  if(!num){ setE('g-uvm-num'); return false; }
  const m=vendorMem.find(x=>x.num.toUpperCase()===num.toUpperCase());
  if(!m){ msg('uvm-m','Membership Number not found.',false); document.getElementById('uvm-flds').style.display='none'; return false; }
  document.getElementById('uvm-name').value   = m.name;
  document.getElementById('uvm-cat').value    = m.cat;
  document.getElementById('uvm-expiry').value = m.expiry;
  document.getElementById('uvm-status').value = m.status;
  document.querySelector('input[name="uvm-act"][value="extend"]').checked=true;
  document.querySelector('input[name="uvm-ext"][value="6"]').checked=true;
  document.getElementById('uvm-ext-sec').style.display='block';
  document.getElementById('uvm-flds').style.display='block';
  msg('uvm-m','Vendor found.',true);
  return false;
}

function doUpdateVM(ev) {
  ev.preventDefault();
  const num   =document.getElementById('uvm-num').value.trim();
  const action=document.querySelector('input[name="uvm-act"]:checked')?.value;
  const i=vendorMem.findIndex(x=>x.num.toUpperCase()===num.toUpperCase());
  if(i<0) return false;
  if(action==='cancel'){
    vendorMem[i].status='Cancelled';
    msg('uvm-m','Membership cancelled.',true);
  } else {
    const ext=document.querySelector('input[name="uvm-ext"]:checked')?.value||'6';
    vendorMem[i].expiry=addMonths(vendorMem[i].expiry,ext);
    vendorMem[i].status='Active';
    msg('uvm-m','Extended. New expiry: '+vendorMem[i].expiry,true);
  }
  document.getElementById('uvm-expiry').value=vendorMem[i].expiry;
  document.getElementById('uvm-status').value=vendorMem[i].status;
  renderVMTable();
  return false;
}

function togVExt() {
  const a=document.querySelector('input[name="uvm-act"]:checked')?.value;
  const e=document.getElementById('uvm-ext-sec');
  if(e) e.style.display=a==='extend'?'block':'none';
}

// ── Admin Reports ─────────────────────────────────────────
function renderAdminReports() {
  const u=document.getElementById('r-um');
  if(u) u.innerHTML=userMem.length?userMem.map(m=>`<tr><td>${m.num}</td><td>${m.name}</td><td>${m.email}</td><td>${m.dur}m</td><td>${m.expiry}</td><td><span class="badge ${bClass(m.status)}">${m.status}</span></td></tr>`).join(''):'<tr><td colspan="6" style="text-align:center;color:#888;">No data.</td></tr>';
  const v=document.getElementById('r-vm');
  if(v) v.innerHTML=vendorMem.length?vendorMem.map(m=>`<tr><td>${m.num}</td><td>${m.name}</td><td>${m.cat}</td><td>${m.expiry}</td><td><span class="badge ${bClass(m.status)}">${m.status}</span></td></tr>`).join(''):'<tr><td colspan="5" style="text-align:center;color:#888;">No data.</td></tr>';
  const o=document.getElementById('r-ord');
  if(o) o.innerHTML=orders.length?orders.map(x=>`<tr><td>${x.id}</td><td>${x.name}</td><td>Rs/- ${x.total}</td><td>${x.pay}</td><td><span class="badge ${bClass(x.status)}">${x.status}</span></td></tr>`).join(''):'<tr><td colspan="5" style="text-align:center;color:#888;">No orders.</td></tr>';
}

function renderAdminTx() {
  const tb=document.getElementById('tx-body'); if(!tb) return;
  tb.innerHTML=orders.length?orders.map(o=>`<tr><td>${o.id}</td><td>${o.name}</td><td>Rs/- ${o.total}</td><td>${o.pay}</td><td>${o.date}</td></tr>`).join(''):'<tr><td colspan="5" style="text-align:center;color:#888;">No transactions.</td></tr>';
}

function renderUserReports() {
  const tb=document.getElementById('ur-body'); if(!tb) return;
  const my=orders.filter(o=>o.uid===session.uid);
  tb.innerHTML=my.length?my.map(o=>`<tr><td>${o.id}</td><td>${o.items.map(i=>i.name).join(', ')}</td><td>Rs/- ${o.total}</td><td>${o.pay}</td><td><span class="badge ${bClass(o.status)}">${o.status}</span></td></tr>`).join(''):'<tr><td colspan="5" style="text-align:center;color:#888;">No orders.</td></tr>';
}
