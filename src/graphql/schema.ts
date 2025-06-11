// src/graphql/schema.ts

import { createSchema } from "graphql-yoga";
import type { NextRequest } from "next/server";

export const schema = createSchema<{ req: NextRequest }>({
  // ✅ Add generic type here
  typeDefs: /* GraphQL */ `
    type Query {
      hello: String
      transformers: [Transformer!]!
    }

    type Mutation {
      addTransformers(input: TransformerInput!): [Transformer!]!
    }

    input TransformerInput {
      ncTe: String
      location: String
      inspectionDate: String
      quantity: Int!
      kva: Int
      transformerType: String
      sensorGen: String
      issues: String!
    }

    type Transformer {
      id: ID!
      ncTe: String
      location: String
      inspectionDate: String
      kva: Int
      transformerType: String
      sensorGen: String
      issues: String!
    }
  `,
  resolvers: {
    Query: {
      hello: () => "Hello from Yoga + Next.js!",
      transformers: () => {
        // this will later pull from a real database
        return [];
      },
    },
    Mutation: {
      addTransformers: async (_: any, { input }: any) => {
        const {
          quantity,
          ncTe,
          location,
          inspectionDate,
          kva,
          transformerType,
          sensorGen,
          issues,
        } = input;

        const newTransformers = Array.from({ length: quantity }, () => ({
          id: crypto.randomUUID(),
          ncTe,
          location,
          inspectionDate,
          kva,
          transformerType,
          sensorGen,
          issues,
        }));

        console.log("Created transformer rows:", newTransformers);
        return newTransformers;
      },
    },
  },
});
