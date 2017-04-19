# README

## ユビキタス言語
* Caretaker ... 介護者
* Resident ... 入居者
* Incident ... 転倒、動き出しなどの事象
* Sensor ... ESPerのボード自体
* Module ... VelostatやLEDなどのモジュール

## Deploy
```
  $ fab deploy
```
デプロイ先サーバへのsshキーが必要

# 開発環境
## Node.js
* 6.10.2
* Anyenvのndenvで設定することを推奨

## Python
* 2.7.13
* Fabricによるデプロイを行うのでPythonが必要
* Anyenvのpyenvにpyenv-virtualenvで入れることを推奨


## Nginx
nginxの設定変更
```
  $ sudo systemctl reload nginx
```
