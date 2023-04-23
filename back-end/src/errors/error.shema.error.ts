import { ApplicationError } from "../protocols/error.protocol";

export function schemaError(detailsError): ApplicationError {
  return {
    name: "schemaError",
    message: `error: ${detailsError}`,
  };
}