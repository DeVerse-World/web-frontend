import deverseClient from "../api/deverse_client";
import { EventResponse, Response } from "../model/response";
import { Result } from "../model/Result";

class EventsService {
  async fetchEvents(): Promise<Result<EventResponse>> {
    let res = await deverseClient.get<Response<EventResponse>>('event');
    return res.data;
  }
}

export default new EventsService();