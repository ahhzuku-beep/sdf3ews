function startVisitorCounter(){
  const el = document.getElementById('visitor-counter');
  if(!el) return;
  let value = Math.floor(Math.random() * 99) + 400; // 400..498
  el.textContent = `${value} Live shopping carts`;
  setInterval(()=>{
    // Change by -1, 0, or +1, but clamp to 400..498
    const delta = Math.floor(Math.random() * 3) - 1; // -1, 0, 1
    value = Math.max(400, Math.min(498, value + delta));
    el.textContent = `${value} Live shopping carts`;
  }, 1500);
}

document.addEventListener('DOMContentLoaded', ()=>{ startVisitorCounter(); });

// submission handler (name + email only)
document.getElementById('contact').addEventListener('submit', async (e) => {
  e.preventDefault();
  const statusEl = document.getElementById('status');
  statusEl.className = 'status status-sending';
  statusEl.textContent = 'Sending...';

  const form = e.target;
  const data = new FormData(form); // will include name and email
  const body = new URLSearchParams(data);

  try {
    const res = await fetch('/submit', { method: 'POST', body });
    if (!res.ok) {
      const text = await res.text();
      statusEl.className = 'status status-error';
      statusEl.textContent = 'Error: ' + (text || res.status);
      return;
    }
    const json = await res.json();
    statusEl.className = 'status status-success';
    const previewHtml = json.previewUrl ? ` Preview: <a href="${json.previewUrl}" target="_blank" rel="noopener">Preview</a>` : '';
    statusEl.innerHTML = 'Thanks — your submission was sent.' + previewHtml;
    form.reset();
    setTimeout(() => { statusEl.className = 'status'; }, 5000);
  } catch (err) {
    statusEl.className = 'status status-error';
    statusEl.textContent = 'Network or server error';
    console.error(err);
  }
});
