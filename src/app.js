import React from "react";
import { Provider } from "react-redux";
import GlobalStyles from "@iso/assets/styles/globalStyle";
import Snackbar from "@iso/Mcomponents/extended/Snackbar";
import CssBaseline from "@material-ui/core/CssBaseline";
import { useSelector } from "react-redux";

import { store } from "./redux/store";
import Boot from "./redux/boot";
import Routes from "./router";
import {
  jssPreset,
  StylesProvider,
  ThemeProvider,
} from "@material-ui/core/styles";
import AppProvider from "./AppProvider";
import theme from "./themes";
import IntlMessages from "@iso/components/utility/intlMessages";
import { Toolbar } from "@material-ui/core";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// import { StylesProvider } from "@material-ui/styles";
//import { analytics } from "./library/firebase/firebase";
String.prototype.cheakEmpty = function (returned) {
  let selectedString = this;

  if (selectedString) return selectedString;
  else return returned;
};
String.prototype.translate = function (returned) {
  return <IntlMessages id={this} />;
};

const Customize = ({ children }) => {
  const customization = useSelector((state) => state.customizationReducer);

  return (
    <>
      <GlobalStyles />
      <StylesProvider>
        <ThemeProvider theme={theme(customization)}>
          <CssBaseline />

          <Routes />
          <ToastContainer />
        </ThemeProvider>
      </StylesProvider>
    </>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <AppProvider>
        <>
          <Customize />
        </>
      </AppProvider>
    </Provider>
  );
};
if (localStorage.getItem("lang") == "ar") {
  document.getElementsByTagName("html")[0].setAttribute("dir", "rtl");
} else {
}

Boot()
  .then(() => App())
  .catch((error) => console.error(error));

export default App;
