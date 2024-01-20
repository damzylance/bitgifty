import { useCallback, useEffect, useRef, useState } from "react";
import axios from "axios";
import FrontComponent from "./FrontComponent";

function ExchangeConnect() {
  const [linkToken, setLinkToken] = useState(null);
  const [error, setError] = useState(null);
  const [payload, setPayload] = useState(null);
  const [transferFinishedData, setTransferFinishedData] = useState(null);
  const [networks, setNetworks] = useState();
  const userRef = useRef(null);
  const amountRef = useRef(null);
  const addressRef = useRef(null);
  const networkRef = useRef(null);
  const symbolRef = useRef(null);
  const [symbolLinks, setSymbolLinks] = useState();
  const [symbols, setSymbols] = useState();

  useEffect(() => {
    const asyncFunc = async () => {
      const response = await axios({
        method: "GET",
        url: `${process.env.REACT_APP_YUKI_URL}/managed-networks`,
      });
      const data = response.data.content.networks.filter((network) => {
        if (network.name == "Polygon") return true;
        else if (network.name == "Ethereum") return true;
        else if (network.name == "Tron") return true;
        else if (network.name == "Bitcoin") return true;
      });

      setSymbolLinks({
        Polygon: ["USDT", "USDC"],
        Ethereum: ["USDT", "ETH"],
        Tron: ["USDT", "TRON"],
        Bitcoin: ["BTC"],
      });
      setSymbols(["USDT", "USDC"]);

      setNetworks(data);
    };
    asyncFunc();
  }, []);

  const getAuthLink = useCallback(async () => {
    setError(null);
    setLinkToken(null);
    const response = await axios({
      method: "POST",
      url: `${process.env.REACT_APP_YUKI_URL}/link-token`,
      data: { userId: userRef.current?.value },
    });

    const data = response.data;
    if (!response.status.toString().startsWith("2") || !data?.content) {
      console.log(response);
      const error = (data && data.message) || response.statusText;
      console.error("Error!", error);
      setError(error);
    } else if (!data.content.linkToken) {
      setError("Iframe url is empty");
    } else {
      setLinkToken(data.content.linkToken);
    }
  }, []);

  const getTransferLink = useCallback(async () => {
    setError(null);
    setLinkToken(null);
    const response = await axios({
      method: "POST",
      url: `${process.env.REACT_APP_YUKI_URL}/link-token`,
      data: {
        userId: userRef.current?.value,
        transferOptions: {
          amountInFiat: amountRef.current?.value,
          toAddresses: [
            {
              symbol: "USDC",
              address: addressRef.current?.value,
              networkId: networkRef.current?.value.split(" ")[0],
            },
          ],
        },
      },
    });
    const data = response.data;
    if (response.status !== 200 || !data?.content) {
      const error = (data && data.message) || response.statusText;
      console.error("Error!", error);
      setError(error);
    } else if (!data.content.linkToken) {
      setError("Iframe url is empty");
    } else {
      setLinkToken(data.content.linkToken);
    }
  }, []);
  return (
    <div style={{ padding: "15px" }}>
      {(payload && (
        <div style={{ wordWrap: "break-word" }}>
          <h1>Connected!</h1>
          <p>
            <b>Broker:</b> {payload.accessToken?.brokerName}
            <br />
            <b>Token:</b> {payload.accessToken?.accountTokens[0].accessToken}
            <br />
            <b>Refresh Token:</b>{" "}
            {payload.accessToken?.accountTokens[0].refreshToken}
            <br />
            <b>Token expires in seconds:</b>{" "}
            {payload.accessToken?.expiresInSeconds}
            <br />
            <b>ID:</b> {payload.accessToken?.accountTokens[0].account.accountId}
            <br />
            <b>Name: </b>
            {payload.accessToken?.accountTokens[0].account.accountName}
            <br />
            <b>Cash:</b> ${payload.accessToken?.accountTokens[0].account.cash}
            <br />
          </p>
        </div>
      )) || (
        <p>
          No accounts connected recently! Please press the button below to use
          Front and authenticate
        </p>
      )}

      {transferFinishedData && (
        <div style={{ wordWrap: "break-word" }}>
          <h1>Transfer finished!</h1>
          <p>{JSON.stringify(transferFinishedData, null, 2)}</p>
        </div>
      )}

      {error && <p style={{ color: "red" }}>Error: {error}</p>}

      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <input
          type="text"
          ref={userRef}
          placeholder="Enter email"
          style={{
            outline: "none",
            border: "none",
            padding: "1rem 2rem",
            fontSize: "1rem",
          }}
        />
        <button style={{ width: "50%" }} onClick={getAuthLink}>
          Front Connection
        </button>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <input
            type="number"
            ref={amountRef}
            placeholder="Enter amount"
            style={{
              outline: "none",
              border: "none",
              padding: "1rem 2rem",
              fontSize: "1rem",
            }}
          />
          <input
            type="text"
            ref={addressRef}
            placeholder="Enter recipient address"
            style={{
              outline: "none",
              border: "none",
              padding: "1rem 2rem",
              fontSize: "1rem",
            }}
          />
          <select
            style={{
              padding: "1rem 2rem",
              fontSize: "1rem",
            }}
            ref={networkRef}
            onChange={(e) =>
              setSymbols(symbolLinks[e.target.value.split(" ")[1]])
            }
          >
            {networks?.map((network) => (
              <option key={network.id} value={`${network.id} ${network.name}`}>
                {network.name}
              </option>
            ))}
          </select>
          <select ref={symbolRef}>
            {networkRef.current?.value &&
              symbols?.map((symbol, i) => (
                <option key={i + 1}>{symbol}</option>
              ))}
          </select>
        </div>
        <button style={{ width: "50%" }} onClick={getTransferLink}>
          Front Transfer
        </button>
      </div>

      <FrontComponent
        linkToken={linkToken}
        onBrokerConnected={(authData) => {
          setPayload(authData);
          setLinkToken(null);
        }}
        onExit={(err) => {
          setLinkToken(null);
          setError(err || null);
        }}
        onTransferFinished={(data) => {
          setTransferFinishedData(data);
        }}
      />
    </div>
  );
}

export default ExchangeConnect;
