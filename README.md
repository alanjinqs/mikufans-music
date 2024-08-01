<a id="readme-top"></a>

<br />
<div align="center">
  <a href="https://github.com/github_username/repo_name">
    <img src="assets/images/icon.png" alt="Logo" width="80" height="80" style="border-radius: 20px;">
  </a>

<h3 align="center">mikufans-musc</h3>

  <p align="center">
  Yet another YouTube music like player for bilibili.com.<br />
  为 bilibili.com 打造的 YouTube Music<br />
    <!-- <a href="https://github.com/AlanJinqs/mikufans-music/tags">Download APK</a>
    · -->
    <a href="#getting-started">Quick Start</a>
    ·
    <a href="https://github.com/AlanJinqs/mikufans-music/issues/new">Report Bug</a>
  </p>
</div>

## About The Project / 关于
<div align="center">

  <a href="https://github.com/AlanJinqs/mikufans-music">
    <img src="assets/images/screenshot.jpg" style="max-width: 500px; width: 100%">
  </a>
</div>
A music player for Bilibili.com (a video website) that has the following features:

- Search for videos / content creators
- Favorites / Video Collections / Playlists
- Heartbeat (history reporting)
- Automatically select the best audio quality stream, and auto select flac stream if you are a premium member
- Lyrics search / display / jump

本质上是一个通勤路上自用的音乐播放器，支持以下功能：

- 播放视频的音频流
- 搜索视频 / UP 主
- 收藏夹/视频合集/播放列表
  - Todo: 搜索收藏夹/视频合集/播放列表 & 批量添加到本地 Playlist
- 播放心跳（播放量记录及历史记录上报）
- 自动选择最佳音质流，如果是大会员可以自动选择无损 flac 流
- 歌词搜索/展示/跳转

### Built With

[![Expo][Expojs]][Expo-url]
[![React Native][react-native]][react-native-url]

[expojs]: https://img.shields.io/badge/expo-000000?style=for-the-badge&logo=expo&logoColor=white
[expo-url]: https://expo.dev/
[react-native]: https://img.shields.io/badge/react_native-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB
[react-native-url]: https://reactnative.dev/

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->

<h2 id="getting-started">Getting Started (Without EAS) / 本地构建</h2>

```bash
git clone https://github.com/AlanJinqs/mikufans-music.git
cd mikufans-music
yarn install
```

### Android

You need to have Android Studio installed and have your device in USB development mode. For detailed instructions, please refer to the [Expo documentation](https://docs.expo.dev/get-started/set-up-your-environment/?platform=android&device=physical&mode=development-build&buildEnv=local).

你需要安装 Android Studio 并将你的设备设置为 USB 调试模式。详细的设置步骤请参考 [Expo 文档](https://docs.expo.dev/get-started/set-up-your-environment/?platform=android&device=physical&mode=development-build&buildEnv=local)。

To build & install the app on your Android device, run the following command:
运行以下命令来构建并安装应用到你的 Android 设备：

```bash
npx expo run:android --variant release --device
```

### iOS (without paid Apple Developer Account)

Open `ios/mikufansMusic.xcworkspace` in Xcode, select the `mikufansmusic` target, goto "Sign and Capabilities" and select your team. You may need to change the Bundle Identifier as Apple does not allow the same bundle identifier to be used by different developers.

打开 `ios/mikufansMusic.xcworkspace`，选择 `mikufansmusic` target，进入 "Sign and Capabilities" 选择开发者账户。你可能需要修改 Bundle Identifier 的前缀以避免冲突。

Choose Release scheme in Xcode and run the app.
使用 Xcode 选择 Release scheme 并运行应用。

Or, run the following command:
或运行以下命令以构建并安装：

````bash

Then run the following command:

```bash
npx expo run:ios --configuration Release --device
````

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ROADMAP -->

## Roadmap

See the [open issues](https://github.com/AlanJinqs/mikufans-music/issues) for a full list of proposed features (and known issues).

前往 [issues](https://github.com/AlanJinqs/mikufans-music/issues) 查看所有已知问题和计划中的功能。

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTRIBUTING -->

## Contributing

Any contributions you make are **greatly appreciated**.
欢迎 PR/Issue。

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE` for more information.
使用 MIT 协议发布。详见 `LICENSE`。

The project and its contributor(s) are not responsible for any copyright issues that may arise during the use of this project.
本项目对于使用过程中产生的版权问题不承担任何责任。音乐创作不易，请支持正版。

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ACKNOWLEDGMENTS -->

## Acknowledgments

- [SocialSisterYi/bilibili-API-collect](https://github.com/SocialSisterYi/bilibili-API-collect)
- [mrzachnugent/react-native-reusables](https://github.com/mrzachnugent/react-native-reusables)
- [nativewind/nativewind](https://github.com/nativewind/nativewind)
- [othneildrew/Best-README-Template](https://github.com/othneildrew/Best-README-Template/tree/master)

<details>
<summary>Libraries</summary>

```
├─ (Apache-2.0 AND MIT)
│  └─ @web3-storage/multipart-parser@1.0.0
│     ├─ URL: git+https://github.com/web3-storage/multipart-parser.git
│     └─ VendorName: vasco-santos
├─ (BSD-2-Clause OR MIT OR Apache-2.0)
│  └─ rc@1.2.8
│     ├─ URL: https://github.com/dominictarr/rc.git
│     ├─ VendorName: Dominic Tarr
│     └─ VendorUrl: dominictarr.com
├─ (BSD-3-Clause OR GPL-2.0)
│  └─ node-forge@1.3.1
│     ├─ URL: https://github.com/digitalbazaar/forge
│     ├─ VendorName: Digital Bazaar, Inc.
│     └─ VendorUrl: https://github.com/digitalbazaar/forge
├─ (MIT AND Zlib)
│  └─ pako@1.0.11
│     ├─ URL: https://github.com/nodeca/pako.git
│     └─ VendorUrl: https://github.com/nodeca/pako
├─ (MIT OR CC0-1.0)
│  ├─ type-fest@0.16.0
│  │  ├─ URL: https://github.com/sindresorhus/type-fest.git
│  │  ├─ VendorName: Sindre Sorhus
│  │  └─ VendorUrl: https://sindresorhus.com
│  ├─ type-fest@0.21.3
│  │  ├─ URL: https://github.com/sindresorhus/type-fest.git
│  │  ├─ VendorName: Sindre Sorhus
│  │  └─ VendorUrl: https://sindresorhus.com
│  ├─ type-fest@0.3.1
│  │  ├─ URL: https://github.com/sindresorhus/type-fest.git
│  │  ├─ VendorName: Sindre Sorhus
│  │  └─ VendorUrl: sindresorhus.com
│  └─ type-fest@0.7.1
│     ├─ URL: https://github.com/sindresorhus/type-fest.git
│     ├─ VendorName: Sindre Sorhus
│     └─ VendorUrl: sindresorhus.com
├─ (Unlicense OR Apache-2.0)
│  └─ @zxing/text-encoding@0.9.0
│     ├─ URL: https://github.com/zxing-js/text-encoding.git
│     ├─ VendorName: Joshua Bell
│     └─ VendorUrl: https://github.com/inexorabletash/text-encoding
├─ 0BSD
│  ├─ jsc-safe-url@0.2.4
│  │  ├─ URL: git+https://github.com/robhogan/jsc-safe-url.git
│  │  ├─ VendorName: Rob Hogan
│  │  └─ VendorUrl: https://github.com/robhogan/jsc-safe-url#readme
│  ├─ password-prompt@1.1.3
│  │  ├─ URL: https://github.com/jdxcode/password-prompt
│  │  ├─ VendorName: Jeff Dickey @jdxcode
│  │  └─ VendorUrl: https://github.com/jdxcode/password-prompt
│  └─ tslib@2.6.3
│     ├─ URL: https://github.com/Microsoft/tslib.git
│     ├─ VendorName: Microsoft Corp.
│     └─ VendorUrl: https://www.typescriptlang.org/
├─ Apache 2
│  ├─ pouchdb-collections@1.0.1
│  │  ├─ URL: git@github.com:nolanlawson/pouchdb-collections.git
│  │  ├─ VendorName: Calvin Metcalf
│  │  └─ VendorUrl: https://github.com/nolanlawson/pouchdb-collections
│  └─ tiny-queue@0.2.1
│     ├─ URL: https://github.com/nolanlawson/tiny-queue.git
│     ├─ VendorName: Nolan Lawson
│     └─ VendorUrl: https://github.com/nolanlawson/tiny-queue
├─ Apache-2.0
│  ├─ @ampproject/remapping@2.3.0
│  │  ├─ URL: git+https://github.com/ampproject/remapping.git
│  │  └─ VendorName: Justin Ridgewell
│  ├─ @expo/websql@1.0.1
│  │  ├─ URL: git://github.com/nolanlawson/node-websql.git
│  │  └─ VendorName: Nolan Lawson
│  ├─ @rnx-kit/chromium-edge-launcher@1.0.0
│  │  ├─ URL: https://github.com/microsoft/rnx-kit
│  │  ├─ VendorName: Microsoft Open Source
│  │  └─ VendorUrl: https://github.com/microsoft/rnx-kit/tree/main/incubator/chromium-edge-launcher#readme
│  ├─ bser@2.1.1
│  │  ├─ URL: https://github.com/facebook/watchman
│  │  ├─ VendorName: Wez Furlong
│  │  └─ VendorUrl: https://facebook.github.io/watchman/docs/bser.html
│  ├─ chrome-launcher@0.15.2
│  │  ├─ URL: https://github.com/GoogleChrome/chrome-launcher/
│  │  └─ VendorName: The Chromium Authors
│  ├─ class-variance-authority@0.7.0
│  │  ├─ URL: https://github.com/joe-bell/cva.git
│  │  ├─ VendorName: Joe Bell
│  │  └─ VendorUrl: https://github.com/joe-bell/cva#readme
│  ├─ detect-libc@1.0.3
│  │  ├─ URL: git://github.com/lovell/detect-libc
│  │  └─ VendorName: Lovell Fuller
│  ├─ didyoumean@1.2.2
│  │  ├─ URL: https://github.com/dcporter/didyoumean.js.git
│  │  ├─ VendorName: Dave Porter
│  │  └─ VendorUrl: https://github.com/dcporter/didyoumean.js
│  ├─ drizzle-orm@0.31.4
│  │  ├─ URL: git+https://github.com/drizzle-team/drizzle-orm.git
│  │  ├─ VendorName: Drizzle Team
│  │  └─ VendorUrl: https://orm.drizzle.team/
│  ├─ fb-watchman@2.0.2
│  │  ├─ URL: git@github.com:facebook/watchman.git
│  │  ├─ VendorName: Wez Furlong
│  │  └─ VendorUrl: https://facebook.github.io/watchman/
│  ├─ find-yarn-workspace-root@2.0.0
│  │  ├─ URL: https://github.com/square/find-yarn-workspace-root.git
│  │  └─ VendorName: Square, Inc.
│  ├─ human-signals@2.1.0
│  │  ├─ URL: https://github.com/ehmicky/human-signals.git
│  │  ├─ VendorName: ehmicky
│  │  └─ VendorUrl: https://git.io/JeluP
│  ├─ lighthouse-logger@1.4.2
│  ├─ marky@1.2.5
│  │  ├─ URL: git+https://github.com/nolanlawson/marky.git
│  │  ├─ VendorName: Nolan Lawson
│  │  └─ VendorUrl: https://github.com/nolanlawson/marky#readme
│  ├─ react-native-helmet-async@2.0.4
│  │  ├─ URL: http://github.com/staylor/react-helmet-async
│  │  └─ VendorName: Scott Taylor
│  ├─ react-native-track-player@4.1.1
│  │  └─ URL: https://github.com/doublesymmetry/react-native-track-player.git
│  ├─ ts-interface-checker@0.1.13
│  │  ├─ URL: https://github.com/gristlabs/ts-interface-checker
│  │  └─ VendorName: Dmitry S, Grist Labs
│  ├─ typescript@5.3.3
│  │  ├─ URL: https://github.com/Microsoft/TypeScript.git
│  │  ├─ VendorName: Microsoft Corp.
│  │  └─ VendorUrl: https://www.typescriptlang.org/
│  ├─ walker@1.0.8
│  │  ├─ URL: https://github.com/daaku/nodejs-walker
│  │  ├─ VendorName: Naitik Shah
│  │  └─ VendorUrl: https://github.com/daaku/nodejs-walker
│  ├─ xcode@3.0.1
│  │  ├─ URL: https://github.com/apache/cordova-node-xcode.git
│  │  └─ VendorName: Apache Software Foundation
│  └─ xml-name-validator@4.0.0
│     ├─ URL: https://github.com/jsdom/xml-name-validator.git
│     ├─ VendorName: Domenic Denicola
│     └─ VendorUrl: https://domenic.me/
├─ Apache*
│  └─ qrcode-terminal@0.11.0
│     ├─ URL: https://github.com/gtanner/qrcode-terminal
│     └─ VendorUrl: https://github.com/gtanner/qrcode-terminal
├─ BlueOak-1.0.0
│  ├─ jackspeak@3.4.2
│  │  ├─ URL: git+https://github.com/isaacs/jackspeak.git
│  │  └─ VendorName: Isaac Z. Schlueter
│  ├─ package-json-from-dist@1.0.0
│  │  ├─ URL: git+https://github.com/isaacs/package-json-from-dist.git
│  │  ├─ VendorName: Isaac Z. Schlueter
│  │  └─ VendorUrl: https://izs.me
│  └─ path-scurry@1.11.1
│     ├─ URL: git+https://github.com/isaacs/path-scurry
│     ├─ VendorName: Isaac Z. Schlueter
│     └─ VendorUrl: https://blog.izs.me
├─ BSD
│  └─ readline@1.3.0
│     ├─ URL: git@github.com:maleck13/readline.git
│     └─ VendorName: craig brookes
├─ BSD-2-Clause
│  ├─ css-select@5.1.0
│  │  ├─ URL: git://github.com/fb55/css-select.git
│  │  └─ VendorName: Felix Boehm
│  ├─ css-what@6.1.0
│  │  ├─ URL: https://github.com/fb55/css-what
│  │  ├─ VendorName: Felix Böhm
│  │  └─ VendorUrl: http://feedic.com
│  ├─ default-gateway@4.2.0
│  │  ├─ URL: https://github.com/silverwind/default-gateway.git
│  │  └─ VendorName: silverwind
│  ├─ domelementtype@2.3.0
│  │  ├─ URL: git://github.com/fb55/domelementtype.git
│  │  └─ VendorName: Felix Boehm
│  ├─ domhandler@5.0.3
│  │  ├─ URL: git://github.com/fb55/domhandler.git
│  │  └─ VendorName: Felix Boehm
│  ├─ domutils@3.1.0
│  │  ├─ URL: git://github.com/fb55/domutils.git
│  │  └─ VendorName: Felix Boehm
│  ├─ dotenv-expand@11.0.6
│  │  ├─ URL: https://github.com/motdotla/dotenv-expand
│  │  └─ VendorName: motdotla
│  ├─ dotenv@16.4.5
│  │  └─ URL: git://github.com/motdotla/dotenv.git
│  ├─ entities@4.5.0
│  │  ├─ URL: git://github.com/fb55/entities.git
│  │  └─ VendorName: Felix Boehm
│  ├─ escodegen@2.1.0
│  │  ├─ URL: http://github.com/estools/escodegen.git
│  │  └─ VendorUrl: http://github.com/estools/escodegen
│  ├─ esprima@4.0.1
│  │  ├─ URL: https://github.com/jquery/esprima.git
│  │  ├─ VendorName: Ariya Hidayat
│  │  └─ VendorUrl: http://esprima.org/
│  ├─ estraverse@5.3.0
│  │  ├─ URL: http://github.com/estools/estraverse.git
│  │  └─ VendorUrl: https://github.com/estools/estraverse
│  ├─ esutils@2.0.3
│  │  ├─ URL: http://github.com/estools/esutils.git
│  │  └─ VendorUrl: https://github.com/estools/esutils
│  ├─ fontfaceobserver@2.3.0
│  │  ├─ URL: git+https://github.com/bramstein/fontfaceobserver.git
│  │  ├─ VendorName: Bram Stein
│  │  └─ VendorUrl: https://fontfaceobserver.com/
│  ├─ jsc-android@250231.0.0
│  │  ├─ URL: git+https://github.com/react-native-community/jsc-android-buildscripts.git
│  │  └─ VendorUrl: https://github.com/react-native-community/jsc-android-buildscripts#readme
│  ├─ memory-cache@0.2.0
│  │  ├─ URL: git://github.com/ptarjan/node-cache.git
│  │  └─ VendorName: Paul Tarjan
│  ├─ nth-check@2.1.1
│  │  ├─ URL: https://github.com/fb55/nth-check
│  │  ├─ VendorName: Felix Boehm
│  │  └─ VendorUrl: https://github.com/fb55/nth-check
│  ├─ regjsparser@0.9.1
│  │  ├─ URL: git@github.com:jviereck/regjsparser.git
│  │  ├─ VendorName: 'Julian Viereck'
│  │  └─ VendorUrl: https://github.com/jviereck/regjsparser
│  ├─ terser@5.31.1
│  │  ├─ URL: https://github.com/terser/terser
│  │  ├─ VendorName: Mihai Bazon
│  │  └─ VendorUrl: https://terser.org/
│  ├─ uri-js@4.4.1
│  │  ├─ URL: http://github.com/garycourt/uri-js
│  │  ├─ VendorName: Gary Court
│  │  └─ VendorUrl: https://github.com/garycourt/uri-js
│  ├─ webidl-conversions@3.0.1
│  │  ├─ URL: https://github.com/jsdom/webidl-conversions.git
│  │  ├─ VendorName: Domenic Denicola
│  │  └─ VendorUrl: https://domenic.me/
│  ├─ webidl-conversions@5.0.0
│  │  ├─ URL: https://github.com/jsdom/webidl-conversions.git
│  │  ├─ VendorName: Domenic Denicola
│  │  └─ VendorUrl: https://domenic.me/
│  └─ webidl-conversions@7.0.0
│     ├─ URL: https://github.com/jsdom/webidl-conversions.git
│     ├─ VendorName: Domenic Denicola
│     └─ VendorUrl: https://domenic.me/
├─ BSD-3-Clause
│  ├─ @expo/xcpretty@4.3.1
│  │  ├─ URL: https://github.com/expo/expo-cli.git
│  │  ├─ VendorName: Evan Bacon
│  │  └─ VendorUrl: https://github.com/expo/expo-cli
│  ├─ @hapi/hoek@9.3.0
│  │  └─ URL: git://github.com/hapijs/hoek
│  ├─ @hapi/topo@5.1.0
│  │  └─ URL: git://github.com/hapijs/topo
│  ├─ @react-native/debugger-frontend@0.74.85
│  │  ├─ URL: https://github.com/facebook/react-native.git
│  │  └─ VendorUrl: https://github.com/facebook/react-native/tree/HEAD/packages/debugger-frontend#readme
│  ├─ @sideway/address@4.1.5
│  │  └─ URL: git://github.com/sideway/address
│  ├─ @sideway/formula@3.0.1
│  │  └─ URL: git://github.com/sideway/formula
│  ├─ @sideway/pinpoint@2.0.0
│  │  └─ URL: git://github.com/sideway/pinpoint
│  ├─ @sinonjs/commons@3.0.1
│  │  ├─ URL: git+https://github.com/sinonjs/commons.git
│  │  └─ VendorUrl: https://github.com/sinonjs/commons#readme
│  ├─ @sinonjs/fake-timers@10.3.0
│  │  ├─ URL: https://github.com/sinonjs/fake-timers.git
│  │  ├─ VendorName: Christian Johansen
│  │  └─ VendorUrl: https://github.com/sinonjs/fake-timers
│  ├─ abab@2.0.6
│  │  ├─ URL: git+https://github.com/jsdom/abab.git
│  │  ├─ VendorName: Jeff Carpenter
│  │  └─ VendorUrl: https://github.com/jsdom/abab#readme
│  ├─ babel-plugin-istanbul@6.1.1
│  │  ├─ URL: git+https://github.com/istanbuljs/babel-plugin-istanbul.git
│  │  ├─ VendorName: Thai Pangsakulyanont @dtinth
│  │  └─ VendorUrl: https://github.com/istanbuljs/babel-plugin-istanbul#readme
│  ├─ charenc@0.0.2
│  │  ├─ URL: git://github.com/pvorb/node-charenc.git
│  │  ├─ VendorName: Paul Vorbach
│  │  └─ VendorUrl: http://vorb.de
│  ├─ crypt@0.0.2
│  │  ├─ URL: git://github.com/pvorb/node-crypt.git
│  │  ├─ VendorName: Paul Vorbach
│  │  └─ VendorUrl: http://vorb.de
│  ├─ fbemitter@3.0.0
│  │  └─ URL: https://github.com/facebook/emitter.git
│  ├─ hoist-non-react-statics@3.3.2
│  │  ├─ URL: git://github.com/mridgway/hoist-non-react-statics.git
│  │  └─ VendorName: Michael Ridgway
│  ├─ hyphenate-style-name@1.1.0
│  │  ├─ URL: git+ssh://git@github.com/rexxars/hyphenate-style-name.git
│  │  ├─ VendorName: Espen Hovlandsdal
│  │  └─ VendorUrl: https://github.com/rexxars/hyphenate-style-name#readme
│  ├─ ieee754@1.2.1
│  │  ├─ URL: git://github.com/feross/ieee754.git
│  │  ├─ VendorName: Feross Aboukhadijeh
│  │  └─ VendorUrl: https://feross.org
│  ├─ istanbul-lib-coverage@3.2.2
│  │  ├─ URL: git+ssh://git@github.com/istanbuljs/istanbuljs.git
│  │  ├─ VendorName: Krishnan Anantheswaran
│  │  └─ VendorUrl: https://istanbul.js.org/
│  ├─ istanbul-lib-instrument@5.2.1
│  │  ├─ URL: git+ssh://git@github.com/istanbuljs/istanbuljs.git
│  │  ├─ VendorName: Krishnan Anantheswaran
│  │  └─ VendorUrl: https://istanbul.js.org/
│  ├─ istanbul-lib-instrument@6.0.3
│  │  ├─ URL: git+ssh://git@github.com/istanbuljs/istanbuljs.git
│  │  ├─ VendorName: Krishnan Anantheswaran
│  │  └─ VendorUrl: https://istanbul.js.org/
│  ├─ istanbul-lib-report@3.0.1
│  │  ├─ URL: git+ssh://git@github.com/istanbuljs/istanbuljs.git
│  │  ├─ VendorName: Krishnan Anantheswaran
│  │  └─ VendorUrl: https://istanbul.js.org/
│  ├─ istanbul-lib-source-maps@4.0.1
│  │  ├─ URL: git+ssh://git@github.com/istanbuljs/istanbuljs.git
│  │  ├─ VendorName: Krishnan Anantheswaran
│  │  └─ VendorUrl: https://istanbul.js.org/
│  ├─ istanbul-reports@3.1.7
│  │  ├─ URL: git+ssh://git@github.com/istanbuljs/istanbuljs.git
│  │  ├─ VendorName: Krishnan Anantheswaran
│  │  └─ VendorUrl: https://istanbul.js.org/
│  ├─ joi@17.13.3
│  │  └─ URL: git://github.com/hapijs/joi
│  ├─ jpeg-js@0.4.4
│  │  ├─ URL: https://github.com/eugeneware/jpeg-js
│  │  └─ VendorName: Eugene Ware
│  ├─ makeerror@1.0.12
│  │  ├─ URL: https://github.com/daaku/nodejs-makeerror
│  │  └─ VendorName: Naitik Shah
│  ├─ md5@2.2.1
│  │  ├─ URL: git://github.com/pvorb/node-md5.git
│  │  ├─ VendorName: Paul Vorbach
│  │  └─ VendorUrl: http://paul.vorba.ch
│  ├─ md5@2.3.0
│  │  ├─ URL: git://github.com/pvorb/node-md5.git
│  │  ├─ VendorName: Paul Vorbach
│  │  └─ VendorUrl: http://paul.vorba.ch
│  ├─ qs@6.12.3
│  │  ├─ URL: https://github.com/ljharb/qs.git
│  │  └─ VendorUrl: https://github.com/ljharb/qs
│  ├─ source-map-js@1.2.0
│  │  ├─ URL: https://github.com/7rulnik/source-map-js.git
│  │  ├─ VendorName: Valentin 7rulnik Semirulnik
│  │  └─ VendorUrl: https://github.com/7rulnik/source-map-js
│  ├─ source-map@0.5.6
│  │  ├─ URL: http://github.com/mozilla/source-map.git
│  │  ├─ VendorName: Nick Fitzgerald
│  │  └─ VendorUrl: https://github.com/mozilla/source-map
│  ├─ source-map@0.5.7
│  │  ├─ URL: http://github.com/mozilla/source-map.git
│  │  ├─ VendorName: Nick Fitzgerald
│  │  └─ VendorUrl: https://github.com/mozilla/source-map
│  ├─ source-map@0.6.1
│  │  ├─ URL: http://github.com/mozilla/source-map.git
│  │  ├─ VendorName: Nick Fitzgerald
│  │  └─ VendorUrl: https://github.com/mozilla/source-map
│  ├─ source-map@0.7.4
│  │  ├─ URL: http://github.com/mozilla/source-map.git
│  │  ├─ VendorName: Nick Fitzgerald
│  │  └─ VendorUrl: https://github.com/mozilla/source-map
│  ├─ sprintf-js@1.0.3
│  │  ├─ URL: https://github.com/alexei/sprintf.js.git
│  │  ├─ VendorName: Alexandru Marasteanu
│  │  └─ VendorUrl: http://alexei.ro/
│  ├─ tmpl@1.0.5
│  │  ├─ URL: https://github.com/daaku/nodejs-tmpl
│  │  ├─ VendorName: Naitik Shah
│  │  └─ VendorUrl: https://github.com/daaku/nodejs-tmpl
│  └─ tough-cookie@4.1.4
│     ├─ URL: git://github.com/salesforce/tough-cookie.git
│     ├─ VendorName: Jeremy Stashewsky
│     └─ VendorUrl: https://github.com/salesforce/tough-cookie
├─ CC-BY-4.0
│  └─ caniuse-lite@1.0.30001640
│     ├─ URL: https://github.com/browserslist/caniuse-lite.git
│     ├─ VendorName: Ben Briggs
│     └─ VendorUrl: http://beneb.info
├─ CC0-1.0
│  └─ mdn-data@2.0.14
│     ├─ URL: https://github.com/mdn/data.git
│     ├─ VendorName: Mozilla Developer Network
│     └─ VendorUrl: https://developer.mozilla.org/
├─ ISC
│  ├─ @isaacs/cliui@8.0.2
│  │  ├─ URL: https://github.com/yargs/cliui.git
│  │  └─ VendorName: Ben Coe
│  ├─ @isaacs/ttlcache@1.4.1
│  │  ├─ URL: git+https://github.com/isaacs/ttlcache
│  │  ├─ VendorName: Isaac Z. Schlueter
│  │  └─ VendorUrl: https://izs.me
│  ├─ @istanbuljs/load-nyc-config@1.1.0
│  │  ├─ URL: git+https://github.com/istanbuljs/load-nyc-config.git
│  │  └─ VendorUrl: https://github.com/istanbuljs/load-nyc-config#readme
│  ├─ @npmcli/fs@3.1.1
│  │  ├─ URL: git+https://github.com/npm/fs.git
│  │  └─ VendorName: GitHub Inc.
│  ├─ anymatch@3.1.3
│  │  ├─ URL: https://github.com/micromatch/anymatch
│  │  ├─ VendorName: Elan Shanker
│  │  └─ VendorUrl: https://github.com/micromatch/anymatch
│  ├─ at-least-node@1.0.0
│  │  ├─ URL: git+https://github.com/RyanZim/at-least-node.git
│  │  ├─ VendorName: Ryan Zimmerman
│  │  └─ VendorUrl: https://github.com/RyanZim/at-least-node#readme
│  ├─ boolbase@1.0.0
│  │  ├─ URL: https://github.com/fb55/boolbase
│  │  ├─ VendorName: Felix Boehm
│  │  └─ VendorUrl: https://github.com/fb55/boolbase
│  ├─ cacache@18.0.3
│  │  ├─ URL: git+https://github.com/npm/cacache.git
│  │  └─ VendorName: GitHub Inc.
│  ├─ chownr@2.0.0
│  │  ├─ URL: git://github.com/isaacs/chownr.git
│  │  ├─ VendorName: Isaac Z. Schlueter
│  │  └─ VendorUrl: http://blog.izs.me/
│  ├─ cliui@6.0.0
│  │  ├─ URL: http://github.com/yargs/cliui.git
│  │  └─ VendorName: Ben Coe
│  ├─ cliui@8.0.1
│  │  ├─ URL: https://github.com/yargs/cliui.git
│  │  └─ VendorName: Ben Coe
│  ├─ electron-to-chromium@1.4.819
│  │  ├─ URL: https://github.com/kilian/electron-to-chromium/
│  │  └─ VendorName: Kilian Valkhof
│  ├─ fastq@1.17.1
│  │  ├─ URL: git+https://github.com/mcollina/fastq.git
│  │  ├─ VendorName: Matteo Collina
│  │  └─ VendorUrl: https://github.com/mcollina/fastq#readme
│  ├─ foreground-child@3.2.1
│  │  ├─ URL: git+https://github.com/tapjs/foreground-child.git
│  │  ├─ VendorName: Isaac Z. Schlueter
│  │  └─ VendorUrl: http://blog.izs.me/
│  ├─ fs-minipass@2.1.0
│  │  ├─ URL: git+https://github.com/npm/fs-minipass.git
│  │  ├─ VendorName: Isaac Z. Schlueter
│  │  └─ VendorUrl: https://github.com/npm/fs-minipass#readme
│  ├─ fs-minipass@3.0.3
│  │  ├─ URL: https://github.com/npm/fs-minipass.git
│  │  ├─ VendorName: GitHub Inc.
│  │  └─ VendorUrl: https://github.com/npm/fs-minipass#readme
│  ├─ fs.realpath@1.0.0
│  │  ├─ URL: git+https://github.com/isaacs/fs.realpath.git
│  │  ├─ VendorName: Isaac Z. Schlueter
│  │  └─ VendorUrl: http://blog.izs.me/
│  ├─ get-caller-file@2.0.5
│  │  ├─ URL: git+https://github.com/stefanpenner/get-caller-file.git
│  │  ├─ VendorName: Stefan Penner
│  │  └─ VendorUrl: https://github.com/stefanpenner/get-caller-file#readme
│  ├─ glob-parent@5.1.2
│  │  ├─ URL: https://github.com/gulpjs/glob-parent.git
│  │  ├─ VendorName: Gulp Team
│  │  └─ VendorUrl: https://gulpjs.com/
│  ├─ glob-parent@6.0.2
│  │  ├─ URL: https://github.com/gulpjs/glob-parent.git
│  │  ├─ VendorName: Gulp Team
│  │  └─ VendorUrl: https://gulpjs.com/
│  ├─ glob@10.4.4
│  │  ├─ URL: git://github.com/isaacs/node-glob.git
│  │  ├─ VendorName: Isaac Z. Schlueter
│  │  └─ VendorUrl: https://blog.izs.me/
│  ├─ glob@10.4.5
│  │  ├─ URL: git://github.com/isaacs/node-glob.git
│  │  ├─ VendorName: Isaac Z. Schlueter
│  │  └─ VendorUrl: https://blog.izs.me/
│  ├─ glob@6.0.4
│  │  ├─ URL: git://github.com/isaacs/node-glob.git
│  │  ├─ VendorName: Isaac Z. Schlueter
│  │  └─ VendorUrl: http://blog.izs.me/
│  ├─ glob@7.1.6
│  │  ├─ URL: git://github.com/isaacs/node-glob.git
│  │  ├─ VendorName: Isaac Z. Schlueter
│  │  └─ VendorUrl: http://blog.izs.me/
│  ├─ glob@7.2.3
│  │  ├─ URL: git://github.com/isaacs/node-glob.git
│  │  ├─ VendorName: Isaac Z. Schlueter
│  │  └─ VendorUrl: http://blog.izs.me/
│  ├─ graceful-fs@4.2.11
│  │  └─ URL: https://github.com/isaacs/node-graceful-fs
│  ├─ hosted-git-info@3.0.8
│  │  ├─ URL: git+https://github.com/npm/hosted-git-info.git
│  │  ├─ VendorName: Rebecca Turner
│  │  └─ VendorUrl: https://github.com/npm/hosted-git-info
│  ├─ inflight@1.0.6
│  │  ├─ URL: https://github.com/npm/inflight.git
│  │  ├─ VendorName: Isaac Z. Schlueter
│  │  └─ VendorUrl: https://github.com/isaacs/inflight
│  ├─ inherits@2.0.4
│  │  └─ URL: git://github.com/isaacs/inherits
│  ├─ ini@1.3.8
│  │  ├─ URL: git://github.com/isaacs/ini.git
│  │  ├─ VendorName: Isaac Z. Schlueter
│  │  └─ VendorUrl: http://blog.izs.me/
│  ├─ isexe@2.0.0
│  │  ├─ URL: git+https://github.com/isaacs/isexe.git
│  │  ├─ VendorName: Isaac Z. Schlueter
│  │  └─ VendorUrl: https://github.com/isaacs/isexe#readme
│  ├─ lru-cache@10.4.2
│  │  ├─ URL: git://github.com/isaacs/node-lru-cache.git
│  │  └─ VendorName: Isaac Z. Schlueter
│  ├─ lru-cache@5.1.1
│  │  ├─ URL: git://github.com/isaacs/node-lru-cache.git
│  │  └─ VendorName: Isaac Z. Schlueter
│  ├─ lru-cache@6.0.0
│  │  ├─ URL: git://github.com/isaacs/node-lru-cache.git
│  │  └─ VendorName: Isaac Z. Schlueter
│  ├─ lucide-react-native@0.404.0
│  │  ├─ URL: https://github.com/lucide-icons/lucide.git
│  │  ├─ VendorName: Eric Fennis
│  │  └─ VendorUrl: https://lucide.dev/
│  ├─ minimatch@3.1.2
│  │  ├─ URL: git://github.com/isaacs/minimatch.git
│  │  ├─ VendorName: Isaac Z. Schlueter
│  │  └─ VendorUrl: http://blog.izs.me
│  ├─ minimatch@9.0.5
│  │  ├─ URL: git://github.com/isaacs/minimatch.git
│  │  ├─ VendorName: Isaac Z. Schlueter
│  │  └─ VendorUrl: http://blog.izs.me
│  ├─ minipass-collect@2.0.1
│  │  ├─ URL: https://github.com/isaacs/minipass-collect
│  │  ├─ VendorName: Isaac Z. Schlueter
│  │  └─ VendorUrl: https://izs.me
│  ├─ minipass-flush@1.0.5
│  │  ├─ URL: git+https://github.com/isaacs/minipass-flush.git
│  │  ├─ VendorName: Isaac Z. Schlueter
│  │  └─ VendorUrl: https://izs.me
│  ├─ minipass-pipeline@1.2.4
│  │  ├─ VendorName: Isaac Z. Schlueter
│  │  └─ VendorUrl: https://izs.me
│  ├─ minipass@3.3.6
│  │  ├─ URL: git+https://github.com/isaacs/minipass.git
│  │  ├─ VendorName: Isaac Z. Schlueter
│  │  └─ VendorUrl: http://blog.izs.me/
│  ├─ minipass@5.0.0
│  │  ├─ URL: git+https://github.com/isaacs/minipass.git
│  │  ├─ VendorName: Isaac Z. Schlueter
│  │  └─ VendorUrl: http://blog.izs.me/
│  ├─ minipass@7.1.2
│  │  ├─ URL: https://github.com/isaacs/minipass
│  │  ├─ VendorName: Isaac Z. Schlueter
│  │  └─ VendorUrl: http://blog.izs.me/
│  ├─ npm-package-arg@7.0.0
│  │  ├─ URL: https://github.com/npm/npm-package-arg
│  │  ├─ VendorName: Isaac Z. Schlueter
│  │  └─ VendorUrl: https://github.com/npm/npm-package-arg
│  ├─ once@1.4.0
│  │  ├─ URL: git://github.com/isaacs/once
│  │  ├─ VendorName: Isaac Z. Schlueter
│  │  └─ VendorUrl: http://blog.izs.me/
│  ├─ osenv@0.1.5
│  │  ├─ URL: https://github.com/npm/osenv
│  │  ├─ VendorName: Isaac Z. Schlueter
│  │  └─ VendorUrl: http://blog.izs.me/
│  ├─ picocolors@1.0.1
│  │  ├─ URL: https://github.com/alexeyraspopov/picocolors.git
│  │  └─ VendorName: Alexey Raspopov
│  ├─ pixelmatch@4.0.2
│  │  ├─ URL: git+https://github.com/mapbox/pixelmatch.git
│  │  ├─ VendorName: Vladimir Agafonkin
│  │  └─ VendorUrl: https://github.com/mapbox/pixelmatch#readme
│  ├─ require-main-filename@2.0.0
│  │  ├─ URL: git+ssh://git@github.com/yargs/require-main-filename.git
│  │  ├─ VendorName: Ben Coe
│  │  └─ VendorUrl: https://github.com/yargs/require-main-filename#readme
│  ├─ rimraf@2.4.5
│  │  ├─ URL: git://github.com/isaacs/rimraf.git
│  │  ├─ VendorName: Isaac Z. Schlueter
│  │  └─ VendorUrl: http://blog.izs.me/
│  ├─ rimraf@2.6.3
│  │  ├─ URL: git://github.com/isaacs/rimraf.git
│  │  ├─ VendorName: Isaac Z. Schlueter
│  │  └─ VendorUrl: http://blog.izs.me/
│  ├─ rimraf@2.7.1
│  │  ├─ URL: git://github.com/isaacs/rimraf.git
│  │  ├─ VendorName: Isaac Z. Schlueter
│  │  └─ VendorUrl: http://blog.izs.me/
│  ├─ rimraf@3.0.2
│  │  ├─ URL: git://github.com/isaacs/rimraf.git
│  │  ├─ VendorName: Isaac Z. Schlueter
│  │  └─ VendorUrl: http://blog.izs.me/
│  ├─ sax@1.4.1
│  │  ├─ URL: git://github.com/isaacs/sax-js.git
│  │  ├─ VendorName: Isaac Z. Schlueter
│  │  └─ VendorUrl: http://blog.izs.me/
│  ├─ saxes@6.0.0
│  │  ├─ URL: https://github.com/lddubeau/saxes.git
│  │  └─ VendorName: Louis-Dominique Dubeau
│  ├─ semver@5.7.2
│  │  ├─ URL: https://github.com/npm/node-semver.git
│  │  └─ VendorName: GitHub Inc.
│  ├─ semver@6.3.1
│  │  ├─ URL: https://github.com/npm/node-semver.git
│  │  └─ VendorName: GitHub Inc.
│  ├─ semver@7.6.2
│  │  ├─ URL: git+https://github.com/npm/node-semver.git
│  │  └─ VendorName: GitHub Inc.
│  ├─ set-blocking@2.0.0
│  │  ├─ URL: git+https://github.com/yargs/set-blocking.git
│  │  ├─ VendorName: Ben Coe
│  │  └─ VendorUrl: https://github.com/yargs/set-blocking#readme
│  ├─ setprototypeof@1.2.0
│  │  ├─ URL: https://github.com/wesleytodd/setprototypeof.git
│  │  ├─ VendorName: Wes Todd
│  │  └─ VendorUrl: https://github.com/wesleytodd/setprototypeof
│  ├─ signal-exit@3.0.7
│  │  ├─ URL: https://github.com/tapjs/signal-exit.git
│  │  ├─ VendorName: Ben Coe
│  │  └─ VendorUrl: https://github.com/tapjs/signal-exit
│  ├─ signal-exit@4.1.0
│  │  ├─ URL: https://github.com/tapjs/signal-exit.git
│  │  └─ VendorName: Ben Coe
│  ├─ ssri@10.0.6
│  │  ├─ URL: git+https://github.com/npm/ssri.git
│  │  └─ VendorName: GitHub Inc.
│  ├─ tar@6.2.1
│  │  ├─ URL: https://github.com/isaacs/node-tar.git
│  │  └─ VendorName: GitHub Inc.
│  ├─ test-exclude@6.0.0
│  │  ├─ URL: git+https://github.com/istanbuljs/test-exclude.git
│  │  ├─ VendorName: Ben Coe
│  │  └─ VendorUrl: https://istanbul.js.org/
│  ├─ turbo-stream@2.2.0
│  │  ├─ URL: https://github.com/jacob-ebey/turbo-stream.git
│  │  └─ VendorName: Jacob Ebey
│  ├─ unique-filename@3.0.0
│  │  ├─ URL: https://github.com/npm/unique-filename.git
│  │  ├─ VendorName: GitHub Inc.
│  │  └─ VendorUrl: https://github.com/iarna/unique-filename
│  ├─ unique-slug@4.0.0
│  │  ├─ URL: https://github.com/npm/unique-slug.git
│  │  └─ VendorName: GitHub Inc.
│  ├─ v8-to-istanbul@9.3.0
│  │  ├─ URL: https://github.com/istanbuljs/v8-to-istanbul.git
│  │  └─ VendorName: Ben Coe
│  ├─ validate-npm-package-name@3.0.0
│  │  ├─ URL: https://github.com/npm/validate-npm-package-name
│  │  ├─ VendorName: zeke
│  │  └─ VendorUrl: https://github.com/npm/validate-npm-package-name
│  ├─ which-module@2.0.1
│  │  ├─ URL: git+https://github.com/nexdrew/which-module.git
│  │  ├─ VendorName: nexdrew
│  │  └─ VendorUrl: https://github.com/nexdrew/which-module#readme
│  ├─ which@1.3.1
│  │  ├─ URL: git://github.com/isaacs/node-which.git
│  │  ├─ VendorName: Isaac Z. Schlueter
│  │  └─ VendorUrl: http://blog.izs.me
│  ├─ which@2.0.2
│  │  ├─ URL: git://github.com/isaacs/node-which.git
│  │  ├─ VendorName: Isaac Z. Schlueter
│  │  └─ VendorUrl: http://blog.izs.me
│  ├─ wrappy@1.0.2
│  │  ├─ URL: https://github.com/npm/wrappy
│  │  ├─ VendorName: Isaac Z. Schlueter
│  │  └─ VendorUrl: https://github.com/npm/wrappy
│  ├─ write-file-atomic@2.4.3
│  │  ├─ URL: git@github.com:iarna/write-file-atomic.git
│  │  ├─ VendorName: Rebecca Turner
│  │  └─ VendorUrl: https://github.com/iarna/write-file-atomic
│  ├─ write-file-atomic@4.0.2
│  │  ├─ URL: https://github.com/npm/write-file-atomic.git
│  │  ├─ VendorName: GitHub Inc.
│  │  └─ VendorUrl: https://github.com/npm/write-file-atomic
│  ├─ y18n@4.0.3
│  │  ├─ URL: git@github.com:yargs/y18n.git
│  │  ├─ VendorName: Ben Coe
│  │  └─ VendorUrl: https://github.com/yargs/y18n
│  ├─ y18n@5.0.8
│  │  ├─ URL: https://github.com/yargs/y18n.git
│  │  ├─ VendorName: Ben Coe
│  │  └─ VendorUrl: https://github.com/yargs/y18n
│  ├─ yallist@3.1.1
│  │  ├─ URL: git+https://github.com/isaacs/yallist.git
│  │  ├─ VendorName: Isaac Z. Schlueter
│  │  └─ VendorUrl: http://blog.izs.me/
│  ├─ yallist@4.0.0
│  │  ├─ URL: git+https://github.com/isaacs/yallist.git
│  │  ├─ VendorName: Isaac Z. Schlueter
│  │  └─ VendorUrl: http://blog.izs.me/
│  ├─ yaml@2.4.5
│  │  ├─ URL: https://github.com/eemeli/yaml.git
│  │  ├─ VendorName: Eemeli Aro
│  │  └─ VendorUrl: https://eemeli.org/yaml/
│  ├─ yargs-parser@18.1.3
│  │  ├─ URL: https://github.com/yargs/yargs-parser.git
│  │  └─ VendorName: Ben Coe
│  └─ yargs-parser@21.1.1
│     ├─ URL: https://github.com/yargs/yargs-parser.git
│     └─ VendorName: Ben Coe
├─ LGPL-3.0
│  └─ ffmpeg-kit-react-native@6.0.2
│     ├─ URL: https://github.com/arthenica/ffmpeg-kit
│     ├─ VendorName: ARTHENICA
│     └─ VendorUrl: https://github.com/arthenica/ffmpeg-kit
├─ MIT
│  ├─ @0no-co/graphql.web@1.0.7
│  │  ├─ URL: https://github.com/0no-co/graphql.web
│  │  └─ VendorName: 0no.co
│  ├─ @alloc/quick-lru@5.2.0
│  │  ├─ URL: https://github.com/sindresorhus/quick-lru.git
│  │  ├─ VendorName: Sindre Sorhus
│  │  └─ VendorUrl: https://sindresorhus.com
│  ├─ @animatereactnative/marquee@0.2.0
│  │  ├─ URL: https://github.com/animate-react-native/marquee
│  │  ├─ VendorName: catalinmiron
│  │  └─ VendorUrl: https://github.com/animate-react-native/marquee#readme
│  ├─ @artrix909/hls-dl@0.2.2
│  │  ├─ URL: git+https://github.com/Artrix9095/hls-dl.git
│  │  ├─ VendorName: Artrix
│  │  └─ VendorUrl: https://github.com/Artrix9095/hls-dl#readme
│  ├─ @babel/code-frame@7.10.4
│  │  ├─ URL: https://github.com/babel/babel.git
│  │  ├─ VendorName: Sebastian McKenzie
│  │  └─ VendorUrl: https://babeljs.io/
│  ├─ @babel/code-frame@7.24.7
│  │  ├─ URL: https://github.com/babel/babel.git
│  │  ├─ VendorName: The Babel Team
│  │  └─ VendorUrl: https://babel.dev/docs/en/next/babel-code-frame
│  ├─ @babel/compat-data@7.24.7
│  │  ├─ URL: https://github.com/babel/babel.git
│  │  ├─ VendorName: The Babel Team
│  │  └─ VendorUrl: https://babel.dev/team
│  ├─ @babel/core@7.24.7
│  │  ├─ URL: https://github.com/babel/babel.git
│  │  ├─ VendorName: The Babel Team
│  │  └─ VendorUrl: https://babel.dev/docs/en/next/babel-core
│  ├─ @babel/generator@7.2.0
│  │  ├─ URL: https://github.com/babel/babel/tree/master/packages/babel-generator
│  │  ├─ VendorName: Sebastian McKenzie
│  │  └─ VendorUrl: https://babeljs.io/
│  ├─ @babel/generator@7.24.7
│  │  ├─ URL: https://github.com/babel/babel.git
│  │  ├─ VendorName: The Babel Team
│  │  └─ VendorUrl: https://babel.dev/docs/en/next/babel-generator
│  ├─ @babel/helper-annotate-as-pure@7.24.7
│  │  ├─ URL: https://github.com/babel/babel.git
│  │  ├─ VendorName: The Babel Team
│  │  └─ VendorUrl: https://babel.dev/docs/en/next/babel-helper-annotate-as-pure
│  ├─ @babel/helper-compilation-targets@7.24.7
│  │  ├─ URL: https://github.com/babel/babel.git
│  │  ├─ VendorName: The Babel Team
│  │  └─ VendorUrl: https://babel.dev/team
│  ├─ @babel/helper-create-class-features-plugin@7.24.7
│  │  ├─ URL: https://github.com/babel/babel.git
│  │  ├─ VendorName: The Babel Team
│  │  └─ VendorUrl: https://babel.dev/team
│  ├─ @babel/helper-create-regexp-features-plugin@7.24.7
│  │  ├─ URL: https://github.com/babel/babel.git
│  │  ├─ VendorName: The Babel Team
│  │  └─ VendorUrl: https://babel.dev/team
│  ├─ @babel/helper-define-polyfill-provider@0.6.2
│  │  └─ URL: https://github.com/babel/babel-polyfills.git
│  ├─ @babel/helper-environment-visitor@7.24.7
│  │  ├─ URL: https://github.com/babel/babel.git
│  │  ├─ VendorName: The Babel Team
│  │  └─ VendorUrl: https://babel.dev/docs/en/next/babel-helper-environment-visitor
│  ├─ @babel/helper-function-name@7.24.7
│  │  ├─ URL: https://github.com/babel/babel.git
│  │  ├─ VendorName: The Babel Team
│  │  └─ VendorUrl: https://babel.dev/docs/en/next/babel-helper-function-name
│  ├─ @babel/helper-hoist-variables@7.24.7
│  │  ├─ URL: https://github.com/babel/babel.git
│  │  ├─ VendorName: The Babel Team
│  │  └─ VendorUrl: https://babel.dev/docs/en/next/babel-helper-hoist-variables
│  ├─ @babel/helper-member-expression-to-functions@7.24.7
│  │  ├─ URL: https://github.com/babel/babel.git
│  │  ├─ VendorName: The Babel Team
│  │  └─ VendorUrl: https://babel.dev/docs/en/next/babel-helper-member-expression-to-functions
│  ├─ @babel/helper-module-imports@7.24.7
│  │  ├─ URL: https://github.com/babel/babel.git
│  │  ├─ VendorName: The Babel Team
│  │  └─ VendorUrl: https://babel.dev/docs/en/next/babel-helper-module-imports
│  ├─ @babel/helper-module-transforms@7.24.7
│  │  ├─ URL: https://github.com/babel/babel.git
│  │  ├─ VendorName: The Babel Team
│  │  └─ VendorUrl: https://babel.dev/docs/en/next/babel-helper-module-transforms
│  ├─ @babel/helper-optimise-call-expression@7.24.7
│  │  ├─ URL: https://github.com/babel/babel.git
│  │  ├─ VendorName: The Babel Team
│  │  └─ VendorUrl: https://babel.dev/docs/en/next/babel-helper-optimise-call-expression
│  ├─ @babel/helper-plugin-utils@7.24.7
│  │  ├─ URL: https://github.com/babel/babel.git
│  │  ├─ VendorName: The Babel Team
│  │  └─ VendorUrl: https://babel.dev/docs/en/next/babel-helper-plugin-utils
│  ├─ @babel/helper-remap-async-to-generator@7.24.7
│  │  ├─ URL: https://github.com/babel/babel.git
│  │  ├─ VendorName: The Babel Team
│  │  └─ VendorUrl: https://babel.dev/docs/en/next/babel-helper-remap-async-to-generator
│  ├─ @babel/helper-replace-supers@7.24.7
│  │  ├─ URL: https://github.com/babel/babel.git
│  │  ├─ VendorName: The Babel Team
│  │  └─ VendorUrl: https://babel.dev/docs/en/next/babel-helper-replace-supers
│  ├─ @babel/helper-simple-access@7.24.7
│  │  ├─ URL: https://github.com/babel/babel.git
│  │  ├─ VendorName: The Babel Team
│  │  └─ VendorUrl: https://babel.dev/docs/en/next/babel-helper-simple-access
│  ├─ @babel/helper-skip-transparent-expression-wrappers@7.24.7
│  │  ├─ URL: https://github.com/babel/babel.git
│  │  ├─ VendorName: The Babel Team
│  │  └─ VendorUrl: https://babel.dev/team
│  ├─ @babel/helper-split-export-declaration@7.24.7
│  │  ├─ URL: https://github.com/babel/babel.git
│  │  ├─ VendorName: The Babel Team
│  │  └─ VendorUrl: https://babel.dev/docs/en/next/babel-helper-split-export-declaration
│  ├─ @babel/helper-string-parser@7.24.7
│  │  ├─ URL: https://github.com/babel/babel.git
│  │  ├─ VendorName: The Babel Team
│  │  └─ VendorUrl: https://babel.dev/docs/en/next/babel-helper-string-parser
│  ├─ @babel/helper-validator-identifier@7.24.7
│  │  ├─ URL: https://github.com/babel/babel.git
│  │  ├─ VendorName: The Babel Team
│  │  └─ VendorUrl: https://babel.dev/team
│  ├─ @babel/helper-validator-option@7.24.7
│  │  ├─ URL: https://github.com/babel/babel.git
│  │  ├─ VendorName: The Babel Team
│  │  └─ VendorUrl: https://babel.dev/team
│  ├─ @babel/helper-wrap-function@7.24.7
│  │  ├─ URL: https://github.com/babel/babel.git
│  │  ├─ VendorName: The Babel Team
│  │  └─ VendorUrl: https://babel.dev/docs/en/next/babel-helper-wrap-function
│  ├─ @babel/helpers@7.24.7
│  │  ├─ URL: https://github.com/babel/babel.git
│  │  ├─ VendorName: The Babel Team
│  │  └─ VendorUrl: https://babel.dev/docs/en/next/babel-helpers
│  ├─ @babel/highlight@7.24.7
│  │  ├─ URL: https://github.com/babel/babel.git
│  │  ├─ VendorName: The Babel Team
│  │  └─ VendorUrl: https://babel.dev/docs/en/next/babel-highlight
│  ├─ @babel/parser@7.24.7
│  │  ├─ URL: https://github.com/babel/babel.git
│  │  ├─ VendorName: The Babel Team
│  │  └─ VendorUrl: https://babel.dev/docs/en/next/babel-parser
│  ├─ @babel/plugin-proposal-async-generator-functions@7.20.7
│  │  ├─ URL: https://github.com/babel/babel.git
│  │  ├─ VendorName: The Babel Team
│  │  └─ VendorUrl: https://babel.dev/docs/en/next/babel-plugin-proposal-async-generator-functions
│  ├─ @babel/plugin-proposal-class-properties@7.18.6
│  │  ├─ URL: https://github.com/babel/babel.git
│  │  ├─ VendorName: The Babel Team
│  │  └─ VendorUrl: https://babel.dev/docs/en/next/babel-plugin-proposal-class-properties
│  ├─ @babel/plugin-proposal-decorators@7.24.7
│  │  ├─ URL: https://github.com/babel/babel.git
│  │  ├─ VendorName: The Babel Team
│  │  └─ VendorUrl: https://babel.dev/docs/en/next/babel-plugin-proposal-decorators
│  ├─ @babel/plugin-proposal-export-default-from@7.24.7
│  │  ├─ URL: https://github.com/babel/babel.git
│  │  ├─ VendorName: The Babel Team
│  │  └─ VendorUrl: https://babel.dev/docs/en/next/babel-plugin-proposal-export-default-from
│  ├─ @babel/plugin-proposal-logical-assignment-operators@7.20.7
│  │  ├─ URL: https://github.com/babel/babel.git
│  │  ├─ VendorName: The Babel Team
│  │  └─ VendorUrl: https://babel.dev/docs/en/next/babel-plugin-proposal-logical-assignment-operators
│  ├─ @babel/plugin-proposal-nullish-coalescing-operator@7.18.6
│  │  ├─ URL: https://github.com/babel/babel.git
│  │  ├─ VendorName: The Babel Team
│  │  └─ VendorUrl: https://babel.dev/docs/en/next/babel-plugin-proposal-nullish-coalescing-operator
│  ├─ @babel/plugin-proposal-numeric-separator@7.18.6
│  │  ├─ URL: https://github.com/babel/babel.git
│  │  ├─ VendorName: The Babel Team
│  │  └─ VendorUrl: https://babel.dev/docs/en/next/babel-plugin-proposal-numeric-separator
│  ├─ @babel/plugin-proposal-object-rest-spread@7.20.7
│  │  ├─ URL: https://github.com/babel/babel.git
│  │  ├─ VendorName: The Babel Team
│  │  └─ VendorUrl: https://babel.dev/docs/en/next/babel-plugin-proposal-object-rest-spread
│  ├─ @babel/plugin-proposal-optional-catch-binding@7.18.6
│  │  ├─ URL: https://github.com/babel/babel.git
│  │  ├─ VendorName: The Babel Team
│  │  └─ VendorUrl: https://babel.dev/docs/en/next/babel-plugin-proposal-optional-catch-binding
│  ├─ @babel/plugin-proposal-optional-chaining@7.21.0
│  │  ├─ URL: https://github.com/babel/babel.git
│  │  ├─ VendorName: The Babel Team
│  │  └─ VendorUrl: https://babel.dev/docs/en/next/babel-plugin-proposal-optional-chaining
│  ├─ @babel/plugin-syntax-async-generators@7.8.4
│  │  └─ URL: https://github.com/babel/babel/tree/master/packages/babel-plugin-syntax-async-generators
│  ├─ @babel/plugin-syntax-bigint@7.8.3
│  │  └─ URL: https://github.com/babel/babel/tree/master/packages/babel-plugin-syntax-bigint
│  ├─ @babel/plugin-syntax-class-properties@7.12.13
│  │  ├─ URL: https://github.com/babel/babel.git
│  │  └─ VendorUrl: https://babel.dev/docs/en/next/babel-plugin-syntax-class-properties
│  ├─ @babel/plugin-syntax-decorators@7.24.7
│  │  ├─ URL: https://github.com/babel/babel.git
│  │  ├─ VendorName: The Babel Team
│  │  └─ VendorUrl: https://babel.dev/docs/en/next/babel-plugin-syntax-decorators
│  ├─ @babel/plugin-syntax-dynamic-import@7.8.3
│  │  └─ URL: https://github.com/babel/babel/tree/master/packages/babel-plugin-syntax-dynamic-import
│  ├─ @babel/plugin-syntax-export-default-from@7.24.7
│  │  ├─ URL: https://github.com/babel/babel.git
│  │  ├─ VendorName: The Babel Team
│  │  └─ VendorUrl: https://babel.dev/docs/en/next/babel-plugin-syntax-export-default-from
│  ├─ @babel/plugin-syntax-export-namespace-from@7.8.3
│  │  └─ URL: https://github.com/babel/babel/tree/master/packages/babel-plugin-syntax-export-namespace-from
│  ├─ @babel/plugin-syntax-flow@7.24.7
│  │  ├─ URL: https://github.com/babel/babel.git
│  │  ├─ VendorName: The Babel Team
│  │  └─ VendorUrl: https://babel.dev/docs/en/next/babel-plugin-syntax-flow
│  ├─ @babel/plugin-syntax-import-meta@7.10.4
│  │  └─ URL: https://github.com/babel/babel.git
│  ├─ @babel/plugin-syntax-json-strings@7.8.3
│  │  └─ URL: https://github.com/babel/babel/tree/master/packages/babel-plugin-syntax-json-strings
│  ├─ @babel/plugin-syntax-jsx@7.24.7
│  │  ├─ URL: https://github.com/babel/babel.git
│  │  ├─ VendorName: The Babel Team
│  │  └─ VendorUrl: https://babel.dev/docs/en/next/babel-plugin-syntax-jsx
│  ├─ @babel/plugin-syntax-logical-assignment-operators@7.10.4
│  │  └─ URL: https://github.com/babel/babel.git
│  ├─ @babel/plugin-syntax-nullish-coalescing-operator@7.8.3
│  │  └─ URL: https://github.com/babel/babel/tree/master/packages/babel-plugin-syntax-nullish-coalescing-operator
│  ├─ @babel/plugin-syntax-numeric-separator@7.10.4
│  │  └─ URL: https://github.com/babel/babel.git
│  ├─ @babel/plugin-syntax-object-rest-spread@7.8.3
│  │  └─ URL: https://github.com/babel/babel/tree/master/packages/babel-plugin-syntax-object-rest-spread
│  ├─ @babel/plugin-syntax-optional-catch-binding@7.8.3
│  │  └─ URL: https://github.com/babel/babel/tree/master/packages/babel-plugin-syntax-optional-catch-binding
│  ├─ @babel/plugin-syntax-optional-chaining@7.8.3
│  │  └─ URL: https://github.com/babel/babel/tree/master/packages/babel-plugin-syntax-optional-chaining
│  ├─ @babel/plugin-syntax-private-property-in-object@7.14.5
│  │  ├─ URL: https://github.com/babel/babel.git
│  │  ├─ VendorName: The Babel Team
│  │  └─ VendorUrl: https://babel.dev/docs/en/next/babel-plugin-syntax-private-property-in-object
│  ├─ @babel/plugin-syntax-top-level-await@7.14.5
│  │  ├─ URL: https://github.com/babel/babel.git
│  │  ├─ VendorName: The Babel Team
│  │  └─ VendorUrl: https://babel.dev/docs/en/next/babel-plugin-syntax-top-level-await
│  ├─ @babel/plugin-syntax-typescript@7.24.7
│  │  ├─ URL: https://github.com/babel/babel.git
│  │  ├─ VendorName: The Babel Team
│  │  └─ VendorUrl: https://babel.dev/docs/en/next/babel-plugin-syntax-typescript
│  ├─ @babel/plugin-transform-arrow-functions@7.24.7
│  │  ├─ URL: https://github.com/babel/babel.git
│  │  ├─ VendorName: The Babel Team
│  │  └─ VendorUrl: https://babel.dev/docs/en/next/babel-plugin-transform-arrow-functions
│  ├─ @babel/plugin-transform-async-to-generator@7.24.7
│  │  ├─ URL: https://github.com/babel/babel.git
│  │  ├─ VendorName: The Babel Team
│  │  └─ VendorUrl: https://babel.dev/docs/en/next/babel-plugin-transform-async-to-generator
│  ├─ @babel/plugin-transform-block-scoping@7.24.7
│  │  ├─ URL: https://github.com/babel/babel.git
│  │  ├─ VendorName: The Babel Team
│  │  └─ VendorUrl: https://babel.dev/docs/en/next/babel-plugin-transform-block-scoping
│  ├─ @babel/plugin-transform-classes@7.24.7
│  │  ├─ URL: https://github.com/babel/babel.git
│  │  ├─ VendorName: The Babel Team
│  │  └─ VendorUrl: https://babel.dev/docs/en/next/babel-plugin-transform-classes
│  ├─ @babel/plugin-transform-computed-properties@7.24.7
│  │  ├─ URL: https://github.com/babel/babel.git
│  │  ├─ VendorName: The Babel Team
│  │  └─ VendorUrl: https://babel.dev/docs/en/next/babel-plugin-transform-computed-properties
│  ├─ @babel/plugin-transform-destructuring@7.24.7
│  │  ├─ URL: https://github.com/babel/babel.git
│  │  ├─ VendorName: The Babel Team
│  │  └─ VendorUrl: https://babel.dev/docs/en/next/babel-plugin-transform-destructuring
│  ├─ @babel/plugin-transform-export-namespace-from@7.24.7
│  │  ├─ URL: https://github.com/babel/babel.git
│  │  ├─ VendorName: The Babel Team
│  │  └─ VendorUrl: https://babel.dev/docs/en/next/babel-plugin-transform-export-namespace-from
│  ├─ @babel/plugin-transform-flow-strip-types@7.24.7
│  │  ├─ URL: https://github.com/babel/babel.git
│  │  ├─ VendorName: The Babel Team
│  │  └─ VendorUrl: https://babel.dev/docs/en/next/babel-plugin-transform-flow-strip-types
│  ├─ @babel/plugin-transform-function-name@7.24.7
│  │  ├─ URL: https://github.com/babel/babel.git
│  │  ├─ VendorName: The Babel Team
│  │  └─ VendorUrl: https://babel.dev/docs/en/next/babel-plugin-transform-function-name
│  ├─ @babel/plugin-transform-literals@7.24.7
│  │  ├─ URL: https://github.com/babel/babel.git
│  │  ├─ VendorName: The Babel Team
│  │  └─ VendorUrl: https://babel.dev/docs/en/next/babel-plugin-transform-literals
│  ├─ @babel/plugin-transform-modules-commonjs@7.24.7
│  │  ├─ URL: https://github.com/babel/babel.git
│  │  ├─ VendorName: The Babel Team
│  │  └─ VendorUrl: https://babel.dev/docs/en/next/babel-plugin-transform-modules-commonjs
│  ├─ @babel/plugin-transform-named-capturing-groups-regex@7.24.7
│  │  ├─ URL: https://github.com/babel/babel.git
│  │  ├─ VendorName: The Babel Team
│  │  └─ VendorUrl: https://babel.dev/docs/en/next/babel-plugin-transform-named-capturing-groups-regex
│  ├─ @babel/plugin-transform-nullish-coalescing-operator@7.24.7
│  │  ├─ URL: https://github.com/babel/babel.git
│  │  ├─ VendorName: The Babel Team
│  │  └─ VendorUrl: https://babel.dev/docs/en/next/babel-plugin-transform-nullish-coalescing-operator
│  ├─ @babel/plugin-transform-object-rest-spread@7.24.7
│  │  ├─ URL: https://github.com/babel/babel.git
│  │  ├─ VendorName: The Babel Team
│  │  └─ VendorUrl: https://babel.dev/docs/en/next/babel-plugin-transform-object-rest-spread
│  ├─ @babel/plugin-transform-optional-chaining@7.24.7
│  │  ├─ URL: https://github.com/babel/babel.git
│  │  ├─ VendorName: The Babel Team
│  │  └─ VendorUrl: https://babel.dev/docs/en/next/babel-plugin-transform-optional-chaining
│  ├─ @babel/plugin-transform-parameters@7.24.7
│  │  ├─ URL: https://github.com/babel/babel.git
│  │  ├─ VendorName: The Babel Team
│  │  └─ VendorUrl: https://babel.dev/docs/en/next/babel-plugin-transform-parameters
│  ├─ @babel/plugin-transform-private-methods@7.24.7
│  │  ├─ URL: https://github.com/babel/babel.git
│  │  ├─ VendorName: The Babel Team
│  │  └─ VendorUrl: https://babel.dev/docs/en/next/babel-plugin-transform-private-methods
│  ├─ @babel/plugin-transform-private-property-in-object@7.24.7
│  │  ├─ URL: https://github.com/babel/babel.git
│  │  ├─ VendorName: The Babel Team
│  │  └─ VendorUrl: https://babel.dev/docs/en/next/babel-plugin-transform-private-property-in-object
│  ├─ @babel/plugin-transform-react-display-name@7.24.7
│  │  ├─ URL: https://github.com/babel/babel.git
│  │  ├─ VendorName: The Babel Team
│  │  └─ VendorUrl: https://babel.dev/docs/en/next/babel-plugin-transform-react-display-name
│  ├─ @babel/plugin-transform-react-jsx-development@7.24.7
│  │  ├─ URL: https://github.com/babel/babel.git
│  │  ├─ VendorName: The Babel Team
│  │  └─ VendorUrl: https://babel.dev/team
│  ├─ @babel/plugin-transform-react-jsx-self@7.24.7
│  │  ├─ URL: https://github.com/babel/babel.git
│  │  ├─ VendorName: The Babel Team
│  │  └─ VendorUrl: https://babel.dev/docs/en/next/babel-plugin-transform-react-jsx-self
│  ├─ @babel/plugin-transform-react-jsx-source@7.24.7
│  │  ├─ URL: https://github.com/babel/babel.git
│  │  ├─ VendorName: The Babel Team
│  │  └─ VendorUrl: https://babel.dev/docs/en/next/babel-plugin-transform-react-jsx-source
│  ├─ @babel/plugin-transform-react-jsx@7.24.7
│  │  ├─ URL: https://github.com/babel/babel.git
│  │  ├─ VendorName: The Babel Team
│  │  └─ VendorUrl: https://babel.dev/docs/en/next/babel-plugin-transform-react-jsx
│  ├─ @babel/plugin-transform-react-pure-annotations@7.24.7
│  │  ├─ URL: https://github.com/babel/babel.git
│  │  ├─ VendorName: The Babel Team
│  │  └─ VendorUrl: https://babel.dev/team
│  ├─ @babel/plugin-transform-runtime@7.24.7
│  │  ├─ URL: https://github.com/babel/babel.git
│  │  ├─ VendorName: The Babel Team
│  │  └─ VendorUrl: https://babel.dev/docs/en/next/babel-plugin-transform-runtime
│  ├─ @babel/plugin-transform-shorthand-properties@7.24.7
│  │  ├─ URL: https://github.com/babel/babel.git
│  │  ├─ VendorName: The Babel Team
│  │  └─ VendorUrl: https://babel.dev/docs/en/next/babel-plugin-transform-shorthand-properties
│  ├─ @babel/plugin-transform-spread@7.24.7
│  │  ├─ URL: https://github.com/babel/babel.git
│  │  ├─ VendorName: The Babel Team
│  │  └─ VendorUrl: https://babel.dev/docs/en/next/babel-plugin-transform-spread
│  ├─ @babel/plugin-transform-sticky-regex@7.24.7
│  │  ├─ URL: https://github.com/babel/babel.git
│  │  ├─ VendorName: The Babel Team
│  │  └─ VendorUrl: https://babel.dev/docs/en/next/babel-plugin-transform-sticky-regex
│  ├─ @babel/plugin-transform-template-literals@7.24.7
│  │  ├─ URL: https://github.com/babel/babel.git
│  │  ├─ VendorName: The Babel Team
│  │  └─ VendorUrl: https://babel.dev/docs/en/next/babel-plugin-transform-template-literals
│  ├─ @babel/plugin-transform-typescript@7.24.7
│  │  ├─ URL: https://github.com/babel/babel.git
│  │  ├─ VendorName: The Babel Team
│  │  └─ VendorUrl: https://babel.dev/docs/en/next/babel-plugin-transform-typescript
│  ├─ @babel/plugin-transform-unicode-regex@7.24.7
│  │  ├─ URL: https://github.com/babel/babel.git
│  │  ├─ VendorName: The Babel Team
│  │  └─ VendorUrl: https://babel.dev/docs/en/next/babel-plugin-transform-unicode-regex
│  ├─ @babel/preset-flow@7.24.7
│  │  ├─ URL: https://github.com/babel/babel.git
│  │  ├─ VendorName: The Babel Team
│  │  └─ VendorUrl: https://babel.dev/docs/en/next/babel-preset-flow
│  ├─ @babel/preset-react@7.24.7
│  │  ├─ URL: https://github.com/babel/babel.git
│  │  ├─ VendorName: The Babel Team
│  │  └─ VendorUrl: https://babel.dev/docs/en/next/babel-preset-react
│  ├─ @babel/preset-typescript@7.24.7
│  │  ├─ URL: https://github.com/babel/babel.git
│  │  ├─ VendorName: The Babel Team
│  │  └─ VendorUrl: https://babel.dev/docs/en/next/babel-preset-typescript
│  ├─ @babel/register@7.24.6
│  │  ├─ URL: https://github.com/babel/babel.git
│  │  ├─ VendorName: The Babel Team
│  │  └─ VendorUrl: https://babel.dev/docs/en/next/babel-register
│  ├─ @babel/regjsgen@0.8.0
│  │  ├─ URL: https://github.com/bnjmnt4n/regjsgen.git
│  │  ├─ VendorName: Benjamin Tan
│  │  └─ VendorUrl: https://github.com/bnjmnt4n/regjsgen
│  ├─ @babel/runtime@7.24.7
│  │  ├─ URL: https://github.com/babel/babel.git
│  │  ├─ VendorName: The Babel Team
│  │  └─ VendorUrl: https://babel.dev/docs/en/next/babel-runtime
│  ├─ @babel/template@7.24.7
│  │  ├─ URL: https://github.com/babel/babel.git
│  │  ├─ VendorName: The Babel Team
│  │  └─ VendorUrl: https://babel.dev/docs/en/next/babel-template
│  ├─ @babel/traverse@7.24.7
│  │  ├─ URL: https://github.com/babel/babel.git
│  │  ├─ VendorName: The Babel Team
│  │  └─ VendorUrl: https://babel.dev/docs/en/next/babel-traverse
│  ├─ @babel/types@7.24.7
│  │  ├─ URL: https://github.com/babel/babel.git
│  │  ├─ VendorName: The Babel Team
│  │  └─ VendorUrl: https://babel.dev/docs/en/next/babel-types
│  ├─ @bcoe/v8-coverage@0.2.3
│  │  ├─ URL: git://github.com/demurgos/v8-coverage.git
│  │  ├─ VendorName: Charles Samborski
│  │  └─ VendorUrl: https://demurgos.github.io/v8-coverage
│  ├─ @egjs/hammerjs@2.0.17
│  │  ├─ URL: git://github.com/naver/hammer.js.git
│  │  └─ VendorUrl: http://naver.github.io/egjs
│  ├─ @emotion/is-prop-valid@0.8.8
│  │  └─ URL: https://github.com/emotion-js/emotion/tree/master/packages/is-prop-valid
│  ├─ @emotion/memoize@0.7.4
│  │  └─ URL: https://github.com/emotion-js/emotion/tree/master/packages/memoize
│  ├─ @esbuild-kit/core-utils@3.3.2
│  │  ├─ URL: https://github.com/esbuild-kit/core-utils.git
│  │  └─ VendorName: Hiroki Osame
│  ├─ @esbuild-kit/esm-loader@2.6.5
│  │  ├─ URL: https://github.com/esbuild-kit/esm-loader.git
│  │  └─ VendorName: Hiroki Osame
│  ├─ @esbuild/darwin-arm64@0.18.20
│  │  └─ URL: https://github.com/evanw/esbuild
│  ├─ @esbuild/darwin-arm64@0.19.12
│  │  └─ URL: https://github.com/evanw/esbuild
│  ├─ @expo/bunyan@4.0.0
│  │  ├─ URL: git://github.com/trentm/node-bunyan.git
│  │  ├─ VendorName: Trent Mick
│  │  └─ VendorUrl: http://trentm.com
│  ├─ @expo/cli@0.18.22
│  │  ├─ URL: https://github.com/expo/expo.git
│  │  ├─ VendorName: Expo
│  │  └─ VendorUrl: https://github.com/expo/expo/tree/main/packages/@expo/cli
│  ├─ @expo/code-signing-certificates@0.0.5
│  │  ├─ URL: https://github.com/expo/code-signing-certificates.git
│  │  ├─ VendorName: Expo
│  │  └─ VendorUrl: https://github.com/expo/code-signing-certificates/tree/main#readme
│  ├─ @expo/config-plugins@8.0.7
│  │  ├─ URL: https://github.com/expo/expo.git
│  │  └─ VendorUrl: https://docs.expo.dev/guides/config-plugins/
│  ├─ @expo/config-types@51.0.2
│  │  ├─ URL: https://github.com/expo/expo.git
│  │  └─ VendorUrl: https://github.com/expo/expo/tree/main/packages/@expo/config-types#readme
│  ├─ @expo/config@9.0.1
│  │  ├─ URL: https://github.com/expo/expo.git
│  │  └─ VendorUrl: https://github.com/expo/expo/tree/main/packages/@expo/config#readme
│  ├─ @expo/config@9.0.2
│  │  ├─ URL: https://github.com/expo/expo.git
│  │  └─ VendorUrl: https://github.com/expo/expo/tree/main/packages/@expo/config#readme
│  ├─ @expo/devcert@1.1.2
│  │  ├─ URL: git+https://github.com/expo/devcert.git
│  │  ├─ VendorName: Dave Wasmer
│  │  └─ VendorUrl: https://github.com/expo/devcert#readme
│  ├─ @expo/env@0.3.0
│  │  ├─ URL: https://github.com/expo/expo.git
│  │  └─ VendorUrl: https://github.com/expo/expo/tree/main/packages/@expo/env#readme
│  ├─ @expo/image-utils@0.5.1
│  │  ├─ URL: https://github.com/expo/expo.git
│  │  └─ VendorUrl: https://github.com/expo/expo/tree/main/packages/%40expo/image-utils#readme
│  ├─ @expo/json-file@8.3.3
│  │  ├─ URL: https://github.com/expo/expo.git
│  │  └─ VendorUrl: https://github.com/expo/expo/tree/main/packages/@expo/json-file#readme
│  ├─ @expo/metro-config@0.18.8
│  │  ├─ URL: https://github.com/expo/expo.git
│  │  └─ VendorUrl: https://github.com/expo/expo/tree/main/packages/@expo/metro-config#readme
│  ├─ @expo/metro-runtime@3.2.1
│  │  ├─ URL: https://github.com/expo/expo.git
│  │  ├─ VendorName: 650 Industries, Inc.
│  │  └─ VendorUrl: https://github.com/expo/expo/tree/main/packages/@expo/metro-runtime
│  ├─ @expo/osascript@2.1.3
│  │  ├─ URL: https://github.com/expo/expo.git
│  │  └─ VendorUrl: https://github.com/expo/expo/tree/main/packages/@expo/osascript#readme
│  ├─ @expo/package-manager@1.5.2
│  │  ├─ URL: https://github.com/expo/expo.git
│  │  └─ VendorUrl: https://github.com/expo/expo/tree/main/packages/@expo/package-manager#readme
│  ├─ @expo/plist@0.1.3
│  │  ├─ URL: https://github.com/expo/expo.git
│  │  └─ VendorUrl: https://github.com/expo/expo/tree/main/packages/@expo/plist#readme
│  ├─ @expo/prebuild-config@7.0.6
│  │  ├─ URL: https://github.com/expo/expo.git
│  │  └─ VendorUrl: https://github.com/expo/expo/tree/main/packages/@expo/prebuild-config#readme
│  ├─ @expo/prebuild-config@7.0.7
│  │  ├─ URL: https://github.com/expo/expo.git
│  │  └─ VendorUrl: https://github.com/expo/expo/tree/main/packages/@expo/prebuild-config#readme
│  ├─ @expo/rudder-sdk-node@1.1.1
│  │  ├─ URL: git+https://github.com/expo/rudder-sdk-node.git
│  │  └─ VendorName: Expo
│  ├─ @expo/sdk-runtime-versions@1.0.0
│  │  └─ VendorName: Expo
│  ├─ @expo/server@0.4.3
│  │  ├─ URL: https://github.com/expo/expo.git
│  │  └─ VendorUrl: https://github.com/expo/expo/tree/main/packages/@expo/server#readme
│  ├─ @expo/spawn-async@1.7.2
│  │  ├─ URL: git+https://github.com/expo/spawn-async.git
│  │  ├─ VendorName: Expo
│  │  └─ VendorUrl: https://github.com/expo/spawn-async#readme
│  ├─ @expo/vector-icons@14.0.2
│  │  ├─ URL: https://github.com/expo/vector-icons.git
│  │  ├─ VendorName: Brent Vatne
│  │  └─ VendorUrl: https://expo.github.io/vector-icons
│  ├─ @floating-ui/core@1.6.4
│  │  ├─ URL: https://github.com/floating-ui/floating-ui.git
│  │  ├─ VendorName: atomiks
│  │  └─ VendorUrl: https://floating-ui.com/
│  ├─ @floating-ui/dom@1.6.7
│  │  ├─ URL: https://github.com/floating-ui/floating-ui.git
│  │  ├─ VendorName: atomiks
│  │  └─ VendorUrl: https://floating-ui.com/
│  ├─ @floating-ui/react-dom@2.1.1
│  │  ├─ URL: https://github.com/floating-ui/floating-ui.git
│  │  ├─ VendorName: atomiks
│  │  └─ VendorUrl: https://floating-ui.com/docs/react-dom
│  ├─ @floating-ui/utils@0.2.4
│  │  ├─ URL: https://github.com/floating-ui/floating-ui.git
│  │  ├─ VendorName: atomiks
│  │  └─ VendorUrl: https://floating-ui.com/
│  ├─ @graphql-typed-document-node/core@3.2.0
│  │  ├─ URL: git@github.com:dotansimha/graphql-typed-document-node.git
│  │  └─ VendorName: Dotan Simha
│  ├─ @istanbuljs/schema@0.1.3
│  │  ├─ URL: git+https://github.com/istanbuljs/schema.git
│  │  ├─ VendorName: Corey Farrell
│  │  └─ VendorUrl: https://github.com/istanbuljs/schema#readme
│  ├─ @jest/console@29.7.0
│  │  └─ URL: https://github.com/jestjs/jest.git
│  ├─ @jest/core@29.7.0
│  │  ├─ URL: https://github.com/jestjs/jest.git
│  │  └─ VendorUrl: https://jestjs.io/
│  ├─ @jest/create-cache-key-function@29.7.0
│  │  └─ URL: https://github.com/jestjs/jest.git
│  ├─ @jest/environment@29.7.0
│  │  └─ URL: https://github.com/jestjs/jest.git
│  ├─ @jest/expect-utils@29.7.0
│  │  └─ URL: https://github.com/jestjs/jest.git
│  ├─ @jest/expect@29.7.0
│  │  └─ URL: https://github.com/jestjs/jest.git
│  ├─ @jest/fake-timers@29.7.0
│  │  └─ URL: https://github.com/jestjs/jest.git
│  ├─ @jest/globals@29.7.0
│  │  └─ URL: https://github.com/jestjs/jest.git
│  ├─ @jest/reporters@29.7.0
│  │  ├─ URL: https://github.com/jestjs/jest.git
│  │  └─ VendorUrl: https://jestjs.io/
│  ├─ @jest/schemas@29.6.3
│  │  └─ URL: https://github.com/jestjs/jest.git
│  ├─ @jest/source-map@29.6.3
│  │  └─ URL: https://github.com/jestjs/jest.git
│  ├─ @jest/test-result@29.7.0
│  │  └─ URL: https://github.com/jestjs/jest.git
│  ├─ @jest/test-sequencer@29.7.0
│  │  └─ URL: https://github.com/jestjs/jest.git
│  ├─ @jest/transform@29.7.0
│  │  └─ URL: https://github.com/jestjs/jest.git
│  ├─ @jest/types@24.9.0
│  │  └─ URL: https://github.com/facebook/jest.git
│  ├─ @jest/types@26.6.2
│  │  └─ URL: https://github.com/facebook/jest.git
│  ├─ @jest/types@29.6.3
│  │  └─ URL: https://github.com/jestjs/jest.git
│  ├─ @jimp/bmp@0.16.13
│  ├─ @jimp/core@0.16.13
│  │  ├─ URL: https://github.com/jimp-dev/jimp.git
│  │  └─ VendorName: Oliver Moran
│  ├─ @jimp/custom@0.16.13
│  ├─ @jimp/gif@0.16.13
│  ├─ @jimp/jpeg@0.16.13
│  ├─ @jimp/plugin-resize@0.16.13
│  ├─ @jimp/png@0.16.13
│  ├─ @jimp/tiff@0.16.13
│  ├─ @jimp/types@0.16.13
│  ├─ @jimp/utils@0.16.13
│  ├─ @jridgewell/gen-mapping@0.3.5
│  │  ├─ URL: https://github.com/jridgewell/gen-mapping
│  │  └─ VendorName: Justin Ridgewell
│  ├─ @jridgewell/resolve-uri@3.1.2
│  │  ├─ URL: https://github.com/jridgewell/resolve-uri
│  │  └─ VendorName: Justin Ridgewell
│  ├─ @jridgewell/set-array@1.2.1
│  │  ├─ URL: https://github.com/jridgewell/set-array
│  │  └─ VendorName: Justin Ridgewell
│  ├─ @jridgewell/source-map@0.3.6
│  │  ├─ URL: https://github.com/jridgewell/source-map
│  │  └─ VendorName: Justin Ridgewell
│  ├─ @jridgewell/sourcemap-codec@1.4.15
│  │  ├─ URL: git+https://github.com/jridgewell/sourcemap-codec.git
│  │  └─ VendorName: Rich Harris
│  ├─ @jridgewell/trace-mapping@0.3.25
│  │  ├─ URL: git+https://github.com/jridgewell/trace-mapping.git
│  │  └─ VendorName: Justin Ridgewell
│  ├─ @motionone/animation@10.18.0
│  │  └─ VendorName: Matt Perry
│  ├─ @motionone/dom@10.12.0
│  │  └─ VendorName: Matt Perry
│  ├─ @motionone/easing@10.18.0
│  │  └─ VendorName: Matt Perry
│  ├─ @motionone/generators@10.18.0
│  │  └─ VendorName: Matt Perry
│  ├─ @motionone/types@10.17.1
│  │  └─ VendorName: Matt Perry
│  ├─ @motionone/utils@10.18.0
│  │  └─ VendorName: Matt Perry
│  ├─ @nodelib/fs.scandir@2.1.5
│  │  └─ URL: https://github.com/nodelib/nodelib/tree/master/packages/fs/fs.scandir
│  ├─ @nodelib/fs.stat@2.0.5
│  │  └─ URL: https://github.com/nodelib/nodelib/tree/master/packages/fs/fs.stat
│  ├─ @nodelib/fs.walk@1.2.8
│  │  └─ URL: https://github.com/nodelib/nodelib/tree/master/packages/fs/fs.walk
│  ├─ @pkgjs/parseargs@0.11.0
│  │  ├─ URL: git@github.com:pkgjs/parseargs.git
│  │  └─ VendorUrl: https://github.com/pkgjs/parseargs#readme
│  ├─ @radix-ui/number@1.1.0
│  │  ├─ URL: git+https://github.com/radix-ui/primitives.git
│  │  └─ VendorUrl: https://radix-ui.com/primitives
│  ├─ @radix-ui/primitive@1.1.0
│  │  ├─ URL: git+https://github.com/radix-ui/primitives.git
│  │  └─ VendorUrl: https://radix-ui.com/primitives
│  ├─ @radix-ui/react-arrow@1.1.0
│  │  ├─ URL: git+https://github.com/radix-ui/primitives.git
│  │  └─ VendorUrl: https://radix-ui.com/primitives
│  ├─ @radix-ui/react-collection@1.1.0
│  │  ├─ URL: git+https://github.com/radix-ui/primitives.git
│  │  └─ VendorUrl: https://radix-ui.com/primitives
│  ├─ @radix-ui/react-compose-refs@1.0.0
│  │  ├─ URL: git+https://github.com/radix-ui/primitives.git
│  │  └─ VendorUrl: https://radix-ui.com/primitives
│  ├─ @radix-ui/react-compose-refs@1.1.0
│  │  ├─ URL: git+https://github.com/radix-ui/primitives.git
│  │  └─ VendorUrl: https://radix-ui.com/primitives
│  ├─ @radix-ui/react-context@1.1.0
│  │  ├─ URL: git+https://github.com/radix-ui/primitives.git
│  │  └─ VendorUrl: https://radix-ui.com/primitives
│  ├─ @radix-ui/react-dialog@1.1.1
│  │  ├─ URL: git+https://github.com/radix-ui/primitives.git
│  │  └─ VendorUrl: https://radix-ui.com/primitives
│  ├─ @radix-ui/react-direction@1.1.0
│  │  ├─ URL: git+https://github.com/radix-ui/primitives.git
│  │  └─ VendorUrl: https://radix-ui.com/primitives
│  ├─ @radix-ui/react-dismissable-layer@1.1.0
│  │  ├─ URL: git+https://github.com/radix-ui/primitives.git
│  │  └─ VendorUrl: https://radix-ui.com/primitives
│  ├─ @radix-ui/react-dropdown-menu@2.1.1
│  │  ├─ URL: git+https://github.com/radix-ui/primitives.git
│  │  └─ VendorUrl: https://radix-ui.com/primitives
│  ├─ @radix-ui/react-focus-guards@1.1.0
│  │  ├─ URL: git+https://github.com/radix-ui/primitives.git
│  │  └─ VendorUrl: https://radix-ui.com/primitives
│  ├─ @radix-ui/react-focus-scope@1.1.0
│  │  ├─ URL: git+https://github.com/radix-ui/primitives.git
│  │  └─ VendorUrl: https://radix-ui.com/primitives
│  ├─ @radix-ui/react-id@1.1.0
│  │  ├─ URL: git+https://github.com/radix-ui/primitives.git
│  │  └─ VendorUrl: https://radix-ui.com/primitives
│  ├─ @radix-ui/react-label@2.1.0
│  │  ├─ URL: git+https://github.com/radix-ui/primitives.git
│  │  └─ VendorUrl: https://radix-ui.com/primitives
│  ├─ @radix-ui/react-menu@2.1.1
│  │  ├─ URL: git+https://github.com/radix-ui/primitives.git
│  │  └─ VendorUrl: https://radix-ui.com/primitives
│  ├─ @radix-ui/react-navigation-menu@1.2.0
│  │  ├─ URL: git+https://github.com/radix-ui/primitives.git
│  │  └─ VendorUrl: https://radix-ui.com/primitives
│  ├─ @radix-ui/react-popper@1.2.0
│  │  ├─ URL: git+https://github.com/radix-ui/primitives.git
│  │  └─ VendorUrl: https://radix-ui.com/primitives
│  ├─ @radix-ui/react-portal@1.1.1
│  │  ├─ URL: git+https://github.com/radix-ui/primitives.git
│  │  └─ VendorUrl: https://radix-ui.com/primitives
│  ├─ @radix-ui/react-presence@1.1.0
│  │  ├─ URL: git+https://github.com/radix-ui/primitives.git
│  │  └─ VendorUrl: https://radix-ui.com/primitives
│  ├─ @radix-ui/react-primitive@2.0.0
│  │  ├─ URL: git+https://github.com/radix-ui/primitives.git
│  │  └─ VendorUrl: https://radix-ui.com/primitives
│  ├─ @radix-ui/react-progress@1.1.0
│  │  ├─ URL: git+https://github.com/radix-ui/primitives.git
│  │  └─ VendorUrl: https://radix-ui.com/primitives
│  ├─ @radix-ui/react-roving-focus@1.1.0
│  │  ├─ URL: git+https://github.com/radix-ui/primitives.git
│  │  └─ VendorUrl: https://radix-ui.com/primitives
│  ├─ @radix-ui/react-select@2.1.1
│  │  ├─ URL: git+https://github.com/radix-ui/primitives.git
│  │  └─ VendorUrl: https://radix-ui.com/primitives
│  ├─ @radix-ui/react-slot@1.0.1
│  │  ├─ URL: git+https://github.com/radix-ui/primitives.git
│  │  └─ VendorUrl: https://radix-ui.com/primitives
│  ├─ @radix-ui/react-slot@1.1.0
│  │  ├─ URL: git+https://github.com/radix-ui/primitives.git
│  │  └─ VendorUrl: https://radix-ui.com/primitives
│  ├─ @radix-ui/react-switch@1.1.0
│  │  ├─ URL: git+https://github.com/radix-ui/primitives.git
│  │  └─ VendorUrl: https://radix-ui.com/primitives
│  ├─ @radix-ui/react-tabs@1.1.0
│  │  ├─ URL: git+https://github.com/radix-ui/primitives.git
│  │  └─ VendorUrl: https://radix-ui.com/primitives
│  ├─ @radix-ui/react-use-callback-ref@1.1.0
│  │  ├─ URL: git+https://github.com/radix-ui/primitives.git
│  │  └─ VendorUrl: https://radix-ui.com/primitives
│  ├─ @radix-ui/react-use-controllable-state@1.1.0
│  │  ├─ URL: git+https://github.com/radix-ui/primitives.git
│  │  └─ VendorUrl: https://radix-ui.com/primitives
│  ├─ @radix-ui/react-use-escape-keydown@1.1.0
│  │  ├─ URL: git+https://github.com/radix-ui/primitives.git
│  │  └─ VendorUrl: https://radix-ui.com/primitives
│  ├─ @radix-ui/react-use-layout-effect@1.1.0
│  │  ├─ URL: git+https://github.com/radix-ui/primitives.git
│  │  └─ VendorUrl: https://radix-ui.com/primitives
│  ├─ @radix-ui/react-use-previous@1.1.0
│  │  ├─ URL: git+https://github.com/radix-ui/primitives.git
│  │  └─ VendorUrl: https://radix-ui.com/primitives
│  ├─ @radix-ui/react-use-rect@1.1.0
│  │  ├─ URL: git+https://github.com/radix-ui/primitives.git
│  │  └─ VendorUrl: https://radix-ui.com/primitives
│  ├─ @radix-ui/react-use-size@1.1.0
│  │  ├─ URL: git+https://github.com/radix-ui/primitives.git
│  │  └─ VendorUrl: https://radix-ui.com/primitives
│  ├─ @radix-ui/react-visually-hidden@1.1.0
│  │  ├─ URL: git+https://github.com/radix-ui/primitives.git
│  │  └─ VendorUrl: https://radix-ui.com/primitives
│  ├─ @radix-ui/rect@1.1.0
│  │  ├─ URL: git+https://github.com/radix-ui/primitives.git
│  │  └─ VendorUrl: https://radix-ui.com/primitives
│  ├─ @react-native-async-storage/async-storage@1.23.1
│  │  ├─ URL: https://github.com/react-native-async-storage/async-storage.git
│  │  ├─ VendorName: Krzysztof Borowy
│  │  └─ VendorUrl: https://github.com/react-native-async-storage/async-storage#readme
│  ├─ @react-native-community/cli-clean@13.6.9
│  │  ├─ URL: https://github.com/react-native-community/cli.git
│  │  └─ VendorUrl: https://github.com/react-native-community/cli/tree/main/packages/cli-clean
│  ├─ @react-native-community/cli-config@13.6.9
│  │  ├─ URL: https://github.com/react-native-community/cli.git
│  │  └─ VendorUrl: https://github.com/react-native-community/cli/tree/main/packages/cli-config
│  ├─ @react-native-community/cli-debugger-ui@13.6.9
│  │  ├─ URL: https://github.com/react-native-community/cli.git
│  │  └─ VendorUrl: https://github.com/react-native-community/cli/tree/main/packages/cli-debugger-ui
│  ├─ @react-native-community/cli-doctor@13.6.9
│  │  ├─ URL: https://github.com/react-native-community/cli.git
│  │  └─ VendorUrl: https://github.com/react-native-community/cli/tree/main/packages/cli-doctor
│  ├─ @react-native-community/cli-hermes@13.6.9
│  │  ├─ URL: https://github.com/react-native-community/cli.git
│  │  └─ VendorUrl: https://github.com/react-native-community/cli/tree/main/packages/cli-hermes
│  ├─ @react-native-community/cli-platform-android@13.6.9
│  │  ├─ URL: https://github.com/react-native-community/cli.git
│  │  └─ VendorUrl: https://github.com/react-native-community/cli/tree/main/packages/cli-platform-android
│  ├─ @react-native-community/cli-platform-apple@13.6.9
│  │  ├─ URL: https://github.com/react-native-community/cli.git
│  │  └─ VendorUrl: https://github.com/react-native-community/cli/tree/main/packages/cli-platform-apple
│  ├─ @react-native-community/cli-platform-ios@13.6.9
│  │  ├─ URL: https://github.com/react-native-community/cli.git
│  │  └─ VendorUrl: https://github.com/react-native-community/cli/tree/main/packages/cli-platform-ios
│  ├─ @react-native-community/cli-server-api@13.6.9
│  │  ├─ URL: https://github.com/react-native-community/cli.git
│  │  └─ VendorUrl: https://github.com/react-native-community/cli/tree/main/packages/cli-server-api
│  ├─ @react-native-community/cli-tools@13.6.9
│  │  ├─ URL: https://github.com/react-native-community/cli.git
│  │  └─ VendorUrl: https://github.com/react-native-community/cli/tree/main/packages/cli-tools
│  ├─ @react-native-community/cli-types@13.6.9
│  │  ├─ URL: https://github.com/react-native-community/cli.git
│  │  └─ VendorUrl: https://github.com/react-native-community/cli/tree/main/packages/cli-types
│  ├─ @react-native-community/cli@13.6.9
│  │  ├─ URL: https://github.com/react-native-community/cli.git
│  │  └─ VendorUrl: https://github.com/react-native-community/cli/tree/main/packages/cli
│  ├─ @react-native-cookies/cookies@6.2.1
│  │  ├─ URL: git+https://github.com/react-native-cookies/cookies.git
│  │  ├─ VendorName: Jason Safaiyeh
│  │  └─ VendorUrl: https://github.com/react-native-cookies/cookies#readme
│  ├─ @react-native/assets-registry@0.74.85
│  │  ├─ URL: https://github.com/facebook/react-native.git
│  │  └─ VendorUrl: https://github.com/facebook/react-native/tree/HEAD/packages/assets#readme
│  ├─ @react-native/babel-plugin-codegen@0.74.85
│  │  ├─ URL: https://github.com/facebook/react-native.git
│  │  └─ VendorUrl: https://github.com/facebook/react-native/tree/HEAD/packages/babel-plugin-codegen#readme
│  ├─ @react-native/babel-preset@0.74.85
│  │  └─ URL: git@github.com:facebook/react-native.git
│  ├─ @react-native/codegen@0.74.85
│  │  ├─ URL: https://github.com/facebook/react-native.git
│  │  └─ VendorUrl: https://github.com/facebook/react-native/tree/HEAD/packages/react-native-codegen#readme
│  ├─ @react-native/community-cli-plugin@0.74.85
│  │  ├─ URL: https://github.com/facebook/react-native.git
│  │  └─ VendorUrl: https://github.com/facebook/react-native/tree/HEAD/packages/community-cli-plugin#readme
│  ├─ @react-native/dev-middleware@0.74.85
│  │  ├─ URL: https://github.com/facebook/react-native.git
│  │  └─ VendorUrl: https://github.com/facebook/react-native/tree/HEAD/packages/dev-middleware#readme
│  ├─ @react-native/gradle-plugin@0.74.85
│  │  ├─ URL: https://github.com/facebook/react-native.git
│  │  └─ VendorUrl: https://github.com/facebook/react-native/tree/HEAD/packages/react-native-gradle-plugin#readme
│  ├─ @react-native/js-polyfills@0.74.85
│  │  ├─ URL: https://github.com/facebook/react-native.git
│  │  └─ VendorUrl: https://github.com/facebook/react-native/tree/HEAD/packages/polyfills#readme
│  ├─ @react-native/metro-babel-transformer@0.74.85
│  │  └─ URL: git@github.com:facebook/react-native.git
│  ├─ @react-native/normalize-colors@0.74.84
│  │  ├─ URL: https://github.com/facebook/react-native.git
│  │  └─ VendorUrl: https://github.com/facebook/react-native/tree/HEAD/packages/normalize-color#readme
│  ├─ @react-native/normalize-colors@0.74.85
│  │  ├─ URL: https://github.com/facebook/react-native.git
│  │  └─ VendorUrl: https://github.com/facebook/react-native/tree/HEAD/packages/normalize-color#readme
│  ├─ @react-native/virtualized-lists@0.74.85
│  │  ├─ URL: https://github.com/facebook/react-native.git
│  │  └─ VendorUrl: https://github.com/facebook/react-native/tree/HEAD/packages/virtualized-lists#readme
│  ├─ @react-navigation/bottom-tabs@6.5.20
│  │  └─ URL: https://github.com/react-navigation/react-navigation.git
│  ├─ @react-navigation/core@6.4.16
│  │  ├─ URL: https://github.com/react-navigation/react-navigation.git
│  │  └─ VendorUrl: https://reactnavigation.org/
│  ├─ @react-navigation/elements@1.3.30
│  │  ├─ URL: https://github.com/react-navigation/react-navigation.git
│  │  └─ VendorUrl: https://reactnavigation.org/
│  ├─ @react-navigation/material-top-tabs@6.6.13
│  │  ├─ URL: https://github.com/react-navigation/react-navigation.git
│  │  └─ VendorUrl: https://reactnavigation.org/docs/material-top-tab-navigator/
│  ├─ @react-navigation/native-stack@6.9.26
│  │  ├─ URL: https://github.com/react-navigation/react-navigation.git
│  │  └─ VendorUrl: https://github.com/software-mansion/react-native-screens#readme
│  ├─ @react-navigation/native@6.1.17
│  │  ├─ URL: https://github.com/react-navigation/react-navigation.git
│  │  └─ VendorUrl: https://reactnavigation.org/
│  ├─ @react-navigation/routers@6.1.9
│  │  ├─ URL: https://github.com/react-navigation/react-navigation.git
│  │  └─ VendorUrl: https://reactnavigation.org/docs/custom-routers/
│  ├─ @remix-run/node@2.10.2
│  │  └─ URL: https://github.com/remix-run/remix
│  ├─ @remix-run/router@1.17.1
│  │  ├─ URL: https://github.com/remix-run/react-router
│  │  └─ VendorName: Remix Software
│  ├─ @remix-run/server-runtime@2.10.2
│  │  └─ URL: https://github.com/remix-run/remix
│  ├─ @remix-run/web-blob@3.1.0
│  │  ├─ URL: https://github.com/remix-run/web-std-io
│  │  ├─ VendorName: Irakli Gozalishvili
│  │  └─ VendorUrl: https://gozala.io
│  ├─ @remix-run/web-fetch@4.4.2
│  │  ├─ URL: https://github.com/remix-run/web-std-io.git
│  │  ├─ VendorName: David Frank
│  │  └─ VendorUrl: https://github.com/remix-run/web-std-io
│  ├─ @remix-run/web-file@3.1.0
│  │  ├─ URL: https://github.com/remix-run/web-std-io
│  │  ├─ VendorName: Irakli Gozalishvili
│  │  └─ VendorUrl: https://gozala.io
│  ├─ @remix-run/web-form-data@3.1.0
│  │  ├─ URL: https://github.com/remix-run/web-std-io
│  │  ├─ VendorName: Irakli Gozalishvili
│  │  └─ VendorUrl: https://gozala.io
│  ├─ @remix-run/web-stream@1.1.0
│  │  ├─ URL: https://github.com/remix-run/web-std-io
│  │  ├─ VendorName: Irakli Gozalishvili
│  │  └─ VendorUrl: https://gozala.io
│  ├─ @rn-primitives/avatar@1.0.3
│  ├─ @rn-primitives/dialog@1.0.3
│  ├─ @rn-primitives/dropdown-menu@1.0.3
│  ├─ @rn-primitives/hooks@1.0.3
│  ├─ @rn-primitives/label@1.0.3
│  ├─ @rn-primitives/navigation-menu@1.0.3
│  ├─ @rn-primitives/portal@1.0.3
│  ├─ @rn-primitives/progress@1.0.3
│  ├─ @rn-primitives/select@1.0.3
│  ├─ @rn-primitives/slot@1.0.3
│  ├─ @rn-primitives/switch@1.0.3
│  ├─ @rn-primitives/tabs@1.0.3
│  ├─ @rn-primitives/types@1.0.3
│  ├─ @rn-primitives/utils@1.0.3
│  ├─ @segment/loosely-validate-event@2.0.0
│  ├─ @sinclair/typebox@0.27.8
│  │  ├─ URL: https://github.com/sinclairzx81/typebox
│  │  └─ VendorName: sinclairzx81
│  ├─ @tokenizer/token@0.3.0
│  │  ├─ URL: https://github.com/Borewit/tokenizer-token.git
│  │  ├─ VendorName: Borewit
│  │  └─ VendorUrl: https://github.com/Borewit
│  ├─ @tootallnate/once@2.0.0
│  │  ├─ URL: git://github.com/TooTallNate/once.git
│  │  ├─ VendorName: Nathan Rajlich
│  │  └─ VendorUrl: http://n8.io/
│  ├─ @types/babel__core@7.20.5
│  │  ├─ URL: https://github.com/DefinitelyTyped/DefinitelyTyped.git
│  │  └─ VendorUrl: https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/babel__core
│  ├─ @types/babel__generator@7.6.8
│  │  ├─ URL: https://github.com/DefinitelyTyped/DefinitelyTyped.git
│  │  └─ VendorUrl: https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/babel__generator
│  ├─ @types/babel__template@7.4.4
│  │  ├─ URL: https://github.com/DefinitelyTyped/DefinitelyTyped.git
│  │  └─ VendorUrl: https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/babel__template
│  ├─ @types/babel__traverse@7.20.6
│  │  ├─ URL: https://github.com/DefinitelyTyped/DefinitelyTyped.git
│  │  └─ VendorUrl: https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/babel__traverse
│  ├─ @types/cookie@0.6.0
│  │  ├─ URL: https://github.com/DefinitelyTyped/DefinitelyTyped.git
│  │  └─ VendorUrl: https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/cookie
│  ├─ @types/graceful-fs@4.1.9
│  │  ├─ URL: https://github.com/DefinitelyTyped/DefinitelyTyped.git
│  │  └─ VendorUrl: https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/graceful-fs
│  ├─ @types/hammerjs@2.0.45
│  │  ├─ URL: https://github.com/DefinitelyTyped/DefinitelyTyped.git
│  │  └─ VendorUrl: https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/hammerjs
│  ├─ @types/istanbul-lib-coverage@2.0.6
│  │  ├─ URL: https://github.com/DefinitelyTyped/DefinitelyTyped.git
│  │  └─ VendorUrl: https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/istanbul-lib-coverage
│  ├─ @types/istanbul-lib-report@3.0.3
│  │  ├─ URL: https://github.com/DefinitelyTyped/DefinitelyTyped.git
│  │  └─ VendorUrl: https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/istanbul-lib-report
│  ├─ @types/istanbul-reports@1.1.2
│  │  └─ URL: https://github.com/DefinitelyTyped/DefinitelyTyped.git
│  ├─ @types/istanbul-reports@3.0.4
│  │  ├─ URL: https://github.com/DefinitelyTyped/DefinitelyTyped.git
│  │  └─ VendorUrl: https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/istanbul-reports
│  ├─ @types/jest@29.5.12
│  │  ├─ URL: https://github.com/DefinitelyTyped/DefinitelyTyped.git
│  │  └─ VendorUrl: https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/jest
│  ├─ @types/jsdom@20.0.1
│  │  ├─ URL: https://github.com/DefinitelyTyped/DefinitelyTyped.git
│  │  └─ VendorUrl: https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/jsdom
│  ├─ @types/json-schema@7.0.15
│  │  ├─ URL: https://github.com/DefinitelyTyped/DefinitelyTyped.git
│  │  └─ VendorUrl: https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/json-schema
│  ├─ @types/lodash@4.17.6
│  │  ├─ URL: https://github.com/DefinitelyTyped/DefinitelyTyped.git
│  │  └─ VendorUrl: https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/lodash
│  ├─ @types/md5@2.3.5
│  │  ├─ URL: https://github.com/DefinitelyTyped/DefinitelyTyped.git
│  │  └─ VendorUrl: https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/md5
│  ├─ @types/node-forge@1.3.11
│  │  ├─ URL: https://github.com/DefinitelyTyped/DefinitelyTyped.git
│  │  └─ VendorUrl: https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/node-forge
│  ├─ @types/node@10.17.60
│  │  └─ URL: https://github.com/DefinitelyTyped/DefinitelyTyped.git
│  ├─ @types/node@16.9.1
│  │  ├─ URL: https://github.com/DefinitelyTyped/DefinitelyTyped.git
│  │  └─ VendorUrl: https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/node
│  ├─ @types/node@18.19.39
│  │  ├─ URL: https://github.com/DefinitelyTyped/DefinitelyTyped.git
│  │  └─ VendorUrl: https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/node
│  ├─ @types/node@20.14.10
│  │  ├─ URL: https://github.com/DefinitelyTyped/DefinitelyTyped.git
│  │  └─ VendorUrl: https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/node
│  ├─ @types/prop-types@15.7.12
│  │  ├─ URL: https://github.com/DefinitelyTyped/DefinitelyTyped.git
│  │  └─ VendorUrl: https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/prop-types
│  ├─ @types/react-test-renderer@18.3.0
│  │  ├─ URL: https://github.com/DefinitelyTyped/DefinitelyTyped.git
│  │  └─ VendorUrl: https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/react-test-renderer
│  ├─ @types/react@18.2.79
│  │  ├─ URL: https://github.com/DefinitelyTyped/DefinitelyTyped.git
│  │  └─ VendorUrl: https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/react
│  ├─ @types/react@18.3.3
│  │  ├─ URL: https://github.com/DefinitelyTyped/DefinitelyTyped.git
│  │  └─ VendorUrl: https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/react
│  ├─ @types/set-cookie-parser@2.4.10
│  │  ├─ URL: https://github.com/DefinitelyTyped/DefinitelyTyped.git
│  │  └─ VendorUrl: https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/set-cookie-parser
│  ├─ @types/stack-utils@2.0.3
│  │  ├─ URL: https://github.com/DefinitelyTyped/DefinitelyTyped.git
│  │  └─ VendorUrl: https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/stack-utils
│  ├─ @types/tough-cookie@4.0.5
│  │  ├─ URL: https://github.com/DefinitelyTyped/DefinitelyTyped.git
│  │  └─ VendorUrl: https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/tough-cookie
│  ├─ @types/yargs-parser@21.0.3
│  │  ├─ URL: https://github.com/DefinitelyTyped/DefinitelyTyped.git
│  │  └─ VendorUrl: https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/yargs-parser
│  ├─ @types/yargs@13.0.12
│  │  ├─ URL: https://github.com/DefinitelyTyped/DefinitelyTyped.git
│  │  └─ VendorUrl: https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/yargs
│  ├─ @types/yargs@15.0.19
│  │  ├─ URL: https://github.com/DefinitelyTyped/DefinitelyTyped.git
│  │  └─ VendorUrl: https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/yargs
│  ├─ @types/yargs@17.0.32
│  │  ├─ URL: https://github.com/DefinitelyTyped/DefinitelyTyped.git
│  │  └─ VendorUrl: https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/yargs
│  ├─ @urql/core@2.3.6
│  │  ├─ URL: https://github.com/FormidableLabs/urql.git
│  │  └─ VendorUrl: https://formidable.com/open-source/urql/docs/
│  ├─ @urql/core@5.0.4
│  │  ├─ URL: https://github.com/urql-graphql/urql.git
│  │  ├─ VendorName: urql GraphQL Contributors
│  │  └─ VendorUrl: https://formidable.com/open-source/urql/docs/
│  ├─ @urql/exchange-retry@0.3.0
│  │  ├─ URL: https://github.com/FormidableLabs/urql.git
│  │  └─ VendorUrl: https://formidable.com/open-source/urql/docs/
│  ├─ @xmldom/xmldom@0.7.13
│  │  ├─ URL: git://github.com/xmldom/xmldom.git
│  │  └─ VendorUrl: https://github.com/xmldom/xmldom
│  ├─ @xmldom/xmldom@0.8.10
│  │  ├─ URL: git://github.com/xmldom/xmldom.git
│  │  └─ VendorUrl: https://github.com/xmldom/xmldom
│  ├─ abort-controller@3.0.0
│  │  ├─ URL: git+https://github.com/mysticatea/abort-controller.git
│  │  ├─ VendorName: Toru Nagashima
│  │  └─ VendorUrl: https://github.com/mysticatea/abort-controller#readme
│  ├─ accepts@1.3.8
│  │  └─ URL: https://github.com/jshttp/accepts.git
│  ├─ acorn-globals@7.0.1
│  │  ├─ URL: https://github.com/ForbesLindesay/acorn-globals.git
│  │  └─ VendorName: ForbesLindesay
│  ├─ acorn-walk@8.3.3
│  │  ├─ URL: https://github.com/acornjs/acorn.git
│  │  └─ VendorUrl: https://github.com/acornjs/acorn
│  ├─ acorn@8.12.1
│  │  ├─ URL: git+https://github.com/acornjs/acorn.git
│  │  └─ VendorUrl: https://github.com/acornjs/acorn
│  ├─ agent-base@6.0.2
│  │  ├─ URL: git://github.com/TooTallNate/node-agent-base.git
│  │  ├─ VendorName: Nathan Rajlich
│  │  └─ VendorUrl: http://n8.io/
│  ├─ aggregate-error@3.1.0
│  │  ├─ URL: https://github.com/sindresorhus/aggregate-error.git
│  │  ├─ VendorName: Sindre Sorhus
│  │  └─ VendorUrl: sindresorhus.com
│  ├─ ajv-formats@2.1.1
│  │  ├─ URL: git+https://github.com/ajv-validator/ajv-formats.git
│  │  ├─ VendorName: Evgeny Poberezkin
│  │  └─ VendorUrl: https://github.com/ajv-validator/ajv-formats#readme
│  ├─ ajv-keywords@5.1.0
│  │  ├─ URL: git+https://github.com/epoberezkin/ajv-keywords.git
│  │  ├─ VendorName: Evgeny Poberezkin
│  │  └─ VendorUrl: https://github.com/epoberezkin/ajv-keywords#readme
│  ├─ ajv@8.11.0
│  │  ├─ URL: https://github.com/ajv-validator/ajv.git
│  │  ├─ VendorName: Evgeny Poberezkin
│  │  └─ VendorUrl: https://ajv.js.org/
│  ├─ ajv@8.16.0
│  │  ├─ URL: https://github.com/ajv-validator/ajv.git
│  │  ├─ VendorName: Evgeny Poberezkin
│  │  └─ VendorUrl: https://ajv.js.org/
│  ├─ ajv@8.17.1
│  │  ├─ URL: https://github.com/ajv-validator/ajv.git
│  │  ├─ VendorName: Evgeny Poberezkin
│  │  └─ VendorUrl: https://ajv.js.org/
│  ├─ anser@1.4.10
│  │  ├─ URL: git://github.com/IonicaBizau/anser.git
│  │  ├─ VendorName: Ionică Bizău
│  │  └─ VendorUrl: https://github.com/IonicaBizau/anser#readme
│  ├─ ansi-escapes@4.3.2
│  │  ├─ URL: https://github.com/sindresorhus/ansi-escapes.git
│  │  ├─ VendorName: Sindre Sorhus
│  │  └─ VendorUrl: https://sindresorhus.com
│  ├─ ansi-escapes@6.2.1
│  │  ├─ URL: https://github.com/sindresorhus/ansi-escapes.git
│  │  ├─ VendorName: Sindre Sorhus
│  │  └─ VendorUrl: https://sindresorhus.com
│  ├─ ansi-fragments@0.2.1
│  │  ├─ URL: https://github.com/zamotany/ansi-fragments.git
│  │  ├─ VendorName: Paweł Trysła
│  │  └─ VendorUrl: https://github.com/zamotany/ansi-fragments
│  ├─ ansi-regex@4.1.1
│  │  ├─ URL: https://github.com/chalk/ansi-regex.git
│  │  ├─ VendorName: Sindre Sorhus
│  │  └─ VendorUrl: sindresorhus.com
│  ├─ ansi-regex@5.0.1
│  │  ├─ URL: https://github.com/chalk/ansi-regex.git
│  │  ├─ VendorName: Sindre Sorhus
│  │  └─ VendorUrl: sindresorhus.com
│  ├─ ansi-regex@6.0.1
│  │  ├─ URL: https://github.com/chalk/ansi-regex.git
│  │  ├─ VendorName: Sindre Sorhus
│  │  └─ VendorUrl: https://sindresorhus.com
│  ├─ ansi-styles@3.2.1
│  │  ├─ URL: https://github.com/chalk/ansi-styles.git
│  │  ├─ VendorName: Sindre Sorhus
│  │  └─ VendorUrl: sindresorhus.com
│  ├─ ansi-styles@4.3.0
│  │  ├─ URL: https://github.com/chalk/ansi-styles.git
│  │  ├─ VendorName: Sindre Sorhus
│  │  └─ VendorUrl: sindresorhus.com
│  ├─ ansi-styles@5.2.0
│  │  ├─ URL: https://github.com/chalk/ansi-styles.git
│  │  ├─ VendorName: Sindre Sorhus
│  │  └─ VendorUrl: https://sindresorhus.com
│  ├─ ansi-styles@6.2.1
│  │  ├─ URL: https://github.com/chalk/ansi-styles.git
│  │  ├─ VendorName: Sindre Sorhus
│  │  └─ VendorUrl: https://sindresorhus.com
│  ├─ any-base@1.1.0
│  │  ├─ URL: https://github.com/HarasimowiczKamil/any-base.git
│  │  └─ VendorName: Kamil Harasimowicz
│  ├─ any-promise@1.3.0
│  │  ├─ URL: https://github.com/kevinbeaty/any-promise
│  │  ├─ VendorName: Kevin Beaty
│  │  └─ VendorUrl: http://github.com/kevinbeaty/any-promise
│  ├─ appdirsjs@1.2.7
│  │  └─ URL: https://github.com/codingjerk/appdirsjs.git
│  ├─ application-config-path@0.1.1
│  │  ├─ URL: http://github.com/LinusU/node-application-config-path.git
│  │  └─ VendorName: Linus Unnebäck
│  ├─ arg@5.0.2
│  │  ├─ URL: https://github.com/vercel/arg.git
│  │  └─ VendorName: Josh Junon
│  ├─ argparse@1.0.10
│  │  └─ URL: https://github.com/nodeca/argparse.git
│  ├─ aria-hidden@1.2.4
│  │  ├─ URL: git+https://github.com/theKashey/aria-hidden.git
│  │  ├─ VendorName: Anton Korzunov
│  │  └─ VendorUrl: https://github.com/theKashey/aria-hidden#readme
│  ├─ array-buffer-byte-length@1.0.1
│  │  ├─ URL: git+https://github.com/inspect-js/array-buffer-byte-length.git
│  │  ├─ VendorName: Jordan Harband
│  │  └─ VendorUrl: https://github.com/inspect-js/array-buffer-byte-length#readme
│  ├─ array-union@2.1.0
│  │  ├─ URL: https://github.com/sindresorhus/array-union.git
│  │  ├─ VendorName: Sindre Sorhus
│  │  └─ VendorUrl: sindresorhus.com
│  ├─ arraybuffer.prototype.slice@1.0.3
│  │  ├─ URL: git+https://github.com/es-shims/ArrayBuffer.prototype.slice.git
│  │  ├─ VendorName: Jordan Harband
│  │  └─ VendorUrl: https://github.com/es-shims/ArrayBuffer.prototype.slice#readme
│  ├─ asap@2.0.6
│  │  └─ URL: https://github.com/kriskowal/asap.git
│  ├─ ast-types@0.15.2
│  │  ├─ URL: git://github.com/benjamn/ast-types.git
│  │  ├─ VendorName: Ben Newman
│  │  └─ VendorUrl: http://github.com/benjamn/ast-types
│  ├─ astral-regex@1.0.0
│  │  ├─ URL: https://github.com/kevva/astral-regex.git
│  │  ├─ VendorName: Kevin Mårtensson
│  │  └─ VendorUrl: github.com/kevva
│  ├─ async-limiter@1.0.1
│  │  ├─ URL: https://github.com/strml/async-limiter.git
│  │  └─ VendorName: Samuel Reed
│  ├─ asynckit@0.4.0
│  │  ├─ URL: git+https://github.com/alexindigo/asynckit.git
│  │  ├─ VendorName: Alex Indigo
│  │  └─ VendorUrl: https://github.com/alexindigo/asynckit#readme
│  ├─ available-typed-arrays@1.0.7
│  │  ├─ URL: git+https://github.com/inspect-js/available-typed-arrays.git
│  │  ├─ VendorName: Jordan Harband
│  │  └─ VendorUrl: https://github.com/inspect-js/available-typed-arrays#readme
│  ├─ babel-core@7.0.0-bridge.0
│  │  └─ VendorName: Logan Smyth
│  ├─ babel-jest@29.7.0
│  │  └─ URL: https://github.com/jestjs/jest.git
│  ├─ babel-plugin-inline-import@3.0.0
│  │  ├─ URL: https://github.com/Quadric/babel-plugin-inline-import.git
│  │  ├─ VendorName: Victor Duarte
│  │  └─ VendorUrl: Quadric ApS
│  ├─ babel-plugin-jest-hoist@29.6.3
│  │  └─ URL: https://github.com/jestjs/jest.git
│  ├─ babel-plugin-polyfill-corejs2@0.4.11
│  │  └─ URL: https://github.com/babel/babel-polyfills.git
│  ├─ babel-plugin-polyfill-corejs3@0.10.4
│  │  └─ URL: https://github.com/babel/babel-polyfills.git
│  ├─ babel-plugin-polyfill-regenerator@0.6.2
│  │  └─ URL: https://github.com/babel/babel-polyfills.git
│  ├─ babel-plugin-react-compiler@0.0.0-experimental-696af53-20240625
│  ├─ babel-plugin-react-native-web@0.19.12
│  │  ├─ URL: git://github.com/necolas/react-native-web.git
│  │  └─ VendorName: Nicolas Gallagher
│  ├─ babel-plugin-tester@11.0.4
│  │  ├─ URL: https://github.com/babel-utils/babel-plugin-tester
│  │  ├─ VendorName: Kent C. Dodds
│  │  └─ VendorUrl: https://github.com/babel-utils/babel-plugin-tester#readme
│  ├─ babel-plugin-transform-flow-enums@0.0.2
│  │  └─ URL: git+https://github.com/facebook/flow.git
│  ├─ babel-preset-current-node-syntax@1.0.1
│  │  ├─ URL: https://github.com/nicolo-ribaudo/babel-preset-current-node-syntax.git
│  │  ├─ VendorName: Nicolò Ribaudo
│  │  └─ VendorUrl: https://github.com/nicolo-ribaudo
│  ├─ babel-preset-expo@11.0.12
│  │  ├─ URL: git+https://github.com/expo/expo.git
│  │  ├─ VendorName: Expo
│  │  └─ VendorUrl: https://github.com/expo/expo/tree/main/packages/babel-preset-expo#readme
│  ├─ babel-preset-jest@29.6.3
│  │  └─ URL: https://github.com/jestjs/jest.git
│  ├─ balanced-match@1.0.2
│  │  ├─ URL: git://github.com/juliangruber/balanced-match.git
│  │  ├─ VendorName: Julian Gruber
│  │  └─ VendorUrl: https://github.com/juliangruber/balanced-match
│  ├─ base64-js@1.5.1
│  │  ├─ URL: git://github.com/beatgammit/base64-js.git
│  │  ├─ VendorName: T. Jameson Little
│  │  └─ VendorUrl: https://github.com/beatgammit/base64-js
│  ├─ better-opn@3.0.2
│  │  ├─ URL: https://github.com/ExiaSR/better-opn
│  │  └─ VendorName: Michael Lin
│  ├─ binary-extensions@2.3.0
│  │  ├─ URL: https://github.com/sindresorhus/binary-extensions.git
│  │  ├─ VendorName: Sindre Sorhus
│  │  └─ VendorUrl: https://sindresorhus.com
│  ├─ bl@4.1.0
│  │  ├─ URL: https://github.com/rvagg/bl.git
│  │  └─ VendorUrl: https://github.com/rvagg/bl
│  ├─ bmp-js@0.1.0
│  │  ├─ URL: https://github.com/shaozilee/bmp-js
│  │  └─ VendorName: shaozilee
│  ├─ bplist-creator@0.0.7
│  │  ├─ URL: https://github.com/nearinfinity/node-bplist-creator.git
│  │  └─ VendorName: https://github.com/nearinfinity/node-bplist-parser.git
│  ├─ bplist-creator@0.1.0
│  │  ├─ URL: https://github.com/nearinfinity/node-bplist-creator.git
│  │  └─ VendorName: Joe Ferner
│  ├─ bplist-parser@0.3.1
│  │  ├─ URL: https://github.com/nearinfinity/node-bplist-parser.git
│  │  ├─ VendorName: Joe Ferner
│  │  └─ VendorUrl: https://github.com/nearinfinity/node-bplist-parser
│  ├─ bplist-parser@0.3.2
│  │  ├─ URL: https://github.com/nearinfinity/node-bplist-parser.git
│  │  ├─ VendorName: Joe Ferner
│  │  └─ VendorUrl: https://github.com/nearinfinity/node-bplist-parser
│  ├─ brace-expansion@1.1.11
│  │  ├─ URL: git://github.com/juliangruber/brace-expansion.git
│  │  ├─ VendorName: Julian Gruber
│  │  └─ VendorUrl: https://github.com/juliangruber/brace-expansion
│  ├─ brace-expansion@2.0.1
│  │  ├─ URL: git://github.com/juliangruber/brace-expansion.git
│  │  ├─ VendorName: Julian Gruber
│  │  └─ VendorUrl: https://github.com/juliangruber/brace-expansion
│  ├─ braces@3.0.3
│  │  ├─ URL: https://github.com/micromatch/braces.git
│  │  ├─ VendorName: Jon Schlinkert
│  │  └─ VendorUrl: https://github.com/micromatch/braces
│  ├─ browserslist@4.23.1
│  │  ├─ URL: https://github.com/browserslist/browserslist.git
│  │  └─ VendorName: Andrey Sitnik
│  ├─ buffer-alloc-unsafe@1.1.0
│  │  └─ URL: https://github.com/LinusU/buffer-alloc-unsafe.git
│  ├─ buffer-alloc@1.2.0
│  │  └─ URL: https://github.com/LinusU/buffer-alloc.git
│  ├─ buffer-equal@0.0.1
│  │  ├─ URL: git://github.com/substack/node-buffer-equal.git
│  │  ├─ VendorName: James Halliday
│  │  └─ VendorUrl: http://substack.net
│  ├─ buffer-fill@1.0.0
│  │  └─ URL: https://github.com/LinusU/buffer-fill.git
│  ├─ buffer-from@1.1.2
│  │  └─ URL: https://github.com/LinusU/buffer-from.git
│  ├─ buffer@5.7.1
│  │  ├─ URL: git://github.com/feross/buffer.git
│  │  ├─ VendorName: Feross Aboukhadijeh
│  │  └─ VendorUrl: https://github.com/feross/buffer
│  ├─ builtins@1.0.3
│  │  └─ URL: https://github.com/juliangruber/builtins.git
│  ├─ bytes@3.0.0
│  │  ├─ URL: https://github.com/visionmedia/bytes.js.git
│  │  ├─ VendorName: TJ Holowaychuk
│  │  └─ VendorUrl: http://tjholowaychuk.com
│  ├─ call-bind@1.0.7
│  │  ├─ URL: git+https://github.com/ljharb/call-bind.git
│  │  ├─ VendorName: Jordan Harband
│  │  └─ VendorUrl: https://github.com/ljharb/call-bind#readme
│  ├─ caller-callsite@2.0.0
│  │  ├─ URL: https://github.com/sindresorhus/caller-callsite.git
│  │  ├─ VendorName: Sindre Sorhus
│  │  └─ VendorUrl: sindresorhus.com
│  ├─ caller-path@2.0.0
│  │  ├─ URL: https://github.com/sindresorhus/caller-path.git
│  │  ├─ VendorName: Sindre Sorhus
│  │  └─ VendorUrl: sindresorhus.com
│  ├─ callsites@2.0.0
│  │  ├─ URL: https://github.com/sindresorhus/callsites.git
│  │  ├─ VendorName: Sindre Sorhus
│  │  └─ VendorUrl: sindresorhus.com
│  ├─ callsites@3.1.0
│  │  ├─ URL: https://github.com/sindresorhus/callsites.git
│  │  ├─ VendorName: Sindre Sorhus
│  │  └─ VendorUrl: sindresorhus.com
│  ├─ camelcase-css@2.0.1
│  │  ├─ URL: https://github.com/stevenvachon/camelcase-css.git
│  │  ├─ VendorName: Steven Vachon
│  │  └─ VendorUrl: https://www.svachon.com/
│  ├─ camelcase@5.3.1
│  │  ├─ URL: https://github.com/sindresorhus/camelcase.git
│  │  ├─ VendorName: Sindre Sorhus
│  │  └─ VendorUrl: sindresorhus.com
│  ├─ camelcase@6.3.0
│  │  ├─ URL: https://github.com/sindresorhus/camelcase.git
│  │  ├─ VendorName: Sindre Sorhus
│  │  └─ VendorUrl: https://sindresorhus.com
│  ├─ centra@2.7.0
│  │  ├─ URL: git+https://github.com/ethanent/centra.git
│  │  ├─ VendorName: Ethan Davis
│  │  └─ VendorUrl: https://github.com/ethanent/centra
│  ├─ chalk@2.4.2
│  │  └─ URL: https://github.com/chalk/chalk.git
│  ├─ chalk@3.0.0
│  │  └─ URL: https://github.com/chalk/chalk.git
│  ├─ chalk@4.1.2
│  │  └─ URL: https://github.com/chalk/chalk.git
│  ├─ char-regex@1.0.2
│  │  ├─ URL: https://github.com/Richienb/char-regex.git
│  │  └─ VendorName: Richie Bendall
│  ├─ char-regex@2.0.1
│  │  ├─ URL: https://github.com/Richienb/char-regex.git
│  │  └─ VendorName: Richie Bendall
│  ├─ chokidar@3.6.0
│  │  ├─ URL: git+https://github.com/paulmillr/chokidar.git
│  │  ├─ VendorName: Paul Miller
│  │  └─ VendorUrl: https://github.com/paulmillr/chokidar
│  ├─ ci-info@2.0.0
│  │  ├─ URL: https://github.com/watson/ci-info.git
│  │  ├─ VendorName: Thomas Watson Steen
│  │  └─ VendorUrl: https://github.com/watson/ci-info
│  ├─ ci-info@3.9.0
│  │  ├─ URL: https://github.com/watson/ci-info.git
│  │  ├─ VendorName: Thomas Watson Steen
│  │  └─ VendorUrl: https://github.com/watson/ci-info
│  ├─ cjs-module-lexer@1.3.1
│  │  ├─ URL: git+https://github.com/nodejs/cjs-module-lexer.git
│  │  ├─ VendorName: Guy Bedford
│  │  └─ VendorUrl: https://github.com/nodejs/cjs-module-lexer#readme
│  ├─ clean-stack@2.2.0
│  │  ├─ URL: https://github.com/sindresorhus/clean-stack.git
│  │  ├─ VendorName: Sindre Sorhus
│  │  └─ VendorUrl: sindresorhus.com
│  ├─ cli-cursor@2.1.0
│  │  ├─ URL: https://github.com/sindresorhus/cli-cursor.git
│  │  ├─ VendorName: Sindre Sorhus
│  │  └─ VendorUrl: sindresorhus.com
│  ├─ cli-cursor@3.1.0
│  │  ├─ URL: https://github.com/sindresorhus/cli-cursor.git
│  │  ├─ VendorName: Sindre Sorhus
│  │  └─ VendorUrl: sindresorhus.com
│  ├─ cli-spinners@2.9.2
│  │  ├─ URL: https://github.com/sindresorhus/cli-spinners.git
│  │  ├─ VendorName: Sindre Sorhus
│  │  └─ VendorUrl: https://sindresorhus.com
│  ├─ clone-deep@4.0.1
│  │  ├─ URL: https://github.com/jonschlinkert/clone-deep.git
│  │  ├─ VendorName: Jon Schlinkert
│  │  └─ VendorUrl: https://github.com/jonschlinkert/clone-deep
│  ├─ clone@1.0.4
│  │  ├─ URL: git://github.com/pvorb/node-clone.git
│  │  ├─ VendorName: Paul Vorbach
│  │  └─ VendorUrl: http://paul.vorba.ch/
│  ├─ clone@2.1.2
│  │  ├─ URL: git://github.com/pvorb/node-clone.git
│  │  ├─ VendorName: Paul Vorbach
│  │  └─ VendorUrl: http://paul.vorba.ch/
│  ├─ clrc@3.1.4
│  │  ├─ URL: git+https://github.com/mebtte/clrc.git
│  │  ├─ VendorName: mebtte
│  │  └─ VendorUrl: https://github.com/mebtte/clrc#readme
│  ├─ clsx@2.0.0
│  │  ├─ URL: https://github.com/lukeed/clsx.git
│  │  ├─ VendorName: Luke Edwards
│  │  └─ VendorUrl: https://lukeed.com
│  ├─ clsx@2.1.1
│  │  ├─ URL: https://github.com/lukeed/clsx.git
│  │  ├─ VendorName: Luke Edwards
│  │  └─ VendorUrl: https://lukeed.com
│  ├─ co@4.6.0
│  │  └─ URL: https://github.com/tj/co.git
│  ├─ collect-v8-coverage@1.0.2
│  │  └─ URL: https://github.com/SimenB/collect-v8-coverage.git
│  ├─ color-convert@1.9.3
│  │  ├─ URL: https://github.com/Qix-/color-convert.git
│  │  └─ VendorName: Heather Arthur
│  ├─ color-convert@2.0.1
│  │  ├─ URL: https://github.com/Qix-/color-convert.git
│  │  └─ VendorName: Heather Arthur
│  ├─ color-name@1.1.3
│  │  ├─ URL: git@github.com:dfcreative/color-name.git
│  │  ├─ VendorName: DY
│  │  └─ VendorUrl: https://github.com/dfcreative/color-name
│  ├─ color-name@1.1.4
│  │  ├─ URL: git@github.com:colorjs/color-name.git
│  │  ├─ VendorName: DY
│  │  └─ VendorUrl: https://github.com/colorjs/color-name
│  ├─ color-string@1.9.1
│  │  ├─ URL: https://github.com/Qix-/color-string.git
│  │  └─ VendorName: Heather Arthur
│  ├─ color@4.2.3
│  │  └─ URL: https://github.com/Qix-/color.git
│  ├─ colorette@1.4.0
│  │  ├─ URL: https://github.com/jorgebucaran/colorette.git
│  │  └─ VendorName: Jorge Bucaran
│  ├─ combined-stream@1.0.8
│  │  ├─ URL: git://github.com/felixge/node-combined-stream.git
│  │  ├─ VendorName: Felix Geisendörfer
│  │  └─ VendorUrl: https://github.com/felixge/node-combined-stream
│  ├─ command-exists@1.2.9
│  │  ├─ URL: http://github.com/mathisonian/command-exists
│  │  ├─ VendorName: Matthew Conlen
│  │  └─ VendorUrl: https://github.com/mathisonian/command-exists
│  ├─ commander@2.20.3
│  │  ├─ URL: https://github.com/tj/commander.js.git
│  │  └─ VendorName: TJ Holowaychuk
│  ├─ commander@4.1.1
│  │  ├─ URL: https://github.com/tj/commander.js.git
│  │  └─ VendorName: TJ Holowaychuk
│  ├─ commander@7.2.0
│  │  ├─ URL: https://github.com/tj/commander.js.git
│  │  └─ VendorName: TJ Holowaychuk
│  ├─ commander@9.5.0
│  │  ├─ URL: https://github.com/tj/commander.js.git
│  │  └─ VendorName: TJ Holowaychuk
│  ├─ commondir@1.0.1
│  │  ├─ URL: http://github.com/substack/node-commondir.git
│  │  ├─ VendorName: James Halliday
│  │  └─ VendorUrl: http://substack.net
│  ├─ component-type@1.2.2
│  │  └─ URL: https://github.com/sindresorhus/component-type.git
│  ├─ compressible@2.0.18
│  │  └─ URL: https://github.com/jshttp/compressible.git
│  ├─ compression@1.7.4
│  │  └─ URL: https://github.com/expressjs/compression.git
│  ├─ concat-map@0.0.1
│  │  ├─ URL: git://github.com/substack/node-concat-map.git
│  │  ├─ VendorName: James Halliday
│  │  └─ VendorUrl: http://substack.net
│  ├─ connect@3.7.0
│  │  ├─ URL: https://github.com/senchalabs/connect.git
│  │  ├─ VendorName: TJ Holowaychuk
│  │  └─ VendorUrl: http://tjholowaychuk.com
│  ├─ convert-source-map@2.0.0
│  │  ├─ URL: git://github.com/thlorenz/convert-source-map.git
│  │  ├─ VendorName: Thorsten Lorenz
│  │  └─ VendorUrl: https://github.com/thlorenz/convert-source-map
│  ├─ cookie-signature@1.2.1
│  │  ├─ URL: https://github.com/visionmedia/node-cookie-signature.git
│  │  └─ VendorName: TJ Holowaychuk
│  ├─ cookie@0.6.0
│  │  ├─ URL: https://github.com/jshttp/cookie.git
│  │  └─ VendorName: Roman Shtylman
│  ├─ core-js-compat@3.37.1
│  │  ├─ URL: https://github.com/zloirock/core-js.git
│  │  ├─ VendorName: Denis Pushkarev
│  │  └─ VendorUrl: http://zloirock.ru
│  ├─ core-js@3.37.1
│  │  ├─ URL: https://github.com/zloirock/core-js.git
│  │  ├─ VendorName: Denis Pushkarev
│  │  └─ VendorUrl: http://zloirock.ru
│  ├─ core-util-is@1.0.3
│  │  ├─ URL: git://github.com/isaacs/core-util-is
│  │  ├─ VendorName: Isaac Z. Schlueter
│  │  └─ VendorUrl: http://blog.izs.me/
│  ├─ cosmiconfig@5.2.1
│  │  ├─ URL: git+https://github.com/davidtheclark/cosmiconfig.git
│  │  ├─ VendorName: David Clark
│  │  └─ VendorUrl: https://github.com/davidtheclark/cosmiconfig#readme
│  ├─ create-jest@29.7.0
│  │  └─ URL: https://github.com/jestjs/jest.git
│  ├─ cross-fetch@3.1.8
│  │  ├─ URL: https://github.com/lquixada/cross-fetch.git
│  │  ├─ VendorName: Leonardo Quixada
│  │  └─ VendorUrl: https://github.com/lquixada/cross-fetch
│  ├─ cross-spawn@6.0.5
│  │  ├─ URL: git@github.com:moxystudio/node-cross-spawn.git
│  │  ├─ VendorName: André Cruz
│  │  └─ VendorUrl: https://github.com/moxystudio/node-cross-spawn
│  ├─ cross-spawn@7.0.3
│  │  ├─ URL: git@github.com:moxystudio/node-cross-spawn.git
│  │  ├─ VendorName: André Cruz
│  │  └─ VendorUrl: https://github.com/moxystudio/node-cross-spawn
│  ├─ crypto-random-string@1.0.0
│  │  ├─ URL: https://github.com/sindresorhus/crypto-random-string.git
│  │  ├─ VendorName: Sindre Sorhus
│  │  └─ VendorUrl: sindresorhus.com
│  ├─ crypto-random-string@2.0.0
│  │  ├─ URL: https://github.com/sindresorhus/crypto-random-string.git
│  │  ├─ VendorName: Sindre Sorhus
│  │  └─ VendorUrl: sindresorhus.com
│  ├─ css-in-js-utils@3.1.0
│  │  ├─ URL: https://github.com/robinweser/css-in-js-utils.git
│  │  └─ VendorName: robinweser
│  ├─ css-tree@1.1.3
│  │  ├─ URL: https://github.com/csstree/csstree.git
│  │  ├─ VendorName: Roman Dvornov
│  │  └─ VendorUrl: https://github.com/lahmatiy
│  ├─ cssesc@3.0.0
│  │  ├─ URL: https://github.com/mathiasbynens/cssesc.git
│  │  ├─ VendorName: Mathias Bynens
│  │  └─ VendorUrl: https://mths.be/cssesc
│  ├─ cssom@0.3.8
│  │  ├─ URL: https://github.com/NV/CSSOM.git
│  │  └─ VendorName: Nikita Vasilyev
│  ├─ cssom@0.5.0
│  │  ├─ URL: https://github.com/NV/CSSOM.git
│  │  └─ VendorName: Nikita Vasilyev
│  ├─ cssstyle@2.3.0
│  │  ├─ URL: https://github.com/jsdom/cssstyle.git
│  │  └─ VendorUrl: https://github.com/jsdom/cssstyle
│  ├─ csstype@3.1.3
│  │  ├─ URL: https://github.com/frenic/csstype
│  │  └─ VendorName: Fredrik Nicol
│  ├─ dag-map@1.0.2
│  │  ├─ URL: https://github.com/krisselden/dag-map.git
│  │  └─ VendorName: Kris Selden
│  ├─ data-uri-to-buffer@3.0.1
│  │  ├─ URL: git://github.com/TooTallNate/node-data-uri-to-buffer.git
│  │  ├─ VendorName: Nathan Rajlich
│  │  └─ VendorUrl: https://github.com/TooTallNate/node-data-uri-to-buffer
│  ├─ data-urls@3.0.2
│  │  ├─ URL: https://github.com/jsdom/data-urls.git
│  │  ├─ VendorName: Domenic Denicola
│  │  └─ VendorUrl: https://domenic.me/
│  ├─ data-view-buffer@1.0.1
│  │  ├─ URL: git+https://github.com/ljharb/data-view-buffer.git
│  │  ├─ VendorName: Jordan Harband
│  │  └─ VendorUrl: https://github.com/ljharb/data-view-buffer#readme
│  ├─ data-view-byte-length@1.0.1
│  │  ├─ URL: git+https://github.com/ljharb/data-view-byte-length.git
│  │  ├─ VendorName: Jordan Harband
│  │  └─ VendorUrl: https://github.com/ljharb/data-view-byte-length#readme
│  ├─ data-view-byte-offset@1.0.0
│  │  ├─ URL: git+https://github.com/ljharb/data-view-byte-offset.git
│  │  ├─ VendorName: Jordan Harband
│  │  └─ VendorUrl: https://github.com/ljharb/data-view-byte-offset#readme
│  ├─ dayjs@1.11.11
│  │  ├─ URL: https://github.com/iamkun/dayjs.git
│  │  ├─ VendorName: iamkun
│  │  └─ VendorUrl: https://day.js.org/
│  ├─ debug@2.6.9
│  │  ├─ URL: git://github.com/visionmedia/debug.git
│  │  └─ VendorName: TJ Holowaychuk
│  ├─ debug@3.2.7
│  │  ├─ URL: git://github.com/visionmedia/debug.git
│  │  └─ VendorName: TJ Holowaychuk
│  ├─ debug@4.3.5
│  │  ├─ URL: git://github.com/debug-js/debug.git
│  │  ├─ VendorName: Josh Junon
│  │  └─ VendorUrl: https://github.com/qix-
│  ├─ decamelize@1.2.0
│  │  ├─ URL: https://github.com/sindresorhus/decamelize.git
│  │  ├─ VendorName: Sindre Sorhus
│  │  └─ VendorUrl: sindresorhus.com
│  ├─ decimal.js@10.4.3
│  │  ├─ URL: https://github.com/MikeMcl/decimal.js.git
│  │  └─ VendorName: Michael Mclaughlin
│  ├─ decode-uri-component@0.2.2
│  │  ├─ URL: https://github.com/SamVerschueren/decode-uri-component.git
│  │  ├─ VendorName: Sam Verschueren
│  │  └─ VendorUrl: github.com/SamVerschueren
│  ├─ dedent@1.5.3
│  │  ├─ URL: https://github.com/dmnd/dedent
│  │  ├─ VendorName: Desmond Brand
│  │  └─ VendorUrl: https://github.com/dmnd/dedent
│  ├─ deep-extend@0.6.0
│  │  ├─ URL: git://github.com/unclechu/node-deep-extend.git
│  │  ├─ VendorName: Viacheslav Lotsmanov
│  │  └─ VendorUrl: https://github.com/unclechu/node-deep-extend
│  ├─ deepmerge@4.3.1
│  │  ├─ URL: git://github.com/TehShrike/deepmerge.git
│  │  └─ VendorUrl: https://github.com/TehShrike/deepmerge
│  ├─ defaults@1.0.4
│  │  ├─ URL: git://github.com/sindresorhus/node-defaults.git
│  │  └─ VendorName: Elijah Insua
│  ├─ define-data-property@1.1.4
│  │  ├─ URL: git+https://github.com/ljharb/define-data-property.git
│  │  ├─ VendorName: Jordan Harband
│  │  └─ VendorUrl: https://github.com/ljharb/define-data-property#readme
│  ├─ define-lazy-prop@2.0.0
│  │  ├─ URL: https://github.com/sindresorhus/define-lazy-prop.git
│  │  ├─ VendorName: Sindre Sorhus
│  │  └─ VendorUrl: sindresorhus.com
│  ├─ define-properties@1.2.1
│  │  ├─ URL: git://github.com/ljharb/define-properties.git
│  │  └─ VendorName: Jordan Harband
│  ├─ del@6.1.1
│  │  ├─ URL: https://github.com/sindresorhus/del.git
│  │  ├─ VendorName: Sindre Sorhus
│  │  └─ VendorUrl: https://sindresorhus.com
│  ├─ delayed-stream@1.0.0
│  │  ├─ URL: git://github.com/felixge/node-delayed-stream.git
│  │  ├─ VendorName: Felix Geisendörfer
│  │  └─ VendorUrl: https://github.com/felixge/node-delayed-stream
│  ├─ denodeify@1.2.1
│  │  ├─ URL: https://github.com/matthew-andrews/denodeify.git
│  │  ├─ VendorName: Matt Andrews
│  │  └─ VendorUrl: https://github.com/matthew-andrews/denodeify
│  ├─ depd@2.0.0
│  │  ├─ URL: https://github.com/dougwilson/nodejs-depd.git
│  │  └─ VendorName: Douglas Christopher Wilson
│  ├─ destroy@1.2.0
│  │  ├─ URL: https://github.com/stream-utils/destroy.git
│  │  ├─ VendorName: Jonathan Ong
│  │  └─ VendorUrl: http://jongleberry.com
│  ├─ detect-newline@3.1.0
│  │  ├─ URL: https://github.com/sindresorhus/detect-newline.git
│  │  ├─ VendorName: Sindre Sorhus
│  │  └─ VendorUrl: sindresorhus.com
│  ├─ detect-node-es@1.1.0
│  │  ├─ URL: https://github.com/thekashey/detect-node
│  │  ├─ VendorName: Ilya Kantor
│  │  └─ VendorUrl: https://github.com/thekashey/detect-node
│  ├─ diff-sequences@29.6.3
│  │  └─ URL: https://github.com/jestjs/jest.git
│  ├─ dijkstrajs@1.0.3
│  │  ├─ URL: git://github.com/tcort/dijkstrajs
│  │  └─ VendorUrl: https://github.com/tcort/dijkstrajs
│  ├─ dir-glob@3.0.1
│  │  ├─ URL: https://github.com/kevva/dir-glob.git
│  │  ├─ VendorName: Kevin Mårtensson
│  │  └─ VendorUrl: github.com/kevva
│  ├─ dlv@1.1.3
│  │  ├─ URL: https://github.com/developit/dlv.git
│  │  ├─ VendorName: Jason Miller
│  │  └─ VendorUrl: http://jasonformat.com
│  ├─ dom-serializer@2.0.0
│  │  ├─ URL: git://github.com/cheeriojs/dom-serializer.git
│  │  └─ VendorName: Felix Boehm
│  ├─ dom-walk@0.1.2
│  │  ├─ URL: git://github.com/Raynos/dom-walk.git
│  │  ├─ VendorName: Raynos
│  │  └─ VendorUrl: https://github.com/Raynos/dom-walk
│  ├─ domexception@4.0.0
│  │  ├─ URL: https://github.com/jsdom/domexception.git
│  │  ├─ VendorName: Domenic Denicola
│  │  └─ VendorUrl: https://domenic.me/
│  ├─ drizzle-kit@0.22.8
│  │  ├─ URL: https://github.com/drizzle-team/drizzle-kit-mirror
│  │  └─ VendorName: Drizzle Team
│  ├─ eastasianwidth@0.2.0
│  │  ├─ URL: git://github.com/komagata/eastasianwidth.git
│  │  └─ VendorName: Masaki Komagata
│  ├─ ee-first@1.1.1
│  │  ├─ URL: https://github.com/jonathanong/ee-first.git
│  │  ├─ VendorName: Jonathan Ong
│  │  └─ VendorUrl: http://jongleberry.com
│  ├─ emittery@0.13.1
│  │  ├─ URL: https://github.com/sindresorhus/emittery.git
│  │  ├─ VendorName: Sindre Sorhus
│  │  └─ VendorUrl: https://sindresorhus.com
│  ├─ emoji-regex@8.0.0
│  │  ├─ URL: https://github.com/mathiasbynens/emoji-regex.git
│  │  ├─ VendorName: Mathias Bynens
│  │  └─ VendorUrl: https://mths.be/emoji-regex
│  ├─ emoji-regex@9.2.2
│  │  ├─ URL: https://github.com/mathiasbynens/emoji-regex.git
│  │  ├─ VendorName: Mathias Bynens
│  │  └─ VendorUrl: https://mths.be/emoji-regex
│  ├─ encode-utf8@1.0.3
│  │  └─ URL: https://github.com/LinusU/encode-utf8.git
│  ├─ encodeurl@1.0.2
│  │  └─ URL: https://github.com/pillarjs/encodeurl.git
│  ├─ end-of-stream@1.4.4
│  │  ├─ URL: git://github.com/mafintosh/end-of-stream.git
│  │  ├─ VendorName: Mathias Buus
│  │  └─ VendorUrl: https://github.com/mafintosh/end-of-stream
│  ├─ env-editor@0.4.2
│  │  ├─ URL: https://github.com/sindresorhus/env-editor.git
│  │  ├─ VendorName: Sindre Sorhus
│  │  └─ VendorUrl: sindresorhus.com
│  ├─ envinfo@7.13.0
│  │  ├─ URL: https://github.com/tabrindle/envinfo
│  │  └─ VendorName: tabrindle@gmail.com
│  ├─ eol@0.9.1
│  │  ├─ URL: https://github.com/ryanve/eol.git
│  │  ├─ VendorName: Ryan Van Etten
│  │  └─ VendorUrl: https://github.com/ryanve/eol
│  ├─ error-ex@1.3.2
│  │  └─ URL: https://github.com/qix-/node-error-ex.git
│  ├─ error-stack-parser@2.1.4
│  │  ├─ URL: git://github.com/stacktracejs/error-stack-parser.git
│  │  └─ VendorUrl: https://www.stacktracejs.com/
│  ├─ errorhandler@1.5.1
│  │  └─ URL: https://github.com/expressjs/errorhandler.git
│  ├─ es-abstract@1.23.3
│  │  ├─ URL: git://github.com/ljharb/es-abstract.git
│  │  ├─ VendorName: Jordan Harband
│  │  └─ VendorUrl: http://ljharb.codes
│  ├─ es-define-property@1.0.0
│  │  ├─ URL: git+https://github.com/ljharb/es-define-property.git
│  │  ├─ VendorName: Jordan Harband
│  │  └─ VendorUrl: https://github.com/ljharb/es-define-property#readme
│  ├─ es-errors@1.3.0
│  │  ├─ URL: git+https://github.com/ljharb/es-errors.git
│  │  ├─ VendorName: Jordan Harband
│  │  └─ VendorUrl: https://github.com/ljharb/es-errors#readme
│  ├─ es-object-atoms@1.0.0
│  │  ├─ URL: git+https://github.com/ljharb/es-object-atoms.git
│  │  ├─ VendorName: Jordan Harband
│  │  └─ VendorUrl: https://github.com/ljharb/es-object-atoms#readme
│  ├─ es-set-tostringtag@2.0.3
│  │  ├─ URL: git+https://github.com/es-shims/es-set-tostringtag.git
│  │  ├─ VendorName: Jordan Harband
│  │  └─ VendorUrl: https://github.com/es-shims/es-set-tostringtag#readme
│  ├─ es-to-primitive@1.2.1
│  │  ├─ URL: git://github.com/ljharb/es-to-primitive.git
│  │  └─ VendorName: Jordan Harband
│  ├─ esbuild-register@3.5.0
│  ├─ esbuild@0.18.20
│  │  └─ URL: https://github.com/evanw/esbuild
│  ├─ esbuild@0.19.12
│  │  └─ URL: https://github.com/evanw/esbuild
│  ├─ escalade@3.1.2
│  │  ├─ URL: https://github.com/lukeed/escalade.git
│  │  ├─ VendorName: Luke Edwards
│  │  └─ VendorUrl: https://lukeed.com
│  ├─ escape-html@1.0.3
│  │  └─ URL: https://github.com/component/escape-html.git
│  ├─ escape-string-regexp@1.0.5
│  │  ├─ URL: https://github.com/sindresorhus/escape-string-regexp.git
│  │  ├─ VendorName: Sindre Sorhus
│  │  └─ VendorUrl: sindresorhus.com
│  ├─ escape-string-regexp@2.0.0
│  │  ├─ URL: https://github.com/sindresorhus/escape-string-regexp.git
│  │  ├─ VendorName: Sindre Sorhus
│  │  └─ VendorUrl: sindresorhus.com
│  ├─ escape-string-regexp@4.0.0
│  │  ├─ URL: https://github.com/sindresorhus/escape-string-regexp.git
│  │  ├─ VendorName: Sindre Sorhus
│  │  └─ VendorUrl: https://sindresorhus.com
│  ├─ etag@1.8.1
│  │  └─ URL: https://github.com/jshttp/etag.git
│  ├─ event-target-shim@5.0.1
│  │  ├─ URL: https://github.com/mysticatea/event-target-shim.git
│  │  ├─ VendorName: Toru Nagashima
│  │  └─ VendorUrl: https://github.com/mysticatea/event-target-shim
│  ├─ exec-async@2.2.0
│  │  ├─ URL: git+https://github.com/ccheever/exec-async.git
│  │  ├─ VendorName: Charlie Cheever
│  │  └─ VendorUrl: https://github.com/ccheever/exec-async#readme
│  ├─ execa@1.0.0
│  │  ├─ URL: https://github.com/sindresorhus/execa.git
│  │  ├─ VendorName: Sindre Sorhus
│  │  └─ VendorUrl: sindresorhus.com
│  ├─ execa@5.1.1
│  │  ├─ URL: https://github.com/sindresorhus/execa.git
│  │  ├─ VendorName: Sindre Sorhus
│  │  └─ VendorUrl: https://sindresorhus.com
│  ├─ exif-parser@0.1.12
│  │  ├─ URL: http://github.com/bwindels/exif-parser.git
│  │  └─ VendorName: Bruno Windels
│  ├─ exit@0.1.2
│  │  ├─ URL: git://github.com/cowboy/node-exit.git
│  │  ├─ VendorName: "Cowboy" Ben Alman
│  │  └─ VendorUrl: https://github.com/cowboy/node-exit
│  ├─ expect@29.7.0
│  │  └─ URL: https://github.com/jestjs/jest.git
│  ├─ expo-asset@10.0.10
│  │  ├─ URL: https://github.com/expo/expo.git
│  │  ├─ VendorName: 650 Industries, Inc.
│  │  └─ VendorUrl: https://docs.expo.dev/versions/latest/sdk/asset/
│  ├─ expo-build-properties@0.12.3
│  │  ├─ URL: https://github.com/expo/expo.git
│  │  ├─ VendorName: 650 Industries, Inc.
│  │  └─ VendorUrl: https://docs.expo.dev/versions/latest/sdk/build-properties
│  ├─ expo-constants@16.0.2
│  │  ├─ URL: https://github.com/expo/expo.git
│  │  ├─ VendorName: 650 Industries, Inc.
│  │  └─ VendorUrl: https://docs.expo.dev/versions/latest/sdk/constants/
│  ├─ expo-dev-client@4.0.19
│  │  ├─ URL: https://github.com/expo/expo.git
│  │  ├─ VendorName: 650 Industries, Inc.
│  │  └─ VendorUrl: https://docs.expo.dev/clients/introduction/
│  ├─ expo-dev-launcher@4.0.21
│  │  ├─ URL: https://github.com/expo/expo.git
│  │  ├─ VendorName: 650 Industries, Inc.
│  │  └─ VendorUrl: https://docs.expo.dev/
│  ├─ expo-dev-menu-interface@1.8.3
│  │  ├─ URL: https://github.com/expo/expo.git
│  │  ├─ VendorName: 650 Industries, Inc.
│  │  └─ VendorUrl: https://docs.expo.dev/
│  ├─ expo-dev-menu@5.0.15
│  │  ├─ URL: https://github.com/expo/expo.git
│  │  ├─ VendorName: 650 Industries, Inc.
│  │  └─ VendorUrl: https://docs.expo.dev/
│  ├─ expo-device@6.0.2
│  │  ├─ URL: https://github.com/expo/expo.git
│  │  ├─ VendorName: 650 Industries, Inc.
│  │  └─ VendorUrl: https://docs.expo.dev/versions/latest/sdk/device/
│  ├─ expo-drizzle-studio-plugin@0.0.2
│  ├─ expo-file-system@17.0.1
│  │  ├─ URL: https://github.com/expo/expo.git
│  │  ├─ VendorName: 650 Industries, Inc.
│  │  └─ VendorUrl: https://docs.expo.dev/versions/latest/sdk/filesystem/
│  ├─ expo-font@12.0.7
│  │  ├─ URL: https://github.com/expo/expo.git
│  │  ├─ VendorName: 650 Industries, Inc.
│  │  └─ VendorUrl: https://docs.expo.dev/versions/latest/sdk/font/
│  ├─ expo-json-utils@0.13.1
│  │  ├─ URL: https://github.com/expo/expo.git
│  │  ├─ VendorName: 650 Industries, Inc.
│  │  └─ VendorUrl: https://docs.expo.dev/
│  ├─ expo-keep-awake@13.0.2
│  │  ├─ URL: https://github.com/expo/expo.git
│  │  ├─ VendorName: 650 Industries, Inc.
│  │  └─ VendorUrl: https://docs.expo.dev/versions/latest/sdk/keep-awake/
│  ├─ expo-linking@6.3.1
│  │  ├─ URL: https://github.com/expo/expo.git
│  │  ├─ VendorName: 650 Industries, Inc.
│  │  └─ VendorUrl: https://docs.expo.dev/versions/latest/sdk/linking
│  ├─ expo-manifests@0.14.3
│  │  ├─ URL: https://github.com/expo/expo.git
│  │  ├─ VendorName: 650 Industries, Inc.
│  │  └─ VendorUrl: https://docs.expo.dev/versions/latest/sdk/manifests/
│  ├─ expo-modules-autolinking@1.11.1
│  │  ├─ URL: https://github.com/expo/expo.git
│  │  ├─ VendorName: 650 Industries, Inc.
│  │  └─ VendorUrl: https://github.com/expo/expo/tree/main/packages/expo-modules-autolinking#readme
│  ├─ expo-modules-core@1.12.18
│  │  ├─ URL: https://github.com/expo/expo.git
│  │  ├─ VendorName: 650 Industries, Inc.
│  │  └─ VendorUrl: https://github.com/expo/expo/tree/main/packages/expo-modules-core
│  ├─ expo-router@3.5.17
│  │  ├─ URL: https://github.com/expo/expo.git
│  │  ├─ VendorName: 650 Industries, Inc.
│  │  └─ VendorUrl: https://docs.expo.dev/routing/introduction/
│  ├─ expo-splash-screen@0.27.5
│  │  ├─ URL: https://github.com/expo/expo.git
│  │  ├─ VendorName: 650 Industries, Inc.
│  │  └─ VendorUrl: https://docs.expo.dev/versions/latest/sdk/splash-screen/
│  ├─ expo-sqlite@14.0.4
│  │  ├─ URL: https://github.com/expo/expo.git
│  │  ├─ VendorName: 650 Industries, Inc.
│  │  └─ VendorUrl: https://docs.expo.dev/versions/latest/sdk/sqlite/
│  ├─ expo-status-bar@1.12.1
│  │  ├─ URL: https://github.com/expo/expo.git
│  │  ├─ VendorName: 650 Industries, Inc.
│  │  └─ VendorUrl: https://docs.expo.dev/versions/latest/sdk/status-bar/
│  ├─ expo-system-ui@3.0.7
│  │  ├─ URL: https://github.com/expo/expo.git
│  │  ├─ VendorName: 650 Industries, Inc.
│  │  └─ VendorUrl: https://docs.expo.dev/versions/latest/sdk/system-ui
│  ├─ expo-updates-interface@0.16.2
│  │  ├─ URL: https://github.com/expo/expo.git
│  │  ├─ VendorName: 650 Industries, Inc.
│  │  └─ VendorUrl: https://docs.expo.dev/
│  ├─ expo-web-browser@13.0.3
│  │  ├─ URL: https://github.com/expo/expo.git
│  │  ├─ VendorName: 650 Industries, Inc.
│  │  └─ VendorUrl: https://docs.expo.dev/versions/latest/sdk/webbrowser/
│  ├─ expo@51.0.18
│  │  ├─ URL: https://github.com/expo/expo.git
│  │  ├─ VendorName: Expo
│  │  └─ VendorUrl: https://github.com/expo/expo/tree/main/packages/expo
│  ├─ fast-deep-equal@3.1.3
│  │  ├─ URL: git+https://github.com/epoberezkin/fast-deep-equal.git
│  │  ├─ VendorName: Evgeny Poberezkin
│  │  └─ VendorUrl: https://github.com/epoberezkin/fast-deep-equal#readme
│  ├─ fast-glob@3.3.2
│  │  ├─ URL: https://github.com/mrmlnc/fast-glob.git
│  │  ├─ VendorName: Denis Malinochkin
│  │  └─ VendorUrl: https://mrmlnc.com
│  ├─ fast-json-stable-stringify@2.1.0
│  │  ├─ URL: git://github.com/epoberezkin/fast-json-stable-stringify.git
│  │  ├─ VendorName: James Halliday
│  │  └─ VendorUrl: https://github.com/epoberezkin/fast-json-stable-stringify
│  ├─ fast-loops@1.1.4
│  │  ├─ URL: https://github.com/robinweser/fast-loops.git
│  │  └─ VendorName: robinweser
│  ├─ fast-uri@3.0.1
│  │  ├─ URL: git+https://github.com/fastify/fast-uri.git
│  │  ├─ VendorName: Vincent Le Goff
│  │  └─ VendorUrl: https://github.com/fastify/fast-uri
│  ├─ fast-xml-parser@4.4.0
│  │  ├─ URL: https://github.com/NaturalIntelligence/fast-xml-parser
│  │  ├─ VendorName: Amit Gupta
│  │  └─ VendorUrl: https://solothought.com
│  ├─ fbjs-css-vars@1.0.2
│  │  └─ URL: https://github.com/facebook/fbjs.git
│  ├─ fbjs@3.0.5
│  │  └─ URL: https://github.com/facebook/fbjs.git
│  ├─ fetch-retry@4.1.1
│  │  ├─ URL: https://github.com/jonbern/fetch-retry.git
│  │  └─ VendorName: Jon K. Bernhardsen
│  ├─ file-type@16.5.4
│  │  ├─ URL: https://github.com/sindresorhus/file-type.git
│  │  ├─ VendorName: Sindre Sorhus
│  │  └─ VendorUrl: https://sindresorhus.com
│  ├─ fill-range@7.1.1
│  │  ├─ URL: https://github.com/jonschlinkert/fill-range.git
│  │  ├─ VendorName: Jon Schlinkert
│  │  └─ VendorUrl: https://github.com/jonschlinkert/fill-range
│  ├─ filter-obj@1.1.0
│  │  ├─ URL: https://github.com/sindresorhus/filter-obj.git
│  │  ├─ VendorName: Sindre Sorhus
│  │  └─ VendorUrl: sindresorhus.com
│  ├─ finalhandler@1.1.2
│  │  ├─ URL: https://github.com/pillarjs/finalhandler.git
│  │  └─ VendorName: Douglas Christopher Wilson
│  ├─ find-cache-dir@2.1.0
│  │  └─ URL: https://github.com/avajs/find-cache-dir.git
│  ├─ find-up@3.0.0
│  │  ├─ URL: https://github.com/sindresorhus/find-up.git
│  │  ├─ VendorName: Sindre Sorhus
│  │  └─ VendorUrl: sindresorhus.com
│  ├─ find-up@4.1.0
│  │  ├─ URL: https://github.com/sindresorhus/find-up.git
│  │  ├─ VendorName: Sindre Sorhus
│  │  └─ VendorUrl: sindresorhus.com
│  ├─ find-up@5.0.0
│  │  ├─ URL: https://github.com/sindresorhus/find-up.git
│  │  ├─ VendorName: Sindre Sorhus
│  │  └─ VendorUrl: https://sindresorhus.com
│  ├─ flow-enums-runtime@0.0.6
│  │  └─ URL: git+https://github.com/facebook/flow.git
│  ├─ flow-parser@0.239.1
│  │  ├─ URL: https://github.com/facebook/flow.git
│  │  ├─ VendorName: Flow Team
│  │  └─ VendorUrl: https://flow.org/
│  ├─ follow-redirects@1.15.6
│  │  ├─ URL: git@github.com:follow-redirects/follow-redirects.git
│  │  ├─ VendorName: Ruben Verborgh
│  │  └─ VendorUrl: https://github.com/follow-redirects/follow-redirects
│  ├─ for-each@0.3.3
│  │  ├─ URL: git://github.com/Raynos/for-each.git
│  │  ├─ VendorName: Raynos
│  │  └─ VendorUrl: https://github.com/Raynos/for-each
│  ├─ form-data@3.0.1
│  │  ├─ URL: git://github.com/form-data/form-data.git
│  │  ├─ VendorName: Felix Geisendörfer
│  │  └─ VendorUrl: http://debuggable.com/
│  ├─ form-data@4.0.0
│  │  ├─ URL: git://github.com/form-data/form-data.git
│  │  ├─ VendorName: Felix Geisendörfer
│  │  └─ VendorUrl: http://debuggable.com/
│  ├─ framer-motion@6.5.1
│  │  ├─ URL: https://github.com/framer/motion/
│  │  └─ VendorName: Framer
│  ├─ framesync@6.0.1
│  │  ├─ URL: git+https://github.com/Popmotion/popmotion.git
│  │  ├─ VendorName: Matt Perry
│  │  └─ VendorUrl: https://popmotion.io/
│  ├─ freeport-async@2.0.0
│  │  ├─ URL: https://github.com/expo/freeport-async.git
│  │  ├─ VendorName: Expo
│  │  └─ VendorUrl: https://github.com/expo/freeport-async/blob/master/README.md
│  ├─ fresh@0.5.2
│  │  ├─ URL: https://github.com/jshttp/fresh.git
│  │  ├─ VendorName: TJ Holowaychuk
│  │  └─ VendorUrl: http://tjholowaychuk.com
│  ├─ fs-extra@8.1.0
│  │  ├─ URL: https://github.com/jprichardson/node-fs-extra
│  │  ├─ VendorName: JP Richardson
│  │  └─ VendorUrl: https://github.com/jprichardson/node-fs-extra
│  ├─ fs-extra@9.0.0
│  │  ├─ URL: https://github.com/jprichardson/node-fs-extra
│  │  ├─ VendorName: JP Richardson
│  │  └─ VendorUrl: https://github.com/jprichardson/node-fs-extra
│  ├─ fs-extra@9.1.0
│  │  ├─ URL: https://github.com/jprichardson/node-fs-extra
│  │  ├─ VendorName: JP Richardson
│  │  └─ VendorUrl: https://github.com/jprichardson/node-fs-extra
│  ├─ fsevents@2.3.3
│  │  ├─ URL: https://github.com/fsevents/fsevents.git
│  │  └─ VendorUrl: https://github.com/fsevents/fsevents
│  ├─ function-bind@1.1.2
│  │  ├─ URL: https://github.com/Raynos/function-bind.git
│  │  ├─ VendorName: Raynos
│  │  └─ VendorUrl: https://github.com/Raynos/function-bind
│  ├─ function.prototype.name@1.1.6
│  │  ├─ URL: git://github.com/es-shims/Function.prototype.name.git
│  │  └─ VendorName: Jordan Harband
│  ├─ functions-have-names@1.2.3
│  │  ├─ URL: git+https://github.com/inspect-js/functions-have-names.git
│  │  ├─ VendorName: Jordan Harband
│  │  └─ VendorUrl: https://github.com/inspect-js/functions-have-names#readme
│  ├─ gensync@1.0.0-beta.2
│  │  ├─ URL: https://github.com/loganfsmyth/gensync.git
│  │  ├─ VendorName: Logan Smyth
│  │  └─ VendorUrl: https://github.com/loganfsmyth/gensync
│  ├─ get-intrinsic@1.2.4
│  │  ├─ URL: git+https://github.com/ljharb/get-intrinsic.git
│  │  ├─ VendorName: Jordan Harband
│  │  └─ VendorUrl: https://github.com/ljharb/get-intrinsic#readme
│  ├─ get-nonce@1.0.1
│  │  ├─ URL: git@github.com:theKashey/get-nonce.git
│  │  ├─ VendorName: Anton Korzunov
│  │  └─ VendorUrl: https://github.com/theKashey/get-nonce
│  ├─ get-package-type@0.1.0
│  │  ├─ URL: git+https://github.com/cfware/get-package-type.git
│  │  ├─ VendorName: Corey Farrell
│  │  └─ VendorUrl: https://github.com/cfware/get-package-type#readme
│  ├─ get-port@3.2.0
│  │  ├─ URL: https://github.com/sindresorhus/get-port.git
│  │  ├─ VendorName: Sindre Sorhus
│  │  └─ VendorUrl: sindresorhus.com
│  ├─ get-stream@4.1.0
│  │  ├─ URL: https://github.com/sindresorhus/get-stream.git
│  │  ├─ VendorName: Sindre Sorhus
│  │  └─ VendorUrl: sindresorhus.com
│  ├─ get-stream@6.0.1
│  │  ├─ URL: https://github.com/sindresorhus/get-stream.git
│  │  ├─ VendorName: Sindre Sorhus
│  │  └─ VendorUrl: https://sindresorhus.com
│  ├─ get-symbol-description@1.0.2
│  │  ├─ URL: git+https://github.com/inspect-js/get-symbol-description.git
│  │  ├─ VendorName: Jordan Harband
│  │  └─ VendorUrl: https://github.com/inspect-js/get-symbol-description#readme
│  ├─ get-tsconfig@4.7.5
│  │  ├─ URL: https://github.com/privatenumber/get-tsconfig.git
│  │  └─ VendorName: Hiroki Osame
│  ├─ getenv@1.0.0
│  │  ├─ URL: git://github.com/ctavan/node-getenv.git
│  │  ├─ VendorName: Christoph Tavan
│  │  └─ VendorUrl: https://github.com/ctavan/node-getenv
│  ├─ gifwrap@0.9.4
│  │  ├─ URL: git+https://github.com/jtlapp/gifwrap.git
│  │  ├─ VendorName: Joseph T. Lapp
│  │  └─ VendorUrl: https://github.com/jtlapp/gifwrap#readme
│  ├─ global@4.4.0
│  │  ├─ URL: git://github.com/Raynos/global.git
│  │  ├─ VendorName: Raynos
│  │  └─ VendorUrl: https://github.com/Raynos/global
│  ├─ globals@11.12.0
│  │  ├─ URL: https://github.com/sindresorhus/globals.git
│  │  ├─ VendorName: Sindre Sorhus
│  │  └─ VendorUrl: sindresorhus.com
│  ├─ globalthis@1.0.4
│  │  ├─ URL: git://github.com/ljharb/System.global.git
│  │  └─ VendorName: Jordan Harband
│  ├─ globby@11.1.0
│  │  ├─ URL: https://github.com/sindresorhus/globby.git
│  │  ├─ VendorName: Sindre Sorhus
│  │  └─ VendorUrl: https://sindresorhus.com
│  ├─ gopd@1.0.1
│  │  ├─ URL: git+https://github.com/ljharb/gopd.git
│  │  ├─ VendorName: Jordan Harband
│  │  └─ VendorUrl: https://github.com/ljharb/gopd#readme
│  ├─ graphql-tag@2.12.6
│  │  ├─ URL: git+https://github.com/apollographql/graphql-tag.git
│  │  └─ VendorUrl: https://github.com/apollographql/graphql-tag#readme
│  ├─ graphql@15.8.0
│  │  ├─ URL: https://github.com/graphql/graphql-js.git
│  │  └─ VendorUrl: https://github.com/graphql/graphql-js
│  ├─ has-bigints@1.0.2
│  │  ├─ URL: git+https://github.com/ljharb/has-bigints.git
│  │  ├─ VendorName: Jordan Harband
│  │  └─ VendorUrl: https://github.com/ljharb/has-bigints#readme
│  ├─ has-flag@3.0.0
│  │  ├─ URL: https://github.com/sindresorhus/has-flag.git
│  │  ├─ VendorName: Sindre Sorhus
│  │  └─ VendorUrl: sindresorhus.com
│  ├─ has-flag@4.0.0
│  │  ├─ URL: https://github.com/sindresorhus/has-flag.git
│  │  ├─ VendorName: Sindre Sorhus
│  │  └─ VendorUrl: sindresorhus.com
│  ├─ has-property-descriptors@1.0.2
│  │  ├─ URL: git+https://github.com/inspect-js/has-property-descriptors.git
│  │  ├─ VendorName: Jordan Harband
│  │  └─ VendorUrl: https://github.com/inspect-js/has-property-descriptors#readme
│  ├─ has-proto@1.0.3
│  │  ├─ URL: git+https://github.com/inspect-js/has-proto.git
│  │  ├─ VendorName: Jordan Harband
│  │  └─ VendorUrl: https://github.com/inspect-js/has-proto#readme
│  ├─ has-symbols@1.0.3
│  │  ├─ URL: git://github.com/inspect-js/has-symbols.git
│  │  ├─ VendorName: Jordan Harband
│  │  └─ VendorUrl: https://github.com/ljharb/has-symbols#readme
│  ├─ has-tostringtag@1.0.2
│  │  ├─ URL: git+https://github.com/inspect-js/has-tostringtag.git
│  │  ├─ VendorName: Jordan Harband
│  │  └─ VendorUrl: https://github.com/inspect-js/has-tostringtag#readme
│  ├─ hasown@2.0.2
│  │  ├─ URL: git+https://github.com/inspect-js/hasOwn.git
│  │  ├─ VendorName: Jordan Harband
│  │  └─ VendorUrl: https://github.com/inspect-js/hasOwn#readme
│  ├─ hermes-estree@0.19.1
│  │  └─ URL: git@github.com:facebook/hermes.git
│  ├─ hermes-estree@0.20.1
│  │  └─ URL: git@github.com:facebook/hermes.git
│  ├─ hermes-parser@0.19.1
│  │  └─ URL: git@github.com:facebook/hermes.git
│  ├─ hermes-parser@0.20.1
│  │  └─ URL: git@github.com:facebook/hermes.git
│  ├─ hermes-profile-transformer@0.0.6
│  │  ├─ URL: https://github.com/MLH-Fellowship/hermes-profile-transformer
│  │  ├─ VendorName: Saphal Patro
│  │  └─ VendorUrl: http://github.com/saphal1998
│  ├─ hey-listen@1.0.8
│  │  ├─ URL: git+https://github.com/Popmotion/hey-listen.git
│  │  ├─ VendorName: Matt Perry
│  │  └─ VendorUrl: https://github.com/Popmotion/hey-listen#readme
│  ├─ html-encoding-sniffer@3.0.0
│  │  ├─ URL: https://github.com/jsdom/html-encoding-sniffer.git
│  │  ├─ VendorName: Domenic Denicola
│  │  └─ VendorUrl: https://domenic.me/
│  ├─ html-escaper@2.0.2
│  │  ├─ URL: https://github.com/WebReflection/html-escaper.git
│  │  ├─ VendorName: Andrea Giammarchi
│  │  └─ VendorUrl: https://github.com/WebReflection/html-escaper
│  ├─ http-errors@2.0.0
│  │  ├─ URL: https://github.com/jshttp/http-errors.git
│  │  ├─ VendorName: Jonathan Ong
│  │  └─ VendorUrl: http://jongleberry.com
│  ├─ http-proxy-agent@5.0.0
│  │  ├─ URL: git://github.com/TooTallNate/node-http-proxy-agent.git
│  │  ├─ VendorName: Nathan Rajlich
│  │  └─ VendorUrl: http://n8.io/
│  ├─ https-proxy-agent@5.0.1
│  │  ├─ URL: git://github.com/TooTallNate/node-https-proxy-agent.git
│  │  ├─ VendorName: Nathan Rajlich
│  │  └─ VendorUrl: http://n8.io/
│  ├─ iconv-lite@0.6.3
│  │  ├─ URL: git://github.com/ashtuchkin/iconv-lite.git
│  │  ├─ VendorName: Alexander Shtuchkin
│  │  └─ VendorUrl: https://github.com/ashtuchkin/iconv-lite
│  ├─ ignore@5.3.1
│  │  ├─ URL: git@github.com:kaelzhang/node-ignore.git
│  │  └─ VendorName: kael
│  ├─ image-q@4.0.0
│  │  ├─ URL: https://github.com/ibezkrovnyi/image-quantization
│  │  └─ VendorUrl: https://github.com/ibezkrovnyi/image-quantization/tree/main/packages/image-q
│  ├─ image-size@1.1.1
│  │  ├─ URL: git://github.com/image-size/image-size.git
│  │  ├─ VendorName: netroy
│  │  └─ VendorUrl: http://netroy.in/
│  ├─ immediate@3.3.0
│  │  └─ URL: git://github.com/calvinmetcalf/immediate.git
│  ├─ import-fresh@2.0.0
│  │  ├─ URL: https://github.com/sindresorhus/import-fresh.git
│  │  ├─ VendorName: Sindre Sorhus
│  │  └─ VendorUrl: sindresorhus.com
│  ├─ import-local@3.1.0
│  │  ├─ URL: https://github.com/sindresorhus/import-local.git
│  │  ├─ VendorName: Sindre Sorhus
│  │  └─ VendorUrl: https://sindresorhus.com
│  ├─ imurmurhash@0.1.4
│  │  ├─ URL: https://github.com/jensyt/imurmurhash-js
│  │  ├─ VendorName: Jens Taylor
│  │  └─ VendorUrl: https://github.com/jensyt/imurmurhash-js
│  ├─ indent-string@4.0.0
│  │  ├─ URL: https://github.com/sindresorhus/indent-string.git
│  │  ├─ VendorName: Sindre Sorhus
│  │  └─ VendorUrl: sindresorhus.com
│  ├─ inline-style-prefixer@6.0.4
│  │  ├─ URL: https://github.com/robinweser/inline-style-prefixer
│  │  └─ VendorName: Robin Weser
│  ├─ internal-ip@4.3.0
│  │  ├─ URL: https://github.com/sindresorhus/internal-ip.git
│  │  ├─ VendorName: Sindre Sorhus
│  │  └─ VendorUrl: sindresorhus.com
│  ├─ internal-slot@1.0.7
│  │  ├─ URL: git+https://github.com/ljharb/internal-slot.git
│  │  ├─ VendorName: Jordan Harband
│  │  └─ VendorUrl: https://github.com/ljharb/internal-slot#readme
│  ├─ invariant@2.2.4
│  │  ├─ URL: https://github.com/zertosh/invariant
│  │  └─ VendorName: Andres Suarez
│  ├─ ip-regex@2.1.0
│  │  ├─ URL: https://github.com/sindresorhus/ip-regex.git
│  │  ├─ VendorName: Sindre Sorhus
│  │  └─ VendorUrl: sindresorhus.com
│  ├─ ipaddr.js@1.9.1
│  │  ├─ URL: git://github.com/whitequark/ipaddr.js
│  │  └─ VendorName: whitequark
│  ├─ is-arguments@1.1.1
│  │  ├─ URL: git://github.com/inspect-js/is-arguments.git
│  │  ├─ VendorName: Jordan Harband
│  │  └─ VendorUrl: https://github.com/inspect-js/is-arguments
│  ├─ is-array-buffer@3.0.4
│  │  ├─ URL: git+https://github.com/inspect-js/is-array-buffer.git
│  │  ├─ VendorName: Jordan Harband
│  │  └─ VendorUrl: https://github.com/inspect-js/is-array-buffer#readme
│  ├─ is-arrayish@0.2.1
│  │  ├─ URL: https://github.com/qix-/node-is-arrayish.git
│  │  ├─ VendorName: Qix
│  │  └─ VendorUrl: http://github.com/qix-
│  ├─ is-arrayish@0.3.2
│  │  ├─ URL: https://github.com/qix-/node-is-arrayish.git
│  │  ├─ VendorName: Qix
│  │  └─ VendorUrl: http://github.com/qix-
│  ├─ is-bigint@1.0.4
│  │  ├─ URL: git+https://github.com/inspect-js/is-bigint.git
│  │  ├─ VendorName: Jordan Harband
│  │  └─ VendorUrl: https://github.com/inspect-js/is-bigint#readme
│  ├─ is-binary-path@2.1.0
│  │  ├─ URL: https://github.com/sindresorhus/is-binary-path.git
│  │  ├─ VendorName: Sindre Sorhus
│  │  └─ VendorUrl: sindresorhus.com
│  ├─ is-boolean-object@1.1.2
│  │  ├─ URL: git://github.com/inspect-js/is-boolean-object.git
│  │  └─ VendorName: Jordan Harband
│  ├─ is-buffer@1.1.6
│  │  ├─ URL: git://github.com/feross/is-buffer.git
│  │  ├─ VendorName: Feross Aboukhadijeh
│  │  └─ VendorUrl: http://feross.org/
│  ├─ is-callable@1.2.7
│  │  ├─ URL: git://github.com/inspect-js/is-callable.git
│  │  ├─ VendorName: Jordan Harband
│  │  └─ VendorUrl: http://ljharb.codes
│  ├─ is-core-module@2.14.0
│  │  ├─ URL: git+https://github.com/inspect-js/is-core-module.git
│  │  ├─ VendorName: Jordan Harband
│  │  └─ VendorUrl: https://github.com/inspect-js/is-core-module
│  ├─ is-data-view@1.0.1
│  │  ├─ URL: git+https://github.com/inspect-js/is-data-view.git
│  │  ├─ VendorName: Jordan Harband
│  │  └─ VendorUrl: https://github.com/inspect-js/is-data-view#readme
│  ├─ is-date-object@1.0.5
│  │  ├─ URL: git://github.com/inspect-js/is-date-object.git
│  │  └─ VendorName: Jordan Harband
│  ├─ is-directory@0.3.1
│  │  ├─ URL: https://github.com/jonschlinkert/is-directory.git
│  │  ├─ VendorName: Jon Schlinkert
│  │  └─ VendorUrl: https://github.com/jonschlinkert/is-directory
│  ├─ is-docker@2.2.1
│  │  ├─ URL: https://github.com/sindresorhus/is-docker.git
│  │  ├─ VendorName: Sindre Sorhus
│  │  └─ VendorUrl: https://sindresorhus.com
│  ├─ is-extglob@1.0.0
│  │  ├─ URL: https://github.com/jonschlinkert/is-extglob.git
│  │  ├─ VendorName: Jon Schlinkert
│  │  └─ VendorUrl: https://github.com/jonschlinkert/is-extglob
│  ├─ is-extglob@2.1.1
│  │  ├─ URL: https://github.com/jonschlinkert/is-extglob.git
│  │  ├─ VendorName: Jon Schlinkert
│  │  └─ VendorUrl: https://github.com/jonschlinkert/is-extglob
│  ├─ is-fullwidth-code-point@2.0.0
│  │  ├─ URL: https://github.com/sindresorhus/is-fullwidth-code-point.git
│  │  ├─ VendorName: Sindre Sorhus
│  │  └─ VendorUrl: sindresorhus.com
│  ├─ is-fullwidth-code-point@3.0.0
│  │  ├─ URL: https://github.com/sindresorhus/is-fullwidth-code-point.git
│  │  ├─ VendorName: Sindre Sorhus
│  │  └─ VendorUrl: sindresorhus.com
│  ├─ is-function@1.0.2
│  │  ├─ URL: git://github.com/grncdr/js-is-function.git
│  │  ├─ VendorName: Stephen Sugden
│  │  └─ VendorUrl: https://github.com/grncdr/js-is-function
│  ├─ is-generator-fn@2.1.0
│  │  ├─ URL: https://github.com/sindresorhus/is-generator-fn.git
│  │  ├─ VendorName: Sindre Sorhus
│  │  └─ VendorUrl: sindresorhus.com
│  ├─ is-generator-function@1.0.10
│  │  ├─ URL: git://github.com/inspect-js/is-generator-function.git
│  │  └─ VendorName: Jordan Harband
│  ├─ is-glob@2.0.1
│  │  ├─ URL: https://github.com/jonschlinkert/is-glob.git
│  │  ├─ VendorName: Jon Schlinkert
│  │  └─ VendorUrl: https://github.com/jonschlinkert/is-glob
│  ├─ is-glob@4.0.3
│  │  ├─ URL: https://github.com/micromatch/is-glob.git
│  │  ├─ VendorName: Jon Schlinkert
│  │  └─ VendorUrl: https://github.com/micromatch/is-glob
│  ├─ is-interactive@1.0.0
│  │  ├─ URL: https://github.com/sindresorhus/is-interactive.git
│  │  ├─ VendorName: Sindre Sorhus
│  │  └─ VendorUrl: sindresorhus.com
│  ├─ is-invalid-path@0.1.0
│  │  ├─ URL: git://github.com/jonschlinkert/is-invalid-path.git
│  │  ├─ VendorName: Jon Schlinkert
│  │  └─ VendorUrl: https://github.com/jonschlinkert/is-invalid-path
│  ├─ is-negative-zero@2.0.3
│  │  ├─ URL: git://github.com/inspect-js/is-negative-zero.git
│  │  ├─ VendorName: Jordan Harband
│  │  └─ VendorUrl: https://github.com/inspect-js/is-negative-zero
│  ├─ is-number-object@1.0.7
│  │  ├─ URL: git://github.com/inspect-js/is-number-object.git
│  │  ├─ VendorName: Jordan Harband
│  │  └─ VendorUrl: https://github.com/inspect-js/is-number-object#readme
│  ├─ is-number@7.0.0
│  │  ├─ URL: https://github.com/jonschlinkert/is-number.git
│  │  ├─ VendorName: Jon Schlinkert
│  │  └─ VendorUrl: https://github.com/jonschlinkert/is-number
│  ├─ is-path-cwd@2.2.0
│  │  ├─ URL: https://github.com/sindresorhus/is-path-cwd.git
│  │  ├─ VendorName: Sindre Sorhus
│  │  └─ VendorUrl: sindresorhus.com
│  ├─ is-path-inside@3.0.3
│  │  ├─ URL: https://github.com/sindresorhus/is-path-inside.git
│  │  ├─ VendorName: Sindre Sorhus
│  │  └─ VendorUrl: sindresorhus.com
│  ├─ is-plain-obj@2.1.0
│  │  ├─ URL: https://github.com/sindresorhus/is-plain-obj.git
│  │  ├─ VendorName: Sindre Sorhus
│  │  └─ VendorUrl: sindresorhus.com
│  ├─ is-plain-object@2.0.4
│  │  ├─ URL: https://github.com/jonschlinkert/is-plain-object.git
│  │  ├─ VendorName: Jon Schlinkert
│  │  └─ VendorUrl: https://github.com/jonschlinkert/is-plain-object
│  ├─ is-potential-custom-element-name@1.0.1
│  │  ├─ URL: https://github.com/mathiasbynens/is-potential-custom-element-name.git
│  │  ├─ VendorName: Mathias Bynens
│  │  └─ VendorUrl: https://github.com/mathiasbynens/is-potential-custom-element-name
│  ├─ is-regex@1.1.4
│  │  ├─ URL: git://github.com/inspect-js/is-regex.git
│  │  ├─ VendorName: Jordan Harband
│  │  └─ VendorUrl: https://github.com/inspect-js/is-regex
│  ├─ is-shared-array-buffer@1.0.3
│  │  ├─ URL: git+https://github.com/inspect-js/is-shared-array-buffer.git
│  │  ├─ VendorName: Jordan Harband
│  │  └─ VendorUrl: https://github.com/inspect-js/is-shared-array-buffer#readme
│  ├─ is-stream@1.1.0
│  │  ├─ URL: https://github.com/sindresorhus/is-stream.git
│  │  ├─ VendorName: Sindre Sorhus
│  │  └─ VendorUrl: sindresorhus.com
│  ├─ is-stream@2.0.1
│  │  ├─ URL: https://github.com/sindresorhus/is-stream.git
│  │  ├─ VendorName: Sindre Sorhus
│  │  └─ VendorUrl: https://sindresorhus.com
│  ├─ is-string@1.0.7
│  │  ├─ URL: git://github.com/ljharb/is-string.git
│  │  └─ VendorName: Jordan Harband
│  ├─ is-symbol@1.0.4
│  │  ├─ URL: git://github.com/inspect-js/is-symbol.git
│  │  └─ VendorName: Jordan Harband
│  ├─ is-typed-array@1.1.13
│  │  ├─ URL: git://github.com/inspect-js/is-typed-array.git
│  │  ├─ VendorName: Jordan Harband
│  │  └─ VendorUrl: http://ljharb.codes
│  ├─ is-unicode-supported@0.1.0
│  │  ├─ URL: https://github.com/sindresorhus/is-unicode-supported.git
│  │  ├─ VendorName: Sindre Sorhus
│  │  └─ VendorUrl: https://sindresorhus.com
│  ├─ is-valid-path@0.1.1
│  │  ├─ URL: git://github.com/jonschlinkert/is-valid-path.git
│  │  ├─ VendorName: Jon Schlinkert
│  │  └─ VendorUrl: https://github.com/jonschlinkert/is-valid-path
│  ├─ is-weakref@1.0.2
│  │  ├─ URL: git+https://github.com/inspect-js/is-weakref.git
│  │  ├─ VendorName: Jordan Harband
│  │  └─ VendorUrl: https://github.com/inspect-js/is-weakref#readme
│  ├─ is-wsl@1.1.0
│  │  ├─ URL: https://github.com/sindresorhus/is-wsl.git
│  │  ├─ VendorName: Sindre Sorhus
│  │  └─ VendorUrl: sindresorhus.com
│  ├─ is-wsl@2.2.0
│  │  ├─ URL: https://github.com/sindresorhus/is-wsl.git
│  │  ├─ VendorName: Sindre Sorhus
│  │  └─ VendorUrl: sindresorhus.com
│  ├─ isarray@1.0.0
│  │  ├─ URL: git://github.com/juliangruber/isarray.git
│  │  ├─ VendorName: Julian Gruber
│  │  └─ VendorUrl: https://github.com/juliangruber/isarray
│  ├─ isarray@2.0.5
│  │  ├─ URL: git://github.com/juliangruber/isarray.git
│  │  ├─ VendorName: Julian Gruber
│  │  └─ VendorUrl: https://github.com/juliangruber/isarray
│  ├─ isobject@3.0.1
│  │  ├─ URL: https://github.com/jonschlinkert/isobject.git
│  │  ├─ VendorName: Jon Schlinkert
│  │  └─ VendorUrl: https://github.com/jonschlinkert/isobject
│  ├─ jest-changed-files@29.7.0
│  │  └─ URL: https://github.com/jestjs/jest.git
│  ├─ jest-circus@29.7.0
│  │  └─ URL: https://github.com/jestjs/jest.git
│  ├─ jest-cli@29.7.0
│  │  ├─ URL: https://github.com/jestjs/jest.git
│  │  └─ VendorUrl: https://jestjs.io/
│  ├─ jest-config@29.7.0
│  │  └─ URL: https://github.com/jestjs/jest.git
│  ├─ jest-diff@29.7.0
│  │  └─ URL: https://github.com/jestjs/jest.git
│  ├─ jest-docblock@29.7.0
│  │  └─ URL: https://github.com/jestjs/jest.git
│  ├─ jest-each@29.7.0
│  │  ├─ URL: https://github.com/jestjs/jest.git
│  │  ├─ VendorName: Matt Phillips
│  │  └─ VendorUrl: mattphillips
│  ├─ jest-environment-jsdom@29.7.0
│  │  └─ URL: https://github.com/jestjs/jest.git
│  ├─ jest-environment-node@29.7.0
│  │  └─ URL: https://github.com/jestjs/jest.git
│  ├─ jest-expo@51.0.3
│  │  ├─ URL: git://github.com/expo/expo.git
│  │  └─ VendorUrl: https://github.com/expo/expo/tree/main/packages/jest-expo
│  ├─ jest-get-type@29.6.3
│  │  └─ URL: https://github.com/jestjs/jest.git
│  ├─ jest-haste-map@29.7.0
│  │  └─ URL: https://github.com/jestjs/jest.git
│  ├─ jest-leak-detector@29.7.0
│  │  └─ URL: https://github.com/jestjs/jest.git
│  ├─ jest-matcher-utils@29.7.0
│  │  └─ URL: https://github.com/jestjs/jest.git
│  ├─ jest-message-util@29.7.0
│  │  └─ URL: https://github.com/jestjs/jest.git
│  ├─ jest-mock@29.7.0
│  │  └─ URL: https://github.com/jestjs/jest.git
│  ├─ jest-pnp-resolver@1.2.3
│  │  ├─ URL: https://github.com/arcanis/jest-pnp-resolver.git
│  │  └─ VendorUrl: https://github.com/arcanis/jest-pnp-resolver
│  ├─ jest-regex-util@29.6.3
│  │  └─ URL: https://github.com/jestjs/jest.git
│  ├─ jest-resolve-dependencies@29.7.0
│  │  └─ URL: https://github.com/jestjs/jest.git
│  ├─ jest-resolve@29.7.0
│  │  └─ URL: https://github.com/jestjs/jest.git
│  ├─ jest-runner@29.7.0
│  │  └─ URL: https://github.com/jestjs/jest.git
│  ├─ jest-runtime@29.7.0
│  │  └─ URL: https://github.com/jestjs/jest.git
│  ├─ jest-snapshot@29.7.0
│  │  └─ URL: https://github.com/jestjs/jest.git
│  ├─ jest-util@29.7.0
│  │  └─ URL: https://github.com/jestjs/jest.git
│  ├─ jest-validate@29.7.0
│  │  └─ URL: https://github.com/jestjs/jest.git
│  ├─ jest-watch-select-projects@2.0.0
│  │  ├─ URL: https://github.com/rogeliog/jest-watch-select-projects.git
│  │  ├─ VendorName: Rogelio Guzman
│  │  └─ VendorUrl: https://github.com/rogeliog/jest-watch-select-projects
│  ├─ jest-watch-typeahead@2.2.1
│  │  ├─ URL: https://github.com/jest-community/jest-watch-typeahead.git
│  │  ├─ VendorName: Rogelio Guzman
│  │  └─ VendorUrl: https://github.com/jest-community/jest-watch-typeahead
│  ├─ jest-watcher@29.7.0
│  │  ├─ URL: https://github.com/jestjs/jest.git
│  │  └─ VendorUrl: https://jestjs.io/
│  ├─ jest-worker@29.7.0
│  │  └─ URL: https://github.com/jestjs/jest.git
│  ├─ jest@29.7.0
│  │  ├─ URL: https://github.com/jestjs/jest.git
│  │  └─ VendorUrl: https://jestjs.io/
│  ├─ jimp-compact@0.16.1
│  │  └─ URL: https://github.com/nuxt-community/jimp-compact.git
│  ├─ jiti@1.21.6
│  │  └─ URL: https://github.com/unjs/jiti.git
│  ├─ join-component@1.1.0
│  ├─ js-tokens@4.0.0
│  │  ├─ URL: https://github.com/lydell/js-tokens.git
│  │  └─ VendorName: Simon Lydell
│  ├─ js-yaml@3.14.1
│  │  ├─ URL: https://github.com/nodeca/js-yaml.git
│  │  ├─ VendorName: Vladimir Zapparov
│  │  └─ VendorUrl: https://github.com/nodeca/js-yaml
│  ├─ js-yaml@4.1.0
│  │  ├─ URL: https://github.com/nodeca/js-yaml.git
│  │  └─ VendorName: Vladimir Zapparov
│  ├─ jscodeshift@0.14.0
│  │  ├─ URL: https://github.com/facebook/jscodeshift.git
│  │  └─ VendorName: Felix Kling
│  ├─ jsdom@20.0.3
│  │  └─ URL: https://github.com/jsdom/jsdom.git
│  ├─ jsesc@0.5.0
│  │  ├─ URL: https://github.com/mathiasbynens/jsesc.git
│  │  ├─ VendorName: Mathias Bynens
│  │  └─ VendorUrl: http://mths.be/jsesc
│  ├─ jsesc@2.5.2
│  │  ├─ URL: https://github.com/mathiasbynens/jsesc.git
│  │  ├─ VendorName: Mathias Bynens
│  │  └─ VendorUrl: https://mths.be/jsesc
│  ├─ json-parse-better-errors@1.0.2
│  │  ├─ URL: https://github.com/zkat/json-parse-better-errors
│  │  └─ VendorName: Kat Marchán
│  ├─ json-parse-even-better-errors@2.3.1
│  │  ├─ URL: https://github.com/npm/json-parse-even-better-errors
│  │  └─ VendorName: Kat Marchán
│  ├─ json-schema-deref-sync@0.13.0
│  │  ├─ URL: git://github.com/bojand/json-schema-deref-sync.git
│  │  ├─ VendorName: Bojan D.
│  │  └─ VendorUrl: https://github.com/bojand/json-schema-deref-sync
│  ├─ json-schema-traverse@1.0.0
│  │  ├─ URL: git+https://github.com/epoberezkin/json-schema-traverse.git
│  │  ├─ VendorName: Evgeny Poberezkin
│  │  └─ VendorUrl: https://github.com/epoberezkin/json-schema-traverse#readme
│  ├─ json5@2.2.3
│  │  ├─ URL: git+https://github.com/json5/json5.git
│  │  ├─ VendorName: Aseem Kishore
│  │  └─ VendorUrl: http://json5.org/
│  ├─ jsonfile@4.0.0
│  │  ├─ URL: git@github.com:jprichardson/node-jsonfile.git
│  │  └─ VendorName: JP Richardson
│  ├─ jsonfile@6.1.0
│  │  ├─ URL: git@github.com:jprichardson/node-jsonfile.git
│  │  └─ VendorName: JP Richardson
│  ├─ kind-of@6.0.3
│  │  ├─ URL: https://github.com/jonschlinkert/kind-of.git
│  │  ├─ VendorName: Jon Schlinkert
│  │  └─ VendorUrl: https://github.com/jonschlinkert/kind-of
│  ├─ kleur@3.0.3
│  │  ├─ URL: https://github.com/lukeed/kleur.git
│  │  ├─ VendorName: Luke Edwards
│  │  └─ VendorUrl: lukeed.com
│  ├─ leven@3.1.0
│  │  ├─ URL: https://github.com/sindresorhus/leven.git
│  │  ├─ VendorName: Sindre Sorhus
│  │  └─ VendorUrl: sindresorhus.com
│  ├─ lilconfig@2.1.0
│  │  ├─ URL: https://github.com/antonk52/lilconfig
│  │  └─ VendorName: antonk52
│  ├─ lilconfig@3.1.2
│  │  ├─ URL: https://github.com/antonk52/lilconfig
│  │  └─ VendorName: antonk52
│  ├─ lines-and-columns@1.2.4
│  │  ├─ URL: https://github.com/eventualbuddha/lines-and-columns.git
│  │  ├─ VendorName: Brian Donovan
│  │  └─ VendorUrl: https://github.com/eventualbuddha/lines-and-columns#readme
│  ├─ load-bmfont@1.4.2
│  │  ├─ URL: git://github.com/Jam3/load-bmfont.git
│  │  ├─ VendorName: Matt DesLauriers
│  │  └─ VendorUrl: https://github.com/Jam3/load-bmfont
│  ├─ locate-path@3.0.0
│  │  ├─ URL: https://github.com/sindresorhus/locate-path.git
│  │  ├─ VendorName: Sindre Sorhus
│  │  └─ VendorUrl: sindresorhus.com
│  ├─ locate-path@5.0.0
│  │  ├─ URL: https://github.com/sindresorhus/locate-path.git
│  │  ├─ VendorName: Sindre Sorhus
│  │  └─ VendorUrl: sindresorhus.com
│  ├─ locate-path@6.0.0
│  │  ├─ URL: https://github.com/sindresorhus/locate-path.git
│  │  ├─ VendorName: Sindre Sorhus
│  │  └─ VendorUrl: https://sindresorhus.com
│  ├─ lodash.debounce@4.0.8
│  │  ├─ URL: https://github.com/lodash/lodash.git
│  │  ├─ VendorName: John-David Dalton
│  │  └─ VendorUrl: https://lodash.com/
│  ├─ lodash.mergewith@4.6.2
│  │  ├─ URL: https://github.com/lodash/lodash.git
│  │  ├─ VendorName: John-David Dalton
│  │  └─ VendorUrl: https://lodash.com/
│  ├─ lodash.throttle@4.1.1
│  │  ├─ URL: https://github.com/lodash/lodash.git
│  │  ├─ VendorName: John-David Dalton
│  │  └─ VendorUrl: https://lodash.com/
│  ├─ lodash@4.17.21
│  │  ├─ URL: https://github.com/lodash/lodash.git
│  │  ├─ VendorName: John-David Dalton
│  │  └─ VendorUrl: https://lodash.com/
│  ├─ log-symbols@2.2.0
│  │  ├─ URL: https://github.com/sindresorhus/log-symbols.git
│  │  ├─ VendorName: Sindre Sorhus
│  │  └─ VendorUrl: sindresorhus.com
│  ├─ log-symbols@4.1.0
│  │  ├─ URL: https://github.com/sindresorhus/log-symbols.git
│  │  ├─ VendorName: Sindre Sorhus
│  │  └─ VendorUrl: https://sindresorhus.com
│  ├─ logkitty@0.7.1
│  │  ├─ URL: https://github.com/zamotany/logkitty.git
│  │  ├─ VendorName: Paweł Trysła
│  │  └─ VendorUrl: https://github.com/zamotany/logkitty
│  ├─ loose-envify@1.4.0
│  │  ├─ URL: git://github.com/zertosh/loose-envify.git
│  │  ├─ VendorName: Andres Suarez
│  │  └─ VendorUrl: https://github.com/zertosh/loose-envify
│  ├─ make-dir@2.1.0
│  │  ├─ URL: https://github.com/sindresorhus/make-dir.git
│  │  ├─ VendorName: Sindre Sorhus
│  │  └─ VendorUrl: sindresorhus.com
│  ├─ make-dir@4.0.0
│  │  ├─ URL: https://github.com/sindresorhus/make-dir.git
│  │  ├─ VendorName: Sindre Sorhus
│  │  └─ VendorUrl: https://sindresorhus.com
│  ├─ md5-file@3.2.3
│  │  ├─ URL: https://github.com/roryrjb/md5-file.git
│  │  └─ VendorName: Rory Bradford
│  ├─ md5hex@1.0.0
│  │  ├─ URL: git+https://github.com/650Industries/md5hex.git
│  │  ├─ VendorName: exponent.team@gmail.com
│  │  └─ VendorUrl: https://github.com/650Industries/md5hex#readme
│  ├─ memoize-one@5.2.1
│  │  ├─ URL: https://github.com/alexreardon/memoize-one.git
│  │  └─ VendorName: Alex Reardon
│  ├─ memoize-one@6.0.0
│  │  ├─ URL: https://github.com/alexreardon/memoize-one.git
│  │  └─ VendorName: Alex Reardon
│  ├─ merge-options@3.0.4
│  │  ├─ URL: https://github.com/schnittstabil/merge-options.git
│  │  └─ VendorName: Michael Mayer
│  ├─ merge-stream@2.0.0
│  │  ├─ URL: https://github.com/grncdr/merge-stream.git
│  │  └─ VendorName: Stephen Sugden
│  ├─ merge2@1.4.1
│  │  ├─ URL: git@github.com:teambition/merge2.git
│  │  └─ VendorUrl: https://github.com/teambition/merge2
│  ├─ metro-babel-transformer@0.80.9
│  │  └─ URL: git@github.com:facebook/metro.git
│  ├─ metro-cache-key@0.80.9
│  │  └─ URL: git@github.com:facebook/metro.git
│  ├─ metro-cache@0.80.9
│  │  └─ URL: git@github.com:facebook/metro.git
│  ├─ metro-config@0.80.9
│  │  └─ URL: git@github.com:facebook/metro.git
│  ├─ metro-core@0.80.9
│  │  └─ URL: git@github.com:facebook/metro.git
│  ├─ metro-file-map@0.80.9
│  │  └─ URL: git@github.com:facebook/metro.git
│  ├─ metro-minify-terser@0.80.9
│  │  └─ URL: git@github.com:facebook/metro.git
│  ├─ metro-resolver@0.80.9
│  │  └─ URL: git@github.com:facebook/metro.git
│  ├─ metro-runtime@0.80.9
│  │  └─ URL: git@github.com:facebook/metro.git
│  ├─ metro-source-map@0.80.9
│  │  └─ URL: git@github.com:facebook/metro.git
│  ├─ metro-symbolicate@0.80.9
│  │  └─ URL: git@github.com:facebook/metro.git
│  ├─ metro-transform-plugins@0.80.9
│  │  └─ URL: git@github.com:facebook/metro.git
│  ├─ metro-transform-worker@0.80.9
│  │  └─ URL: git@github.com:facebook/metro.git
│  ├─ metro@0.80.9
│  │  └─ URL: git@github.com:facebook/metro.git
│  ├─ micromatch@4.0.7
│  │  ├─ URL: https://github.com/micromatch/micromatch.git
│  │  ├─ VendorName: Jon Schlinkert
│  │  └─ VendorUrl: https://github.com/micromatch/micromatch
│  ├─ mime-db@1.52.0
│  │  └─ URL: https://github.com/jshttp/mime-db.git
│  ├─ mime-types@2.1.35
│  │  └─ URL: https://github.com/jshttp/mime-types.git
│  ├─ mime@1.6.0
│  │  ├─ URL: https://github.com/broofa/node-mime
│  │  ├─ VendorName: Robert Kieffer
│  │  └─ VendorUrl: http://github.com/broofa
│  ├─ mime@2.6.0
│  │  ├─ URL: https://github.com/broofa/mime
│  │  ├─ VendorName: Robert Kieffer
│  │  └─ VendorUrl: http://github.com/broofa
│  ├─ mimic-fn@1.2.0
│  │  ├─ URL: https://github.com/sindresorhus/mimic-fn.git
│  │  ├─ VendorName: Sindre Sorhus
│  │  └─ VendorUrl: sindresorhus.com
│  ├─ mimic-fn@2.1.0
│  │  ├─ URL: https://github.com/sindresorhus/mimic-fn.git
│  │  ├─ VendorName: Sindre Sorhus
│  │  └─ VendorUrl: sindresorhus.com
│  ├─ min-document@2.19.0
│  │  ├─ URL: git://github.com/Raynos/min-document.git
│  │  ├─ VendorName: Raynos
│  │  └─ VendorUrl: https://github.com/Raynos/min-document
│  ├─ min-indent@1.0.1
│  │  ├─ URL: https://github.com/thejameskyle/min-indent
│  │  ├─ VendorName: James Kyle
│  │  └─ VendorUrl: thejameskyle.com
│  ├─ minimist@1.2.8
│  │  ├─ URL: git://github.com/minimistjs/minimist.git
│  │  ├─ VendorName: James Halliday
│  │  └─ VendorUrl: https://github.com/minimistjs/minimist
│  ├─ minizlib@2.1.2
│  │  ├─ URL: git+https://github.com/isaacs/minizlib.git
│  │  ├─ VendorName: Isaac Z. Schlueter
│  │  └─ VendorUrl: http://blog.izs.me/
│  ├─ mkdirp@0.5.6
│  │  ├─ URL: https://github.com/substack/node-mkdirp.git
│  │  ├─ VendorName: James Halliday
│  │  └─ VendorUrl: http://substack.net
│  ├─ mkdirp@1.0.4
│  │  └─ URL: https://github.com/isaacs/node-mkdirp.git
│  ├─ moti@0.29.0
│  │  ├─ URL: https://github.com/nandorojo/moti.git
│  │  └─ VendorUrl: https://github.com/nandorojo/moti.git#readme
│  ├─ mrmime@1.0.1
│  │  ├─ URL: https://github.com/lukeed/mrmime.git
│  │  ├─ VendorName: Luke Edwards
│  │  └─ VendorUrl: https://lukeed.com
│  ├─ ms@2.0.0
│  │  └─ URL: https://github.com/zeit/ms.git
│  ├─ ms@2.1.2
│  │  └─ URL: https://github.com/zeit/ms.git
│  ├─ ms@2.1.3
│  │  └─ URL: https://github.com/vercel/ms.git
│  ├─ mv@2.1.1
│  │  ├─ URL: git://github.com/andrewrk/node-mv.git
│  │  ├─ VendorName: Andrew Kelley
│  │  └─ VendorUrl: https://github.com/andrewrk/node-mv
│  ├─ mz@2.7.0
│  │  ├─ URL: https://github.com/normalize/mz.git
│  │  ├─ VendorName: Jonathan Ong
│  │  └─ VendorUrl: http://jongleberry.com
│  ├─ nanoid@3.3.7
│  │  ├─ URL: https://github.com/ai/nanoid.git
│  │  └─ VendorName: Andrey Sitnik
│  ├─ nativewind@4.0.36
│  │  ├─ URL: https://github.com/marklawlor/nativewind.git
│  │  ├─ VendorName: Mark Lawlor
│  │  └─ VendorUrl: https://nativewind.dev/
│  ├─ natural-compare@1.4.0
│  │  ├─ URL: git://github.com/litejs/natural-compare-lite.git
│  │  ├─ VendorName: Lauri Rooden
│  │  └─ VendorUrl: https://github.com/litejs/natural-compare-lite
│  ├─ ncp@2.0.0
│  │  ├─ URL: https://github.com/AvianFlu/ncp.git
│  │  └─ VendorName: AvianFlu
│  ├─ negotiator@0.6.3
│  │  └─ URL: https://github.com/jshttp/negotiator.git
│  ├─ neo-async@2.6.2
│  │  ├─ URL: git@github.com:suguru03/neo-async.git
│  │  └─ VendorUrl: https://github.com/suguru03/neo-async
│  ├─ nested-error-stacks@2.0.1
│  │  ├─ URL: https://github.com/mdlavin/nested-error-stacks.git
│  │  └─ VendorName: Matt Lavin
│  ├─ nice-try@1.0.5
│  │  ├─ URL: https://github.com/electerious/nice-try.git
│  │  └─ VendorUrl: https://github.com/electerious/nice-try
│  ├─ nocache@3.0.4
│  │  ├─ URL: git://github.com/helmetjs/nocache.git
│  │  ├─ VendorName: Adam Baldwin
│  │  └─ VendorUrl: https://github.com/helmetjs/nocache
│  ├─ node-abort-controller@3.1.1
│  │  ├─ URL: git+https://github.com/southpolesteve/node-abort-controller.git
│  │  ├─ VendorName: Steve Faulkner
│  │  └─ VendorUrl: https://github.com/southpolesteve/node-abort-controller#readme
│  ├─ node-dir@0.1.17
│  │  ├─ URL: https://github.com/fshost/node-dir
│  │  ├─ VendorName: Nathan Cartwright
│  │  └─ VendorUrl: https://github.com/fshost
│  ├─ node-fetch@2.7.0
│  │  ├─ URL: https://github.com/bitinn/node-fetch.git
│  │  ├─ VendorName: David Frank
│  │  └─ VendorUrl: https://github.com/bitinn/node-fetch
│  ├─ node-int64@0.4.0
│  │  ├─ URL: https://github.com/broofa/node-int64
│  │  └─ VendorName: Robert Kieffer
│  ├─ node-releases@2.0.14
│  │  ├─ URL: https://github.com/chicoxyzzy/node-releases.git
│  │  └─ VendorName: Sergey Rubanov
│  ├─ node-stream-zip@1.15.0
│  │  ├─ URL: https://github.com/antelle/node-stream-zip.git
│  │  ├─ VendorName: Antelle
│  │  └─ VendorUrl: https://github.com/antelle/node-stream-zip
│  ├─ node-vibrant@3.1.6
│  │  ├─ URL: https://github.com/akfish/node-vibrant.git
│  │  └─ VendorName: akfish
│  ├─ noop-fn@1.0.0
│  │  ├─ URL: git+https://github.com/inikulin/noop-fn.git
│  │  ├─ VendorName: Ivan Nikulin
│  │  └─ VendorUrl: https://github.com/inikulin/noop-fn#readme
│  ├─ normalize-path@3.0.0
│  │  ├─ URL: https://github.com/jonschlinkert/normalize-path.git
│  │  ├─ VendorName: Jon Schlinkert
│  │  └─ VendorUrl: https://github.com/jonschlinkert/normalize-path
│  ├─ npm-run-path@2.0.2
│  │  ├─ URL: https://github.com/sindresorhus/npm-run-path.git
│  │  ├─ VendorName: Sindre Sorhus
│  │  └─ VendorUrl: sindresorhus.com
│  ├─ npm-run-path@4.0.1
│  │  ├─ URL: https://github.com/sindresorhus/npm-run-path.git
│  │  ├─ VendorName: Sindre Sorhus
│  │  └─ VendorUrl: sindresorhus.com
│  ├─ nullthrows@1.1.1
│  │  ├─ URL: https://github.com/zertosh/nullthrows
│  │  └─ VendorName: Andres Suarez
│  ├─ nwsapi@2.2.10
│  │  ├─ URL: git://github.com/dperini/nwsapi.git
│  │  ├─ VendorName: Diego Perini
│  │  └─ VendorUrl: http://javascript.nwbox.com/nwsapi/
│  ├─ ob1@0.80.9
│  │  └─ URL: git@github.com:facebook/metro.git
│  ├─ object-assign@4.1.1
│  │  ├─ URL: https://github.com/sindresorhus/object-assign.git
│  │  ├─ VendorName: Sindre Sorhus
│  │  └─ VendorUrl: sindresorhus.com
│  ├─ object-hash@3.0.0
│  │  ├─ URL: https://github.com/puleos/object-hash
│  │  ├─ VendorName: Scott Puleo
│  │  └─ VendorUrl: https://github.com/puleos/object-hash
│  ├─ object-inspect@1.13.2
│  │  ├─ URL: git://github.com/inspect-js/object-inspect.git
│  │  ├─ VendorName: James Halliday
│  │  └─ VendorUrl: https://github.com/inspect-js/object-inspect
│  ├─ object-keys@1.1.1
│  │  ├─ URL: git://github.com/ljharb/object-keys.git
│  │  ├─ VendorName: Jordan Harband
│  │  └─ VendorUrl: http://ljharb.codes
│  ├─ object.assign@4.1.5
│  │  ├─ URL: git://github.com/ljharb/object.assign.git
│  │  └─ VendorName: Jordan Harband
│  ├─ omggif@1.0.10
│  │  ├─ URL: https://github.com/deanm/omggif
│  │  └─ VendorName: Dean McNamee
│  ├─ on-finished@2.3.0
│  │  └─ URL: https://github.com/jshttp/on-finished.git
│  ├─ on-finished@2.4.1
│  │  └─ URL: https://github.com/jshttp/on-finished.git
│  ├─ on-headers@1.0.2
│  │  ├─ URL: https://github.com/jshttp/on-headers.git
│  │  └─ VendorName: Douglas Christopher Wilson
│  ├─ onetime@2.0.1
│  │  ├─ URL: https://github.com/sindresorhus/onetime.git
│  │  ├─ VendorName: Sindre Sorhus
│  │  └─ VendorUrl: sindresorhus.com
│  ├─ onetime@5.1.2
│  │  ├─ URL: https://github.com/sindresorhus/onetime.git
│  │  ├─ VendorName: Sindre Sorhus
│  │  └─ VendorUrl: https://sindresorhus.com
│  ├─ open@6.4.0
│  │  ├─ URL: https://github.com/sindresorhus/open.git
│  │  ├─ VendorName: Sindre Sorhus
│  │  └─ VendorUrl: sindresorhus.com
│  ├─ open@7.4.2
│  │  ├─ URL: https://github.com/sindresorhus/open.git
│  │  ├─ VendorName: Sindre Sorhus
│  │  └─ VendorUrl: https://sindresorhus.com
│  ├─ open@8.4.2
│  │  ├─ URL: https://github.com/sindresorhus/open.git
│  │  ├─ VendorName: Sindre Sorhus
│  │  └─ VendorUrl: https://sindresorhus.com
│  ├─ ora@3.4.0
│  │  ├─ URL: https://github.com/sindresorhus/ora.git
│  │  ├─ VendorName: Sindre Sorhus
│  │  └─ VendorUrl: sindresorhus.com
│  ├─ ora@5.4.1
│  │  ├─ URL: https://github.com/sindresorhus/ora.git
│  │  ├─ VendorName: Sindre Sorhus
│  │  └─ VendorUrl: https://sindresorhus.com
│  ├─ os-homedir@1.0.2
│  │  ├─ URL: https://github.com/sindresorhus/os-homedir.git
│  │  ├─ VendorName: Sindre Sorhus
│  │  └─ VendorUrl: sindresorhus.com
│  ├─ os-tmpdir@1.0.2
│  │  ├─ URL: https://github.com/sindresorhus/os-tmpdir.git
│  │  ├─ VendorName: Sindre Sorhus
│  │  └─ VendorUrl: sindresorhus.com
│  ├─ p-finally@1.0.0
│  │  ├─ URL: https://github.com/sindresorhus/p-finally.git
│  │  ├─ VendorName: Sindre Sorhus
│  │  └─ VendorUrl: sindresorhus.com
│  ├─ p-limit@2.3.0
│  │  ├─ URL: https://github.com/sindresorhus/p-limit.git
│  │  ├─ VendorName: Sindre Sorhus
│  │  └─ VendorUrl: sindresorhus.com
│  ├─ p-limit@3.1.0
│  │  ├─ URL: https://github.com/sindresorhus/p-limit.git
│  │  ├─ VendorName: Sindre Sorhus
│  │  └─ VendorUrl: https://sindresorhus.com
│  ├─ p-locate@3.0.0
│  │  ├─ URL: https://github.com/sindresorhus/p-locate.git
│  │  ├─ VendorName: Sindre Sorhus
│  │  └─ VendorUrl: sindresorhus.com
│  ├─ p-locate@4.1.0
│  │  ├─ URL: https://github.com/sindresorhus/p-locate.git
│  │  ├─ VendorName: Sindre Sorhus
│  │  └─ VendorUrl: sindresorhus.com
│  ├─ p-locate@5.0.0
│  │  ├─ URL: https://github.com/sindresorhus/p-locate.git
│  │  ├─ VendorName: Sindre Sorhus
│  │  └─ VendorUrl: https://sindresorhus.com
│  ├─ p-map@4.0.0
│  │  ├─ URL: https://github.com/sindresorhus/p-map.git
│  │  ├─ VendorName: Sindre Sorhus
│  │  └─ VendorUrl: https://sindresorhus.com
│  ├─ p-try@2.2.0
│  │  ├─ URL: https://github.com/sindresorhus/p-try.git
│  │  ├─ VendorName: Sindre Sorhus
│  │  └─ VendorUrl: sindresorhus.com
│  ├─ parse-bmfont-ascii@1.0.6
│  │  ├─ URL: git://github.com/mattdesl/parse-bmfont-ascii.git
│  │  ├─ VendorName: Matt DesLauriers
│  │  └─ VendorUrl: https://github.com/mattdesl/parse-bmfont-ascii
│  ├─ parse-bmfont-binary@1.0.6
│  │  ├─ URL: git://github.com/Jam3/parse-bmfont-binary.git
│  │  ├─ VendorName: Matt DesLauriers
│  │  └─ VendorUrl: https://github.com/Jam3/parse-bmfont-binary
│  ├─ parse-bmfont-xml@1.1.6
│  │  ├─ URL: git://github.com/mattdesl/parse-bmfont-xml.git
│  │  ├─ VendorName: Matt DesLauriers
│  │  └─ VendorUrl: https://github.com/mattdesl/parse-bmfont-xml
│  ├─ parse-headers@2.0.5
│  │  ├─ URL: https://github.com/kesla/parse-headers.git
│  │  ├─ VendorName: David Björklund
│  │  └─ VendorUrl: https://github.com/kesla/parse-headers
│  ├─ parse-json@4.0.0
│  │  ├─ URL: https://github.com/sindresorhus/parse-json.git
│  │  ├─ VendorName: Sindre Sorhus
│  │  └─ VendorUrl: sindresorhus.com
│  ├─ parse-json@5.2.0
│  │  ├─ URL: https://github.com/sindresorhus/parse-json.git
│  │  ├─ VendorName: Sindre Sorhus
│  │  └─ VendorUrl: https://sindresorhus.com
│  ├─ parse-png@2.1.0
│  │  ├─ URL: https://github.com/kevva/parse-png.git
│  │  ├─ VendorName: Kevin Martensson
│  │  └─ VendorUrl: github.com/kevva
│  ├─ parse5@7.1.2
│  │  ├─ URL: git://github.com/inikulin/parse5.git
│  │  ├─ VendorName: Ivan Nikulin
│  │  └─ VendorUrl: https://github.com/inikulin/parse5
│  ├─ parseurl@1.3.3
│  │  └─ URL: https://github.com/pillarjs/parseurl.git
│  ├─ path-exists@3.0.0
│  │  ├─ URL: https://github.com/sindresorhus/path-exists.git
│  │  ├─ VendorName: Sindre Sorhus
│  │  └─ VendorUrl: sindresorhus.com
│  ├─ path-exists@4.0.0
│  │  ├─ URL: https://github.com/sindresorhus/path-exists.git
│  │  ├─ VendorName: Sindre Sorhus
│  │  └─ VendorUrl: sindresorhus.com
│  ├─ path-extra@1.0.3
│  │  ├─ URL: https://github.com/jprichardson/node-path-extra
│  │  ├─ VendorName: JP Richardson
│  │  └─ VendorUrl: https://github.com/jprichardson/node-path-extra
│  ├─ path-is-absolute@1.0.1
│  │  ├─ URL: https://github.com/sindresorhus/path-is-absolute.git
│  │  ├─ VendorName: Sindre Sorhus
│  │  └─ VendorUrl: sindresorhus.com
│  ├─ path-key@2.0.1
│  │  ├─ URL: https://github.com/sindresorhus/path-key.git
│  │  ├─ VendorName: Sindre Sorhus
│  │  └─ VendorUrl: sindresorhus.com
│  ├─ path-key@3.1.1
│  │  ├─ URL: https://github.com/sindresorhus/path-key.git
│  │  ├─ VendorName: Sindre Sorhus
│  │  └─ VendorUrl: sindresorhus.com
│  ├─ path-parse@1.0.7
│  │  ├─ URL: https://github.com/jbgutierrez/path-parse.git
│  │  ├─ VendorName: Javier Blanco
│  │  └─ VendorUrl: https://github.com/jbgutierrez/path-parse#readme
│  ├─ path-type@4.0.0
│  │  ├─ URL: https://github.com/sindresorhus/path-type.git
│  │  ├─ VendorName: Sindre Sorhus
│  │  └─ VendorUrl: sindresorhus.com
│  ├─ peek-readable@4.1.0
│  │  ├─ URL: git+https://github.com/Borewit/peek-readable
│  │  ├─ VendorName: Borewit
│  │  └─ VendorUrl: https://github.com/Borewit
│  ├─ phin@2.9.3
│  │  ├─ URL: git+https://github.com/ethanent/phin.git
│  │  ├─ VendorName: Ethan Davis
│  │  └─ VendorUrl: https://github.com/ethanent/phin#readme
│  ├─ phin@3.7.1
│  │  ├─ URL: git+https://github.com/ethanent/phin.git
│  │  ├─ VendorName: Ethan Davis
│  │  └─ VendorUrl: https://github.com/ethanent/phin
│  ├─ picomatch@2.3.1
│  │  ├─ URL: https://github.com/micromatch/picomatch.git
│  │  ├─ VendorName: Jon Schlinkert
│  │  └─ VendorUrl: https://github.com/micromatch/picomatch
│  ├─ picomatch@3.0.1
│  │  ├─ URL: https://github.com/micromatch/picomatch.git
│  │  ├─ VendorName: Jon Schlinkert
│  │  └─ VendorUrl: https://github.com/micromatch/picomatch
│  ├─ pify@2.3.0
│  │  ├─ URL: https://github.com/sindresorhus/pify.git
│  │  ├─ VendorName: Sindre Sorhus
│  │  └─ VendorUrl: sindresorhus.com
│  ├─ pify@4.0.1
│  │  ├─ URL: https://github.com/sindresorhus/pify.git
│  │  ├─ VendorName: Sindre Sorhus
│  │  └─ VendorUrl: sindresorhus.com
│  ├─ pirates@4.0.6
│  │  ├─ URL: https://github.com/danez/pirates.git
│  │  ├─ VendorName: Ari Porad
│  │  └─ VendorUrl: https://github.com/danez/pirates#readme
│  ├─ pkg-dir@3.0.0
│  │  ├─ URL: https://github.com/sindresorhus/pkg-dir.git
│  │  ├─ VendorName: Sindre Sorhus
│  │  └─ VendorUrl: sindresorhus.com
│  ├─ pkg-dir@4.2.0
│  │  ├─ URL: https://github.com/sindresorhus/pkg-dir.git
│  │  ├─ VendorName: Sindre Sorhus
│  │  └─ VendorUrl: sindresorhus.com
│  ├─ plist@3.1.0
│  │  ├─ URL: git://github.com/TooTallNate/node-plist.git
│  │  └─ VendorName: Nathan Rajlich
│  ├─ pngjs@3.4.0
│  │  ├─ URL: git://github.com/lukeapage/pngjs2.git
│  │  └─ VendorUrl: https://github.com/lukeapage/pngjs
│  ├─ pngjs@5.0.0
│  │  ├─ URL: git://github.com/lukeapage/pngjs.git
│  │  └─ VendorUrl: https://github.com/lukeapage/pngjs
│  ├─ popmotion@11.0.3
│  │  ├─ URL: https://github.com/Popmotion/popmotion/tree/master/packages/popmotion
│  │  ├─ VendorName: Matt Perry
│  │  └─ VendorUrl: https://popmotion.io/
│  ├─ possible-typed-array-names@1.0.0
│  │  ├─ URL: git+https://github.com/ljharb/possible-typed-array-names.git
│  │  ├─ VendorName: Jordan Harband
│  │  └─ VendorUrl: https://github.com/ljharb/possible-typed-array-names#readme
│  ├─ postcss-import@15.1.0
│  │  ├─ URL: https://github.com/postcss/postcss-import.git
│  │  └─ VendorName: Maxime Thirouin
│  ├─ postcss-js@4.0.1
│  │  ├─ URL: https://github.com/postcss/postcss-js.git
│  │  └─ VendorName: Andrey Sitnik
│  ├─ postcss-load-config@4.0.2
│  │  ├─ URL: https://github.com/postcss/postcss-load-config.git
│  │  └─ VendorName: Michael Ciniawky
│  ├─ postcss-nested@6.0.1
│  │  ├─ URL: https://github.com/postcss/postcss-nested.git
│  │  └─ VendorName: Andrey Sitnik
│  ├─ postcss-selector-parser@6.1.0
│  │  ├─ URL: https://github.com/postcss/postcss-selector-parser.git
│  │  └─ VendorUrl: https://github.com/postcss/postcss-selector-parser
│  ├─ postcss-value-parser@4.2.0
│  │  ├─ URL: https://github.com/TrySound/postcss-value-parser.git
│  │  ├─ VendorName: Bogdan Chadkin
│  │  └─ VendorUrl: https://github.com/TrySound/postcss-value-parser
│  ├─ postcss@8.4.39
│  │  ├─ URL: https://github.com/postcss/postcss.git
│  │  ├─ VendorName: Andrey Sitnik
│  │  └─ VendorUrl: https://postcss.org/
│  ├─ prettier@2.8.8
│  │  ├─ URL: https://github.com/prettier/prettier.git
│  │  ├─ VendorName: James Long
│  │  └─ VendorUrl: https://prettier.io/
│  ├─ pretty-bytes@5.6.0
│  │  ├─ URL: https://github.com/sindresorhus/pretty-bytes.git
│  │  ├─ VendorName: Sindre Sorhus
│  │  └─ VendorUrl: https://sindresorhus.com
│  ├─ pretty-format@24.9.0
│  │  ├─ URL: https://github.com/facebook/jest.git
│  │  └─ VendorName: James Kyle
│  ├─ pretty-format@26.6.2
│  │  ├─ URL: https://github.com/facebook/jest.git
│  │  └─ VendorName: James Kyle
│  ├─ pretty-format@29.7.0
│  │  ├─ URL: https://github.com/jestjs/jest.git
│  │  └─ VendorName: James Kyle
│  ├─ process-nextick-args@2.0.1
│  │  ├─ URL: https://github.com/calvinmetcalf/process-nextick-args.git
│  │  └─ VendorUrl: https://github.com/calvinmetcalf/process-nextick-args
│  ├─ process@0.11.10
│  │  ├─ URL: git://github.com/shtylman/node-process.git
│  │  └─ VendorName: Roman Shtylman
│  ├─ progress@2.0.3
│  │  ├─ URL: git://github.com/visionmedia/node-progress
│  │  └─ VendorName: TJ Holowaychuk
│  ├─ promise@7.3.1
│  │  ├─ URL: https://github.com/then/promise.git
│  │  └─ VendorName: ForbesLindesay
│  ├─ promise@8.3.0
│  │  ├─ URL: https://github.com/then/promise.git
│  │  └─ VendorName: ForbesLindesay
│  ├─ prompts@2.4.2
│  │  ├─ URL: https://github.com/terkelg/prompts.git
│  │  ├─ VendorName: Terkel Gjervig
│  │  └─ VendorUrl: https://terkel.com
│  ├─ prop-types@15.8.1
│  │  ├─ URL: https://github.com/facebook/prop-types.git
│  │  └─ VendorUrl: https://facebook.github.io/react/
│  ├─ psl@1.9.0
│  │  ├─ URL: git@github.com:lupomontero/psl.git
│  │  ├─ VendorName: Lupo Montero
│  │  └─ VendorUrl: https://lupomontero.com/
│  ├─ pump@3.0.0
│  │  ├─ URL: git://github.com/mafintosh/pump.git
│  │  └─ VendorName: Mathias Buus Madsen
│  ├─ punycode@1.4.1
│  │  ├─ URL: https://github.com/bestiejs/punycode.js.git
│  │  ├─ VendorName: Mathias Bynens
│  │  └─ VendorUrl: https://mths.be/punycode
│  ├─ punycode@2.3.1
│  │  ├─ URL: https://github.com/mathiasbynens/punycode.js.git
│  │  ├─ VendorName: Mathias Bynens
│  │  └─ VendorUrl: https://mths.be/punycode
│  ├─ pure-rand@6.1.0
│  │  ├─ URL: git+https://github.com/dubzzz/pure-rand.git
│  │  ├─ VendorName: Nicolas DUBIEN
│  │  └─ VendorUrl: https://github.com/dubzzz/pure-rand#readme
│  ├─ qrcode@1.5.3
│  │  ├─ URL: git://github.com/soldair/node-qrcode.git
│  │  ├─ VendorName: Ryan Day
│  │  └─ VendorUrl: http://github.com/soldair/node-qrcode
│  ├─ query-string@7.1.3
│  │  ├─ URL: https://github.com/sindresorhus/query-string.git
│  │  ├─ VendorName: Sindre Sorhus
│  │  └─ VendorUrl: https://sindresorhus.com
│  ├─ querystring@0.2.1
│  │  ├─ URL: git://github.com/Gozala/querystring.git
│  │  └─ VendorName: Irakli Gozalishvili
│  ├─ querystringify@2.2.0
│  │  ├─ URL: https://github.com/unshiftio/querystringify
│  │  ├─ VendorName: Arnout Kazemier
│  │  └─ VendorUrl: https://github.com/unshiftio/querystringify
│  ├─ queue-microtask@1.2.3
│  │  ├─ URL: git://github.com/feross/queue-microtask.git
│  │  ├─ VendorName: Feross Aboukhadijeh
│  │  └─ VendorUrl: https://github.com/feross/queue-microtask
│  ├─ queue@6.0.2
│  │  ├─ URL: https://github.com/jessetane/queue.git
│  │  └─ VendorName: Jesse Tane
│  ├─ range-parser@1.2.1
│  │  ├─ URL: https://github.com/jshttp/range-parser.git
│  │  ├─ VendorName: TJ Holowaychuk
│  │  └─ VendorUrl: http://tjholowaychuk.com
│  ├─ react-devtools-core@5.3.1
│  │  └─ URL: https://github.com/facebook/react.git
│  ├─ react-dom@18.2.0
│  │  ├─ URL: https://github.com/facebook/react.git
│  │  └─ VendorUrl: https://reactjs.org/
│  ├─ react-fast-compare@3.2.2
│  │  ├─ URL: https://github.com/FormidableLabs/react-fast-compare
│  │  ├─ VendorName: Chris Bolin
│  │  └─ VendorUrl: https://github.com/FormidableLabs/react-fast-compare
│  ├─ react-freeze@1.0.4
│  │  └─ URL: https://github.com/software-mansion/react-freeze.git
│  ├─ react-is@16.13.1
│  │  ├─ URL: https://github.com/facebook/react.git
│  │  └─ VendorUrl: https://reactjs.org/
│  ├─ react-is@17.0.2
│  │  ├─ URL: https://github.com/facebook/react.git
│  │  └─ VendorUrl: https://reactjs.org/
│  ├─ react-is@18.3.1
│  │  ├─ URL: https://github.com/facebook/react.git
│  │  └─ VendorUrl: https://reactjs.org/
│  ├─ react-native-awesome-slider@2.5.3
│  │  ├─ URL: git+https://github.com/alantoa/react-native-awesome-slider.git
│  │  ├─ VendorName: Toa
│  │  └─ VendorUrl: https://github.com/alantoa/react-native-awesome-slider
│  ├─ react-native-css-interop@0.0.36
│  │  ├─ URL: https://github.com/marklawlor/nativewind.git
│  │  ├─ VendorName: Mark Lawlor
│  │  └─ VendorUrl: https://nativewind.dev/
│  ├─ react-native-gesture-handler@2.16.2
│  │  ├─ URL: git+https://github.com/software-mansion/react-native-gesture-handler.git
│  │  ├─ VendorName: Krzysztof Magiera
│  │  └─ VendorUrl: https://github.com/software-mansion/react-native-gesture-handler#readme
│  ├─ react-native-image-colors@2.4.0
│  │  ├─ URL: https://github.com/osamaqarem/react-native-image-colors
│  │  ├─ VendorName: OsamaQarem
│  │  └─ VendorUrl: https://github.com/osamaqarem/react-native-image-colors#readme
│  ├─ react-native-linear-gradient@2.8.3
│  │  ├─ URL: https://github.com/react-native-linear-gradient/react-native-linear-gradient.git
│  │  ├─ VendorName: Brent Vatne
│  │  └─ VendorUrl: https://github.com/brentvatne
│  ├─ react-native-pager-view@6.3.0
│  │  ├─ URL: https://github.com/callstack/react-native-pager-view
│  │  ├─ VendorName: troZee
│  │  └─ VendorUrl: https://github.com/callstack/react-native-pager-view#readme
│  ├─ react-native-qrcode-svg@6.3.1
│  │  ├─ URL: git+ssh://git@github.com/awesomejerry/react-native-qrcode-svg.git
│  │  ├─ VendorName: awesomejerry
│  │  └─ VendorUrl: https://github.com/awesomejerry/react-native-qrcode-svg#readme
│  ├─ react-native-reanimated@3.13.0
│  │  ├─ URL: git+https://github.com/software-mansion/react-native-reanimated.git
│  │  ├─ VendorName: Krzysztof Magiera
│  │  └─ VendorUrl: https://github.com/software-mansion/react-native-reanimated#readme
│  ├─ react-native-safe-area-context@4.10.1
│  │  ├─ URL: https://github.com/th3rdwave/react-native-safe-area-context.git
│  │  ├─ VendorName: Janic Duplessis
│  │  └─ VendorUrl: https://github.com/th3rdwave/react-native-safe-area-context#readme
│  ├─ react-native-screens@3.31.1
│  │  ├─ URL: git+https://github.com/software-mansion/react-native-screens.git
│  │  ├─ VendorName: Krzysztof Magiera
│  │  └─ VendorUrl: https://github.com/software-mansion/react-native-screens#readme
│  ├─ react-native-svg@15.4.0
│  │  ├─ URL: https://github.com/react-native-community/react-native-svg
│  │  └─ VendorUrl: https://github.com/react-native-community/react-native-svg
│  ├─ react-native-tab-view@3.5.2
│  │  ├─ URL: https://github.com/react-navigation/react-navigation.git
│  │  └─ VendorUrl: https://reactnavigation.org/docs/tab-view/
│  ├─ react-native-toast-message@2.2.0
│  │  ├─ URL: git+https://github.com/calintamas/react-native-toast-message.git
│  │  └─ VendorName: Calin Tamas
│  ├─ react-native-web@0.19.12
│  │  ├─ URL: git://github.com/necolas/react-native-web.git
│  │  └─ VendorName: Nicolas Gallagher
│  ├─ react-native@0.74.3
│  │  ├─ URL: https://github.com/facebook/react-native.git
│  │  └─ VendorUrl: https://reactnative.dev/
│  ├─ react-refresh@0.14.2
│  │  ├─ URL: https://github.com/facebook/react.git
│  │  └─ VendorUrl: https://reactjs.org/
│  ├─ react-remove-scroll-bar@2.3.6
│  │  ├─ URL: https://github.com/theKashey/react-remove-scroll-bar
│  │  └─ VendorName: Anton Korzunov
│  ├─ react-remove-scroll@2.5.7
│  │  ├─ URL: https://github.com/theKashey/react-remove-scroll
│  │  └─ VendorName: Anton Korzunov
│  ├─ react-shallow-renderer@16.15.0
│  │  ├─ URL: https://github.com/NMinhNguyen/react-shallow-renderer.git
│  │  └─ VendorUrl: https://reactjs.org/
│  ├─ react-style-singleton@2.2.1
│  │  ├─ VendorName: Anton Korzunov
│  │  └─ VendorUrl: https://github.com/theKashey/react-style-singleton#readme
│  ├─ react-test-renderer@18.2.0
│  │  ├─ URL: https://github.com/facebook/react.git
│  │  └─ VendorUrl: https://reactjs.org/
│  ├─ react@18.2.0
│  │  ├─ URL: https://github.com/facebook/react.git
│  │  └─ VendorUrl: https://reactjs.org/
│  ├─ read-cache@1.0.0
│  │  ├─ URL: git+https://github.com/TrySound/read-cache.git
│  │  ├─ VendorName: Bogdan Chadkin
│  │  └─ VendorUrl: https://github.com/TrySound/read-cache#readme
│  ├─ readable-stream@2.3.8
│  │  └─ URL: git://github.com/nodejs/readable-stream
│  ├─ readable-stream@3.6.2
│  │  └─ URL: git://github.com/nodejs/readable-stream
│  ├─ readable-web-to-node-stream@3.0.2
│  │  ├─ URL: https://github.com/Borewit/readable-web-to-node-stream.git
│  │  ├─ VendorName: Borewit
│  │  └─ VendorUrl: https://github.com/Borewit
│  ├─ readdirp@3.6.0
│  │  ├─ URL: git://github.com/paulmillr/readdirp.git
│  │  ├─ VendorName: Thorsten Lorenz
│  │  └─ VendorUrl: https://github.com/paulmillr/readdirp
│  ├─ recast@0.21.5
│  │  ├─ URL: git://github.com/benjamn/recast.git
│  │  ├─ VendorName: Ben Newman
│  │  └─ VendorUrl: http://github.com/benjamn/recast
│  ├─ regenerate-unicode-properties@10.1.1
│  │  ├─ URL: https://github.com/mathiasbynens/regenerate-unicode-properties.git
│  │  ├─ VendorName: Mathias Bynens
│  │  └─ VendorUrl: https://github.com/mathiasbynens/regenerate-unicode-properties
│  ├─ regenerate@1.4.2
│  │  ├─ URL: https://github.com/mathiasbynens/regenerate.git
│  │  ├─ VendorName: Mathias Bynens
│  │  └─ VendorUrl: https://mths.be/regenerate
│  ├─ regenerator-runtime@0.13.11
│  │  ├─ URL: https://github.com/facebook/regenerator/tree/main/packages/runtime
│  │  └─ VendorName: Ben Newman
│  ├─ regenerator-runtime@0.14.1
│  │  ├─ URL: https://github.com/facebook/regenerator/tree/main/packages/runtime
│  │  └─ VendorName: Ben Newman
│  ├─ regexp.prototype.flags@1.5.2
│  │  ├─ URL: git://github.com/es-shims/RegExp.prototype.flags.git
│  │  └─ VendorName: Jordan Harband
│  ├─ regexpu-core@5.3.2
│  │  ├─ URL: https://github.com/mathiasbynens/regexpu-core.git
│  │  ├─ VendorName: Mathias Bynens
│  │  └─ VendorUrl: https://mths.be/regexpu
│  ├─ remove-trailing-slash@0.1.1
│  │  ├─ URL: git://github.com/stephenmathieson/remove-trailing-slash.git
│  │  └─ VendorName: Stephen Mathieson
│  ├─ require-directory@2.1.1
│  │  ├─ URL: git://github.com/troygoode/node-require-directory.git
│  │  ├─ VendorName: Troy Goode
│  │  └─ VendorUrl: https://github.com/troygoode/node-require-directory/
│  ├─ require-from-string@2.0.2
│  │  ├─ URL: https://github.com/floatdrop/require-from-string.git
│  │  ├─ VendorName: Vsevolod Strukchinsky
│  │  └─ VendorUrl: github.com/floatdrop
│  ├─ require-resolve@0.0.2
│  │  ├─ URL: https://github.com/qiu8310/require-resolve
│  │  ├─ VendorName: Zhonglei Qiu
│  │  └─ VendorUrl: https://github.com/qiu8310/require-resolve
│  ├─ requireg@0.2.2
│  │  ├─ URL: https://github.com/h2non/requireg.git
│  │  └─ VendorUrl: http://github.com/h2non/requireg
│  ├─ requires-port@1.0.0
│  │  ├─ URL: https://github.com/unshiftio/requires-port
│  │  ├─ VendorName: Arnout Kazemier
│  │  └─ VendorUrl: https://github.com/unshiftio/requires-port
│  ├─ resolve-cwd@3.0.0
│  │  ├─ URL: https://github.com/sindresorhus/resolve-cwd.git
│  │  ├─ VendorName: Sindre Sorhus
│  │  └─ VendorUrl: sindresorhus.com
│  ├─ resolve-from@3.0.0
│  │  ├─ URL: https://github.com/sindresorhus/resolve-from.git
│  │  ├─ VendorName: Sindre Sorhus
│  │  └─ VendorUrl: sindresorhus.com
│  ├─ resolve-from@5.0.0
│  │  ├─ URL: https://github.com/sindresorhus/resolve-from.git
│  │  ├─ VendorName: Sindre Sorhus
│  │  └─ VendorUrl: sindresorhus.com
│  ├─ resolve-pkg-maps@1.0.0
│  │  ├─ URL: https://github.com/privatenumber/resolve-pkg-maps.git
│  │  └─ VendorName: Hiroki Osame
│  ├─ resolve.exports@2.0.2
│  │  ├─ URL: https://github.com/lukeed/resolve.exports.git
│  │  ├─ VendorName: Luke Edwards
│  │  └─ VendorUrl: https://lukeed.com
│  ├─ resolve@1.22.8
│  │  ├─ URL: git://github.com/browserify/resolve.git
│  │  ├─ VendorName: James Halliday
│  │  └─ VendorUrl: http://substack.net
│  ├─ resolve@1.7.1
│  │  ├─ URL: git://github.com/browserify/resolve.git
│  │  ├─ VendorName: James Halliday
│  │  └─ VendorUrl: http://substack.net
│  ├─ restore-cursor@2.0.0
│  │  ├─ URL: https://github.com/sindresorhus/restore-cursor.git
│  │  ├─ VendorName: Sindre Sorhus
│  │  └─ VendorUrl: sindresorhus.com
│  ├─ restore-cursor@3.1.0
│  │  ├─ URL: https://github.com/sindresorhus/restore-cursor.git
│  │  ├─ VendorName: Sindre Sorhus
│  │  └─ VendorUrl: sindresorhus.com
│  ├─ reusify@1.0.4
│  │  ├─ URL: git+https://github.com/mcollina/reusify.git
│  │  ├─ VendorName: Matteo Collina
│  │  └─ VendorUrl: https://github.com/mcollina/reusify#readme
│  ├─ run-parallel@1.2.0
│  │  ├─ URL: git://github.com/feross/run-parallel.git
│  │  ├─ VendorName: Feross Aboukhadijeh
│  │  └─ VendorUrl: https://github.com/feross/run-parallel
│  ├─ safe-array-concat@1.1.2
│  │  ├─ URL: git+https://github.com/ljharb/safe-array-concat.git
│  │  ├─ VendorName: Jordan Harband
│  │  └─ VendorUrl: https://github.com/ljharb/safe-array-concat#readme
│  ├─ safe-buffer@5.1.2
│  │  ├─ URL: git://github.com/feross/safe-buffer.git
│  │  ├─ VendorName: Feross Aboukhadijeh
│  │  └─ VendorUrl: https://github.com/feross/safe-buffer
│  ├─ safe-buffer@5.2.1
│  │  ├─ URL: git://github.com/feross/safe-buffer.git
│  │  ├─ VendorName: Feross Aboukhadijeh
│  │  └─ VendorUrl: https://github.com/feross/safe-buffer
│  ├─ safe-json-stringify@1.2.0
│  │  ├─ URL: git@github.com:debitoor/safe-json-stringify.git
│  │  ├─ VendorName: Debitoor
│  │  └─ VendorUrl: https://github.com/debitoor/safe-json-stringify
│  ├─ safe-regex-test@1.0.3
│  │  ├─ URL: git+https://github.com/ljharb/safe-regex-test.git
│  │  ├─ VendorName: Jordan Harband
│  │  └─ VendorUrl: https://github.com/ljharb/safe-regex-test#readme
│  ├─ safer-buffer@2.1.2
│  │  ├─ URL: git+https://github.com/ChALkeR/safer-buffer.git
│  │  ├─ VendorName: Nikita Skovoroda
│  │  └─ VendorUrl: https://github.com/ChALkeR
│  ├─ scheduler@0.23.2
│  │  ├─ URL: https://github.com/facebook/react.git
│  │  └─ VendorUrl: https://reactjs.org/
│  ├─ scheduler@0.24.0-canary-efb381bbf-20230505
│  │  ├─ URL: https://github.com/facebook/react.git
│  │  └─ VendorUrl: https://reactjs.org/
│  ├─ schema-utils@4.2.0
│  │  ├─ URL: https://github.com/webpack/schema-utils.git
│  │  ├─ VendorName: webpack Contrib
│  │  └─ VendorUrl: https://github.com/webpack/schema-utils
│  ├─ selfsigned@2.4.1
│  │  ├─ URL: git://github.com/jfromaniello/selfsigned.git
│  │  ├─ VendorName: José F. Romaniello
│  │  └─ VendorUrl: http://joseoncode.com
│  ├─ send@0.18.0
│  │  ├─ URL: https://github.com/pillarjs/send.git
│  │  └─ VendorName: TJ Holowaychuk
│  ├─ serialize-error@2.1.0
│  │  ├─ URL: https://github.com/sindresorhus/serialize-error.git
│  │  ├─ VendorName: Sindre Sorhus
│  │  └─ VendorUrl: sindresorhus.com
│  ├─ serve-static@1.15.0
│  │  ├─ URL: https://github.com/expressjs/serve-static.git
│  │  └─ VendorName: Douglas Christopher Wilson
│  ├─ set-cookie-parser@2.6.0
│  │  ├─ URL: https://github.com/nfriedly/set-cookie-parser.git
│  │  ├─ VendorName: Nathan Friedly
│  │  └─ VendorUrl: https://github.com/nfriedly/set-cookie-parser
│  ├─ set-function-length@1.2.2
│  │  ├─ URL: git+https://github.com/ljharb/set-function-length.git
│  │  ├─ VendorName: Jordan Harband
│  │  └─ VendorUrl: https://github.com/ljharb/set-function-length#readme
│  ├─ set-function-name@2.0.2
│  │  ├─ URL: git+https://github.com/ljharb/set-function-name.git
│  │  ├─ VendorName: Jordan Harband
│  │  └─ VendorUrl: https://github.com/ljharb/set-function-name#readme
│  ├─ setimmediate@1.0.5
│  │  ├─ URL: https://github.com/YuzuJS/setImmediate.git
│  │  └─ VendorName: YuzuJS
│  ├─ shallow-clone@3.0.1
│  │  ├─ URL: https://github.com/jonschlinkert/shallow-clone.git
│  │  ├─ VendorName: Jon Schlinkert
│  │  └─ VendorUrl: https://github.com/jonschlinkert/shallow-clone
│  ├─ shallowequal@1.1.0
│  │  ├─ URL: https://github.com/dashed/shallowequal.git
│  │  ├─ VendorName: Alberto Leal
│  │  └─ VendorUrl: github.com/dashed
│  ├─ shebang-command@1.2.0
│  │  ├─ URL: https://github.com/kevva/shebang-command.git
│  │  ├─ VendorName: Kevin Martensson
│  │  └─ VendorUrl: github.com/kevva
│  ├─ shebang-command@2.0.0
│  │  ├─ URL: https://github.com/kevva/shebang-command.git
│  │  ├─ VendorName: Kevin Mårtensson
│  │  └─ VendorUrl: github.com/kevva
│  ├─ shebang-regex@1.0.0
│  │  ├─ URL: https://github.com/sindresorhus/shebang-regex.git
│  │  ├─ VendorName: Sindre Sorhus
│  │  └─ VendorUrl: sindresorhus.com
│  ├─ shebang-regex@3.0.0
│  │  ├─ URL: https://github.com/sindresorhus/shebang-regex.git
│  │  ├─ VendorName: Sindre Sorhus
│  │  └─ VendorUrl: sindresorhus.com
│  ├─ shell-quote@1.8.1
│  │  ├─ URL: http://github.com/ljharb/shell-quote.git
│  │  ├─ VendorName: James Halliday
│  │  └─ VendorUrl: https://github.com/ljharb/shell-quote
│  ├─ side-channel@1.0.6
│  │  ├─ URL: git+https://github.com/ljharb/side-channel.git
│  │  ├─ VendorName: Jordan Harband
│  │  └─ VendorUrl: https://github.com/ljharb/side-channel#readme
│  ├─ simple-plist@1.3.1
│  │  ├─ URL: https://github.com/wollardj/simple-plist.git
│  │  ├─ VendorName: Joe Wollard
│  │  └─ VendorUrl: https://github.com/wollardj/simple-plist.git
│  ├─ simple-swizzle@0.2.2
│  │  ├─ URL: https://github.com/qix-/node-simple-swizzle.git
│  │  ├─ VendorName: Qix
│  │  └─ VendorUrl: http://github.com/qix-
│  ├─ sisteransi@1.0.5
│  │  ├─ URL: https://github.com/terkelg/sisteransi
│  │  ├─ VendorName: Terkel Gjervig
│  │  └─ VendorUrl: https://terkel.com
│  ├─ slash@3.0.0
│  │  ├─ URL: https://github.com/sindresorhus/slash.git
│  │  ├─ VendorName: Sindre Sorhus
│  │  └─ VendorUrl: sindresorhus.com
│  ├─ slash@5.1.0
│  │  ├─ URL: https://github.com/sindresorhus/slash.git
│  │  ├─ VendorName: Sindre Sorhus
│  │  └─ VendorUrl: https://sindresorhus.com
│  ├─ slice-ansi@2.1.0
│  │  └─ URL: https://github.com/chalk/slice-ansi.git
│  ├─ slugify@1.6.6
│  │  ├─ URL: https://github.com/simov/slugify.git
│  │  ├─ VendorName: Simeon Velichkov
│  │  └─ VendorUrl: https://github.com/simov/slugify
│  ├─ source-map-support@0.5.13
│  │  └─ URL: https://github.com/evanw/node-source-map-support
│  ├─ source-map-support@0.5.21
│  │  └─ URL: https://github.com/evanw/node-source-map-support
│  ├─ split-on-first@1.1.0
│  │  ├─ URL: https://github.com/sindresorhus/split-on-first.git
│  │  ├─ VendorName: Sindre Sorhus
│  │  └─ VendorUrl: sindresorhus.com
│  ├─ split@1.0.1
│  │  ├─ URL: git://github.com/dominictarr/split.git
│  │  ├─ VendorName: Dominic Tarr
│  │  └─ VendorUrl: http://github.com/dominictarr/split
│  ├─ stack-generator@2.0.10
│  │  ├─ URL: git://github.com/stacktracejs/stack-generator.git
│  │  └─ VendorUrl: https://www.stacktracejs.com/
│  ├─ stack-utils@2.0.6
│  │  ├─ URL: https://github.com/tapjs/stack-utils.git
│  │  ├─ VendorName: James Talmage
│  │  └─ VendorUrl: github.com/jamestalmage
│  ├─ stackframe@1.3.4
│  │  ├─ URL: git://github.com/stacktracejs/stackframe.git
│  │  └─ VendorUrl: https://www.stacktracejs.com/
│  ├─ stacktrace-gps@3.1.2
│  │  ├─ URL: git://github.com/stacktracejs/stacktrace-gps.git
│  │  └─ VendorUrl: https://www.stacktracejs.com/
│  ├─ stacktrace-js@2.0.2
│  │  ├─ URL: git://github.com/stacktracejs/stacktrace.js.git
│  │  └─ VendorUrl: https://www.stacktracejs.com/
│  ├─ stacktrace-parser@0.1.10
│  │  ├─ URL: https://github.com/errwischt/stacktrace-parser
│  │  ├─ VendorName: Georg Tavonius
│  │  └─ VendorUrl: https://github.com/errwischt/stacktrace-parser
│  ├─ statuses@1.5.0
│  │  └─ URL: https://github.com/jshttp/statuses.git
│  ├─ statuses@2.0.1
│  │  └─ URL: https://github.com/jshttp/statuses.git
│  ├─ stream-slice@0.1.2
│  │  ├─ URL: git@github.com:yorkie/stream-slice.git
│  │  ├─ VendorName: Yorkie Neil
│  │  └─ VendorUrl: https://github.com/yorkie/stream-slice
│  ├─ strict-uri-encode@2.0.0
│  │  ├─ URL: https://github.com/kevva/strict-uri-encode.git
│  │  ├─ VendorName: Kevin Mårtensson
│  │  └─ VendorUrl: github.com/kevva
│  ├─ string_decoder@1.1.1
│  │  ├─ URL: git://github.com/nodejs/string_decoder.git
│  │  └─ VendorUrl: https://github.com/nodejs/string_decoder
│  ├─ string_decoder@1.3.0
│  │  ├─ URL: git://github.com/nodejs/string_decoder.git
│  │  └─ VendorUrl: https://github.com/nodejs/string_decoder
│  ├─ string-length@4.0.2
│  │  ├─ URL: https://github.com/sindresorhus/string-length.git
│  │  ├─ VendorName: Sindre Sorhus
│  │  └─ VendorUrl: https://sindresorhus.com
│  ├─ string-length@5.0.1
│  │  ├─ URL: https://github.com/sindresorhus/string-length.git
│  │  ├─ VendorName: Sindre Sorhus
│  │  └─ VendorUrl: https://sindresorhus.com
│  ├─ string-width-cjs@4.2.3
│  │  ├─ URL: https://github.com/sindresorhus/string-width.git
│  │  ├─ VendorName: Sindre Sorhus
│  │  └─ VendorUrl: sindresorhus.com
│  ├─ string-width@4.2.3
│  │  ├─ URL: https://github.com/sindresorhus/string-width.git
│  │  ├─ VendorName: Sindre Sorhus
│  │  └─ VendorUrl: sindresorhus.com
│  ├─ string-width@5.1.2
│  │  ├─ URL: https://github.com/sindresorhus/string-width.git
│  │  ├─ VendorName: Sindre Sorhus
│  │  └─ VendorUrl: https://sindresorhus.com
│  ├─ string.prototype.trim@1.2.9
│  │  ├─ URL: git://github.com/es-shims/String.prototype.trim.git
│  │  ├─ VendorName: Jordan Harband
│  │  └─ VendorUrl: http://ljharb.codes
│  ├─ string.prototype.trimend@1.0.8
│  │  ├─ URL: git://github.com/es-shims/String.prototype.trimEnd.git
│  │  └─ VendorName: Jordan Harband
│  ├─ string.prototype.trimstart@1.0.8
│  │  ├─ URL: git://github.com/es-shims/String.prototype.trimStart.git
│  │  └─ VendorName: Jordan Harband
│  ├─ strip-ansi-cjs@6.0.1
│  │  ├─ URL: https://github.com/chalk/strip-ansi.git
│  │  ├─ VendorName: Sindre Sorhus
│  │  └─ VendorUrl: sindresorhus.com
│  ├─ strip-ansi@5.2.0
│  │  ├─ URL: https://github.com/chalk/strip-ansi.git
│  │  ├─ VendorName: Sindre Sorhus
│  │  └─ VendorUrl: sindresorhus.com
│  ├─ strip-ansi@6.0.1
│  │  ├─ URL: https://github.com/chalk/strip-ansi.git
│  │  ├─ VendorName: Sindre Sorhus
│  │  └─ VendorUrl: sindresorhus.com
│  ├─ strip-ansi@7.1.0
│  │  ├─ URL: https://github.com/chalk/strip-ansi.git
│  │  ├─ VendorName: Sindre Sorhus
│  │  └─ VendorUrl: https://sindresorhus.com
│  ├─ strip-bom@4.0.0
│  │  ├─ URL: https://github.com/sindresorhus/strip-bom.git
│  │  ├─ VendorName: Sindre Sorhus
│  │  └─ VendorUrl: sindresorhus.com
│  ├─ strip-eof@1.0.0
│  │  ├─ URL: https://github.com/sindresorhus/strip-eof.git
│  │  ├─ VendorName: Sindre Sorhus
│  │  └─ VendorUrl: sindresorhus.com
│  ├─ strip-final-newline@2.0.0
│  │  ├─ URL: https://github.com/sindresorhus/strip-final-newline.git
│  │  ├─ VendorName: Sindre Sorhus
│  │  └─ VendorUrl: sindresorhus.com
│  ├─ strip-indent@3.0.0
│  │  ├─ URL: https://github.com/sindresorhus/strip-indent.git
│  │  ├─ VendorName: Sindre Sorhus
│  │  └─ VendorUrl: sindresorhus.com
│  ├─ strip-json-comments@2.0.1
│  │  ├─ URL: https://github.com/sindresorhus/strip-json-comments.git
│  │  ├─ VendorName: Sindre Sorhus
│  │  └─ VendorUrl: sindresorhus.com
│  ├─ strip-json-comments@3.1.1
│  │  ├─ URL: https://github.com/sindresorhus/strip-json-comments.git
│  │  ├─ VendorName: Sindre Sorhus
│  │  └─ VendorUrl: https://sindresorhus.com
│  ├─ strnum@1.0.5
│  │  ├─ URL: https://github.com/NaturalIntelligence/strnum
│  │  ├─ VendorName: Amit Gupta
│  │  └─ VendorUrl: https://amitkumargupta.work/
│  ├─ strtok3@6.3.0
│  │  ├─ URL: https://github.com/Borewit/strtok3.git
│  │  ├─ VendorName: Borewit
│  │  └─ VendorUrl: https://github.com/Borewit
│  ├─ structured-headers@0.4.1
│  │  ├─ URL: git+ssh://git@github.com/evert/structured-header.git
│  │  ├─ VendorName: Evert Pot
│  │  └─ VendorUrl: https://github.com/evert/structured-header#readme
│  ├─ style-value-types@5.0.0
│  │  ├─ URL: https://github.com/Popmotion/popmotion/tree/master/packages/style-value-types
│  │  ├─ VendorName: Matt Perry
│  │  └─ VendorUrl: https://popmotion.io/
│  ├─ styleq@0.1.3
│  │  ├─ URL: https://github.com/necolas/styleq
│  │  └─ VendorName: Nicolas Gallagher
│  ├─ sucrase@3.34.0
│  │  ├─ URL: https://github.com/alangpierce/sucrase.git
│  │  └─ VendorName: Alan Pierce
│  ├─ sucrase@3.35.0
│  │  ├─ URL: https://github.com/alangpierce/sucrase.git
│  │  └─ VendorName: Alan Pierce
│  ├─ sudo-prompt@8.2.5
│  │  ├─ URL: git+https://github.com/jorangreef/sudo-prompt.git
│  │  ├─ VendorName: Joran Dirk Greef
│  │  └─ VendorUrl: https://github.com/jorangreef/sudo-prompt#readme
│  ├─ sudo-prompt@9.1.1
│  │  ├─ URL: git+https://github.com/jorangreef/sudo-prompt.git
│  │  ├─ VendorName: Joran Dirk Greef
│  │  └─ VendorUrl: https://github.com/jorangreef/sudo-prompt#readme
│  ├─ sudo-prompt@9.2.1
│  │  ├─ URL: git+https://github.com/jorangreef/sudo-prompt.git
│  │  ├─ VendorName: Joran Dirk Greef
│  │  └─ VendorUrl: https://github.com/jorangreef/sudo-prompt#readme
│  ├─ supports-color@5.5.0
│  │  ├─ URL: https://github.com/chalk/supports-color.git
│  │  ├─ VendorName: Sindre Sorhus
│  │  └─ VendorUrl: sindresorhus.com
│  ├─ supports-color@7.2.0
│  │  ├─ URL: https://github.com/chalk/supports-color.git
│  │  ├─ VendorName: Sindre Sorhus
│  │  └─ VendorUrl: sindresorhus.com
│  ├─ supports-color@8.1.1
│  │  ├─ URL: https://github.com/chalk/supports-color.git
│  │  ├─ VendorName: Sindre Sorhus
│  │  └─ VendorUrl: https://sindresorhus.com
│  ├─ supports-hyperlinks@2.3.0
│  │  ├─ URL: https://github.com/jamestalmage/supports-hyperlinks.git
│  │  ├─ VendorName: James Talmage
│  │  └─ VendorUrl: github.com/jamestalmage
│  ├─ supports-preserve-symlinks-flag@1.0.0
│  │  ├─ URL: git+https://github.com/inspect-js/node-supports-preserve-symlinks-flag.git
│  │  ├─ VendorName: Jordan Harband
│  │  └─ VendorUrl: https://github.com/inspect-js/node-supports-preserve-symlinks-flag#readme
│  ├─ symbol-tree@3.2.4
│  │  ├─ URL: https://github.com/jsdom/js-symbol-tree.git
│  │  ├─ VendorName: Joris van der Wel
│  │  └─ VendorUrl: https://github.com/jsdom/js-symbol-tree#symbol-tree
│  ├─ tailwind-merge@2.4.0
│  │  ├─ URL: https://github.com/dcastil/tailwind-merge.git
│  │  ├─ VendorName: Dany Castillo
│  │  └─ VendorUrl: https://github.com/dcastil/tailwind-merge
│  ├─ tailwindcss-animate@1.0.7
│  │  └─ VendorName: Jamie Kyle
│  ├─ tailwindcss@3.4.4
│  │  ├─ URL: https://github.com/tailwindlabs/tailwindcss.git
│  │  └─ VendorUrl: https://tailwindcss.com/
│  ├─ temp-dir@1.0.0
│  │  ├─ URL: https://github.com/sindresorhus/temp-dir.git
│  │  ├─ VendorName: Sindre Sorhus
│  │  └─ VendorUrl: sindresorhus.com
│  ├─ temp-dir@2.0.0
│  │  ├─ URL: https://github.com/sindresorhus/temp-dir.git
│  │  ├─ VendorName: Sindre Sorhus
│  │  └─ VendorUrl: sindresorhus.com
│  ├─ temp@0.8.4
│  │  ├─ URL: git://github.com/bruce/node-temp.git
│  │  └─ VendorName: Bruce Williams
│  ├─ tempy@0.3.0
│  │  ├─ URL: https://github.com/sindresorhus/tempy.git
│  │  ├─ VendorName: Sindre Sorhus
│  │  └─ VendorUrl: sindresorhus.com
│  ├─ tempy@0.7.1
│  │  ├─ URL: https://github.com/sindresorhus/tempy.git
│  │  ├─ VendorName: Sindre Sorhus
│  │  └─ VendorUrl: https://sindresorhus.com
│  ├─ terminal-link@2.1.1
│  │  ├─ URL: https://github.com/sindresorhus/terminal-link.git
│  │  ├─ VendorName: Sindre Sorhus
│  │  └─ VendorUrl: sindresorhus.com
│  ├─ text-table@0.2.0
│  │  ├─ URL: git://github.com/substack/text-table.git
│  │  ├─ VendorName: James Halliday
│  │  └─ VendorUrl: https://github.com/substack/text-table
│  ├─ thenify-all@1.6.0
│  │  ├─ URL: https://github.com/thenables/thenify-all.git
│  │  ├─ VendorName: Jonathan Ong
│  │  └─ VendorUrl: http://jongleberry.com
│  ├─ thenify@3.3.1
│  │  ├─ URL: https://github.com/thenables/thenify.git
│  │  ├─ VendorName: Jonathan Ong
│  │  └─ VendorUrl: http://jongleberry.com
│  ├─ throat@5.0.0
│  │  ├─ URL: https://github.com/ForbesLindesay/throat.git
│  │  └─ VendorName: ForbesLindesay
│  ├─ through@2.3.8
│  │  ├─ URL: https://github.com/dominictarr/through.git
│  │  ├─ VendorName: Dominic Tarr
│  │  └─ VendorUrl: https://github.com/dominictarr/through
│  ├─ through2@2.0.5
│  │  ├─ URL: https://github.com/rvagg/through2.git
│  │  ├─ VendorName: Rod Vagg
│  │  └─ VendorUrl: https://github.com/rvagg
│  ├─ timm@1.7.1
│  │  ├─ URL: https://github.com/guigrpa/timm.git
│  │  ├─ VendorName: Guillermo Grau Panea
│  │  └─ VendorUrl: http://guigrpa.github.io/timm/
│  ├─ tinycolor2@1.6.0
│  │  ├─ URL: https://github.com/bgrins/TinyColor.git
│  │  ├─ VendorName: Brian Grinstead
│  │  └─ VendorUrl: http://briangrinstead.com
│  ├─ tmp@0.0.33
│  │  ├─ URL: https://github.com/raszi/node-tmp.git
│  │  ├─ VendorName: KARASZI István
│  │  └─ VendorUrl: http://github.com/raszi/node-tmp
│  ├─ to-fast-properties@2.0.0
│  │  ├─ URL: https://github.com/sindresorhus/to-fast-properties.git
│  │  ├─ VendorName: Sindre Sorhus
│  │  └─ VendorUrl: sindresorhus.com
│  ├─ to-regex-range@5.0.1
│  │  ├─ URL: https://github.com/micromatch/to-regex-range.git
│  │  ├─ VendorName: Jon Schlinkert
│  │  └─ VendorUrl: https://github.com/micromatch/to-regex-range
│  ├─ toidentifier@1.0.1
│  │  ├─ URL: https://github.com/component/toidentifier.git
│  │  └─ VendorName: Douglas Christopher Wilson
│  ├─ token-types@4.2.1
│  │  ├─ URL: https://github.com/Borewit/token-types
│  │  ├─ VendorName: Borewit
│  │  └─ VendorUrl: https://github.com/Borewit
│  ├─ tr46@0.0.3
│  │  ├─ URL: git+https://github.com/Sebmaster/tr46.js.git
│  │  ├─ VendorName: Sebastian Mayr
│  │  └─ VendorUrl: https://github.com/Sebmaster/tr46.js#readme
│  ├─ tr46@3.0.0
│  │  ├─ URL: https://github.com/jsdom/tr46
│  │  └─ VendorName: Sebastian Mayr
│  ├─ traverse@0.6.9
│  │  ├─ URL: git://github.com/ljharb/js-traverse.git
│  │  ├─ VendorName: James Halliday
│  │  └─ VendorUrl: https://github.com/ljharb/js-traverse
│  ├─ trim-right@1.0.1
│  │  ├─ URL: https://github.com/sindresorhus/trim-right.git
│  │  ├─ VendorName: Sindre Sorhus
│  │  └─ VendorUrl: sindresorhus.com
│  ├─ type-detect@4.0.8
│  │  ├─ URL: git+ssh://git@github.com/chaijs/type-detect.git
│  │  ├─ VendorName: Jake Luer
│  │  └─ VendorUrl: http://alogicalparadox.com
│  ├─ typed-array-buffer@1.0.2
│  │  ├─ URL: git+https://github.com/ljharb/typed-array-buffer.git
│  │  ├─ VendorName: Jordan Harband
│  │  └─ VendorUrl: https://github.com/ljharb/typed-array-buffer#readme
│  ├─ typed-array-byte-length@1.0.1
│  │  ├─ URL: git+https://github.com/inspect-js/typed-array-byte-length.git
│  │  ├─ VendorName: Jordan Harband
│  │  └─ VendorUrl: https://github.com/inspect-js/typed-array-byte-length#readme
│  ├─ typed-array-byte-offset@1.0.2
│  │  ├─ URL: git+https://github.com/inspect-js/typed-array-byte-offset.git
│  │  ├─ VendorName: Jordan Harband
│  │  └─ VendorUrl: https://github.com/inspect-js/typed-array-byte-offset#readme
│  ├─ typed-array-length@1.0.6
│  │  ├─ URL: git+https://github.com/inspect-js/typed-array-length.git
│  │  ├─ VendorName: Jordan Harband
│  │  └─ VendorUrl: https://github.com/inspect-js/typed-array-length#readme
│  ├─ typedarray.prototype.slice@1.0.3
│  │  ├─ URL: git+https://github.com/es-shims/TypedArray.prototype.slice.git
│  │  ├─ VendorName: Jordan Harband
│  │  └─ VendorUrl: https://github.com/es-shims/TypedArray.prototype.slice#readme
│  ├─ ua-parser-js@0.7.38
│  │  ├─ URL: https://github.com/faisalman/ua-parser-js.git
│  │  ├─ VendorName: Faisal Salman
│  │  └─ VendorUrl: https://github.com/faisalman/ua-parser-js
│  ├─ ua-parser-js@1.0.38
│  │  ├─ URL: https://github.com/faisalman/ua-parser-js.git
│  │  ├─ VendorName: Faisal Salman
│  │  └─ VendorUrl: https://github.com/faisalman/ua-parser-js
│  ├─ unbox-primitive@1.0.2
│  │  ├─ URL: git+https://github.com/ljharb/unbox-primitive.git
│  │  ├─ VendorName: Jordan Harband
│  │  └─ VendorUrl: https://github.com/ljharb/unbox-primitive#readme
│  ├─ undici-types@5.26.5
│  │  ├─ URL: git+https://github.com/nodejs/undici.git
│  │  └─ VendorUrl: https://undici.nodejs.org/
│  ├─ undici@6.19.2
│  │  ├─ URL: git+https://github.com/nodejs/undici.git
│  │  └─ VendorUrl: https://undici.nodejs.org/
│  ├─ unicode-canonical-property-names-ecmascript@2.0.0
│  │  ├─ URL: https://github.com/mathiasbynens/unicode-canonical-property-names-ecmascript.git
│  │  ├─ VendorName: Mathias Bynens
│  │  └─ VendorUrl: https://github.com/mathiasbynens/unicode-canonical-property-names-ecmascript
│  ├─ unicode-match-property-ecmascript@2.0.0
│  │  ├─ URL: https://github.com/mathiasbynens/unicode-match-property-ecmascript.git
│  │  ├─ VendorName: Mathias Bynens
│  │  └─ VendorUrl: https://github.com/mathiasbynens/unicode-match-property-ecmascript
│  ├─ unicode-match-property-value-ecmascript@2.1.0
│  │  ├─ URL: https://github.com/mathiasbynens/unicode-match-property-value-ecmascript.git
│  │  ├─ VendorName: Mathias Bynens
│  │  └─ VendorUrl: https://github.com/mathiasbynens/unicode-match-property-value-ecmascript
│  ├─ unicode-property-aliases-ecmascript@2.1.0
│  │  ├─ URL: https://github.com/mathiasbynens/unicode-property-aliases-ecmascript.git
│  │  ├─ VendorName: Mathias Bynens
│  │  └─ VendorUrl: https://github.com/mathiasbynens/unicode-property-aliases-ecmascript
│  ├─ unique-string@1.0.0
│  │  ├─ URL: https://github.com/sindresorhus/unique-string.git
│  │  ├─ VendorName: Sindre Sorhus
│  │  └─ VendorUrl: sindresorhus.com
│  ├─ unique-string@2.0.0
│  │  ├─ URL: https://github.com/sindresorhus/unique-string.git
│  │  ├─ VendorName: Sindre Sorhus
│  │  └─ VendorUrl: sindresorhus.com
│  ├─ universalify@0.1.2
│  │  ├─ URL: git+https://github.com/RyanZim/universalify.git
│  │  ├─ VendorName: Ryan Zimmerman
│  │  └─ VendorUrl: https://github.com/RyanZim/universalify#readme
│  ├─ universalify@0.2.0
│  │  ├─ URL: git+https://github.com/RyanZim/universalify.git
│  │  ├─ VendorName: Ryan Zimmerman
│  │  └─ VendorUrl: https://github.com/RyanZim/universalify#readme
│  ├─ universalify@1.0.0
│  │  ├─ URL: git+https://github.com/RyanZim/universalify.git
│  │  ├─ VendorName: Ryan Zimmerman
│  │  └─ VendorUrl: https://github.com/RyanZim/universalify#readme
│  ├─ universalify@2.0.1
│  │  ├─ URL: git+https://github.com/RyanZim/universalify.git
│  │  ├─ VendorName: Ryan Zimmerman
│  │  └─ VendorUrl: https://github.com/RyanZim/universalify#readme
│  ├─ unpipe@1.0.0
│  │  ├─ URL: https://github.com/stream-utils/unpipe.git
│  │  └─ VendorName: Douglas Christopher Wilson
│  ├─ update-browserslist-db@1.1.0
│  │  ├─ URL: https://github.com/browserslist/update-db.git
│  │  └─ VendorName: Andrey Sitnik
│  ├─ url-join@4.0.0
│  │  ├─ URL: git://github.com/jfromaniello/url-join.git
│  │  ├─ VendorName: José F. Romaniello
│  │  └─ VendorUrl: http://joseoncode.com
│  ├─ url-parse@1.5.10
│  │  ├─ URL: https://github.com/unshiftio/url-parse.git
│  │  └─ VendorName: Arnout Kazemier
│  ├─ url@0.11.3
│  │  ├─ URL: https://github.com/defunctzombie/node-url.git
│  │  └─ VendorName: defunctzombie
│  ├─ use-callback-ref@1.3.2
│  │  ├─ URL: https://github.com/theKashey/use-callback-ref/
│  │  └─ VendorName: theKashey
│  ├─ use-latest-callback@0.1.11
│  │  ├─ URL: https://github.com/satya164/use-latest-callback
│  │  └─ VendorName: Satyajit Sahoo
│  ├─ use-sidecar@1.1.2
│  │  ├─ URL: https://github.com/theKashey/use-sidecar
│  │  ├─ VendorName: theKashey
│  │  └─ VendorUrl: https://github.com/theKashey/use-sidecar
│  ├─ use-sync-external-store@1.2.0
│  │  └─ URL: https://github.com/facebook/react.git
│  ├─ utif@2.0.1
│  │  ├─ URL: https://github.com/photopea/UTIF.js.git
│  │  ├─ VendorName: photopea
│  │  └─ VendorUrl: https://github.com/photopea/UTIF.js
│  ├─ util-deprecate@1.0.2
│  │  ├─ URL: git://github.com/TooTallNate/util-deprecate.git
│  │  ├─ VendorName: Nathan Rajlich
│  │  └─ VendorUrl: https://github.com/TooTallNate/util-deprecate
│  ├─ util@0.12.5
│  │  ├─ URL: git://github.com/browserify/node-util
│  │  ├─ VendorName: Joyent
│  │  └─ VendorUrl: https://github.com/browserify/node-util
│  ├─ utils-merge@1.0.1
│  │  ├─ URL: git://github.com/jaredhanson/utils-merge.git
│  │  ├─ VendorName: Jared Hanson
│  │  └─ VendorUrl: http://www.jaredhanson.net/
│  ├─ uuid@7.0.3
│  │  └─ URL: https://github.com/uuidjs/uuid.git
│  ├─ uuid@8.3.2
│  │  └─ URL: https://github.com/uuidjs/uuid.git
│  ├─ valid-url@1.0.9
│  │  └─ URL: git://github.com/ogt/valid-url.git
│  ├─ vary@1.1.2
│  │  ├─ URL: https://github.com/jshttp/vary.git
│  │  └─ VendorName: Douglas Christopher Wilson
│  ├─ vlq@1.0.1
│  │  ├─ URL: https://github.com/Rich-Harris/vlq
│  │  └─ VendorName: Rich Harris
│  ├─ w3c-xmlserializer@4.0.0
│  │  └─ URL: https://github.com/jsdom/w3c-xmlserializer.git
│  ├─ warn-once@0.1.1
│  │  ├─ URL: https://github.com/satya164/warn-once
│  │  └─ VendorName: Satyajit Sahoo
│  ├─ wcwidth@1.0.1
│  │  ├─ URL: git+https://github.com/timoxley/wcwidth.git
│  │  ├─ VendorName: Tim Oxley
│  │  └─ VendorUrl: https://github.com/timoxley/wcwidth#readme
│  ├─ web-encoding@1.1.5
│  │  ├─ URL: https://github.com/gozala/web-encoding
│  │  ├─ VendorName: Irakli Gozalishvili
│  │  └─ VendorUrl: https://github.com/gozala/web-encoding
│  ├─ web-streams-polyfill@3.3.3
│  │  ├─ URL: git+https://github.com/MattiasBuelens/web-streams-polyfill.git
│  │  ├─ VendorName: Mattias Buelens
│  │  └─ VendorUrl: https://github.com/MattiasBuelens/web-streams-polyfill#readme
│  ├─ whatwg-encoding@2.0.0
│  │  ├─ URL: https://github.com/jsdom/whatwg-encoding.git
│  │  ├─ VendorName: Domenic Denicola
│  │  └─ VendorUrl: https://domenic.me/
│  ├─ whatwg-fetch@3.6.20
│  │  └─ URL: https://github.com/github/fetch.git
│  ├─ whatwg-mimetype@3.0.0
│  │  ├─ URL: https://github.com/jsdom/whatwg-mimetype.git
│  │  ├─ VendorName: Domenic Denicola
│  │  └─ VendorUrl: https://domenic.me/
│  ├─ whatwg-url-without-unicode@8.0.0-3
│  │  ├─ URL: https://github.com/charpeni/whatwg-url.git
│  │  └─ VendorName: Sebastian Mayr
│  ├─ whatwg-url@11.0.0
│  │  ├─ URL: https://github.com/jsdom/whatwg-url.git
│  │  └─ VendorName: Sebastian Mayr
│  ├─ whatwg-url@5.0.0
│  │  ├─ URL: https://github.com/jsdom/whatwg-url.git
│  │  └─ VendorName: Sebastian Mayr
│  ├─ which-boxed-primitive@1.0.2
│  │  ├─ URL: git+https://github.com/inspect-js/which-boxed-primitive.git
│  │  ├─ VendorName: Jordan Harband
│  │  └─ VendorUrl: https://github.com/inspect-js/which-boxed-primitive#readme
│  ├─ which-typed-array@1.1.15
│  │  ├─ URL: git://github.com/inspect-js/which-typed-array.git
│  │  ├─ VendorName: Jordan Harband
│  │  └─ VendorUrl: http://ljharb.codes
│  ├─ wonka@4.0.15
│  │  ├─ URL: https://github.com/kitten/wonka
│  │  ├─ VendorName: Phil Pluckthun
│  │  └─ VendorUrl: https://wonka.kitten.sh/
│  ├─ wonka@6.3.4
│  │  ├─ URL: https://github.com/0no-co/wonka
│  │  └─ VendorName: 0no.co
│  ├─ wrap-ansi-cjs@7.0.0
│  │  ├─ URL: https://github.com/chalk/wrap-ansi.git
│  │  ├─ VendorName: Sindre Sorhus
│  │  └─ VendorUrl: https://sindresorhus.com
│  ├─ wrap-ansi@6.2.0
│  │  ├─ URL: https://github.com/chalk/wrap-ansi.git
│  │  ├─ VendorName: Sindre Sorhus
│  │  └─ VendorUrl: sindresorhus.com
│  ├─ wrap-ansi@7.0.0
│  │  ├─ URL: https://github.com/chalk/wrap-ansi.git
│  │  ├─ VendorName: Sindre Sorhus
│  │  └─ VendorUrl: https://sindresorhus.com
│  ├─ wrap-ansi@8.1.0
│  │  ├─ URL: https://github.com/chalk/wrap-ansi.git
│  │  ├─ VendorName: Sindre Sorhus
│  │  └─ VendorUrl: https://sindresorhus.com
│  ├─ ws@6.2.3
│  │  ├─ URL: https://github.com/websockets/ws.git
│  │  ├─ VendorName: Einar Otto Stangvik
│  │  └─ VendorUrl: https://github.com/websockets/ws
│  ├─ ws@7.5.10
│  │  ├─ URL: https://github.com/websockets/ws.git
│  │  ├─ VendorName: Einar Otto Stangvik
│  │  └─ VendorUrl: https://github.com/websockets/ws
│  ├─ ws@8.18.0
│  │  ├─ URL: git+https://github.com/websockets/ws.git
│  │  ├─ VendorName: Einar Otto Stangvik
│  │  └─ VendorUrl: https://github.com/websockets/ws
│  ├─ x-path@0.0.2
│  │  ├─ URL: https://github.com/node-x-extras/x-path
│  │  ├─ VendorName: Node X Extras
│  │  └─ VendorUrl: https://github.com/node-x-extras/x-path
│  ├─ xhr@2.6.0
│  │  ├─ URL: git://github.com/naugtur/xhr.git
│  │  ├─ VendorName: Raynos
│  │  └─ VendorUrl: https://github.com/naugtur/xhr
│  ├─ xml-parse-from-string@1.0.1
│  │  ├─ URL: git://github.com/Jam3/xml-parse-from-string.git
│  │  ├─ VendorName: Matt DesLauriers
│  │  └─ VendorUrl: https://github.com/Jam3/xml-parse-from-string
│  ├─ xml2js@0.5.0
│  │  ├─ URL: https://github.com/Leonidas-from-XIV/node-xml2js.git
│  │  ├─ VendorName: Marek Kubica
│  │  └─ VendorUrl: https://github.com/Leonidas-from-XIV/node-xml2js
│  ├─ xml2js@0.6.0
│  │  ├─ URL: https://github.com/Leonidas-from-XIV/node-xml2js.git
│  │  ├─ VendorName: Marek Kubica
│  │  └─ VendorUrl: https://github.com/Leonidas-from-XIV/node-xml2js
│  ├─ xmlbuilder@11.0.1
│  │  ├─ URL: git://github.com/oozcitak/xmlbuilder-js.git
│  │  ├─ VendorName: Ozgur Ozcitak
│  │  └─ VendorUrl: http://github.com/oozcitak/xmlbuilder-js
│  ├─ xmlbuilder@14.0.0
│  │  ├─ URL: git://github.com/oozcitak/xmlbuilder-js.git
│  │  ├─ VendorName: Ozgur Ozcitak
│  │  └─ VendorUrl: http://github.com/oozcitak/xmlbuilder-js
│  ├─ xmlbuilder@15.1.1
│  │  ├─ URL: git://github.com/oozcitak/xmlbuilder-js.git
│  │  ├─ VendorName: Ozgur Ozcitak
│  │  └─ VendorUrl: http://github.com/oozcitak/xmlbuilder-js
│  ├─ xmlchars@2.2.0
│  │  ├─ URL: https://github.com/lddubeau/xmlchars.git
│  │  └─ VendorName: Louis-Dominique Dubeau
│  ├─ xtend@4.0.2
│  │  ├─ URL: git://github.com/Raynos/xtend.git
│  │  ├─ VendorName: Raynos
│  │  └─ VendorUrl: https://github.com/Raynos/xtend
│  ├─ yargs@15.4.1
│  │  ├─ URL: https://github.com/yargs/yargs.git
│  │  └─ VendorUrl: https://yargs.js.org/
│  ├─ yargs@17.7.2
│  │  ├─ URL: https://github.com/yargs/yargs.git
│  │  └─ VendorUrl: https://yargs.js.org/
│  ├─ yocto-queue@0.1.0
│  │  ├─ URL: https://github.com/sindresorhus/yocto-queue.git
│  │  ├─ VendorName: Sindre Sorhus
│  │  └─ VendorUrl: https://sindresorhus.com
│  ├─ zod-validation-error@2.1.0
│  │  ├─ URL: git://github.com/causaly/zod-validation-error.git
│  │  ├─ VendorName: Causaly Team
│  │  └─ VendorUrl: https://www.causaly.com
│  ├─ zod@3.23.8
│  │  ├─ URL: git+https://github.com/colinhacks/zod.git
│  │  ├─ VendorName: Colin McDonnell
│  │  └─ VendorUrl: https://zod.dev/
│  └─ zustand@4.5.4
│     ├─ URL: git+https://github.com/pmndrs/zustand.git
│     ├─ VendorName: Paul Henschel
│     └─ VendorUrl: https://github.com/pmndrs/zustand
├─ MPL-2.0
│  ├─ lightningcss-darwin-arm64@1.19.0
│  │  └─ URL: https://github.com/parcel-bundler/lightningcss.git
│  ├─ lightningcss-darwin-arm64@1.22.0
│  │  └─ URL: https://github.com/parcel-bundler/lightningcss.git
│  ├─ lightningcss@1.19.0
│  │  └─ URL: https://github.com/parcel-bundler/lightningcss.git
│  └─ lightningcss@1.22.0
│     └─ URL: https://github.com/parcel-bundler/lightningcss.git
├─ Python-2.0
│  └─ argparse@2.0.1
│     └─ URL: https://github.com/nodeca/argparse.git
├─ Unlicense
│  ├─ big-integer@1.6.52
│  │  ├─ URL: git@github.com:peterolson/BigInteger.js.git
│  │  └─ VendorName: Peter Olson
│  └─ stream-buffers@2.2.0
│     ├─ URL: https://github.com/samcday/node-stream-buffer.git
│     └─ VendorName: Sam Day
└─ WTFPL
   └─ argsarray@0.0.1
      ├─ URL: git://github.com/calvinmetcalf/argsarray.git
      ├─ VendorName: Calvin Metcalf
      └─ VendorUrl: https://github.com/calvinmetcalf/argsarray
```

</detail>

<p align="right">(<a href="#readme-top">back to top</a>)</p

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
