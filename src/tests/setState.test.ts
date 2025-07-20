import { beforeEach, describe, expect, it } from "vitest";
import { makeTestStore } from "./makeTestStore";
import { events, tables } from "../livestore/schema";
import { queryDb } from "@livestore/livestore";

describe("Selection", () => {
  var store: Awaited<ReturnType<typeof makeTestStore>>;

  beforeEach(async () => {
    store = await makeTestStore();
  });

  it("succesfully sets a property with default text field set", () => {
    const textValue = "First attempt";

    store.commit(
      events.uiStateSet({ newTodoText: "", description: textValue }),
    );

    const result = store.query(queryDb(tables.uiState.get()));
    expect(result.description).toBe(textValue);
  });

  it("errors when optional property has no default text field set", () => {
    const textValue = "First attempt";

    store.commit(
      events.uiStateSet({ newTodoText: "", description: textValue }),
    );

    const result = store.query(queryDb(tables.uiStateNotSet.get()));
    expect(result.description).toBe(textValue);
  });

  it("success when trying to set the optional field second time", () => {
    const textValue = "First attempt";
    const newTextValue = "Second attempt";

    store.commit(
      events.uiStateNotSetSet({ newTodoText: "", description: textValue }),
    );

    store.commit(
      events.uiStateNotSetSet({ newTodoText: "", description: newTextValue }),
    );

    const result = store.query(queryDb(tables.uiStateNotSet.get()));
    expect(result.description).toBe(newTextValue);
  });
});
