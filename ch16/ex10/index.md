### `fs.createReadStream` を利用した場合
2947592 bytes  
![alt text]({401ADEBE-9CCA-4D1C-993B-F4C07065EA7B}.png)

### `fs.read` を利用した場合
2005528 bytes  
![alt text]({794959F4-CF25-4261-9CCE-8F2B01D1D569}.png)

`fs.read` を利用した場合の方が `fs.createReadStream` を利用した場合よりもメモリ使用量が少ない結果になった。

`fs.createReadStream` を使う場合、ストリームになるのでメモリ使用量が少なくなると思ったがそうならなかった。