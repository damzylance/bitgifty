import { useState, useEffect } from "react";
import { createFrontConnection } from "@front-finance/link";

function FrontComponent({
  linkToken,
  onBrokerConnected,
  onTransferFinished,
  onExit,
}) {
  const [frontConnection, setFrontConnection] = useState(null);

  useEffect(() => {
    setFrontConnection(
      createFrontConnection({
        clientId: process.env.REACT_APP_YUKI_KEY,
        onBrokerConnected: (authData) => {
          console.info("[FRONT SUCCESS]", authData);
          onBrokerConnected(authData);
        },
        onExit: (error) => {
          if (error) {
            console.error(`[FRONT ERROR] ${error}`);
          }

          onExit?.();
        },
        onTransferFinished: (transferData) => {
          console.info("[FRONT TRANSFER FINISHED]", transferData);
          onTransferFinished?.(transferData);
        },
        onEvent: (ev) => {
          console.info("[FRONT Event]", ev);
        },
      })
    );
  }, []);

  useEffect(() => {
    if (linkToken) {
      frontConnection?.openLink(linkToken);
    }
  }, [frontConnection, linkToken]);
  return <></>;
}

export default FrontComponent;
