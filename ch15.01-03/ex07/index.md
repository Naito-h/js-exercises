# 異なるオリジンのページを iframe で表示できない理由
表示されたエラー
```
Refused to display 'https://www.youtube.com/' in a frame because it set 'X-Frame-Options' to 'sameorigin'.
```

## クリックジャッキング とは  
- 不正なリンクやボタンなどを透明な状態にして、通常のWebページに重ね合わせる攻撃
- ユーザーに気づかれないようにクリックさせるなど視覚的にだまして、ユーザーの意図しない操作をさせる
- 「クリック」を「ジャックする（乗っ取る）」ということからクリックジャッキングと呼ばれる

参考: https://www.lanscope.jp/blogs/cyber_attack_pfs_blog/20231129_16743/

## iframe でエラーになった理由
`X-Frame-Options` に `sameorigin` が設定されていることによって、同一オリジンのWebページのみ `iframe` 内で表示可能になるので、同一オリジンでないyoutubeは `iframe` で表示できなくなっていた

## クロスオリジンの DOM 操作制限
クロスオリジンの `iframe` のDOM操作は制限されているため、直接アクセスすることはできない

## 同一オリジンポリシーがなく、iframe 内の他サイトの DOM 変更が可能な場合のリスク
他のサイトを自由に操作できる状態になってしまうため、情報漏洩やなりすまし、不正操作やセッションの乗っ取りなどの攻撃が行えるようになる
