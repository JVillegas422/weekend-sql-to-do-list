CREATE TABLE "toDo" (
"id" SERIAL PRIMARY KEY,
"taskName" VARCHAR(30) NOT NULL,
"taskCompleted" BOOLEAN,
"taskNotes" VARCHAR(120)
);

INSERT INTO "toDo"
("taskName", "taskCompleted", "taskNotes")
VALUES
('groceries', true, 'Went to Target for groceries'),
('mow front lawn', false, 'Mow front lawn'),
('mow back lawn', false, 'Mow back lawn'),
('clean storage', true, 'Cleaned the storage room'),
('wash car', false, 'Get car washed');

SELECT * FROM "toDo";