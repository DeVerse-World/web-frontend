import { useState, useEffect } from "react";
import Card from "../cards/Card";
import { Button } from "react-bootstrap";
import SubWorldTemplateService from "../../data/services/SubWorldTemplateService";

export default function TrendingSection() {
  const [open, setOpen] = useState(false);
  const [worlds, setWorlds] = useState([]);

  useEffect(() => {
    SubWorldTemplateService.fetchAllDerivTemplates().then((res) => {
      const sortedWorlds = res.sort(
        (a, b) =>
          b.derived_world_stats.num_plays_count -
          a.derived_world_stats.num_plays_count
      );
      setWorlds(sortedWorlds);
    });
  }, []);

  return (
    <section aria-labelledby="trending-heading">
      <div
        className="relative"
        style={{
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8 lg:pt-32">
          <div className="md:flex md:items-center md:justify-between">
            <h2
              id="favorites-heading"
              className="text-2xl font-bold tracking-tight text-lightest"
            >
              Trending
            </h2>
            <Button className="action-button" href="/marketplace?type=world">
              <div className="group flex">View All &rarr;</div>
            </Button>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-4 md:gap-y-0 lg:gap-x-8">
            {worlds.slice(0, 4).map((world) => (
              <a
                className="bg-dark-d rounded-border no-underline"
                href={`/subworlds/${world.overview.id}`}
              >
                <Card
                  thumbnail={world.overview.thumbnail_centralized_uri}
                  title={world.overview.display_name}
                  subtitle={world.creator_info.name}
                  rating={world.overview.rating}
                />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
