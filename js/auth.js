// ── HELPERS ──────────────────────────────────────────────
function clr(f)   { f.querySelectorAll('.err').forEach(e=>e.classList.remove('err')); }
function setE(id) { const e=document.getElementById(id); if(e) e.classList.add('err'); }
function msg(id,t,ok){ const e=document.getElementById(id); if(!e)return; e.className='alert '+(ok?'alert-ok':'alert-err'); e.textContent=t; e.style.display='block'; }
function noMsg(id){ const e=document.getElementById(id); if(e) e.style.display='none'; }

// ── Sheet 3: Admin Login — User Id | Password | Cancel | Login ──
function adminLogin(ev) {
  ev.preventDefault();
  const f=document.getElementById('f-al'); clr(f); noMsg('al-m');
  const uid=document.getElementById('al-uid').value.trim();
  const pwd=document.getElementById('al-pwd').value.trim();
  let ok=true;
  if(!uid){ setE('g-al-uid'); ok=false; }
  if(!pwd){ setE('g-al-pwd'); ok=false; }
  if(!ok) return false;
  const a=admins.find(x=>x.id===uid&&x.pwd===pwd);
  if(!a){ msg('al-m','Invalid User Id or Password.',false); return false; }
  session.role='admin'; session.uid=uid; session.name='Admin';
  location.href='admin_dashboard.html';
  return false;
}

// ── Sheet 4: Vendor Login — User Id | Password | Cancel | Login ──
function vendorLogin(ev) {
  ev.preventDefault();
  const f=document.getElementById('f-vl'); clr(f); noMsg('vl-m');
  const uid=document.getElementById('vl-uid').value.trim();
  const pwd=document.getElementById('vl-pwd').value.trim();
  let ok=true;
  if(!uid){ setE('g-vl-uid'); ok=false; }
  if(!pwd){ setE('g-vl-pwd'); ok=false; }
  if(!ok) return false;
  const v=vendors.find(x=>x.id===uid&&x.pwd===pwd);
  if(!v){ msg('vl-m','Invalid User Id or Password.',false); return false; }
  session.role='vendor'; session.uid=uid; session.name=v.name; session.vid=uid;
  location.href='vendor_dashboard.html';
  return false;
}

// ── Sheet 6: User Login — User Id | Password | Cancel | Login ──
function userLogin(ev) {
  ev.preventDefault();
  const f=document.getElementById('f-ul'); clr(f); noMsg('ul-m');
  const uid=document.getElementById('ul-uid').value.trim();
  const pwd=document.getElementById('ul-pwd').value.trim();
  let ok=true;
  if(!uid){ setE('g-ul-uid'); ok=false; }
  if(!pwd){ setE('g-ul-pwd'); ok=false; }
  if(!ok) return false;
  const u=users.find(x=>x.id===uid&&x.pwd===pwd);
  if(!u){ msg('ul-m','Invalid User Id or Password.',false); return false; }
  session.role='user'; session.uid=uid; session.name=u.name;
  location.href='user_portal.html';
  return false;
}

// ── Sheet 5: Vendor Sign Up — Name | Email | Password | Category (Drop Down) | Sign Up ──
function vendorSignup(ev) {
  ev.preventDefault();
  const f=document.getElementById('f-vs'); clr(f); noMsg('vs-m');
  const name=document.getElementById('vs-name').value.trim();
  const email=document.getElementById('vs-email').value.trim();
  const uid=document.getElementById('vs-uid').value.trim();
  const pwd=document.getElementById('vs-pwd').value.trim();
  const cat=document.getElementById('vs-cat').value;
  let ok=true;
  if(!name)                { setE('g-vs-name');  ok=false; }
  if(!email||!isEmail(email)){ setE('g-vs-email'); ok=false; }
  if(!uid)                 { setE('g-vs-uid');   ok=false; }
  if(!pwd||pwd.length<6)   { setE('g-vs-pwd');   ok=false; }
  if(!cat)                 { setE('g-vs-cat');   ok=false; }
  if(!ok) return false;
  if(vendors.find(x=>x.id===uid)){ msg('vs-m','User Id already exists.',false); return false; }
  vendors.push({id:uid,pwd,name,email,cat,contact:''});
  msg('vs-m','Sign Up successful! You can now Login.',true);
  f.reset();
  return false;
}

// ── Sheet 8: User Sign Up — Name | Email | Password | Sign Up ──
function userSignup(ev) {
  ev.preventDefault();
  const f=document.getElementById('f-us'); clr(f); noMsg('us-m');
  const name=document.getElementById('us-name').value.trim();
  const email=document.getElementById('us-email').value.trim();
  const uid=document.getElementById('us-uid').value.trim();
  const pwd=document.getElementById('us-pwd').value.trim();
  let ok=true;
  if(!name)                { setE('g-us-name');  ok=false; }
  if(!email||!isEmail(email)){ setE('g-us-email'); ok=false; }
  if(!uid)                 { setE('g-us-uid');   ok=false; }
  if(!pwd||pwd.length<6)   { setE('g-us-pwd');   ok=false; }
  if(!ok) return false;
  if(users.find(x=>x.id===uid)){ msg('us-m','User Id already exists.',false); return false; }
  users.push({id:uid,pwd,name,email});
  msg('us-m','Sign Up successful! You can now Login.',true);
  f.reset();
  return false;
}

// ── LogOut ────────────────────────────────────────────────
function logout() {
  session.role=null; session.uid=null; session.name=null; session.vid=null;
  cart=[]; guestList=[];
  location.href='../index.html';
}
