import Meadow from "../abis/Meadow.json";
import React, { Component } from "react";
import Identicon from "identicon.js";
import Navbar from "./Navbar";
import Main from "./Main";
import Web3 from "web3";
import "./App.css";


const ipfsClient = require("ipfs-http-client");
const ipfs = ipfsClient({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
}); 

class App extends Component {

  async componentDidMount(){
    await this.loadWeb3()
    await this.loadBlockchain()
  }
  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3){
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-ETH Broswer detected. (Install/Fix Metamask!')
    }
  }

  async loadBlockchain () {
    const web3 = window.web3
    const account = await web3.eth.getAccounts()
    this.setState({account: account[0]})
    
    const networkId = await web3.eth.net.getId()
    const networkData = Meadow.networks[networkId]
    if(networkData){
      const meadow = new web3.eth.Contract(Meadow.abi, networkData.address);
      console.log(meadow)
      this.setState({meadow})
      // const iCount = await meadow.methods.post().call()
      this.setState({loading:false})
    } else {
      window.alert('Meadow not Deployed')
    }
  }
  constructor(props) {
    super(props)
    this.state = {
      account: "",
      meadow: null,
      images:[],
      loading: true
    }
  }
  render() {
    return (
      <div>
        <Navbar account = {this.state.account} />
        {this.state.loading ? (
          <div id="loader" className="text-center mt-5">
            <p>Loading...</p>
          </div>
        ) : (
          <Main
            images={this.state.images}
            captureFile={this.captureFile}
            uploadImage={this.uploadImage}
            tipImageOwner={this.tipImageOwner}
          />
        )}
        <div>Not loading</div>
      </div>
    );
  }
}

export default App;
