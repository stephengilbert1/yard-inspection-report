// src/app/api/graphql/route.ts

import { createYoga } from "graphql-yoga";
import { schema } from "@/graphql/schema";
import { NextRequest } from "next/server";

const yoga = createYoga<{
  req: NextRequest;
}>({
  schema,
  graphqlEndpoint: "/api/graphql",
  fetchAPI: { Request, Response },
});

export async function GET(req: NextRequest) {
  return yoga.handleRequest(req, { req });
}

// Explicit wrapper for POST
export async function POST(req: NextRequest) {
  return yoga.handleRequest(req, { req });
}
