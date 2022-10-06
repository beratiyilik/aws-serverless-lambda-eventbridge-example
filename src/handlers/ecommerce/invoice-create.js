"use strict";

export const invoiceCreate = async (event) => {
  console.log(
    `invoice create handler called with event: ${JSON.stringify(event)}`
  );
  const { detail } = event;
  console.log(`invoice create detail: ${JSON.stringify(detail, null, 2)}`);
  return {
    statusCode: 201,
    body: JSON.stringify(
      {
        message: "This is invoice create lambda!",
        body: detail,
      },
      null,
      2
    ),
  };
};
