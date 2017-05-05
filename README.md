# README

# Database
## Room

| Name      | Type      | Feature   |
| --------- |:---------:| ---------:|
| id        | Integer   | Primary   |
| name      | TEXT      |           |
| gatewayId | Integer   | Unique    |
| update    | TIMESTAMP |           |

## Resident

| Name      | Type                  | Feature   |
| --------- |:---------------------:| ---------:|
| id        | Integer               | Primary   |
| name      | TEXT                  |           |
| roomId    | Integer               |           |
| sex       | ENUM(Male, Female)    |           |
| birth     | TIMESTAMP             |           |
| update    | TIMESTAMP             |           |

## Incident

| Name      | Type                  | Feature   |
| --------- |:---------------------:| ---------:|
| id        | Integer               | Primary   |
| status    | ENUM(Fall, Active)    |           |
| gatewayId | Integer               |           |
| moduleId  | Integer               |           |
| update    | TIMESTAMP             |           |

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
