declare module "knex/types/tables" {
  interface Credential {
    credential_id: string;
    username: string;
    password: string;
    created_at: string;
    updated_at: string;
  }

  interface User {
    user_id: string;
    first_name: string;
    last_name: string;
    created_at: string;
    updated_at: string;
  }

  interface Tables {
    credentials: Credential
    users: User
  }
}
