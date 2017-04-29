# README

## ユビキタス言語
* Caretaker ... 介護者
* Resident ... 入居者
* Incident ... 転倒、動き出しなどの事象
* Gateway ... ESPerのボード自体
* Module ... VelostatやLEDなどのモジュール

# 開発環境
## ローカルサーバ
gulpでtsファイルの変更をwatchしているので、開発時は立ち上げた状態にしておかないといけない。
```
  $ npml gulp
```

## Deploy
デプロイ先サーバへのsshキーが必要。
```
  $ fab deploy
```

## Node.js
* 6.10.2
* Anyenvのndenvで設定することを推奨

## Python
* 2.7.13
* Fabricによるデプロイを行うのでPythonが必要
* Anyenvのpyenvにpyenv-virtualenvで入れることを推奨

## Nginx
nginxの設定変更した場合

```
  $ sudo systemctl reload nginx
```
