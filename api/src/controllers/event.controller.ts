import { NextFunction, Request, Response, Router } from "express";
import { authenticate } from "../middleware/authentication";
import logger from "../middleware/logger";
import EventService from "../services/event.service";
import { Pagination, Sort } from "../types/pagination";
import { EventData } from "../types/event";

const router = Router();

const eventService = new EventService();

router.get(
  "/events",
  authenticate,
  async (req: Request, res: Response, next: NextFunction) => {
    req.log.info("Get Events request received");
    try {
      const { user, query } = req;

      logger.info({ user, query }, "Get Events request data");

      const pagination: Pagination = {
        pageNumber: Number(query.pageNumber) || 1,
        pageSize: Number(query.pageSize) || 10,
        sort: (query.sort as Sort) || "asc",
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
  authenticate,
  async (req: Request, res: Response, next: NextFunction) => {
    req.log.info("Get Event request received");

    try {
      const { user, params } = req;

      const event = await eventService.getEvent(user.credentialId, params.id);

      res.status(200).json(event);
    } catch (error) {
      logger.error(error);
      res.status(500).json("Something went wrong!");
    }
  }
);

router.post(
  "/events",
  authenticate,
  async (req: Request, res: Response, next: NextFunction) => {
    req.log.info("Add Event request received");

    try {
      const { user, body } = req;

      logger.info({ user, body }, "Create Event request data");

      const eventData: EventData = {
        ...body,
        createdBy: user.credentialId,
      };

      const event = await eventService.addEvent(eventData);
      logger.info(event, "Event created");
      res.status(201).json(event);
    } catch (error) {
      next(error);
    }
  }
);

router.put(
  "/events/:id",
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
