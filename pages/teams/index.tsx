import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/navbar";
import { API_URL, CURR_YEAR } from "@/lib/constants";
import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { TeamCard } from "@/components/TeamCard";
import { FaHome, FaSearch } from "react-icons/fa";
import Head from "next/head";
import { getStorage, setStorage } from "@/util/localStorage";
import { Loading } from "@/components/Loading";
import { formatTime } from "@/util/time";
import { log } from "@/util/log";
import { teamNumberInRange } from "@/util/team";
import { FilterNumber } from "@/components/FilterNumber";

async function fetchTeamsData(
  startIndex: number,
  endIndex: number,
  teamNumberRange: string = "",
  searchTerm: string = ""
) {
  const teamsData = getStorage(`teams_${CURR_YEAR}`);
  const teamAvatarsData = getStorage(`cached_avatars_${CURR_YEAR}`);
  const sortedTeams = teamsData.sort(() => Math.random() - 0.5);
  const teamsSlice = sortedTeams.slice(startIndex, endIndex);

  if (teamsData && teamAvatarsData) {
    const filteredTeams = teamsData.filter((team: any) =>
      (team.team_number + team.nickname + team.city)
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );

    return {
      teams: searchTerm
        ? filteredTeams.slice(startIndex, endIndex)
        : teamNumberRange
        ? teamsData.filter((team: any) =>
            teamNumberInRange(team.team_number, teamNumberRange)
          )
        : sortedTeams.slice(0, 50),
      avatars: teamAvatarsData,
    };
  }

  const teamAvatars: any = {};
  const start = performance.now();

  await Promise.all(
    teamsSlice.map(async (team: any) => {
      const avatar = await fetch(
        `${API_URL}/api/team/avatar?team=${team.team_number}`
      ).then((res) => res.json());

      try {
        teamAvatars[team.team_number] = avatar.avatar;
      } catch {
        teamAvatars[team.team_number] = null;
      }
    })
  );

  log("warning", `Fetched avatars in ${formatTime(performance.now() - start)}`);
  setStorage(`cached_avatars_${CURR_YEAR}`, teamAvatars);

  return {
    teams: teamNumberRange
      ? teamsSlice.filter((team: any) =>
          teamNumberInRange(team.team_number, teamNumberRange)
        )
      : teamsSlice,
    avatars: teamAvatars,
  };
}

export default function TeamsPage() {
  const [teams, setTeams] = useState<any>([]);
  const [query, setQuery] = useState("");
  const [avatars, setAvatars] = useState<any>();
  const [isLoading, setIsLoading] = useState(false);
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(50);
  const [teamNumberRange, setTeamNumberRange] = useState("");
  const itemsPerPage = 50;

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.innerHeight + window.pageYOffset;
      const contentHeight = document.documentElement.scrollHeight;

      if (scrollPosition > contentHeight * 0.8 && !isLoading) {
        setIsLoading(true);
        setStartIndex(endIndex + 1);
        setEndIndex(endIndex + itemsPerPage);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isLoading, startIndex, endIndex]);

  useEffect(() => {
    const fetchTeams = async () => {
      const { teams, avatars } = await fetchTeamsData(startIndex, endIndex);
      setTeams((prevTeams: any) => [...prevTeams, ...teams]);
      setAvatars(avatars);
      setIsLoading(false);
    };

    setIsLoading(true);
    fetchTeams();
  }, [startIndex, endIndex]);

  const changeSearch = async (event: { target: { value: string } }) => {
    const searchTerm = event.target.value;
    setQuery(searchTerm);
    setIsLoading(true);
    setStartIndex(0);
    setEndIndex(itemsPerPage);

    const { teams, avatars } = await fetchTeamsData(
      0,
      itemsPerPage,
      searchTerm
    );
    setTeams(teams);
    setAvatars(avatars);
    setIsLoading(false);
  };

  useEffect(() => {
    const filterByNumber = async () => {
      setIsLoading(true);
      const { teams, avatars } = await fetchTeamsData(
        startIndex,
        endIndex,
        teamNumberRange,
        query
      );
      setTeams(teams);
      setAvatars(avatars);
      setIsLoading(false);
    };

    if (teamNumberRange) {
      filterByNumber();
    }
  }, [endIndex, query, startIndex, teamNumberRange]);

  if (isLoading) return <Loading />;

  return (
    <>
      <>
        <Head>
          <title>Teams | Scout Machine</title>
        </Head>
        <Navbar active="Teams" />

        <div className="flex flex-col">
          <Header
            title="Teams"
            desc="Unleash the excitement of FRC with a new way to discover teams"
          >
            <div className="relative">
              <input
                type="text"
                placeholder="Search teams (team #, location, name)..."
                value={query}
                onChange={changeSearch}
                spellCheck="false"
                className="border border-[#2A2A2A] bg-card outline-none rounded-lg text-lightGray px-3 py-[6px] px-5 text-sm pl-8 md:w-[450px] mt-5"
              />
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 mt-5">
                <FaSearch className="text-sm text-lightGray" />
              </span>
            </div>

            <div className="mt-3 gap-2 flex flex-wrap">
              <FilterNumber
                name={<FaHome />}
                reload
                range=""
                setTeamNumberRange={setTeamNumberRange}
              />
              <FilterNumber
                name="999s"
                range="1-999"
                setTeamNumberRange={setTeamNumberRange}
              />
              <FilterNumber
                name="1000s"
                range="1000-2000"
                setTeamNumberRange={setTeamNumberRange}
              />
              <FilterNumber
                name="2000s"
                range="2000-3000"
                setTeamNumberRange={setTeamNumberRange}
              />
              <FilterNumber
                name="3000s"
                range="3000-4000"
                setTeamNumberRange={setTeamNumberRange}
              />
              <FilterNumber
                name="4000s"
                range="4000-5000"
                setTeamNumberRange={setTeamNumberRange}
              />
              <FilterNumber
                name="5000s"
                range="5000-6000"
                setTeamNumberRange={setTeamNumberRange}
              />
              <FilterNumber
                name="6000s"
                range="6000-7000"
                setTeamNumberRange={setTeamNumberRange}
              />
              <FilterNumber
                name="7000s"
                range="7000-8000"
                setTeamNumberRange={setTeamNumberRange}
              />
              <FilterNumber
                name="8000s"
                range="8000-0000"
                setTeamNumberRange={setTeamNumberRange}
              />
              <FilterNumber
                name="9000s"
                range="9000-9999"
                setTeamNumberRange={setTeamNumberRange}
              />
            </div>
          </Header>

          <div className="w-full mx-auto pl-4 pr-4 md:pr-8 md:pl-8 mt-5">
            <div className="flex flex-col w-full sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {teams.map((team: any, key: number) => {
                return <TeamCard key={key} team={team} avatars={avatars} />;
              })}
            </div>
          </div>
        </div>

        <Footer />
      </>
    </>
  );
}
