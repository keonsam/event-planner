import { NextFunction, Request, Response, Router } from "express";
import { authenticate } from "../middleware/authentication";
import EventService from "../services/event.service";
import { Pagination, Sort } from "../types/pagination";
import { EventData } from "../types/event";
import { validate } from "../middleware/validation";
import { createEventSchema, getEventsSchema, idSchema } from "../types/schema";

const router = Router();

const eventService = new EventService();

router.get(
  "/events",
  validate(getEventsSchema, "query"),
  authenticate,
  async (req: Request, res: Response, next: NextFunction) => {
    req.log.info("Get Events request received");
    try {
      const { user, query } = req;

      const pagination: Pagination = {
        pageNumber: Number(query.pageNumber),
        pageSize: Number(query.pageSize),
        sort: query.sort as Sort,
      };

      const events = await eventService.getEvents(
        user.credentialId,
        pagination
      );
      res.status(200).json(events);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  "/events/:id",
  validate(idSchema, "params"),
  authenticate,
  async (req: Request, res: Response, next: NextFunction) => {
    req.log.info("Get Event request received");

    try {
      const { user, params } = req;

      const event = await eventService.getEvent(user.credentialId, params.id);

      res.status(200).json(event);
    } catch (error) {
      next(error)
    }
  }
);

router.post(
  "/events",
  validate(createEventSchema, "body"),
  authenticate,
  async (req: Request, res: Response, next: NextFunction) => {
    req.log.info("Add Event request received");

    try {
      const { user, body } = req;

      const eventData: EventData = {
        ...body,
        createdBy: user.credentialId,
      };

      const event = await eventService.addEvent(eventData);
      res.status(201).json(event);
    } catch (error) {
      next(error);
    }
  }
);

router.put(
  "/events/:id",
  validate(idSchema, "params"),
  authenticate,
  async (req: Request, res: Response, next: NextFunction) => {
    req.log.info("Update Event request received");

    try {
      const { user, params, body } = req;

      const event = await eventService.updateEvent(
        user.credentialId,
        params.id,
        body
      );

      res.status(200).json(event);
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  "/events/:id",
  validate(idSchema, "params"),
  authenticate,
  async (req: Request, res: Response, next: NextFunction) => {
    req.log.info("Delete Event request received");

    try {
      const { user, params } = req;

      const event = await eventService.deleteEvent(
        user.credentialId,
        params.id
      );

      res.status(200).json(event);
    } catch (error) {
      next(error);
    }
  }
);

export default router;
