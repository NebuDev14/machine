import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Navbar } from "@/components/Navbar";
import { HOFTeams } from "@/lib/constants";
import Image from "next/image";
import Link from "next/link";
import { FaMedal } from "react-icons/fa";

export default function HOFPage() {
  return (
    <>
      <Navbar />

      <Header
        className="flex"
        title={
          <a href="https://www.firsthalloffame.org/" target="_blank">
            <h1 className="md:flex text-3xl md:text-5xl font-black text-primary mb-2 hover:text-white">
              <FaMedal className="mr-3 md:ml-0 ml-[-10px] md:mb-0 mb-3 w-[50px]" />{" "}
              <span className="italic md:mr-3 mr-1">FIRST</span> Hall of Fame
            </h1>
          </a>
        }
        desc={
          <p>
            {" "}
            The Impact Award (previously Chairman&apos;s Award) stands as the
            pinnacle of achievement within the{" "}
            <span className="italic">FIRST</span> community, recognizing teams
            who embody the organization&apos;s mission and ideals to the fullest
            extent. Those who receive this coveted honor are bestowed with the
            privilege of being enshrined in the esteemed{" "}
            <span className="italic">FIRST</span> Hall of Fame. <br /> <br />{" "}
            There are currently <b className="text-white">{HOFTeams.length}</b>{" "}
            Hall of Fame teams.
          </p>
        }
      />

      <div className="pr-8 pl-8 max-w-screen-3xl">
        <div className="flex flex-col w-full sm:grid sm:grid-cols-2 lg:grid-cols-10 gap-3 mt-10">
          {HOFTeams.map((team: any, key: number) => {
            return (
              <div className="banner" key={key}>
                <div className="flex items-center justify-center mt-3">
                  <Image
                    src="/first-icon.svg"
                    height="50"
                    width="50"
                    alt="FIRST Logo"
                  />
                </div>
                <div className="award-name mt-5">
                  <span className="italic font-black">
                    {team.year > "2022" ? "Impact Award" : "Chairman's Award"}
                  </span>{" "}
                  <br /> <br />
                  <Link href={`/teams/${team.name}`} legacyBehavior>
                    <a>
                      <span className="font-bold hover:text-[#ecc729]">
                        Team {team.name}
                      </span>
                    </a>
                  </Link>
                </div>

                <div className="award-event">
                  <span className="text-xs font-semibold">{team.year}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <Footer />
    </>
  );
}
