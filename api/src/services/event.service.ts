import logger from "../middleware/logger";
import EventRepository from "../repositories/event.repository";
import { EventData, UpdateEvent } from "../types/event";
import { Pagination } from "../types/pagination";

export default class EventService {
  private eventRepository: EventRepository;
  constructor() {
    this.eventRepository = new EventRepository();
  }

  async getEvents(credentialId: string, pagination: Pagination) {
    return this.eventRepository.getEvents(credentialId, pagination);
  }

  async getEvent(credentialId: string, id: string) {
    return this.eventRepository.getEvent(credentialId, id);
  }

  async addEvent(eventData: EventData) {
    return this.eventRepository.addEvent(eventData);
  }

  async updateEvent(credentialId: string, id: string, eventData: UpdateEvent) {
    return this.eventRepository.updateEvent(credentialId, id, eventData);
  }

  async deleteEvent(credentialId: string, id: string) {
    return this.eventRepository.deleteEvent(credentialId, id);
  }
}
