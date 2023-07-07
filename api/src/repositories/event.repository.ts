import { db } from "../db/dbConnection";
import { EVENT_TABLE_NAME } from "../db/table_names";
import logger from "../middleware/logger";
import ApplicationError from "../types/ApplicationError";
import { Event, EventData, EventTable, UpdateEvent } from "../types/event";
import { Pagination } from "../types/pagination";

export default class EventRepository {
  async getEvents(credentialId: string, pagination: Pagination) {
    const { pageNumber, pageSize, sort } = pagination;
    const events = await db<EventTable>(EVENT_TABLE_NAME)
      .select("*")
      .where({
        created_by: credentialId,
      })
      .limit(pagination.pageSize)
      .offset((pageNumber - 1) * pageSize)
      .orderBy("date_of_event", sort);

    
    logger.info({ id: events[0]?.id }, "Events retrieved");

    return events.map(this.mapDbEvent);
  }

  async getEvent(credentialId: string, id: string) {
    const [event] = await db<EventTable>(EVENT_TABLE_NAME)
      .select("*")
      .where({
        id,
        created_by: credentialId,
      })
      .limit(1);

    if (!event) {
      throw new ApplicationError(404, `No event found for id: ${id}`);
    }

    logger.info({ credentialId, id, resultId: event.id }, "Event retrieved");

    return this.mapDbEvent(event);
  }

  async addEvent(eventData: EventData) {
    const [event] = await db<EventTable>(EVENT_TABLE_NAME)
      .insert({
        name: eventData.name,
        date_of_event: eventData.dateOfEvent,
        description: eventData.description,
        location: eventData.location,
        created_by: eventData.createdBy,
      })
      .returning("*");

    logger.info({ id: event.id }, "Event created");

    return this.mapDbEvent(event);
  }

  async updateEvent(credentialId: string, id: string, eventData: UpdateEvent) {
    const [event] = await db<EventTable>(EVENT_TABLE_NAME)
      .where({ created_by: credentialId, id })
      .update({
        name: eventData.name,
        description: eventData.description,
      })
      .returning("*");

    logger.info({ id: event.id }, "Event updated");

    return this.mapDbEvent(event);
  }

  async deleteEvent(credentialId: string, id: string) {
    const result = await db<EventTable>(EVENT_TABLE_NAME)
      .where({
        id,
        created_by: credentialId,
      })
      .del();

    logger.info({ result, credentialId, id }, "Event deleted");

    return result;
  }

  private mapDbEvent(dbEvent: EventTable): Event {
    return {
      id: dbEvent.id,
      name: dbEvent.name,
      dateOfEvent: dbEvent.date_of_event,
      description: dbEvent.description,
      location: dbEvent.location,
      createdBy: dbEvent.created_by,
      createdAt: dbEvent.created_at,
      updatedAt: dbEvent.updated_at,
    };
  }
}
