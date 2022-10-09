CREATE TABLE "tasksToDo" (
	"id" SERIAL PRIMARY KEY,
	"taskName" VARCHAR(30) NOT NULL,
	"taskNotes" VARCHAR(150),
	"taskIsComplete" BOOLEAN
);


INSERT INTO "tasksToDo"
	("taskName", "taskNotes", "taskIsComplete")
VALUES
	('get more candy', 'need lots of candy!', false),
	('need another skeleton', 'they always end up missing. . .', false),
	('clean the dungeon', 'blood everywhere. . .', false),
	('clean the witches cauldron', 'need this done before midnight!', false),
	('feed the werewolf', 'loves fresh meat', false);
	
SELECT * FROM "tasksToDo"