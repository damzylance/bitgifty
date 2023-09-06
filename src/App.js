import { useEffect } from "react";
import Router from "./Router";
import TagManager from "react-gtm-module";
import ReactGA from "react-ga4";
import { Provider } from "react-redux";
ReactGA.initialize(process.env.REACT_APP_GA);

function App() {
  useEffect(() => {
    ReactGA.send({
      hitType: "pageview",
      page: window.location.search
        ? window.location.pathname + window.location.search
        : window.location.pathname,
    });
  });
  return <Router />;
}

export default App;
