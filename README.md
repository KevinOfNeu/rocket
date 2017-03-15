Rocket
==================
[![Build Status](https://travis-ci.org/KevinOfNeu/rocket-cli.svg?branch=master)](https://travis-ci.org/KevinOfNeu/rocket-cli)
[![npm](https://img.shields.io/npm/l/express.svg)]()


![logo](./rocket.png)

Pure command line tool to replace Baidu("百毒") NetDisk or other NetDisk with this COOL shit!

## What?
NetDisk in your CLI! Why reinvent this SHIT ? Because Baidu NetDisk sucks!
We need our own NetDisk. Here we are!
## Features
- No more Baidu NetDisk! It is just shit!
- Fully command line operation!
- 100% self host.
- Support custom storage provider with Qiniu(七牛).
- Support index files with regex expression.
- Expressive command lines
- Easy config and use
- ...

## Screenshots
Soon!

## Installation & Preparation
[![NPM](https://nodei.co/npm/rocket-cli.png)](https://nodei.co/npm/rocket-cli/)

### 1. Register Qiniu Storage Provider
[Register a free Qiniu account](http://www.qiniu.com/). Then create a new bucket.
![](http://7xr586.com1.z0.glb.clouddn.com/images/mjqq2.jpg)

![](http://7xr586.com1.z0.glb.clouddn.com/images/r8afv.jpg)

Take bucket name down, then get accessKey and secretKey.

![](http://7xr586.com1.z0.glb.clouddn.com/images/7625i.jpg)

Take accessKey, secretKey and bucket name down, we will use it when config rocket :P.

### 2. CLI

`$ npm install  -g rocket-cli`

After installation, type:

`$ rocket -h`

Succeed if you see the following tips.
```
  Usage: rocket [options] [command]

  Commands:

    init [options]     Init config file
    config [options]   Config Qiniu bucket, access key and secret key
    add [options]      Add dir or files to index
    push [options]     Push files to Qiniu cloud
    ls [options]       List files from local index
    pull [options]     Pull files from Qiniu cloud
    doctor             Analyze whether there is a problem and reasons!

  Options:

    -h, --help     output usage information
    -V, --version  output the version number
```

## Commands & Usage

### Init config file
`$ rocket init`

If the config file already exists, you can use `-o` or `-overwrite` options to overwrite the old one.

The config file locates at `~/.rocket.json`.

### Config storage provider
`$ rocket config -b <your bucket name> -a <your accessKey> -s <your secretKey>`

### Add files to local index
`$ rocket add -d <directory> -r -f <regex expression>`

`-r` means recursively add files in sub directories.

`-f` can set filters using regex expression, use `.` for all files.

### Push files in local index to Cloud

`$ rocket push -m [max upload workers. defailt = 5]`

`-m` set the maximum number of upload workers.

### List all indexed files
`$ rocket ls -o [offset] -l [limit]`

You can use `-o` and `-l` to set proper offset and limit if there are too much files in local index.

### Pull
*Need Implemented*

### Doctor
*Need Implemented*

## How dose it work?
*SOON!*

## TODO
- [ ] Pull files to local(with default localPath).
- [ ] Some default params.
- [ ] Support pull file(s) to certain directory.
- [ ] Support multi config file.
- [ ] Code refactor.
- [ ] Support multi object storage provider.
- [ ] Test case needed.

## Contribute
PR and issues are welcomed! Join and make it better!

## Info/Support
Email kevin@bless4.me for support!

## License
[MIT](LICENSE)
