# react-native 命令记录

## 安卓部分

## 打包

### 生成签名密钥

- android 里面直接生成或者用命令行

  ```bash
   keytool -genkeypair -v -keystore my-release-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000
  ```

- 设置 gradle变量

  ```bash
  // 将刚才生成的文件放到 android/app文件夹下
  // 编辑~/.gradle/gradle.properties（全局配置，对所有项目有效）或是项目目录/android/gradle.properties（项目配置，只对所在项目有效）
  
  // 后面新增下面字段，上面设置的密码不要记错
  MYAPP_RELEASE_STORE_FILE=my-release-key.keystore
  MYAPP_RELEASE_KEY_ALIAS=my-key-alias
  MYAPP_RELEASE_STORE_PASSWORD=*****
  MYAPP_RELEASE_KEY_PASSWORD=***** 
  ```

- 把签名配置加入到项目的 gradle 配置中

  编辑你项目目录下的`android/app/build.gradle`，添加如下的签名配置：

  ```bash
  android {
      ...
      defaultConfig { ... }
      signingConfigs {
          release {
          	// MYAPP_RELEASE_STORE_FILE 替换成刚才保存到文件名
              if (project.hasProperty('MYAPP_RELEASE_STORE_FILE')) {
                  storeFile file(MYAPP_RELEASE_STORE_FILE) // 下面字段也需要修改为实际字段
                  storePassword MYAPP_RELEASE_STORE_PASSWORD
                  keyAlias MYAPP_RELEASE_KEY_ALIAS
                  keyPassword MYAPP_RELEASE_KEY_PASSWORD
              }
          }
      }
      buildTypes {
          release {
              ...
              signingConfig signingConfigs.release
          }
      }
  }
  ```

  

### 打包操作

- 首先进入android 目录下

- 第一步：关掉运行中的 deamon `.\gradlew --stop`

- 第二步：运行 ` react-nativve run-android`

- 第三步：打包 `.\gradlew assembleRelease --stacktrace` 

- `./gradlew assembleRelease -x bundleReleaseJsAndAssets`

  注意：如果执行最后打包都失败，那么尝试清除打包缓存`./gradlew clean`之后按步骤重新执行

## 开发调试

`yarn android --no-jetifiler`

上一个命令出错时尝试用这个： `cd android &&.\gradlew app:installDebug -PreactNativeDevServerPort=8081`

## constants 方法返回的参数

```json
{
	"addListener": "",
	"appOwnership": null,
	"deviceId": "36772f14-0bc0-4f41-bdbd-a45dd706060b",
	"deviceName": "16 X",
	"deviceYearClass": 2016,
	"getWebViewUserAgentAsync": "",
	"installationId": "36772f14-0bc0-4f41-bdbd-a45dd706060b",
	"isDevice": true,
	"linkingUrl": "",
	"manifest": null,
	"nativeAppVersion": "1.0",
	"nativeBuildVersion": "1",
	"platform": { "android": {} },
	"removeListeners": "",
	"sessionId": "56ad304d-d6b4-468b-81b4-3c00ee05c840",
	"statusBarHeight": 28,
	"systemFonts": [
		"normal",
		"notoserif",
		"sans-serif",
		"sans-serif-light",
		"sans-serif-thin",
		"sans-serif-condensed",
		"sans-serif-medium",
		"serif",
		"Roboto",
		"monospace"
	],
	"systemVersion": "8.1.0"
}
```

## react-native-router-flux

```json
// Scene 路由对应的组件，props的值
{
    name: '',
    navigation: {
	"actions": {
		"dismiss": [],
		"goBack": [],
		"navigate": [],
		"pop": ["Function pop"],
		"popToTop": ["Function popToTop"],
		"push": ["Function push"],
		"replace": ["Function replace"],
		"reset": ["Function reset"],
		"setParams": ["Function setParams"]
	},
	"addListener": ["Function addListener"],
	"dangerouslyGetParent": ["Function anonymous"],
	"dismiss": ["Function anonymous"],
	"dispatch": ["Function anonymous"],
	"emit": ["Function emit"],
	"getChildNavigation": ["Function getChildNavigation"],
	"getParam": ["Function anonymous"],
	"getScreenProps": ["Function anonymous"],
	"goBack": ["Function anonymous"],
	"isFirstRouteInParent": ["Function isFirstRouteInParent"],
	"isFocused": ["Function isFocused"],
	"navigate": ["Function anonymous"],
	"pop": ["Function anonymous"],
	"popToTop": ["Function anonymous"],
	"push": ["Function anonymous"],
	"replace": ["Function anonymous"],
	"reset": ["Function anonymous"],
	"router": "",
	"setParams": ["Function anonymous"],
	"state": {
		"key": "id-1594713332249-26",
		"params": {
			"error": "",
			"hideNavBar": true,
			"init": true,
			"routeName": "home",
			"tab": "me"
		},
		"routeName": "home"
	}
	}
}
```

