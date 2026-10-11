import { describe, expect, it } from "vitest";
import { parseStory } from "../src/utils/storyParser";

describe("parseStory", () => {
  it("returns an empty graph for empty content", () => {
    expect(parseStory("")).toEqual({ nodes: [], links: [] });
  });

  it("extracts repeated character names and locations with nearby links", () => {
    const graph = parseStory(
      "Mira entered the forest. Mira crossed the river before reaching the castle."
    );

    expect(graph.nodes).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: "char_Mira",
          name: "Mira",
          type: "character",
        }),
        expect.objectContaining({
          id: "loc_forest",
          name: "Forest",
          type: "location",
        }),
        expect.objectContaining({
          id: "loc_river",
          name: "River",
          type: "location",
        }),
        expect.objectContaining({
          id: "loc_castle",
          name: "Castle",
          type: "location",
        }),
      ])
    );
    expect(graph.links).toContainEqual({
      source: "char_Mira",
      target: "loc_forest",
    });
  });

  it("does not treat sentence starters as character names", () => {
    const graph = parseStory(
      "Mira crossed the forest. Then she reached the river."
    );

    expect(graph.nodes.map(({ id }) => id)).not.toContain("char_Then");
    expect(graph.nodes.map(({ id }) => id)).not.toContain("char_Mira");
  });

  it("includes a one-off proper name when it appears mid-sentence", () => {
    const graph = parseStory(
      "After the storm, Mira found a path through the forest."
    );

    expect(graph.nodes).toContainEqual(
      expect.objectContaining({
        id: "char_Mira",
        name: "Mira",
        type: "character",
      })
    );
  });
});
