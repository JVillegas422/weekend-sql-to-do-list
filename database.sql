CREATE TABLE "tasksToDo" (
	"id" SERIAL PRIMARY KEY,
	"taskName" VARCHAR(30) NOT NULL,
	"taskIsComplete" BOOLEAN DEFAULT FALSE,
	"taskNotes" VARCHAR(150)
);


INSERT INTO "tasksToDo"
	("taskName", "taskIsComplete", "taskNotes")
VALUES
	('wash cloths', false, 'lots of laundry to do..'),
	('take out trash', false, 'so much trash...'),
	('clean bedroom', false, 'really needs to be cleaned...');
	
SELECT * FROM "tasksToDo"