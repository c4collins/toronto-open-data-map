from fabric.api import local


def serve():
    copy_libs()
    simple_server()


def simple_server(lang="js"):
    if lang is "js":
        local('http-server www/ &')
    if lang is "py":
        local('cd www/')
        local('python2 -m SimpleHTTPServer 8080 &')
        local('cd ..')


def copy_libs():
    local('cp src/js-libs/* www/js/libs')


def watch():
    watch_stylus()
    watch_jade()
    watch_coffee()


def watch_stylus():
    local('stylus --watch src/stylus/main.styl --compare --inline --out www/css/ &')


def watch_jade():
    local('jade  --watch --pretty --out www/ src/jade &')


def watch_coffee():
    local('coffee --watch --output www/js/modules/ --compile src/coffee/*.coffee &')
    local('coffee --watch --join www/js/main.js --compile src/require/*.coffee &')
    local('coffee --watch --join www/server.js --compile src/node/*.coffee &')
