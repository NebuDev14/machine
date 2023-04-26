import { NextApiRequest, NextApiResponse } from "next";
import { API_URL } from "@/lib/constants";

export default async function getTeams(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { q, f } = req.query;

  const getTeams = async () => {
    const baseFetch = async (pageNum: string) =>
      await fetch(`${API_URL}/api/team/teams?page=${pageNum}`).then((res) =>
        res.json()
      );
    const pageNumbers = [...Array(20).keys()].map((i) => i.toString());
    const pages = await Promise.all(pageNumbers.map((num) => baseFetch(num)));
    const teams = pages.flatMap((page: any) => page);

    return { initialTeams: teams };
  };

  if (q) {
    const filterTeams = async () => {
      const filteredTeams = (await getTeams()).initialTeams.filter(
        (team: any) =>
          (team.team_number + team.nickname + team.city)
            .toLowerCase()
            .includes(String(q).toLowerCase())
      );
      return filteredTeams;
    };

    res.status(200).send({ teams: await filterTeams() });
  } else if (f) {
    const filterTeams = async () => {
      const filteredTeams = (await getTeams()).initialTeams.filter(
        (team: any) =>
          String(f).length > 3
            ? String(team.team_number).substring(0, 1) ===
                String(f).substring(0, 1) &&
              String(team.team_number).length === String(f).length
            : String(team.team_number).length < 4
      );

      return filteredTeams;
    };

    res.status(200).send({ teams: await filterTeams() });
  }
}
