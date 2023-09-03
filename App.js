import Main from "./Main";
import { Provider } from "react-redux";
import store from "./Redux/Store";
import FlashMessage from "react-native-flash-message";
export default function App() {
  return (
    <Provider store={store}>
<FlashMessage position="top" />
      <Main />
    </Provider>
  );
}
