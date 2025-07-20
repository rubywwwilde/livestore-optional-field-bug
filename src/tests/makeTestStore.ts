import { makeAdapter } from "@livestore/adapter-node";
import { createStorePromise } from "@livestore/livestore";
import { schema } from "../livestore/schema";

const adapter = makeAdapter({
  storage: { type: "in-memory" },
});

export const makeTestStore = async () => {
  return await createStorePromise({
    adapter,
    schema,
    storeId: "10",
  });
};
