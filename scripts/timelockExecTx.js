const Qstroller = artifacts.require("Qstroller");
const Unitroller = artifacts.require("Unitroller");
const Timelock = artifacts.require("Timelock");

module.exports = async function(callback) {
    try {
        let qsControllerInstance = await Unitroller.at("0xb74633f2022452f377403B638167b0A135DB096d");
        let encodedMethod = await qsControllerInstance.contract.methods._acceptAdmin().encodeABI();
        console.log("encodedMethod: ", encodedMethod);

        let timelockInstance = await Timelock.at("0xF9fA00130Dd6435c6948eb53Afa2094fA968C001")
        // let encodedMethod = await timelockInstance.contract.methods.setPendingAdmin("0x5117b046517ffA18d4d9897090D0537fF62A844A").encodeABI();
        let targetAddress = "0xd14333706810ba2a19fc11aae3931c09a6308ccd";

        let eta = 1637315088
        console.log("Eta: ", eta)
        // await timelockInstance.executeTransaction(targetAddress, 0,'', encodedMethod, eta)
        let execTxEncoded = await timelockInstance.contract.methods.executeTransaction(targetAddress, 0,'', encodedMethod, eta).encodeABI()
        console.log(execTxEncoded)

        // console.log("Done to exec transaction for ", targetAddress)
        // let setDelayEncode = await timelockInstance.contract.methods.setDelay(43200).encodeABI();
        // console.log("setDelayEncode: ", setDelayEncode)

        // let unitrollerInstance = await Unitroller.at(Unitroller.address);
        // let timelockAddress = "0xF9fA00130Dd6435c6948eb53Afa2094fA968C001";
        // let setPendingAdminEncode = await unitrollerInstance.contract.methods._setPendingAdmin(timelockAddress).encodeABI();
        // console.log("setPendingAdminEncode: ", setPendingAdminEncode)

        callback();
    } catch (e) {
        callback(e);
    }
}