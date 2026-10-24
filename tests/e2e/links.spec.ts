import { test, expect } from "@playwright/test";
import { LinkChecker } from "linkinator";

test("sem links internos quebrados", async () => {
  const checker = new LinkChecker();
  const result = await checker.check({
    path: "http://localhost:4321",
    recurse: true,
    linksToSkip: async (url: string) => !url.startsWith("http://localhost:4321"),
  });

  const broken = result.links.filter((l) => l.state === "BROKEN");
  expect(broken, `Links internos quebrados:\n${broken.map((l) => `  ${l.url} (${l.status})`).join("\n")}`).toHaveLength(0);
});
