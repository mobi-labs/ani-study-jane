#### 🔎 Reference: [React Native WebView Guide (In-Depth)](https://github.com/react-native-webview/react-native-webview/blob/master/docs/Guide.md)

## 인라인 HTML

## URL Sourcse

## 로컬 HTML 파일 로드하기

## Navigation 상태 변경 제어하기

## 파일 업로드 기능 추가하기

## 다중 파일 업로드하기

## 파일 다운로드 기능 추가하기

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

![image](https://github.com/user-attachments/assets/4c339c38-79a0-4208-b3e8-625e4af444df)

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

![image](https://github.com/user-attachments/assets/8ff39efa-fe8d-4c4f-a5f4-a22dfeffeeaa)

### `window.ReactNativeWebView.postMessage` method와 `onMessage` prop

![image](https://github.com/user-attachments/assets/8d8c3107-c5a5-465a-a04f-016ada81adfb)

## 커스텀 헤더, 세션, 쿠키로 작업하기

## 페이지 전환 제스처와 버튼 구현하기
