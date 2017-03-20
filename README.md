Rocket
==================
[![Build Status](https://travis-ci.org/KevinOfNeu/rocket.svg?branch=master)](https://travis-ci.org/KevinOfNeu/rocket)
[![npm](https://img.shields.io/npm/l/express.svg)]()


![logo](./rocket.png)

Self host netdist, pure command line tool to to sync files to Qiniu cloud.

## Features
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
`$ brew install node`

### 1. Register Qiniu(七牛) storage provider
[Register a free Qiniu account](http://www.qiniu.com/). Then create a new bucket.
![](http://7xr586.com1.z0.glb.clouddn.com/images/mjqq2.jpg)

![](http://7xr586.com1.z0.glb.clouddn.com/images/r8afv.jpg)

Take bucket name down, then get accessKey and secretKey.

![](http://7xr586.com1.z0.glb.clouddn.com/images/7625i.jpg)

Finally, get your domain:
![](http://7xr586.com1.z0.glb.clouddn.com/images/uijo8.jpg)

Take accessKey, secretKey domain and bucket name down, we will use it when config rocket :P.

### 2. CLI

`$ npm install  -g rocket-cli`

After installation, type:

`$ rocket -h`

Succeed if you see the following tips.
```
  Usage: rocket [options] [command]

  Commands:

    init [options]           Init config file
    config [options] [show]  Config Qiniu bucket, domain, access key and secret key
    add [options]            Add dir or files to index
    push [options]           Push files to Qiniu cloud
    ls [options]             List files from local index
    pull [options] <key>     Pull file from Qiniu cloud

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
`$ rocket config -b <your bucket name> -a <your accessKey> -s <your secretKey> -d <domain>`

### Show config
List your cnfiguration.

`$ rocket config show`

### Add files to local index
`$ rocket add -d <directory> -r -f <regex expression>`

`-r` means recursively add files in sub directories.

`-f` can set filters using regex expression, use `.` for all files.

### Push files in local index to cloud
`$ rocket push -m [max upload workers. defailt = 5]`

`-m` set the maximum number of upload workers.

### List all indexed files
`$ rocket ls -o [offset] -l [limit]`

You can use `-o` and `-l` to set proper offset and limit if there are too much files in local index.

### Pull
`$ rocket pull -d [destination] <key>`
This command will download  file searched by key to destination directory, default directory is where this file uploaded.

## How dose it work?
*SOON!*

## TODO
- [x] Add timestamp when upload
- [x] Pull files to local(with default localPath).
- [ ] Examples & Articles
- [ ] Add rocket restore command（next version）
- [ ] Support multi config file.
- [x] Some default params.
- [x] Support pull file(s) to certain directory.
- [ ] Support multi object storage provider.
- [ ] Code refactor.
- [ ] Test case needed.

## Release Note
- [0.0.6] Add pull files function; Remove unneed command; Add show config operation; Add timestamp;

## Contribute
PR and issues are welcomed! Join and make it better!

## Info/Support
Email kevin@bless4.me for support!

## License
[MIT](LICENSE)
