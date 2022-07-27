import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import abi from '../contracts/artifacts/contracts/WavePortal.sol/WavePortal.json';
import { ethers } from "ethers";
function App() {
  const [currentAccount, setCurrentAccount] = useState("");
  const [allWaves, setAllWaves] = useState([]);
  const [Message,setMessage] = useState('');
 
  const checkIfWalletIsConnected = async () => {
    /*
    * First make sure we have access to window.ethereum
    */
    const { ethereum } = window;

    if (!ethereum) {
      console.log("Make sure you have metamask!");
    } else {
      console.log("We have the ethereum object", ethereum);
    }


    const accounts = await ethereum.request({ method: "eth_accounts" });

    if (accounts.length !== 0) {
      const account = accounts[0];
      console.log("Found an authorized account:", account);
      setCurrentAccount(account)
    } else {
      console.log("No authorized account found")}
  useEffect(() => {
    checkIfWalletIsConnected();
  }, [])
}
const wave = async () => {
  console.log('waving.....')
  const contractABI = abi.abi;
  const contractAddress = "0x066195F618587f7Dd6439a8beD61f9aDFe5c8f60";
  try {
    const { ethereum } = window;

    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const wavePortalContract = new ethers.Contract(contractAddress, contractABI, signer);

      let count = await wavePortalContract.getTotalWaves();
      let waves = await wavePortalContract.getAllWaves();
      setAllWaves(waves);
      console.log("The wave data",wave);
      console.log("Retrieved total wave count...", count.toNumber());
    } else {
      console.log("Ethereum object doesn't exist!");
    }
  } catch (error) {
    console.log(error);
  }
}

const message =  async ()=>{
  const contractABI = abi.abi;
  const contractAddress = "0x066195F618587f7Dd6439a8beD61f9aDFe5c8f60";
  try {
    const { ethereum } = window;

    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const wavePortalContract = new ethers.Contract(contractAddress, contractABI, signer);
      let message = await wavePortalContract.wave(Message);
      console.log("The mesage was successfully sent by signer ",signer," and the message was ",Message," On function ",message);

}else{
  console.log('no wallet detected');

}
  } catch(err){
    console.log("The error is ",err);
  }}
 

//Connect wallet method goes here

const connectWallet = async () => {
  try {
    const { ethereum } = window;

    if (!ethereum) {
      alert("Get MetaMask!");
      return;
    }

    const accounts = await ethereum.request({ method: "eth_requestAccounts" });

    console.log("Connected", accounts[0]);
    setCurrentAccount(accounts[0]);
  } catch (error) {
    console.log(error)
  }

}

const getAllMessages = async ()=>{
  const contractABI = abi.abi;
  const contractAddress = "0x066195F618587f7Dd6439a8beD61f9aDFe5c8f60";
  const provider = new ethers.providers.Web3Provider(ethereum);
  
  const signer = provider.getSigner();
  const wavePortalContract = new ethers.Contract(contractAddress, contractABI, signer);
  const allWaves = await wavePortalContract.getAllWaves();
  console.log('all messages are',allWaves);

}

getAllMessages();
  
  return (
    <div className="App">
    
        <div class='flex flex-col justify-center pt-10'>
          <h1 class='text-white text-6xl p-10 '>Hey there! 👋👋</h1>
<button onClick={connectWallet} class='p-4 text-3xl font-semibold text-white' >Connect wallet</button>
<button onClick={wave} class='p-4 text-3xl font-semibold text-white rounded-sm bg-slate-500' >Count waves 👋</button>

{allWaves.map((wave, index) => {
          return (
            <div key={index} style={{ backgroundColor: "OldLace", marginTop: "16px", padding: "8px" }}>
              <div>Address: {wave.address}</div>
              <div>Time: {wave.timestamp.toString()}</div>
              <div>Message: {wave.message}</div>
            </div>)
        })}
        
<input onChange={(e)=>setMessage(e.target.value)} class=" p-1 text-xl pl-5 mt-3" />
<button onClick={message} class='p-4 text-3xl font-semibold text-white rounded-sm mt-4 bg-slate-500' >Write your message!</button>
        </div>
        </div>
  )

  }
export default App
