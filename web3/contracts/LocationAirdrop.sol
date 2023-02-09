// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "./LocationNFT.sol";
import "./VerifierInterface.sol";

contract LocationAirdrop is Ownable, ReentrancyGuard {
    event Claimed(address indexed holder, bytes32 indexed deviceHash);

    VerifierInterface public verifier;
    LocationNFT public NFT;


    address public feeReceiver;
    uint256 public baseFee;
    uint256 public feeCliff; // value after which creating more tokens will be free

    constructor(
        address _verifier,
        address _nft,
        uint256 _baseFee,
        address _feeReceiver,
        uint256 _feeCliff
    ) {
        verifier = VerifierInterface(_verifier);
        NFT = LocationNFT(_nft);
        baseFee = _baseFee;
        feeReceiver = _feeReceiver;
        feeCliff = _feeCliff;
    }

    struct AirDrop {
        int256 lat;
        int256 long;
        uint256 maxDistance;
        uint256 time_from;
        uint256 time_to;
        uint256 tokens_count;
        uint256 tokens_minted;
    }

    bytes32[] public airDropsHashes;
    mapping(bytes32 => AirDrop) public airDrops;
    mapping(address => mapping(bytes32 => bool)) public claimedAirDrops;

    uint256 private _tokenId;

    function airDropsCount() external view returns (uint256) {
        return airDropsHashes.length;
    }

    function getAllHashes() public view returns (bytes32[] memory) {
        return airDropsHashes;
    }

    function generateHash(
        int256 _lat,
        int256 _long,
        uint256 _maxDistance,
        uint256 _time_from,
        uint256 _time_to
    ) internal pure returns (bytes32 _hash) {
        _hash = keccak256(
            abi.encodePacked(_lat, _long, _maxDistance, _time_from, _time_to)
        );
    }

    function addAirDrop(
        int256 _lat,
        int256 _long,
        uint256 _maxDistance,
        uint256 _time_from,
        uint256 _time_to,
        uint256 _tokens_count
    ) external payable {
        require(
            _lat >= -90_000000 && _lat <= 90_000000,
            "Invalid latitude value"
        );
        require(
            _long >= -180_000000 && _long <= 180_000000,
            "Invalid longitude value"
        );
        require(_maxDistance > 0, "Invalid max distance");
        require(
            msg.value >= calculateFee(_tokens_count),
            "Value sent with tx is not sufficient based on the tokens count"
        );
        bytes32 airDropHash = generateHash(
            _lat,
            _long,
            _maxDistance,
            _time_from,
            _time_to
        );
        require(airDrops[airDropHash].maxDistance == 0, "Duplicated airDrop");
        airDrops[airDropHash] = AirDrop({
            lat: _lat,
            long: _long,
            maxDistance: _maxDistance,
            time_from: _time_from,
            time_to: _time_to,
            tokens_count: _tokens_count,
            tokens_minted: 0
        });
        airDropsHashes.push(airDropHash);
        _tokenId++;
    }

    function claim(
        int256 _lat,
        int256 _long,
        uint256 _distance,
        uint256 _time_from,
        uint256 _time_to,
        bytes32 _deviceHash,
        bytes memory signature
    ) external payable nonReentrant {
        // verify proof of location
        bytes32 digest = verifier.generateLocationDistanceDigest(
            msg.sender,
            _lat,
            _long,
            _distance,
            _deviceHash,
            _time_from,
            _time_to
        );
        require(
            verifier.verify{value: msg.value}(digest, signature),
            "Invalid proof of location"
        );

        // verify that an AirDrop claim doesn't exists for this address
        bytes32 airDropHash = generateHash(
            _lat,
            _long,
            _distance,
            _time_from,
            _time_to
        );
        require(
            claimedAirDrops[msg.sender][airDropHash] == false,
            "AirDrop has been already claimed for this address"
        );
        // verify that the Airdrop exists and it's available
        AirDrop memory airDrop = airDrops[airDropHash];
        require(airDrop.maxDistance > 0, "AirDrop does not exist");
        if (airDrop.tokens_count > 0) {
            require(
                airDrop.tokens_count - airDrop.tokens_minted > 0,
                "No more tokens left for this AirDrop"
            );
        }

        //update the mapping
        claimedAirDrops[msg.sender][airDropHash] = true;

        // mint the location NFT
        NFT.safeMint(msg.sender);

        // emit the event
        emit Claimed(msg.sender, airDropHash);

        // update the number of tokens minted for this airdrop
        airDrops[airDropHash].tokens_minted++;
    }

    function setFeeReceiver(address _receiver) public onlyOwner {
        feeReceiver = _receiver;
    }

    function setFeeCliff(uint256 cliff) public onlyOwner {
        feeCliff = cliff;
    }

    function calculateFee(uint256 _tokens_count) public view returns (uint256) {
        uint256 returnFee;

        if (_tokens_count >= feeCliff) {
            returnFee = feeCliff * baseFee;
        } else {
            returnFee = _tokens_count * baseFee;
        }
        return returnFee;
    }
}
