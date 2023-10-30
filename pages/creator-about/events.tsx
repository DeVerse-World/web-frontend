import EventList from "../../components/asset/EventList";
import { useContext, useEffect, useState } from "react";
import { EventViewModel } from "../../components/asset/EventList";
import { AppContext, ViewState } from "../../components/contexts/app_context";
import AccountService from "../../data/services/AccountService";
import { getTimeString } from "../../utils/time_util";

const Events = () => {
  const { setViewState } = useContext(AppContext);
  const [nfts, setNfts] = useState<EventViewModel[]>([]);
  useEffect(() => {
    setViewState(ViewState.LOADING);
    AccountService.getUserInfo()
      .then((res) => {
        if (res.isSuccess()) {
          const data = res.value.created_events.map<EventViewModel>((e) => ({
            id: e.id.toString(),
            name: e.name,
            description: "Description of event",
            eventConfigUri: e.event_config_uri,
            lastUpdate: getTimeString(new Date(e.updated_at)),
            stage: e.stage,
            participants: e.max_num_participants,
          }));
          setNfts(data);
        }
      })
      .finally(() => {
        setViewState(ViewState.SUCCESS);
      });
  }, []);

  return <EventList data={nfts} />;
};

export default Events;
