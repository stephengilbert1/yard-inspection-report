// src/app/api/graphql/route.ts

import { createYoga } from "graphql-yoga";
import { schema } from "@/graphql/schema";
import { NextRequest } from "next/server";
console.log("Schema loaded from:", schema);
const yoga = createYoga<{
  req: NextRequest;
}>({
  schema, // ✅ Use your real schema here
  graphqlEndpoint: "/api/graphql",
  fetchAPI: { Request, Response },
});

export { yoga as GET, yoga as POST };
