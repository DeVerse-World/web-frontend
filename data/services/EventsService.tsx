import deverseClient from "../api/deverse_client";
import { EventUriResponse } from "../model/ipfs_response";
import { EventResponse, Response } from "../model/response";
import { Result } from "../model/Result";
import { BaseService } from "./BaseService";

class EventsService extends BaseService {
  async fetchEvents(): Promise<Result<EventResponse>> {
    const response = await deverseClient.get<Response<EventResponse>>('event');
    const parsedRes = this.parseResponse<EventResponse>(response);
    if (parsedRes.isSuccess()) {
      const parallelJobs: Promise<EventUriResponse>[] = [];
      parsedRes.value.events.forEach(event => {
        parallelJobs.push(new Promise<EventUriResponse>(async (resolve, reject) => {
          if (event.event_config_uri) {
            deverseClient.get<EventUriResponse>(event.event_config_uri).then(res => {
              if (res.status != 200) {
                reject(res.statusText)
              } else {
                resolve(res.data);
              }
            })
          } else {
            reject('No event config uri to fetch thumbnail')
          }
        }));
      })

      const res = await Promise.allSettled(parallelJobs)
      for (let i = 0; i < parallelJobs.length; i++) {
        if (res[i].status == "fulfilled") {
          parsedRes.value.events[i].thumbnail_image = res[i].value.thumbnail_image;
        }
      }
    }
    return parsedRes;
  }
}

export default new EventsService();