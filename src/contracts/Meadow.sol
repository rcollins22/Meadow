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

  event PhotoPosted(
    uint id,
    string hash,
    string description,
    address author
  );
  
  function post(string memory iHash, string memory desc) public {
    require(bytes(desc).length>0);
    require(bytes(iHash).length>0);
    require(msg.sender != address(0x0));
    idCount ++;
    photos[idCount]= Photo(idCount,iHash,desc,msg.sender);
    emit PhotoPosted(idCount,iHash,desc,msg.sender);
  }
}
