const DaoChat = artifacts.require("DaoChat");

module.exports = async function (deployer) {
    await deployer.deploy(DaoChat);
};
