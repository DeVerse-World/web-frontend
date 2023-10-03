import { useContext, useEffect, useState } from "react";
import AccountService from "../../data/services/AccountService";
import { AppContext } from "../../components/contexts/app_context";
import AvatarContainer from "../../components/AvatarContainer";
import { formatWalletAddress } from "../../utils/wallet_util";
import { AvatarViewModel } from "../../components/asset/AvatarList";
import { EventViewModel } from "../../components/asset/EventList";
import { TemplateViewModel } from "../../components/asset/RootWorldList";
import { getTimeString } from "../../utils/time_util";
import {
  MapIcon,
  UserIcon,
  CalendarDaysIcon,
  ChartBarIcon,
  CheckBadgeIcon,
  CursorArrowRaysIcon,
  AdjustmentsHorizontalIcon,
} from "@heroicons/react/24/outline";
import StorageService from "../../data/services/StorageService";
import { TabHeaderPillBar } from "../../components/common/TabHeaderPill";
import Card from "../../components/cards/Card";
import CardStatPrimary from "../../components/cards/CardStatPrimary";
import CardStatSecondary from "../../components/cards/CardStatSecondary";
import {
  NumViewsText,
  TimeAgoText,
  NumPlaysText,
  PreviewButton,
  LaunchButton,
} from "../../components/cards/CardElements";
import SettingsSection from "../account/SettingsSection";

export default function CreatorAbout() {
  const { user, setUser } = useContext(AppContext);
  const [avatars, setAvatars] = useState<AvatarViewModel[]>([]);
  const [events, setEvents] = useState<EventViewModel[]>([]);
  const [templates, setTemplates] = useState<TemplateViewModel[]>([]);

  useEffect(() => {
    if (StorageService.getUser() == null) {
      return;
    }
    AccountService.getUserInfo().then((e) => {
      if (e.isSuccess && e.value) {
        setAvatars(
          e.value.avatars.map<AvatarViewModel>((item) => ({
            id: item.id.toString(),
            supply: 9999,
            maxSupply: 9999,
            name: "Avatar #",
            modelUri: item.preprocess_url,
            image: item.postprocess_url,
          }))
        );
        setEvents(
          e.value.created_events.map<EventViewModel>((e) => ({
            id: e.id.toString(),
            name: e.name,
            description: "Description of event",
            eventConfigUri: e.event_config_uri,
            lastUpdate: getTimeString(new Date(e.updated_at)),
            stage: e.stage,
            participants: e.max_num_participants,
          }))
        );
        const roots =
          e.value.created_root_subworld_templates.map<TemplateViewModel>(
            (e) => ({
              id: e.id.toString(),
              name: e.display_name,
              description: e.display_name,
              image: e.thumbnail_centralized_uri,
              fileAssetUriFromCentralized: e.thumbnail_centralized_uri,
              file2dUri: e.thumbnail_centralized_uri,
              fileAssetUri: e.level_ipfs_uri,
              file3dUri: e.level_ipfs_uri,
              onlineOpenable: true,
              offlineOpenable: true,
            })
          );
        const derivs =
          e.value.created_deriv_subworld_templates.map<TemplateViewModel>(
            (e) => ({
              id: e.id.toString(),
              name: e.display_name,
              description: e.display_name,
              image: e.thumbnail_centralized_uri,
              fileAssetUriFromCentralized: e.thumbnail_centralized_uri,
              file2dUri: e.thumbnail_centralized_uri,
              fileAssetUri: e.level_ipfs_uri,
              file3dUri: e.level_ipfs_uri,
              onlineOpenable: true,
              offlineOpenable: true,
            })
          );
        setTemplates(roots.concat(derivs));
      }
    });
  }, []);

  useEffect(() => {
    if (avatars.length == 0 || !user) return;
    setUser({ ...user, avatar: avatars[0].image });
  }, [avatars]);

  user.name = "John Doe";

  const dummyWorldCards = Array.from({ length: 7 }, () => {
    return {
      thumbnail:
        "https://ipfs.moralis.io:2053/ipfs/QmezYc77waMZcjFAf67SaKGBBAPPoMPEEtyDxArFWprZA8/Snowboarding.png",
      title: "Snow Mountain",
      subtitle: "creatonam",
      rating: 4,
      buttons: [],
      extra: [<NumViewsText numViews={39} />, <NumPlaysText numPlays={100} />],
    };
  });

  const dummyEventCards = Array.from({ length: 3 }, () => {
    return {
      thumbnail: "https://i.imgur.com/XO8upg9.jpg",
      title: "Goblin Invasion",
      subtile: "CreatorName",
      extra: [<TimeAgoText text="11 months ago" />],
    };
  });

  const dummyAvatarCards = Array.from({ length: 1 }, () => {
    return {
      thumbnail: "https://renderapi.s3.amazonaws.com/Ejtjhej0t.png",
      title: "IM",
      subtitle: "CreatorName",
    };
  });

  const worldsSection = (
    <section className="w-full px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
        {dummyWorldCards.map((card) => (
          <Card {...card} buttons={[<PreviewButton />, <LaunchButton />]} />
        ))}
      </div>
    </section>
  );

  const eventSection = (
    <section className="w-full px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
        {dummyEventCards.map((card) => (
          <Card {...card} />
        ))}
      </div>
    </section>
  );

  const avatarSection = (
    <section className="w-full px-4">
      <div className="grid grid-cols-4 gap-4">
        {dummyAvatarCards.map((card) => (
          <Card {...card} />
        ))}
      </div>
    </section>
  );

  const statisticsSection = (
    <section className="w-full px-4">
      <div className="flex flex-wrap">
        <CardStatPrimary number={49} subtitle={"plays"} />
        <CardStatSecondary
          number={324}
          subtitle="clicks"
          iconComponent={
            <CursorArrowRaysIcon
              className="h-16 w-16 shrink-0"
              aria-hidden="true"
              style={{
                color: "#FEEB00",
              }}
            />
          }
        />
        <CardStatSecondary
          number={500}
          subtitle="views"
          iconComponent={
            <CheckBadgeIcon
              className="h-14 w-14 shrink-0"
              aria-hidden="true"
              style={{
                color: "#96FEDE",
              }}
            />
          }
        />
      </div>
    </section>
  );

  const settingsSection = (
    <section className="w-full px-4">
      <SettingsSection />
    </section>
  );

  return (
    <>
      <div className="flex flex-col items-center">
        <section
          id="cover-picture"
          className="h-[350px] mt-3 overflow-hidden flex items-center"
        >
          <img
            title="cover-image"
            alt="cover image"
            src="https://firebasestorage.googleapis.com/v0/b/deverse-357506.appspot.com/o/static%2F01.webp?alt=media&token=ffab7251-7a3d-4875-9dca-383b72f51b8a"
            className="w-screen"
          />
        </section>
        <section id="avatar-section" className="flex flex-row w-[95%]">
          <div className="flex flex-row gap-4">
            <AvatarContainer
              style={{
                position: "relative",
                bottom: "50%",
                borderColor: "#111827",
              }}
            />
            <div>
              {user && user.name && <h4>{user.name}</h4>}
              {user && user.wallet_address && (
                <div className="flex flex-row gap-2">
                  <h5 className="text-deverse">
                    {formatWalletAddress(user.wallet_address)}
                  </h5>
                </div>
              )}
              {user && user.social_email && (
                <div className="flex flex-row gap-2">
                  <h6 className="text-deverse">{user.social_email}</h6>
                </div>
              )}
            </div>
          </div>
        </section>
        <section id="wallet-section" className="w-full px-4">
          <TabHeaderPillBar
            data={[
              {
                href: "/account",
                label: `Worlds (${dummyWorldCards.length})`,
                Icon: MapIcon,
                Pane: worldsSection,
              },
              {
                href: "/account",
                label: `Avatars (${dummyAvatarCards.length})`,
                Icon: UserIcon,
                Pane: avatarSection,
              },
              {
                href: "/account",
                label: `Events (${dummyEventCards.length})`,
                Icon: CalendarDaysIcon,
                Pane: eventSection,
              },
              {
                href: "/account",
                label: "Statistics",
                Icon: ChartBarIcon,
                Pane: statisticsSection,
              },
              {
                href: "/account",
                label: "Settings",
                Icon: AdjustmentsHorizontalIcon,
                Pane: settingsSection,
              },
            ]}
          />
        </section>
      </div>
    </>
  );
}
