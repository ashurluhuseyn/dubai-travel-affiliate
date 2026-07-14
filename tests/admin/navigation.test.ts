import assert from "node:assert/strict";
import { describe, it } from "node:test";

import {
  ADMIN_NAV_GROUPS,
  ADMIN_NAV_ITEMS,
  formatAdminRole,
  isAdminNavItemActive,
} from "../../src/lib/admin/navigation";

describe("isAdminNavItemActive", () => {
  it("activates dashboard only on the exact /admin route", () => {
    assert.equal(isAdminNavItemActive("/admin", "/admin"), true);
    assert.equal(isAdminNavItemActive("/admin/experiences", "/admin"), false);
    assert.equal(isAdminNavItemActive("/admin/analytics", "/admin"), false);
  });

  it("activates experiences for nested create and edit routes", () => {
    assert.equal(
      isAdminNavItemActive("/admin/experiences/new", "/admin/experiences"),
      true
    );
    assert.equal(
      isAdminNavItemActive(
        "/admin/experiences/uuid-1/edit",
        "/admin/experiences"
      ),
      true
    );
    assert.equal(
      isAdminNavItemActive("/admin/categories/new", "/admin/experiences"),
      false
    );
  });

  it("activates categories for nested create and edit routes", () => {
    assert.equal(
      isAdminNavItemActive("/admin/categories/new", "/admin/categories"),
      true
    );
    assert.equal(
      isAdminNavItemActive("/admin/categories/uuid-1/edit", "/admin/categories"),
      true
    );
  });

  it("normalizes trailing slashes", () => {
    assert.equal(isAdminNavItemActive("/admin/analytics/", "/admin/analytics"), true);
  });
});

describe("ADMIN_NAV_GROUPS", () => {
  it("includes all required routes without duplication", () => {
    const hrefs = ADMIN_NAV_ITEMS.map((item) => item.href);

    assert.deepEqual(hrefs, [
      "/admin",
      "/admin/experiences",
      "/admin/categories",
      "/admin/media",
      "/admin/analytics",
      "/admin/settings",
    ]);
    assert.equal(ADMIN_NAV_GROUPS.length, 4);
  });

  it("marks media and settings as disabled placeholders", () => {
    const media = ADMIN_NAV_ITEMS.find((item) => item.href === "/admin/media");
    const settings = ADMIN_NAV_ITEMS.find(
      (item) => item.href === "/admin/settings"
    );

    assert.equal(media?.enabled, false);
    assert.equal(settings?.enabled, false);
  });
});

describe("formatAdminRole", () => {
  it("formats snake_case admin roles for display", () => {
    assert.equal(formatAdminRole("super_admin"), "super admin");
    assert.equal(formatAdminRole("editor"), "editor");
  });
});
