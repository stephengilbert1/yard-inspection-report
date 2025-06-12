// src/graphql/schema.ts

import { createSchema } from "graphql-yoga";
import type { NextRequest } from "next/server";
import { prisma } from "../lib/prisma";

export const schema = createSchema<{ req: NextRequest }>({
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
      tm: String
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
      tm: String
      kva: Int
      transformerType: String
      sensorGen: String
      issues: String!
      createdAt: String
    }
  `,
  resolvers: {
    Query: {
      hello: () => "Hello from Yoga + Next.js!",
      transformers: async () => {
        return await prisma.transformer.findMany();
      },
    },
    Mutation: {
      addTransformers: async (_: any, { input }: any) => {
        try {
          const {
            quantity,
            ncTe,
            location,
            inspectionDate,
            tm,
            kva,
            transformerType,
            sensorGen,
            issues,
          } = input;

          const created = await prisma.$transaction(
            Array.from({ length: quantity }).map(() =>
              prisma.transformer.create({
                data: {
                  ncTe,
                  location,
                  inspectionDate: inspectionDate.toString(),
                  tm,
                  kva,
                  transformerType,
                  sensorGen,
                  issues,
                },
              })
            )
          );

          return created;
        } catch (error) {
          console.error("❌ addTransformers mutation failed:", error);
          throw new Error("Server error: Failed to add transformers.");
        }
      },
    },
  },
});
