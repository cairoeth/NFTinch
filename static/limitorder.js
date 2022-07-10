import { ethers } from "https://cdn.skypack.dev/ethers"

const contractAddress = '0x5fa31604fc5dcebfcac2481f9fa59d174126e5e6';
const chainId = 1;

function generateOrderSalt() {
    return Math.round(Math.random() * Date.now()) + '';
}

class LimitOrderBuilder {
    constructor(contractAddress, chainId, providerConnector, generateSalt = generateOrderSalt) {
        this.contractAddress = contractAddress;
        this.chainId = chainId;
        this.providerConnector = providerConnector;
        this.generateSalt = generateSalt;
    }

    buildOrderSignature(walletAddress, typedData) {
        const dataHash = TypedDataUtils.hashStruct(typedData.primaryType, typedData.message, typedData.types, true).toString('hex');
        console.log(dataHash);
        return this.providerConnector.signTypedData(walletAddress, typedData, dataHash);
    }

    buildLimitOrderTypedData(order, domainName = "1inch Limit Order Protocol") {
        return {
            primaryType: 'Order',
            types: {
                EIP712Domain: [
                    { name: 'name', type: 'string' },
                    { name: 'version', type: 'string' },
                    { name: 'chainId', type: 'uint256' },
                    { name: 'verifyingContract', type: 'address' },
                ],
                Order: [
                    { name: 'salt', type: 'uint256' },
                    { name: 'makerAsset', type: 'address' },
                    { name: 'takerAsset', type: 'address' },
                    { name: 'maker', type: 'address' },
                    { name: 'receiver', type: 'address' },
                    { name: 'allowedSender', type: 'address' },
                    { name: 'makingAmount', type: 'uint256' },
                    { name: 'takingAmount', type: 'uint256' },
                    { name: 'makerAssetData', type: 'bytes' },
                    { name: 'takerAssetData', type: 'bytes' },
                    { name: 'getMakerAmount', type: 'bytes' },
                    { name: 'getTakerAmount', type: 'bytes' },
                    { name: 'predicate', type: 'bytes' },
                    { name: 'permit', type: 'bytes' },
                    { name: 'interaction', type: 'bytes' },
                ],
            },
            domain: {
                name: domainName,
                version: '2',
                chainId: this.chainId,
                verifyingContract: this.contractAddress,
            },
            message: order,
        };
    }

    buildLimitOrder({ makerAssetAddress, takerAssetAddress, makerAddress, receiverAddress, takerAmount, makerAssetData}) {
        return {
            salt: this.generateSalt(),
            makerAsset: makerAssetAddress,
            takerAsset: takerAssetAddress,
            maker: makerAddress,
            receiver: receiverAddress,
            allowedSender: "0x0000000000000000000000000000000000000000",
            makingAmount: "1",
            takingAmount: takerAmount,
            makerAssetData: makerAssetData,
            takerAssetData: "0x",
            getMakerAmount: "1",
            getTakerAmount: takerAmount + "000000000000000000",
            predicate: "0x",
            permit: "0x",
            interaction: "0x",
        };
    }
}

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

const create_limit_order = async function (nftAddress, id, wethAmount) {
    // const web3 = new Web3(Web3.givenProvider);
    // You can create and use a custom provider connector (for example: ethers)
    const connector = new Web3ProviderConnector(connect().provider);
    console.log(nftAddress);
    console.log(id);
    console.log(wethAmount);

    const limitOrderBuilder = new LimitOrderBuilder(
        contractAddress,
        chainId,
        connector
    );

    const limitOrder = limitOrderBuilder.buildLimitOrder({
        makerAssetAddress: nftAddress,
        takerAssetAddress: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
        makerAddress: document.getElementById("current_address").innerText,
        receiverAddress: document.getElementById("current_address").innerText,
        takerAmount: wethAmount,
        makerAssetData: "0x" + id,
    });

    const limitOrderTypedData = limitOrderBuilder.buildLimitOrderTypedData(limitOrder);

    const limitOrderSignature = limitOrderBuilder.buildOrderSignature(document.getElementById("current_address").innerText, limitOrderTypedData);

    console.log(limitOrderSignature);
};

document.getElementById("sell_submit").onclick = function() {
    create_limit_order(document.getElementById('contract_value').value, document.getElementById('id_value').value, document.getElementById('eth_value').value);
};
