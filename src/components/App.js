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

  handleUpload = event => {
    event.preventDefault()
    const photo = event.target.files[0]
    const reader = new window.FileReader()
    reader.readAsArrayBuffer(photo)

    reader.onloadend = () => {
      this.setState({buffer: Buffer(reader.result)})
      console.log('buffer',this.state.buffer)
    }
  }

  handlePost = description => {
    console.log('sending file to IPFS...')

    ipfs.add(this.state.buffer, (error,result)=>{
      console.log('IPFS result', result)
      if(error) {
        console.error(error)
        return
      }
      // this.setState({loading: true})
      // this.state.meadow.methods
      //   .handlePost(result[0].hash, description)
      //   .send({ from: this.state.account })
      //   .on("transactionHash", (hash) => {
      //     thids.setState({loading: false})
      //   });
    })
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
            captureFile={this.handleUpload}
            uploadImage={this.handlePost}
            tipImageOwner={this.tipImageOwner}
          />
        )}
        <div>Not loading</div>
      </div>
    );
  }
}

export default App;
