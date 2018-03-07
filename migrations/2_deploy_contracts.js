var Legislation = artifacts.require("./Legislation.sol");

module.exports = function(deployer) {
    deployer.deploy(Legislation);
}