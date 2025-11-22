
const productsContainer = document.getElementById("products");
const filterButtons = document.querySelectorAll(".cat-btn");
const searchInput = document.getElementById("searchInput");
const sortSelect = document.getElementById("sortSelect");

function formatPrice(vnd) {
  return vnd.toLocaleString("vi-VN") + "₫";
}

function createProductCard(p) {
  const card = document.createElement("article");
  card.className = `product-card ${p.category}`;
  card.setAttribute("data-category", p.category);
  card.setAttribute("data-price", p.price);
  const specsHtml = p.specs
    .map(s => {
      const needsBreak = /^\s*1\s*TB/i.test(s);
      return (needsBreak ? '<span class="break"></span>' : '') + `<span class="badge">${s}</span>`;
    })
    .join("");

  card.innerHTML = `
    <div class="badges">
      <span class="badge ${p.category}">${labelCategory(p.category)}</span>
    </div>
    <h2 class="product-title">${p.title}</h2>
    <p class="desc">${p.desc}</p>
    <div class="specs">${specsHtml}</div>
    <div class="price-row">
      <span class="price">${formatPrice(p.price)}</span>
      ${p.oldPrice ? `<span class="old-price">${formatPrice(p.oldPrice)}</span>` : ""}
    </div>
    <div class="actions">
      <button class="btn">Mua ngay</button>
      <button class="btn secondary" data-id="${p.id}" aria-label="Xem chi tiết sản phẩm ${p.title}">Chi tiết</button>
    </div>
  `;
  return card;
}

function labelCategory(cat) {
  switch (cat) {
    case "gaming": return "Gaming";
    case "van-phong": return "Văn Phòng";
    case "design": return "Design";
    default: return cat;
  }
}

function renderProducts(list) {
  productsContainer.innerHTML = "";
  if (!list.length) {
    productsContainer.innerHTML = '<div class="empty">Không tìm thấy sản phẩm phù hợp.</div>';
    return;
  }
  list.forEach(p => productsContainer.appendChild(createProductCard(p)));
}

function getFilteredProducts() {
  const activeBtn = document.querySelector('.cat-btn.active');
  const filter = activeBtn ? activeBtn.getAttribute('data-filter') : 'all';
  const keyword = searchInput.value.trim().toLowerCase();
  let filtered = productsData.filter(p => {
    const matchCat = filter === 'all' || p.category === filter;
    const matchKeyword = !keyword || p.title.toLowerCase().includes(keyword);
    return matchCat && matchKeyword;
  });
  const sortMode = sortSelect.value;
  if (sortMode === 'asc') filtered.sort((a,b)=> a.price - b.price);
  else if (sortMode === 'desc') filtered.sort((a,b)=> b.price - a.price);
  return filtered;
}

filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    filterButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderProducts(getFilteredProducts());
  });
});

searchInput.addEventListener('input', () => renderProducts(getFilteredProducts()));
sortSelect.addEventListener('change', () => renderProducts(getFilteredProducts()));

renderProducts(productsData);

// Bắt sự kiện click nút Chi tiết để điều hướng sang trang chi tiết
productsContainer.addEventListener('click', (e) => {
  const btn = e.target.closest('.btn.secondary[data-id]');
  if (!btn) return;
  const id = btn.getAttribute('data-id');
  window.location.href = `product.html?id=${id}`;
});
