import { useEffect } from "react";
import Router from "./Router";
import { Provider } from "react-redux";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./Theme";
import store from "./Store/store";

function App() {
 
  return (<Provider store={store}>
    <ChakraProvider theme={theme}>
  <Router />
  </ChakraProvider>
  </Provider>)
  

}

export default App;
