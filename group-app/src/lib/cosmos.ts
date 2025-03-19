// group-app\src\lib\cosmos-simplified.ts

import { CosmosClient } from "@azure/cosmos";

// Create a client to reuse
let cosmosClient: CosmosClient | null = null;

export function getContainer() {
  const endpoint = process.env.COSMOS_ENDPOINT!;
  const masterKey = process.env.COSMOS_KEY!;
  const dbName = process.env.DB_NAME!;
  const containerName = process.env.CONTAINER_NAME!;

  // Create client if it doesn't exist
  if (!cosmosClient) {
    cosmosClient = new CosmosClient({
      endpoint,
      key: masterKey
    });
  }

  return cosmosClient.database(dbName).container(containerName);
}