import { describe, it, expect } from "vitest";
import { experience } from "../../src/data/experience";

describe("experience data", () => {
  it("cargos ativos (end: null) aparecem primeiro", () => {
    const firstNonActive = experience.findIndex((j) => j.end !== null);
    const lastActive = experience.map((j) => j.end).lastIndexOf(null);
    expect(lastActive).toBeLessThan(firstNonActive === -1 ? Infinity : firstNonActive);
  });

  it("está em ordem decrescente de start", () => {
    for (let i = 0; i < experience.length - 1; i++) {
      expect(experience[i].start >= experience[i + 1].start).toBe(true);
    }
  });
});
