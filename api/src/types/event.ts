export type EventData = {
  name: string;
  dateOfEvent: string;
  description: string;
  createdBy: string;
};

export type Event = {
  id: string;
  name: string;
  dateOfEvent: string;
  description: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
};

export type EventTable = {
  id: string;
  name: string;
  date_of_event: string;
  description: string;
  created_by: string;
  created_at: string;
  updated_at: string;
};

export type UpdateEvent = Omit<
  Event,
  "id" | "createdBy" | "createdAt" | "updatedAt"
>;
