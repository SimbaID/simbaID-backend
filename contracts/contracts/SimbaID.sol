// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract SimbaID {
    struct Identity {
        string did;
        bytes32 voiceHash; // hash of voice embedding or its hash
    }

    mapping(address => Identity) private identities;

    event Registered(address indexed user, string did, bytes32 voiceHash);

    function register(string calldata did, bytes32 voiceHash) external {
        identities[msg.sender] = Identity({did: did, voiceHash: voiceHash});
        emit Registered(msg.sender, did, voiceHash);
    }

    function get(address user) external view returns (string memory did, bytes32 voiceHash) {
        Identity memory id = identities[user];
        return (id.did, id.voiceHash);
    }
}
