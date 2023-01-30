// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface VerifierInterface {
    function isValidator(address account) external view returns (bool);

    function verify(bytes32 digest, bytes memory signature) external payable returns (bool);

    function generateLocationDistanceDigest(
        address holder,
        int256 lat,
        int256 long,
        uint256 distance,
        uint256 time_from,
        uint256 time_to,
        bytes32 deviceHash
    ) external view returns (bytes32);

    function generateDeviceDigest(
        address holder,
        bytes32 deviceHash,
        uint256 deviceTimestamp
    ) external view returns (bytes32);
}