import deverseClient from "../api/deverse_client";
import { EventResponse, Response } from "../model/response";
import { Result } from "../model/Result";
import { BaseService } from "./BaseService";

class EventsService extends BaseService {
  async fetchEvents(): Promise<Result<EventResponse>> {
    let response = await deverseClient.get<Response<EventResponse>>('event');
    return this.parseResponse<EventResponse>(response);
  }
}

export default new EventsService();