pragma solidity ^0.5.0;

contract Meadow {
  string public name = "appname";

  uint public idCount = 0;
  mapping(uint => Photo) public photos;
  
  struct Photo {
    unit id;
    string hash;
    string description;
    string author;
  }

  event PhotoPosted(
    uint id,
    string hash,
    string description,
    string author,
  )

  function post(string memory _imgHash, string memory _description) public {
    require(bytes(_imgHash).length >0);
    require(msg.sender != address(0x0));
    
    idCount ++ ;
    photos[idCount] = Photo(idCount, _imgHash,'_description, msg.sender)
  }
}
