import axios from "axios";
import { useEffect, useState } from "react";

const useWallets = () => {
  const [walletsLoading, setWalletsLoading] = useState(true);
  const [userWallets, setUserWallets] = useState([]);
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
        console.log(entries);
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
  return { userWallets, walletsLoading };
};

export default useWallets;
