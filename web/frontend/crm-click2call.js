<!-- CRM-side snippet to embed an icon/button. Put this into the CRM's HTML where the phone number appears. -->
<button id="ctc-btn" style="background:#0b74de;color:white;padding:6px;border-radius:4px;border:none;">📞 Call</button>
<script>
  const DIALER_API = 'https://your-dialer.example.com/api/originate';
  const CRM_SHARED_SECRET = 'crm-secret';
  function hmacSign(payload, secret){
    const enc = new TextEncoder();
    return crypto.subtle.importKey('raw', enc.encode(secret), {name:'HMAC',hash:'SHA-256'}, false, ['sign'])
      .then(key=>crypto.subtle.sign('HMAC', key, enc.encode(JSON.stringify(payload))))
      .then(sig=>Array.from(new Uint8Array(sig)).map(b=>b.toString(16).padStart(2,'0')).join(''));
  }
  document.getElementById('ctc-btn').addEventListener('click', async ()=>{
    const from = '100';
    const to = prompt('Enter number to call', '+91');
    if(!to) return;
    const body = {type:'click2call', from, to, gateway:'sip', crm_id:'crm-abc'};
    const sign = await hmacSign(body, CRM_SHARED_SECRET);
    fetch(DIALER_API, {method:'POST', headers:{'Content-Type':'application/json','x-crm-sign':sign}, body: JSON.stringify(body)})
      .then(r=>r.json()).then(j=>alert('Call status: '+JSON.stringify(j))).catch(e=>alert('error:'+e));
  });
</script>
