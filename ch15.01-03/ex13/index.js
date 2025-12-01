// 1. nav 要素内のリンク (<a>)
const nav_link = document.querySelector('nav a');
console.log(nav_link);

// 2. 商品リスト (.product-list) 内の最初の商品 (.product-item)
const product_first_item = document.querySelector('.product-list>.product-item:first-child');
console.log(product_first_item);

// 3. カートアイコンの画像 (<img>)
const cart_img = document.querySelector('.cart img');
console.log(cart_img);

// 4. 商品リスト (.product-list) 内の価格 (.price) を表示する要素
const item_price = document.querySelector('.product-list .price');
console.log(item_price);

// 5. 商品リスト (.product-list) 内の全ての商品 (.product-item) の画像 (<img>)
const item_img = document.querySelectorAll('.product-list .product-item img');
for (let i = 0; i < item_img.length; i++) {
  console.log(item_img[i]);
}

// 6. 検索バー (.search-bar) 内の検索ボタン (<button>)
const search_button = document.querySelector('.search-bar button');
console.log(search_button);

// 7. フッター (footer) 内のパラグラフ (<p>) 要素
const footer_paragraph = document.querySelector('footer p');
console.log(footer_paragraph);

// 8. 商品リスト (.product-list) 内の偶数番目の商品 (.product-item)
const even_items = document.querySelectorAll('.product-list .product-item:nth-child(even)');
for (let i = 0; i < even_items.length; i++) {
  console.log(even_items[i]);
}

// 9. ヘッダー (header) 内のアカウントリンク (.account) の画像 (<img>)
const account_link_img = document.querySelector('.account a img');
console.log(account_link_img);

// 10. ナビゲーションリンクのうち、"会社情報" のリンク
const about_link = document.querySelector('nav a[href="#about"]');
console.log(about_link);