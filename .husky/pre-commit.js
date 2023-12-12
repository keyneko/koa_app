#!/usr/bin/env node
"use strict"
const path = require("path")
const engineStrict = require("engine-strict")

// 根据package.json中配置的engines信息对当前的node、npm环境进行检查
engineStrict.check()

// 读取package-lock.json文件
const packageLockFile = require(path.join(process.cwd(), "package-lock.json"))

// 期望的lockfileVersion版本号
const expectedVersion = 1

// const LOCK_VERSION = {
//   undefined: "< 8.0",
//   1: "8.0 ~ 14.20",
//   2: ">= 15.0",
//   3: ">= 15.0",
// }

// 如果文件存在
if (packageLockFile) {
  if (packageLockFile.lockfileVersion !== expectedVersion) {
    console.error(`Your local package-lock.json's lockfileVersion is ${packageLockFile.lockfileVersion}, but the expected version is ${expectedVersion}.`)
    process.exit(1)
  }
}
