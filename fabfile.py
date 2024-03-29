# coding: utf-8
from __future__ import with_statement
from fabric.api import run, env, abort, cd
from fabric.contrib.console import confirm

env.hosts = ['133.16.123.101'];
env.port = 22
env.user = 'yuki'
env.key_filename = '~/.ssh/tim'

def deploy():
  hostname = run('hostname')
  # Confirm
  if not confirm(hostname + " <- このサーバにデプロイします、よろしいですか？"):
    abort("中止しました")

  # Deploy
  project_path = '/var/www/fim/'
  with cd(project_path):
    run("git pull origin master")
    run("/home/yuki/.anyenv/envs/ndenv/shims/forever restart /var/www/fim/out/www.js")

def start():
  hostname = run('hostname')
  # Confirm
  if not confirm(hostname + " <- このサーバのWebAppを起動します。よろしいですか？"):
    abort("中止しました")

  run("/home/yuki/.anyenv/envs/ndenv/shims/forever start /var/www/fim/out/www.js")

def stop():
  hostname = run('hostname')
  # Confirm
  if not confirm(hostname + " <- このサーバのWebAppを停止します。よろしいですか？"):
    abort("中止しました")

  run("source /home/yuki/.bashrc")
  run("/home/yuki/.anyenv/envs/ndenv/shims/forever stop /var/www/fim/out/www.js")
