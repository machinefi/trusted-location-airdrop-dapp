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
    const response = await axios.post(constants.GEOSTREAM_API, body);

    if (response.status !== 200) {
      console.log("Error getting location proof");
      return;
    }

    return response?.data.result.data;
  } catch (error) {
    console.log(error);
  }
};

export default getLocationProof;
