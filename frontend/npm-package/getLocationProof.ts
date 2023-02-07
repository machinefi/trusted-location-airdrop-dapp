import axios from "axios";
import { VerifiedLocation } from "../types/VerifiedLocation";
import constants from "../config/constants";
import { Location } from "../types/Location";

const getLocationProof = async (
  locations: Location[],
  owner: string,
  signature: string,
  message: string | Uint8Array
): Promise<VerifiedLocation[] | undefined> => {
  const body = {
    signature,
    message,
    owner,
    locations,
  };

  try {
    console.log("querying POL....")
    const response = await axios.post(constants.GEOSTREAM_API, body);

    if (response.status !== 200) {
      console.log("Error getting location proof");
      return;
    }

    console.log("getting a response....")
    console.log("with response: ")
    console.log(response?.data.result.data)
    
    return response?.data.result.data;
    
  } catch (error) {
    console.log(error);
  }
};

export default getLocationProof;
