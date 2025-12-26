html がパースされた後に実行するには、defer を書くのが適切
async は実行タイミングが前後することがあり、html のパースの前に実行された場合、正しく動作しないことがある

index1.html
deferの場合、jqueryやlodashの実行完了を待たなくてはいけなくなるので、
async + loadedイベントが最速

index2.html
deferが最速