import Head from "next/head";
import type { NextPage } from "next";
import { ConnectWallet , MediaRenderer , ThirdwebNftMedia , useAddress , useContract, useNFT , useContractEvents} from "@thirdweb-dev/react";
import { ethers } from "ethers";
import { useEffect } from 'react';

const Nft: NextPage = () => {


    
    const address = useAddress();

    const contractAddress = "0xd956f74F467a23eF94b6535B7eB94074c37B3Cb8";
    // const { data: contractMetadata, isLoading } = useContractMetadata(contractAddress);
    const { contract, isLoading } = useContract("0xd956f74F467a23eF94b6535B7eB94074c37B3Cb8");
    console.log(contract , isLoading , "here");

  return (
    
    <>
      <Head>
        <title>Rent Warriors</title>
        <meta name="description" content="" />
        {/* We are importing the font this way to lighten the size of SE2. */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Bai+Jamjuree&display=swap" rel="stylesheet" />
      </Head>
      <div className="grid lg:grid-cols-2 flex-grow" data-theme="exampleUi">
        <h1>ka</h1>
        {/* <MediaRenderer
            src={nft?.metadata.image}
            height="100px"
            width="100px"
            /> */}

      </div>
      
    </>
    
  );
};

export default Nft;
