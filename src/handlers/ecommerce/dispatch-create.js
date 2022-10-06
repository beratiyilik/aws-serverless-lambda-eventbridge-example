"use strict";

export const dispatchCreate = async (event) => {
  console.log(
    `dispatch create handler called with event: ${JSON.stringify(event)}`
  );
  const { detail } = event;
  console.log(`dispatch create detail: ${JSON.stringify(detail, null, 2)}`);
  return {
    statusCode: 201,
    body: JSON.stringify(
      {
        message: "This is dispatch create lambda!",
        body: detail,
      },
      null,
      2
    ),
  };
};
