import { createNextPageApiHandler } from "uploadthing/next-legacy";

import { ourFileRouter } from "./route";

const handler = createNextPageApiHandler({
  router: ourFileRouter,
});

export default handler;
