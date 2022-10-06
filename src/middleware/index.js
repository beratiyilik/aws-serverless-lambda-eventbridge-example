import middy from "@middy/core";
import httpHeaderNormalizer from "@middy/http-header-normalizer";
import jsonBodyParser from "@middy/http-json-body-parser";
import cors from "@middy/http-cors";
import validator from "@middy/validator";
import httpErrorHandler from "@middy/http-error-handler";

const middyfy = ({ lambda, inputSchema }) => {
  const handler = middy(lambda).use(httpHeaderNormalizer());

  return (
    handler
      .use(jsonBodyParser())
      // .use(validator({ inputSchema }))
      .use(httpErrorHandler())
      .use(cors())
  );
};

export default middyfy;
