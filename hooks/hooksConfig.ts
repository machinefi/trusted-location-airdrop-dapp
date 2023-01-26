import { LogicContractAddress } from "../config/addresses"
import LogicContract from "../artifacts/contracts/Logic.sol/Logic.json"

export const logicContractConfig = {
    address: LogicContractAddress,
    abi: LogicContract.abi,
}