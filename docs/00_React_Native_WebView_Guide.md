#### 🔎 Reference: [React Native WebView Guide (In-Depth)](https://github.com/react-native-webview/react-native-webview/blob/master/docs/Guide.md)

## 인라인 HTML

- WebVIew를 사용하는 가장 단순한 방법으로, 표시하려는 HTML을 주입하기만 하면 된다.
- 일반적으로 WebView는 외부 웹 페이지(URL)를 로드할 때 사용되지만 웹 페이지의 HTML 콘텐츠를 직접 지정하여 WebView에 표시하고자 할 때 사용할 수 있는 방식이다.
- HTML 소스를 설정하기 위해서는 `originWhiteList` 속성을 `['*']`로 설정해야 한다.

```js
import React, { Component } from "react";
import { WebView } from "react-native-webview";

const MyInlineWeb = () => {
  return (
    <WebView
      originWhitelist={["*"]}
      // url을 로드하는 대신 WEbView가 HTML 코드를 직접 표시한다.
      source={{ html: "<h1>정적인 HTML 코드 직접 주입!</h1>" }}
    />
  );
};
```

> React Native에서 새로운 정적 HTML 소스를 전달하면 WebView는 해당 HTML을 다시 로드하고 rerender 된다.

- 🧐 **_새로운 정적 HTML 소스를 전달한다?_**
  - `source` 속성에 다른 HTML 코드를 할당하는 것
  - 새로운 HTML 소스가 WebView에 전달되면 WebView는 기존 콘텐츠를 지우고 새로 받은 HTML을 다시 화면에 표시하게 된다.
  - 화면에 보이는 콘텐츠가 변경되고, WebView 내부적으로 해당 HTML 코드를 다시 로드하고 적용하는 과정을 거치게 된다.

### `originWhitelist`

- 탐색을 허용할 출처 문자열의 목록. 사용자가 탐색할 수 있도록 허용된 웹 페이지의 출처 리스트
- 어떤 웹 페이지의 origin으로의 탐색을 허용할지 제어한다.
- 문자열은 와일드카드(`*`)를 사용할 수 있다.
  - `https://*.example.com`처럼 지정해서 다양한 서브 도메인을 허용하는 것도 가능하다.
- 전체 URL이 아니라 origin만 비교한다.
  - 페이지의 path나 query parameters는 고려하지 않고 origin 영역만 비교한다.
  - `https://example.com`을 허용할 경우 `https://example.com/page1`과 `https://example.com/page2`는 모두 허용된다.
- 사용자가 WebView 내에서 다른 페이지를 탐색하려고 할 때 탐색하고자 하는 페이지의 origin이 이 목록에 없다면 그 URL은 WebView가 아닌 OS에서 처리된다. ➡️ 브라우저가 열리거나 다른 앱에서 처리된다.
- 기본적으로 모든 HTTP, HTTPS 페이지를 허용한다. (default: `http://`, `https://`) ➡️ `originWhitelist`를 설정해 이 기본 목록을 덮어쓰는 것!

> origin(출처)

- 웹 페이지의 프로토콜(HTTP, HTTPS), 호스트명, 포트 번호

### 🤔 로컬 HTML 파일을 주입하는 것은 불가능할까?

- 현재 HTML 파일을 주입하는 기능은 동작하지 않는다. ([discussion1](https://github.com/react-native-webview/react-native-webview/issues/428), [discussion2](https://github.com/react-native-webview/react-native-webview/issues/518))
- 이 방식으로 WebView를 구현하기 위해서는 모든 asset을 webpack 등의 기능으로 번들링하거나 [react-native-static-server](https://github.com/birdofpreyru/react-native-static-server)와 같은 기능을 사용하여 로컬 웹서버를 실행하여야 한다.

## URL Sourcse

WebView 적용에 가장 범용적으로 사용되는 방식이다.

```js
import React, { Component } from "react";
import { WebView } from "react-native-webview";

const MyWeb = () => {
  return <WebView source={{ uri: "https://a-ni.com/" }} />;
};
```

## Navigation 상태 변경 제어하기

사용자가 웹 페이지 내에서 특정 링크를 클릭했을 때, 해당 링크를 WebView 내에서 여는 대신 다른 작업을 수행하거나 redirection하려면 어떻게 해야 할까?

```js
import React, { useRef } from "react";
import { WebView } from "react-native-webview";

const MyWeb = () => {
  const webviewRef = useRef(null);

  /**
   * handleWebViewNavigationStateChange
   * @description 사용자가 특정 링크를 클릭했을 때 WebView내에서 URL을 가로채 다른 동작을 수행하거나 탐색을 중단하도록 한다.
   * @params newNavState - 현재 웹 페이지의 상태(URL, 로딩 상태, 뒤로 가기 가능 여부 등)를 전달받는다.
   *
   */
  const handleWebViewNavigationStateChange = (newNavState) => {
    const { url } = newNavState;
    if (!url) return;

    // PDF 파일 처리
    if (url.includes(".pdf")) {
      webviewRef.current.stopLoading();
      // PDF 뷰어를 열 수 있는 로직
    }

    // 폼 제출 성공 처리
    if (url.includes("?message=success")) {
      webviewRef.current.stopLoading();
      // 성공 처리 로직 (뷰를 닫는 등)
    }

    // 오류 처리
    if (url.includes("?errors=true")) {
      webviewRef.current.stopLoading();
    }

    // 특정 URL 리디렉션
    if (url.includes("google.com")) {
      const newURL = "https://mobia.com/";
      const redirectTo = `window.location = "${newURL}"`;
      // window.location을 조작하여 다른 페이지로 리디렉션 한다.
      webviewRef.current.injectJavaScript(redirectTo);
    }
  };

  return (
    <WebView
      ref={webviewRef}
      source={{ uri: "a-ni.com/" }}
      // 탭 이벤트가 발생하거나 웹 페이지에서 상태가 변경될 때 호출되는 콜백 함수
      onNavigationStateChange={handleWebViewNavigationStateChange}
    />
  );
};

export default MyWeb;
```

### `onNavigationStateChange`

WebView의 로딩이 시작되거나 종료될 때 호출되는 함수

|    Type    | Required |
| :--------: | :------: |
| `function` |    X     |

```js
<WebView
  source={{ uri: "https://a-ni.com" }}
  onNavigationStateChange={(navState) => {
    // 컴포넌트 내에서 뒤로가기 navigation을 추적한다.
    this.canGoBack = navState.canGoBack;
  }}
/>
```

> `navState`

아래와 같이 구성되어 있는 객체이다.

- `url`: 현재 탐색 중인 URL
- `title`: 웹 페이지 제목
- `loading`: 페이지의 로딩 여부
- `canGoBack`: 뒤로 가기 가능 여부
- `canGoForward`: 앞으로 가기 가능 여부
- `navigationType` (iOS only): 탐색 유형
  - `click`: 링크 클릭으로 발생한 탐색
  - `formsubmit`: 폼 제출로 발생한 탐색
  - `reload`: 페이지 새로 고침
  - `other`: 기타 탐색 유형
  - 앱이 탐색 유형에 따라 다른 동작을 수행할 수 있게 한다.
  - 예: 폼 제출 이후 새로고침 막기
- `target`: WebView 내의 탭 ID 또는 프레임 ID
  - 웹 페이지나 프레임을 구분할 수 있게 해주는 값으로, 여러 프레임으 다룰 때 유용하다.
  - webView가 여러 프레임을 처리하거나 특정 탭에서 이벤트를 구분해야 할 경우 사용한다.

## 파일 업로드 기능 추가하기

### iOS

`ios/[project]/Info.plist` 파일에 권한만 지정하면 된다.

- 사진 촬영
  ```plist
  <key>NSCameraUsageDescription</key>
  <string>Take pictures for certain activities</string>
  ```
- 갤러리 접근
  ```plist
  <key>NSPhotoLibraryUsageDescription</key>
  <string>Select pictures for certain activities</string>
  ```
- 비디오 녹화
  ```plist
  <key>NSMicrophoneUsageDescription</key>
  <string>Need microphone access for recording videos</string>
  ```

> `Info.plist`

- iOS 앱의 설정 정보를 담고 있는 Property List 파일
- 앱의 주요 속성과 설정들을 정의하여 Apple 시스템에게 앱의 동작 방식에 대한 정보를 전달한다.
- 아래의 내용들을 포함한다.
  |내용|설명|
  |:--:|:--|
  |앱의 이름 및 아이콘|앱의 이름(`CFBundleName`)과 아이콘 설정|
  |번들 ID|앱을 식별하는 고유 ID(`CFBundleIdentifier`)|
  |앱 버전|앱의 버전 정보(`CFBundleShortVersionString`, `CFBundleVersion`)|
  |권한 요청|- 사용자의 동의가 필요한 시스템 리소스들에 대한 권한 요청(위치 정보, 카메라, 마이크 등)<br/>- `NSLocationWhenInUseUsageDescription`, `NSCameraUsageDescription` 등의 항목으로 사용자에게 표시될 설명을 제공한다.|
  |화면 방향|앱이 지원할 화면의 방향 설정(`UISupportedInterfaceOrientations`)|
  |앱 실행 모드|`UIApplicationSceneManifest`<br/>- 앱이 멀티 윈도우를 지원하거나 여러 창을 관리하는 방식을 설정하여 앱의 여러 창이 서로 독립적으로 동작할 수 있게 한다.<br/>|
  |URL Scheme|- 앱이 특정 URL을 통해 외부에서 실행될 수 있도록 정의하는 설정<br/>- 웹 사이트나 이메일에서 앱을 열고 특정 기능을 수행할 수 있게 한다.|

### Android

`AndroidManifest.xml` 파일에 권한을 추가해주면 된다.

```xml
<manifest ...>
  ......

  <!-- this is required only for Android 4.1-5.1 (api 16-22)  -->
  <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />

  ......
</manifest>
```

> `AndroidManifest.xml`

- 안드로이드 앱의 기본 정보와 권한, 구성 요소를 정의하는 필수 메타데이터 파일
- 아래의 내용들을 포함한다.
  |내용|설명|
  |:--:|:--|
  |앱 패키지 이름|`package` 속성|
  |권한 요청|- 인터넷, 카메라, 위치 등 시스템 리소스 접근을 위한 설정(`<uses-permission>`)|
  |앱 컴포넌트 정의|앱의 구성 요소들 정의(`Activity`, `Service` 등)|
  |앱의 SDK 버전|앱이 실행 가능한 최소 및 최대 Android OS 버전(`minSdkVersion`, `targetSdkVersion`)|
  |앱의 시작 Activity|- 앱이 처음 시작될 때 실행될 `Activity`<br/>- `<intent-filter>`에서 `MAIN`과 `LAUNCHER`를 지정한다.|

## 다중 파일 업로드하기

별도로 설정할 것은 없고 `input` 요소에 `multiple` 속성을 지정하면 단일/다중 파일 선택을 제어할 수 있다.

```js
// 다중 파일 선택
<input type="file" multiple />

// 단일 파일 선택
<input type="file" />
```

## 파일 다운로드 기능 추가하기

### iOS

- iOS에서 파일 다운로드를 지원하려면 자체 코드로 구현해야 한다.
- WebView 컴포넌트에 `onFileDownload` 콜백을 프로퍼티로 전달하면 된다.
- **RNCWebView**(react-native-webview 라이브러리에서 제공하는 WebView 컴포넌트)가 파일 다운로드가 필요하다고 판단하면 파일을 다운로드할 수 있는 URL이 `onFileDownload`에 제공되고, 해당 콜백에서 원하는 방식대로 파일을 다운로드할 수 있다.
- 최상의 다운로드 환경을 제공하기 위해서는 iOS 13버전 이상이 필요하다.
  - Apple은 iOS 13에서 HTTP response header에 접근하기 위한 API를 추가했다.
  - 이를 통해 HTTP response가 다운로드인지 여부를 판단한다.
  - iOS

```js
onFileDownload = ({ nativeEvent }) => {
  const { downloadUrl } = nativeEvent;
  // --> 다운로드 관련 코드... <--
};
```

갤러리에 이미지를 저장하려면 `ios/[project]/Info.plist` 파일에 아래의 권한을 지정해야 한다.

```plist
<key>NSPhotoLibraryAddUsageDescription</key>
<string>Save pictures for certain activities.</string>
```

> `onFileDownload` (iOS Only)

|    Type    | Required | Platform |
| :--------: | :------: | :------: |
| `function` |    X     |   iOS    |

- 클라이언트가 파일을 다운로드해야 할 때 호출되는 함수
- 애플리케이션은 실제로 파일을 다운로드할 수 있는 코드를 제공해야 한다.
- 파일 다운로드를 위한 코드가 제공되지 않으면 WebView는 해당 파일을 화면에 표시하기 위해 시도한다. (default)

```js
<WebView
  source={{ uri: "https://a-ni.com" }}
  onFileDownload={({ nativeEvent: { downloadUrl } }) => {
    // 다운로드 URL 문자열을 사용하여 원하는 방식으로 파일을 다운로드할 수 있다
  }}
/>
```

- 버전별 동작 차이
  - iOS 13 이상
    - WebView가 `Content-Disposition` 헤더에 `attachment...`가 포함된 URL로 탐색할 경우 이 함수가 호출된다.
    - 사용자가 웹뷰에서 링크를 클릭해 파일을 다운로드하려고 할 떄, 서버에 파일 다운로드 신호를 보내는 `Content-Disposition` 헤더가 `attachment...`로 설정되어 있어야 한다.
  - iOS 8 이상
    - WebView가 특정 MIME 타입(PDF, ZIP 등)을 가진 콘텐츠를 받아들일 수 없는 경우 이 함수로 처리해야 한다.
    - **MIME**(미디어 타입, Multipurpose Internet Mail Extensions): 파일의 형식을 나타내는 정보
    - iOS 13 이전 버전에서는 MIME 타입이 WebView에서 지원되지 않는 경우에만 이 함수로 별도의 파일 다운로드 로직을 구현해야 했다.

### Android

Android에서는 기본적으로 DonloadManager과의 통합이 내장되어 있다. 앱이 10 미만의 Android 버전을 지원하는 경우에만 `AndroidManifest.xml` 파일에 아래의 권한을 추가하면 된다.

```xml
<manifest ...>
  ......

  <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />

  ......
</manifest>
```

## JS와 네이티브 사이에서 소통하기

웹뷰에서 로드한 웹 페이지에 메세지를 보내고, 해당 웹 페이지에서 다시 메세지를 받으려면 어떻게 해야 할까? 이를 구현하기 위해서 React Native WebView는 세 가지의 옵션을 제공한다.

1. `injectedJavaScript` prop을 통해 React Native에서 Web으로 메세지를 전달한다.
2. `injectJavaScript` method를 통해 React Native에서 Web으로 메세지를 전달한다.
3. `postMessage` method와 `onMessage` prop을 통해 Web에서 React Native로 메세지를 전달한다.

### `injectedJavaScript` prop

웹 페이지가 초기에 로드된 직후에 실행되는 스크립트이다. 페이지의 reload 및 전환 여부와 관계 없이 단 한 번만 실행된다.

```js
import React from "react";
import { View } from "react-native";
import { WebView } from "react-native-webview";

const App = () => {
  const runFirst = `
    document.body.style.backgroundColor = 'red';
    setTimeout(function() { window.alert('hi') }, 2000);
    true; // note: this is required, or you'll sometimes get silent failures
  `;

  return (
    <View style={{ flex: 1 }}>
      <WebView
        source={{
          uri: "https://github.com/react-native-webview/react-native-webview",
        }}
        onMessage={(event) => {}}
        injectedJavaScript={runFirst}
      />
    </View>
  );
};

export default App;
```

- 페이지가 로드되면 `runFirst`에 정의된 스크립트를 통해 JavaScript를 실행한다.
- `body`의 배경 색이 모두 `red`로 변경되고 2초 후 `window.alert('hi')`가 실행된다.
- JavaScript 코드를 WebView 내부에 삽입함에 따라 `onMessage` 이벤트가 요구된다.

<img src="https://github.com/user-attachments/assets/4c339c38-79a0-4208-b3e8-625e4af444df" width="30%"/>

> `injectedJavaScriptForMainFrameOnly`

- 웹 페이지의 메인 프레임에 JavaScript를 삽입하는 방식을 설정한다.

|  Type  | Required |
| :----: | :------: |
| `bool` |    X     |

- `true`

  - default
  - Android에서는 무조건 `true`
  - 지정한 JavaScript는 main frame에서만 실행된다.

- `false`
  - iOS와 macOS에서만 지원되는 값이다.
  - 모든 프레임(예: iframes)에서 지정한 JavaScript를 실행한다.

> `injectedJavaScriptBeforeContentLoadedForMainFrameOnly`

- 콘텐츠가 로드되기 전 삽입하고자 한다면 `injectedJavaScriptBeforeContentLoadedForMainFrameOnly`를 사용할 수 있다.
- `injectedJavaScriptForMainFrameOnly`와 동일하게 JavbaScript 코드 삽입 방식을 설정하나 **페이지 콘텐츠가 로드되기 전**에 실행된다는 차이가 있다.
  - JavaSCript는 페이지의 DOM이 생성되기 전에 실행된다.
  - 페이지 로드가 시작되기 전에 초기 설정이나 스타일을 적용하고자 할 때 사용할 수 있다.

### `injectedJavaScriptBeforeContentLoaded` prop

### `injectedJavaScriptObject` prop

### `injectJavaScript` method

<img src="https://github.com/user-attachments/assets/8ff39efa-fe8d-4c4f-a5f4-a22dfeffeeaa" width="30%"/>

### `window.ReactNativeWebView.postMessage` method와 `onMessage` prop

<img src="https://github.com/user-attachments/assets/8d8c3107-c5a5-465a-a04f-016ada81adfb" width="30%"/>

## 커스텀 헤더, 세션, 쿠키로 작업하기

## 페이지 전환 제스처와 버튼 구현하기
