CREATE TABLE "tasksToDo" (
	"id" SERIAL PRIMARY KEY,
	"taskName" VARCHAR(30) NOT NULL,
	"taskNotes" VARCHAR(150),
	"taskIsComplete" BOOLEAN
);


INSERT INTO "tasksToDo"
	("taskName", "taskNotes", "taskIsComplete")
VALUES
	('wash cloths', 'lots of laundry to do..', false),
	('take out trash', 'so much trash...', false),
	('clean bedroom', 'really needs to be cleaned...', false);
	
SELECT * FROM "tasksToDo"