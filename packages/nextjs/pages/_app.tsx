import { useEffect } from "react";
import type { AppProps } from "next/app";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import NextNProgress from "nextjs-progressbar";
import { Toaster } from "react-hot-toast";
import { WagmiConfig } from "wagmi";
import { Footer } from "~~/components/Footer";
import { Header } from "~~/components/Header";
import { BlockieAvatar } from "~~/components/scaffold-eth";
import { useEthPrice } from "~~/hooks/scaffold-eth";
import { useAppStore } from "~~/services/store/store";
import { wagmiClient } from "~~/services/web3/wagmiClient";
import { appChains } from "~~/services/web3/wagmiConnectors";
import "~~/styles/globals.css";
import { ThirdwebProvider } from "@thirdweb-dev/react";
// import { QueryClient, QueryClientProvider } from 'react-query';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Mumbai } from "@thirdweb-dev/chains";

const ScaffoldEthApp = ({ Component, pageProps }: AppProps) => {
  const price = useEthPrice();
  const setEthPrice = useAppStore(state => state.setEthPrice);

  useEffect(() => {
    if (price > 0) {
      setEthPrice(price);
    }
  }, [setEthPrice, price]);

  const queryClient = new QueryClient();

  return (
    <ThirdwebProvider activeChain={Mumbai}>
      <WagmiConfig client={wagmiClient}>
        <NextNProgress />
        <RainbowKitProvider chains={appChains.chains} avatar={BlockieAvatar}>
          <QueryClientProvider client={queryClient}>
            <div className="flex flex-col min-h-screen">
              <Header />
              <main className="relative flex flex-col flex-1">
                
                  <Component {...pageProps} />
                
              </main>
              <Footer />
            </div>
          </QueryClientProvider>
          <Toaster />
        </RainbowKitProvider>
      </WagmiConfig>
    </ThirdwebProvider>
  );
};

export default ScaffoldEthApp;
