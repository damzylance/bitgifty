import axios from "axios";
import { useEffect, useState } from "react";

const useWallets = () => {
  const supportedWallets = ["btc", "cusd", "eth", "ceur", "celo",];
  const [walletsLoading, setWalletsLoading] = useState(true);
  const [userWallets, setUserWallets] = useState([]);
  const [newWallets, setNewWallets] = useState([]);
  const fetchVirtualWallets = async () => {
    setWalletsLoading(true);
    await axios
      .get(`${process.env.REACT_APP_BASE_URL}wallets/virtual-accounts`, {
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        const entries = Object.entries(response.data);
        const cryptowallets = entries.filter((wallet) => {
          return wallet[1].type === "crypto";
        });
        let t = [];
        for (let i = 0; i < cryptowallets.length; i++) {
          const element = cryptowallets[i][0];
          t.push(element);
        }

        setNewWallets(
          supportedWallets.filter((n) => {
            return !t.includes(n);
          })
        );
        setWalletsLoading(false);
        setUserWallets(entries);
      })
      .catch((error) => {
        setWalletsLoading(false);
      });
  };
  useEffect(() => {
    fetchVirtualWallets();
  }, []);
  return { userWallets, walletsLoading, newWallets };
};

export default useWallets;
