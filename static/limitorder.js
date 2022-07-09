// import {
//     LimitOrderBuilder,
//     LimitOrderProtocolFacade,
//     Web3ProviderConnector,
// } from '/static/@1inch/limit-order-protocol';
//
// const test = require("../staticfiles/@1inch/limit-order-protocol/connector/web3-provider.connector");

import { ethers } from "https://cdn.skypack.dev/ethers"

let provider;

const connect = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const accountAddress = await signer.getAddress();

      document.getElementById("current_address").innerText = accountAddress;
      document.getElementById("current_address").removeAttribute("hidden");
      try{
          document.getElementById("walletform").remove();
      }
      catch(e){}

      resolve(accountAddress)
    } catch (error) {
      console.error(error);
      reject(error)
    }
  })
};
document.addEventListener("DOMContentLoaded", async () => {
  let accountAddress;

  accountAddress = await connect();

  window.ethereum.on("accountsChanged", async () => {
    accountAddress = await connect();
  })
});

const contractAddress = '0x5fa31604fc5dcebfcac2481f9fa59d174126e5e6';
const chainId = 1;

const create_limit_order = async function (nftAddress, id, wethAmount) {
    // const web3 = new Web3(Web3.givenProvider);
    // You can create and use a custom provider connector (for example: ethers)
    const connector = new Web3ProviderConnector(connect().provider);
    console.log(nftAddress);
    console.log(id);
    console.log(wethAmount);
    //
    // const limitOrderBuilder = new LimitOrderBuilder(
    //     contractAddress,
    //     chainId,
    //     connector
    // );
    //
    // const limitOrderProtocolFacade = new LimitOrderProtocolFacade(
    //     contractAddress,
    //     connector
    // );
    //
    // // Create a limit order and it's signature
    // const limitOrder = limitOrderBuilder.buildLimitOrder({
    //     makerAssetAddress: nftAddress,
    //     takerAssetAddress: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2', // WETH Address
    //     makerAddress: accountAddress,
    //     makerAmount: '1',
    //     takerAmount: wethAmount,
    //     predicate: '0x',
    //     permit: '0x',
    //     interaction: '0x',
    // });
    // const limitOrderTypedData = limitOrderBuilder.buildLimitOrderTypedData(
    //     limitOrder
    // );
    // const limitOrderSignature = limitOrderBuilder.buildOrderSignature(
    //     accountAddress,
    //     limitOrderTypedData
    // );
    //
    // // Create a call data for fill the limit order
    // const callData = limitOrderProtocolFacade.fillLimitOrder(
    //     limitOrder,
    //     limitOrderSignature,
    //     '100',
    //     '0',
    //     '50'
    // );
    //
    // // Send transaction for the order filling
    // // Must be implemented
    // sendTransaction({
    //     from: accountAddress,
    //     gas: 210_000, // Set your gas limit
    //     gasPrice: 40000, // Set your gas price
    //     to: contractAddress,
    //     data: callData,
    // });
};

document.getElementById("sell_submit").onclick = function() {
    create_limit_order(document.getElementById('contract_value').value, document.getElementById('id_value').value, document.getElementById('eth_value').value);
};
