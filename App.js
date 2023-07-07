import { StyleSheet, SafeAreaView, useWindowDimensions } from "react-native";
import { WebView } from "react-native-webview";
import { Linking } from "react-native";

const url = "https://scanner.c-gence.com/iframe.html";

export default function App() {
  const { width } = useWindowDimensions();

  const openInBrowser = async (url) => {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      console.log(`Cannot open URL: ${url}`);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <WebView
        onError={(er) => console.log("er", er)}
        mediaPlaybackRequiresUserAction={false}
        originWhitelist={["*"]}
        allowsInlineMediaPlayback
        javaScriptEnabled
        scalesPageToFit
        javaScriptEnabledAndroid
        useWebkit
        domStorageEnabled
        startInLoadingState={true}
        mediaCapturePermissionGrantType="grantIfSameHostElsePrompt"
        source={{ uri: "https://scanner.c-gence.com/iframe.html" }}
        onMessage={(event) => {
          if (event.nativeEvent.data === "click") {
            console.log(event);
          }
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
