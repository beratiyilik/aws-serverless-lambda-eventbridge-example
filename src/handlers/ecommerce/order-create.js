"use strict";

import AWS from "aws-sdk";
import middyfy from "../../middleware/index.js";

const REGION = process.env.AWS_REGION || "eu-west-2";
AWS.config.update({ region: REGION });

const createOrderService = async (event) => {
  console.log(
    `order create handler called with event: ${JSON.stringify(event)}`
  );
  console.log(`order create body: ${JSON.stringify(event.body)}`);
  const { requestId } = event.requestContext;

  const params = {
    Entries: [
      {
        Detail: JSON.stringify({ ...event.body, requestId }),
        DetailType: "transaction",
        EventBusName: "custom-events",
        Source: "custom.orderCreate",
        Time: new Date(),
      },
    ],
  };
  const eventBridge = new AWS.EventBridge({ apiVersion: "2015-10-07" });
  const result = await eventBridge.putEvents(params).promise();

  return {
    statusCode: 201,
    body: JSON.stringify(
      {
        message: "This is order create lambda!",
        body: { ...event.body, requestId },
        result,
      },
      null,
      2
    ),
  };
};

const lambda = async (event) => createOrderService(event);

export const orderCreate = middyfy({ lambda });
