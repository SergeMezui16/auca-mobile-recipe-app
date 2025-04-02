PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_comments` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`content` text NOT NULL,
	`author` text NOT NULL,
	`recipe_id` integer,
	`createdAt` integer DEFAULT '"2025-04-02T10:30:02.270Z"' NOT NULL,
	FOREIGN KEY (`recipe_id`) REFERENCES `recipes`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_comments`("id", "content", "author", "recipe_id", "createdAt") SELECT "id", "content", "author", "recipe_id", "createdAt" FROM `comments`;--> statement-breakpoint
DROP TABLE `comments`;--> statement-breakpoint
ALTER TABLE `__new_comments` RENAME TO `comments`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE TABLE `__new_recipes` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`description` text,
	`uri` text,
	`rate` integer NOT NULL,
	`duration` integer NOT NULL,
	`published` integer DEFAULT false NOT NULL,
	`createdAt` integer DEFAULT '"2025-04-02T10:30:02.268Z"' NOT NULL,
	`updatedAt` integer DEFAULT '"2025-04-02T10:30:02.268Z"' NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_recipes`("id", "name", "description", "uri", "rate", "duration", "published", "createdAt", "updatedAt") SELECT "id", "name", "description", "uri", "rate", "duration", "published", "createdAt", "updatedAt" FROM `recipes`;--> statement-breakpoint
DROP TABLE `recipes`;--> statement-breakpoint
ALTER TABLE `__new_recipes` RENAME TO `recipes`;