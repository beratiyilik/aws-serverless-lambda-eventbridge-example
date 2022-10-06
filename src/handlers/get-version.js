"use strict";

import middyfy from "../middleware/index.js";

const versionService = async (event) => {
  console.log(`versionService called with event: ${JSON.stringify(event)}`);
  const { requestId } = event.requestContext;
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: "Go Serverless v3.0! Your function executed successfully!",
        requestId,
      },
      null,
      2
    ),
  };
};

const lambda = async (event) => versionService(event);

export const getVersion = middyfy({ lambda });
