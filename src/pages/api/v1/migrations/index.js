import migrationRunner from "node-pg-migrate";
import { join } from "node:path";

export default async function migrations(request, response) {
  const defaultMigrationOptions = {
    databaseUrl: process.env.DATABASE_URL,
    dryRun: true,
    dir: join("infra", "migrations"),
    direction: "up",
    verbose: true,
    migrationsTable: "pgmigrations",
  };

  if (request.method === "GET") {
    const pendingMigration = await migrationRunner(defaultMigrationOptions);

    return response.status(200).json(pendingMigration);
  }
  if (request.method === "POST") {
    const migratedMigration = await migrationRunner({
      ...defaultMigrationOptions,
      dryRun: false,
    });

    if (migratedMigration.length > 0) {
      return response.status(201).json(migratedMigration);
    }

    return response.status(200).json(migratedMigration);
  }
  return response.status(405).end();
}
