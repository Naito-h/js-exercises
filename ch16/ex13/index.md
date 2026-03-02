```
# Windows (WSL 不要)
# 問題: なぜ直接 dir を使わず cmd /c を書いているのだろうか？これらの意味は？
> cmd /c dir | cmd /c "findstr DIR"
```

`dir` はWindowsの組み込みコマンドであり、外部コマンドではないため、`spawn` で直接起動できないから