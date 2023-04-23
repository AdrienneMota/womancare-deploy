import { request } from "@prisma/client"

export type RequestPaymentParams = Omit< request, "donatory_id" | "total" | "product_request">