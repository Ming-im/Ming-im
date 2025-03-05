// 初始化数据加载
window.addEventListener('DOMContentLoaded', () => {
    fetch('./data.json')
        .then(response => response.json())
        .then(data => {
            renderLinks(data.links);
            setupSearch(data.links);
        });
});

// 渲染链接卡片
function renderLinks(links) {
    const container = document.getElementById('linksContainer');
    container.innerHTML = links.map(link => `
        <div class="link-card">
            <h3 class="link-title">${link.title}</h3>
            <a href="${link.url}" class="link-url" target="_blank">${new URL(link.url).hostname}</a>
            <div class="category-tags">
                ${link.categories.map(cat => `<span class="category-tag">${cat}</span>`).join('')}
            </div>
        </div>
    `).join('');
}

// 设置搜索功能
function setupSearch(links) {
    const searchInput = document.getElementById('searchInput');
    
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        const filtered = links.filter(link => 
            link.title.toLowerCase().includes(query) ||
            link.description.toLowerCase().includes(query) ||
            link.categories.some(cat => cat.toLowerCase().includes(query))
        );
        renderLinks(filtered);
    });
}