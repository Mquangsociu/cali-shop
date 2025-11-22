// Trang chi tiết sản phẩm
(function(){
  const root = document.getElementById('detailRoot');
  function formatPrice(vnd){ return vnd.toLocaleString('vi-VN') + '₫'; }
  function labelCategory(cat){
    switch(cat){
      case 'gaming': return 'Gaming';
      case 'van-phong': return 'Văn Phòng';
      case 'design': return 'Design';
      default: return cat;
    }
  }
  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get('id'),10);
  const product = productsData.find(p => p.id === id);
  if(!product){
    root.innerHTML = '<div class="not-found">Không tìm thấy sản phẩm. <br/><button class="back-btn" onclick="window.location.href=\'index.html\'">Quay về danh sách</button></div>';
    return;
  }

  // Tạo gallery ảnh
  const images = product.images && product.images.length ? product.images : [];
  let mainImage = images[0] || '';
  const thumbsHtml = images.map((url,i)=>
    `<button class="thumb ${i===0?'active':''}" data-index="${i}" aria-label="Ảnh ${i+1}"><img src="${url}" alt="${product.title} hình ${i+1}"/></button>`
  ).join('');

  const specsHtml = product.specs.map(s => `<span class="badge">${s}</span>`).join('');
  const discountPercent = product.oldPrice ? Math.round((product.oldPrice - product.price)/product.oldPrice*100) : 0;

  root.innerHTML = `
    <div class="detail-layout">
      <div class="gallery">
        ${mainImage ? `<div class="main-img"><img src="${mainImage}" alt="${product.title}" /></div>` : ''}
        ${images.length ? `<div class="thumbs" role="group" aria-label="Ảnh sản phẩm">${thumbsHtml}</div>`:''}
      </div>
      <div class="info-panel">
        <div class="badges"><span class="badge ${product.category}">${labelCategory(product.category)}</span></div>
        <h2 class="detail-title">${product.title}</h2>
        <p class="detail-desc">${product.desc}</p>
        <div class="price-block">
          <span class="price">${formatPrice(product.price)}</span>
          ${product.oldPrice ? `<span class="old-price">${formatPrice(product.oldPrice)}</span>`:''}
          ${discountPercent? `<span class="discount-badge">-${discountPercent}%</span>`:''}
        </div>
        <div class="detail-specs">${specsHtml}</div>
        <div class="actions-row">
          <button class="buy-btn">MUA NGAY</button>
          <button class="back-btn" onclick="window.location.href='index.html'">← Quay lại</button>
        </div>
      </div>
    </div>
  `;

  // Lắng nghe click thumbnail để đổi ảnh chính
  const thumbs = root.querySelectorAll('.thumb');
  const mainImgEl = root.querySelector('.main-img img');
  thumbs.forEach(btn => btn.addEventListener('click', () => {
    thumbs.forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    const idx = parseInt(btn.getAttribute('data-index'),10);
    if(images[idx]) mainImgEl.src = images[idx];
  }));
})();