import test from "node:test";
import assert from "node:assert/strict";
import { products } from "./catalog.js";
import { refineRecommendations, agePreferences } from "./recommendations.js";
test("optional age keeps original product matches and does not mutate the list", () => {
  const items = products.filter((p) =>
    ["moisture", "spots", "dark circles"].includes(p.concern),
  );
  const order = items.map((p) => p.id);
  assert.equal(refineRecommendations(items, ""), items);
  for (const [age, preference] of Object.entries(agePreferences)) {
    const result = refineRecommendations(items, age);
    assert.equal(result[0].id, preference.priority[0]);
    assert.deepEqual(result.map((p) => p.id).sort(), [...order].sort());
    assert.deepEqual(
      items.map((p) => p.id),
      order,
    );
  }
});
test("every product has an image, source, variant and valid USD price", () => {
  assert.equal(products.length, 8);
  for (const p of products) {
    assert.ok(p.image.startsWith("/products/"));
    assert.ok(p.url.startsWith("https://"));
    assert.ok(p.size);
    assert.ok(p.price > 0);
  }
  assert.equal(
    products.find((p) => p.id === "lip").price +
      products.find((p) => p.id === "blush").price,
    26.5,
  );
});
