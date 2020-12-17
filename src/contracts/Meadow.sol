pragma solidity ^0.5.0;

contract Meadow {
  string public name = "Meadow";
  
  uint public idCount = 0 ;
  mapping(uint => Photo) public photos;

  struct Photo {
    uint id;
    string hash;
    string descripton;
    address author;
  }

  function post(string memory iHash, string memory desc) public {
    
    idCount ++;
    photos[idCount]= Photo(idCount,iHash,desc,msg.sender)
  }
}
