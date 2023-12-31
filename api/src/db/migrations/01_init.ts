import { Knex } from "knex";
import {
  CREDENTIAL_TABLE_NAME,
  EVENT_TABLE_NAME,
  USER_TABLE_NAME,
} from "../table_names";

const ON_UPDATE_TIMESTAMPTZ = "on_update_timestamptz";

export async function up(knex: Knex): Promise<void> {
  // To allow the use of the gen_random_uuid() function we need to add the extension pgcrypto
  await knex.raw('CREATE EXTENSION IF NOT EXISTS "pgcrypto" schema public');

  // Creates the function to use as a trigger when updating a table that has a updated_at column
  await knex.raw(`
	CREATE OR REPLACE FUNCTION ${ON_UPDATE_TIMESTAMPTZ}()
	RETURNS trigger AS $$
	BEGIN
		NEW.updated_at = (now() at time zone 'utc');
		RETURN NEW;
	END;
  	$$ language 'plpgsql';
  	`);

  // Table: credential
  await knex.schema.createTable(CREDENTIAL_TABLE_NAME, (table) => {
    table
      .uuid("id")
      .notNullable()
      .defaultTo(knex.raw("public.gen_random_uuid()"))
      .primary();
    table.string("username").notNullable();
    table.string("password").notNullable();
    table
      .timestamp("created_at", { useTz: true })
      .notNullable()
      .defaultTo(knex.raw("(now() at time zone 'utc')"));
    table
      .timestamp("updated_at", { useTz: true })
      .notNullable()
      .defaultTo(knex.raw("(now() at time zone 'utc')"));
  });

  // Table: users
  await knex.schema.createTable(USER_TABLE_NAME, (table) => {
    table
      .uuid("id")
      .notNullable()
      .defaultTo(knex.raw("public.gen_random_uuid()"))
      .primary();
    table
      .uuid("credential_id")
      .notNullable()
      .references("id")
      .inTable(CREDENTIAL_TABLE_NAME);
    table.string("first_name").notNullable();
    table.string("last_name").notNullable();
    table
      .timestamp("created_at", { useTz: true })
      .notNullable()
      .defaultTo(knex.raw("(now() at time zone 'utc')"));
    table
      .timestamp("updated_at", { useTz: true })
      .notNullable()
      .defaultTo(knex.raw("(now() at time zone 'utc')"));
  });

  // Table: events
  await knex.schema.createTable(EVENT_TABLE_NAME, (table) => {
    table
      .uuid("id")
      .notNullable()
      .defaultTo(knex.raw("public.gen_random_uuid()"))
      .primary();
    table.string("name").notNullable();
    table.string("description").notNullable();
    table.string("location").notNullable();
    table
      .timestamp("date_of_event", { useTz: true })
      .notNullable()
    table
      .uuid("created_by")
      .notNullable()
      .references("id")
      .inTable(CREDENTIAL_TABLE_NAME);
    table
      .timestamp("created_at", { useTz: true })
      .notNullable()
      .defaultTo(knex.raw("(now() at time zone 'utc')"));
    table
      .timestamp("updated_at", { useTz: true })
      .notNullable()
      .defaultTo(knex.raw("(now() at time zone 'utc')"));
  });
}

export async function down(knex: Knex): Promise<void> {
  // Drop table: events
  await knex.schema.dropTableIfExists(EVENT_TABLE_NAME);

  // Drop table: users
  await knex.schema.dropTableIfExists(USER_TABLE_NAME);

  // Drop table: credential
  await knex.schema.dropTableIfExists(CREDENTIAL_TABLE_NAME);

  // Drop function
  await knex.raw(`DROP FUNCTION ${ON_UPDATE_TIMESTAMPTZ}`);
}
