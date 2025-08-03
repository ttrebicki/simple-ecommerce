import { z } from "zod";

const addressSchema = z.object({
  country: z
    .string({ error: "Country is required" })
    .nonempty({ message: "Country cannot be empty" }),

  city: z
    .string({ error: "City is required" })
    .nonempty({ message: "City cannot be empty" }),

  postal_code: z
    .string({ error: "Postal code is required" })
    .nonempty({ message: "Postal code cannot be empty" }),

  line1: z
    .string({ error: "Address is required" })
    .nonempty({ message: "Address cannot be empty" }),
});

export const buyValidator = z.object({
  email: z
    .string({ error: "Email is required" })
    .nonempty({ message: "Email cannot be empty" })
    .email({ message: "Email must be a valid email address" }),
  name: z
    .string({ error: "Name is required" })
    .nonempty({ message: "Name cannot be empty" }),

  billingAddress: z.object({
    address: addressSchema,
  }),
});
