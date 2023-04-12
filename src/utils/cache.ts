import NodeCache from "node-cache";

export const cache = new NodeCache({
  checkperiod: 600, // in seconds
});
