# オリジン間リソース共有（CORS）

## 1. クロスオリジンリクエストに制約がなかった場合に発生する問題

制約がない場合、悪意のあるサイトが他のサイトのデータを不正に読み取りや操作が可能になり、以下のような攻撃が発生する
- 機密情報を盗み取る
- ブラウザ経由での社内ネットワークへの不正アクセス
- ユーザーのCookieやセッション情報の読み取りによるアカウント乗っ取り
- ユーザーのブラウザを悪用した不正操作（CSRF攻撃）

## 2. クロスオリジンリクエストでメソッドやリクエストの内容によってPreflightリクエストの有無が異なる理由

GETはデータ変更を伴わないのに対し、POSTやDELETE、PUTなどはデータが変更されるような副作用があるため  
また、CORS登場以前から存在するリクエストに対してPreflightリクエストが発生すると互換性がなくなってしまうため

互換性維持のため**単純リクエスト（Simple Request）**はPreflightなしで送信される。

- メソッド：`GET`, `HEAD`, `POST`
- 許可されるヘッダ：`Accept`, `Accept-Language`, `Content-Language`, `Content-Type`
- `Content-Type`の値：`application/x-www-form-urlencoded`, `multipart/form-data`, `text/plain`

上記以外（カスタムヘッダ、`PUT`/`DELETE`メソッド、`application/json`など）は**Preflightリクエスト**（`OPTIONS`メソッド）が先に送信され、サーバーの許可を確認してからリクエストが実行される。

