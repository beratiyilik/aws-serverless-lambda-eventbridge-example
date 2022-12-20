"use strict";

import middyfy from "../../middleware/index.js";
import {
  EventBridgeClient,
  ActivateEventSourceCommand,
  PutEventsCommand,
} from "@aws-sdk/client-eventbridge";

const REGION = process.env.AWS_REGION || "eu-west-2";
const client = new EventBridgeClient({ region: REGION });

const createOrderService = async (event) => {
  const { body, ...rest } = event;
  console.log(
    `order create handler called with event: ${JSON.stringify(rest, null, 2)}`
  );
  console.log(`order create body: ${JSON.stringify(body, null, 2)}`);

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

  // const command = new ActivateEventSourceCommand(params);
  const command = new PutEventsCommand(params);
  const result = await client.send(command);

  return {
    statusCode: 201,
    body: JSON.stringify({
      message: "This is order create lambda!",
      body: { ...event.body, requestId },
      result,
    }),
  };
};

const lambda = async (event) => createOrderService(event);

export const orderCreate = middyfy({ lambda });
