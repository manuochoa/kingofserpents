// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/access/Ownable.sol";

contract kingofserpentz is ERC721Enumerable, Ownable {
    using Strings for uint256;

    uint256 public price = 0.05 ether;
    uint256 public preSaleStarts;
    uint256 public publicSaleStarts;
    uint256 public MAX_SUPPLY = 1008;

    string public baseURI;
    string public _contractURI =
        "ipfs://QmV2Qs8NCp6uAGVRU973NSNvQvHDsMvcFznMsQJ7BZkNNh";

    mapping(address => bool) public isWhitelisted;

    constructor(
        string memory _URI,
        uint256 _preSaleTime,
        uint256 _publicSaleTime
    ) ERC721("kingofserpentz", "KOS") {
        baseURI = _URI;
        preSaleStarts = _preSaleTime;
        publicSaleStarts = _publicSaleTime;

        _mint(msg.sender, 1);
        _mint(msg.sender, 2);
        _mint(msg.sender, 3);
        _mint(msg.sender, 4);
        _mint(msg.sender, 5);
    }

    function publicSaleMint(uint256 _amount) public payable {
        require(publicSaleStarts <= block.timestamp, "sale it's not open yet");

        mint(_amount);
    }

    function preSaleMint(uint256 _amount) public payable {
        require(preSaleStarts <= block.timestamp, "sale it's not open yet");
        require(isWhitelisted[msg.sender], "sender is not on the pre sale");

        mint(_amount);
    }

    function mint(uint256 _amount) internal {
        require(totalSupply() + _amount <= MAX_SUPPLY, "exceeds max supply");
        require(_amount <= 5, "exceeds max buy amount");
        require(_amount * price <= msg.value, "not enough ETH to buy");

        uint256 _tokenId = totalSupply() + 1;

        for (uint256 i = 0; i < _amount; i++) {
            _mint(msg.sender, _tokenId + i);
        }
    }

    function addToWhitelist(address[] calldata _addresses) external onlyOwner {
        for (uint256 i = 0; i < _addresses.length; i++) {
            address entry = _addresses[i];

            isWhitelisted[entry] = true;
        }
    }

    function removeFromWhiteList(address[] calldata _addresses)
        external
        onlyOwner
    {
        for (uint256 i = 0; i < _addresses.length; i++) {
            address entry = _addresses[i];

            isWhitelisted[entry] = false;
        }
    }

    function withdraw() public onlyOwner {
        payable(msg.sender).transfer(address(this).balance);
    }

    function setURI(string memory _newURI) public onlyOwner {
        baseURI = _newURI;
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721)
        returns (string memory)
    {
        require(_exists(tokenId), "Cannot query non-existent token");

        return string(abi.encodePacked(baseURI, tokenId.toString()));
    }

    function _baseURI() internal view virtual override returns (string memory) {
        return baseURI;
    }

    function contractURI() public view returns (string memory) {
        return _contractURI;
    }

    function changeStartTime(uint256 _preSaleTime, uint256 _publicSaleTime)
        public
        onlyOwner
    {
        preSaleStarts = _preSaleTime;
        publicSaleStarts = _publicSaleTime;
    }
}
