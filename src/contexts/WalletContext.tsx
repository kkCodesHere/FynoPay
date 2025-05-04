import { createContext, useContext, useState, useEffect } from 'react';
import { ethers } from 'ethers';

interface WalletContextType {
  address: string | null;
  connect: () => Promise<void>;
  disconnect: () => void;
  isConnected: boolean;
}

const WalletContext = createContext<WalletContextType>({
  address: null,
  connect: async () => {},
  disconnect: () => {},
  isConnected: false
});

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const [address, setAddress] = useState<string | null>(null);

  const handleAccountsChanged = (accounts: string[]) => {
    setAddress(accounts[0] || null);
  };

  const connect = async () => {
    if (!(window as any).ethereum) {
      alert('Please install MetaMask!');
      return;
    }

    try {
      const provider = new ethers.BrowserProvider((window as any).ethereum);
      const accounts = await provider.send("eth_requestAccounts", []);
      setAddress(accounts[0]);
    } catch (error) {
      console.error("Wallet connection error:", error);
    }
  };

  const disconnect = () => {
    setAddress(null);
  };

  useEffect(() => {
    if ((window as any).ethereum) {
      (window as any).ethereum.on('accountsChanged', handleAccountsChanged);
      return () => {
        (window as any).ethereum?.removeListener('accountsChanged', handleAccountsChanged);
      };
    }
  }, []);

  return (
    <WalletContext.Provider value={{
      address,
      connect,
      disconnect,
      isConnected: !!address
    }}>
      {children}
    </WalletContext.Provider>
  );
}

export const useWallet = () => useContext(WalletContext);