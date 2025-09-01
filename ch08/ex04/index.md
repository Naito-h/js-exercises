入れ子の関数の場合
予想
false true

結果
false true

入れ子の関数の場合はthisの値を継承しないため、nestがthisになる

アロー関数の場合
予想
true false

結果
true false

アロー関数の場合はthisの値を継承するため、objがthisになる
