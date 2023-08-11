import { useEffect } from "react";
import Router from "./Router";
import TagManager from "react-gtm-module";
import ReactGA from "react-ga4";

function App() {
  ReactGA.initialize("G-YV1233VJ3E");
  useEffect(() => {
    ReactGA.send({
      hitType: "pageview",
      page: window.location.pathname + window.location.search,
    });
  });
  return <Router />;
}

export default App;
