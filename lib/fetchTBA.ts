import axios from "axios";
import { NextApiResponse } from "next";

export const fetchTBA = async (res: NextApiResponse, route: string) => {
  await axios
    .get(`https://www.thebluealliance.com/api/v3/${route}`, {
      headers: {
        "X-TBA-Auth-Key": process.env.BLUE_ALLIANCE_API_KEY,
      },
    })
    .then(function (response) {
      res.status(200).send(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
};
