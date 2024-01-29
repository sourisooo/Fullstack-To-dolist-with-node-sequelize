BEGIN;

DROP TABLE IF EXISTS "card_has_tag",
"tag",
"card",
"list";

CREATE TABLE IF NOT EXISTS "list" (
    "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name" TEXT NOT NULL DEFAULT '',
    "position" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS "card" (
    "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "content" TEXT NOT NULL DEFAULT '',
    "color" TEXT NOT NULL DEFAULT '#fff',
    "position" TEXT NOT NULL DEFAULT 0,
    "list_id" INTEGER NOT NULL REFERENCES list("id") ON DELETE CASCADE,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS "tag" (
    "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name" TEXT NOT NULL DEFAULT '',
    "color" TEXT NOT NULL DEFAULT '#fff',
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ
);

/* table de liaison */
-- table de liaison
CREATE TABLE IF NOT EXISTS "card_has_tag" (
    "tag_id" INTEGER NOT NULL REFERENCES tag("id") ON DELETE CASCADE,
    "card_id" INTEGER NOT NULL REFERENCES card("id") ON DELETE CASCADE,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Insérer qq données
INSERT INTO
    "list" ("name")
VALUES
    ('Shopping');

INSERT INTO
    "card" ("content", "color", "list_id")
VALUES
    ('Tomates', '#fff696', 1),
    ('Bananes', '#ccceee', 1);

INSERT INTO
    "tag" ("name", "color")
VALUES
    ('Urgent', '#F00');

INSERT INTO
    "card_has_tag" ("card_id", "tag_id")
VALUES
    (1, 1);

COMMIT;