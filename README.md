
![Maintained][maintained-badge]
[![Travis Build Status][build-badge]][build]
[![Make a pull request][prs-badge]][prs]
[![License](http://img.shields.io/badge/Licence-MIT-brightgreen.svg)](LICENSE.md)

# Mission | 任务
Help Connect wholesaler and reteller and avoid middleman while helping to book keep transactions.

帮助连接批发商和转售商，并避免中间人，同时帮助保留交易记录。

# Chat with us use
[link to Our chat!](https://discord.gg/5swR6uY])

# Web & Desktop| 网络和桌面
- Web and desktop application are on the master branch.
- Web和桌面应用程序位于master分支上。
# Mobile android & ios | 手机Android和iOS
- Android and ios are found on mobile branch
- 在移动分支上可以找到Android和ios...
# Tech used | 二手技术
- We use angular and flutter to build this project and some php(Laravel backend), but you don't need backend at all!
- 我们使用angular和flutter来构建该项目和一些php（Laravel后端），但是您根本不需要后端！

# Make sure to use node v10.16.3 otherwise it won't run.

# Introduction

Bootstrap and package your project with Angular 9 and Electron 8 (Typescript + SASS + Hot Reload) for creating Desktop applications.

Currently runs with:

- Angular v9.1.4
- Electron v8.2.5
- Electron Builder v22.6.0

With this config, you can :

- Run flipper in a local development environment with Electron & Hot reload
- Run flipper in a production environment
- Package flipper into an executable file for Linux, Windows & Mac

<<<<<<< HEAD
/!\ Angular 8.x or Later CLI needs Node v10.16.3 to work.
=======
/!\ Hot reload only pertains to the renderer process. The main electron process is not able to be hot reloaded, only restarted.

/!\ Angular 9.x CLI needs Node 10.13 or later to works correctly.
>>>>>>> 8dffcea40edef5dd1829df67a9524853aea9735f

## Getting Started

Clone this repository locally :

``` bash
git clone https://github.com/maximegris/angular-electron.git
```

Install dependencies with npm :

``` bash
npm install
```

<<<<<<< HEAD
=======
There is an issue with `yarn` and `node_modules` when the application is built by the packager. Please use `npm` as dependencies manager.


If you want to generate Angular components with Angular-cli , you **MUST** install `@angular/cli` in npm global context.
Please follow [Angular-cli documentation](https://github.com/angular/angular-cli) if you had installed a previous version of `angular-cli`.
>>>>>>> 8dffcea40edef5dd1829df67a9524853aea9735f

## To build for development
``` bash
 npm run start
```
Voila! Flipper start with hot reload !

The application code is managed by `main.ts`. In this sample, the app runs with a simple Angular App (http://localhost:4200) and an Electron window.
The Angular component contains an example of Electron and NodeJS native lib import.
You can disable "Developer Tools" by commenting `win.webContents.openDevTools();` in `main.ts`.

## Included Commands

|Command|Description|
|--|--|
|`npm run ng:serve:web`| Execute the app in the browser |
|`npm run build`| Build the app. Your built files are in the /dist folder. |
|`npm run build:prod`| Build the app with Angular aot. Your built files are in the /dist folder. |
|`npm run electron:local`| Builds flipperlication and start electron
|`npm run electron:linux`| Builds flipperlication and creates an app consumable on linux system |
|`npm run electron:windows`| On a Windows OS, builds flipperlication and creates an app consumable in windows 32/64 bit systems |
|`npm run electron:mac`|  On a MAC OS, builds flipperlication and generates a `.app` file of flipperlication that can be run on Mac |

**flipperlication is optimised. Only /dist folder and node dependencies are included in the executable.**

## You want to use a specific lib (like rxjs) in electron main thread ?

YES! You can do it! Just by importing your library in npm dependencies section (not **devDependencies**) with `npm install --save`. It will be loaded by electron during build phase and added to your final package. Then use your library by importing it in `main.ts` file. Quite simple, isn't it ?

## Browser mode

<<<<<<< HEAD
Maybe you want to execute the application in the browser with hot reload ? You can do it with `npm run ng:serve:web`.
**Note that you can't use Electron or NodeJS native libraries in this case.** Please check `providers/electron.service.ts` to watch how conditional import of electron/Native libraries is done.
=======
Maybe you want to execute the application in the browser with hot reload ? Just run `npm run ng:serve:web`.
**Note that you can't use Electron or NodeJS native libraries in this case.** Please check `providers/electron.service.ts` to watch how conditional import of electron/Native libraries is done.

## Branch & Packages version

- Angular 4 & Electron 1 : Branch [angular4](https://github.com/maximegris/angular-electron/tree/angular4)
- Angular 5 & Electron 1 : Branch [angular5](https://github.com/maximegris/angular-electron/tree/angular5)
- Angular 6 & Electron 3 : Branch [angular6](https://github.com/maximegris/angular-electron/tree/angular6)
- Angular 7 & Electron 3 : Branch [angular7](https://github.com/maximegris/angular-electron/tree/angular7)
- Angular 8 & Electron 7 : Branch [angular8](https://github.com/maximegris/angular-electron/tree/angular8)
- Angular 9 & Electron 8 : (master)

[build-badge]: https://travis-ci.org/maximegris/angular-electron.svg?branch=master&style=style=flat-square
[build]: https://travis-ci.org/maximegris/angular-electron
[license-badge]: https://img.shields.io/badge/license-Apache2-blue.svg?style=style=flat-square
[license]: https://github.com/maximegris/angular-electron/blob/master/LICENSE.md
[prs-badge]: https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square
[prs]: http://makeapullrequest.com
[github-watch-badge]: https://img.shields.io/github/watchers/maximegris/angular-electron.svg?style=social
[github-watch]: https://github.com/maximegris/angular-electron/watchers
[github-star-badge]: https://img.shields.io/github/stars/maximegris/angular-electron.svg?style=social
[github-star]: https://github.com/maximegris/angular-electron/stargazers
[twitter]: https://twitter.com/intent/tweet?text=Check%20out%20angular-electron!%20https://github.com/maximegris/angular-electron%20%F0%9F%91%8D
[twitter-badge]: https://img.shields.io/twitter/url/https/github.com/maximegris/angular-electron.svg?style=social
[maintained-badge]: https://img.shields.io/badge/maintained-yes-brightgreen
>>>>>>> 8dffcea40edef5dd1829df67a9524853aea9735f
