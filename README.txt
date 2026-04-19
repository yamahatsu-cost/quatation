固定ファイル名版 一式

このZIPを GitHub Pages の公開フォルダにそのまま置けば、
今後は index の中身を更新するときに index.html を上書きするだけで運用しやすくなります。

入っているファイル
- index.html
- manifest.json
- sw.js
- icon.png
- icon-512.png
- apple-touch-icon.png

今後の更新ルール
1. 画面や機能だけ更新する
   -> index.html だけアップ

2. PWAのキャッシュ更新を確実に反映したい
   -> sw.js の CACHE_NAME を
      estimate-app-fixed-v1
      から
      estimate-app-fixed-v2
      のように上げてアップ

3. アイコンを変える
   -> icon.png / icon-512.png / apple-touch-icon.png を上書き

4. ファイル名は固定推奨
   -> index.html のまま使う
   -> icon-512.png のまま使う

反映後のおすすめ
- スマホのホーム画面ショートカットを一度削除
- ブラウザでサイトを開き直す
- 再度ホーム画面に追加
