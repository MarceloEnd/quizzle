import { StandardHeader } from "../components/StandardHeader";
import { Banner } from "./components/banner";
import { FeaturedGames } from "./components/featuredGames";

export const StartSite = () => {

  return (
    <div className="Start">
      <StandardHeader previousPath='' />
      <Banner />
      <FeaturedGames />
    </div>
  );
}