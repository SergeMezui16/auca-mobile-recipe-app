PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_comments` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`content` text NOT NULL,
	`author` text NOT NULL,
	`recipe_id` integer,
	`createdAt` integer DEFAULT '"2025-04-02T10:20:41.395Z"' NOT NULL,
	FOREIGN KEY (`recipe_id`) REFERENCES `recipes`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_comments`("id", "content", "author", "recipe_id", "createdAt") SELECT "id", "content", "author", "recipe_id", "createdAt" FROM `comments`;--> statement-breakpoint
DROP TABLE `comments`;--> statement-breakpoint
ALTER TABLE `__new_comments` RENAME TO `comments`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE TABLE `__new_ingredients` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`quantity` integer NOT NULL,
	`unit` text NOT NULL,
	`recipe_id` integer,
	FOREIGN KEY (`recipe_id`) REFERENCES `recipes`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_ingredients`("id", "name", "quantity", "unit", "recipe_id") SELECT "id", "name", "quantity", "unit", "recipe_id" FROM `ingredients`;--> statement-breakpoint
DROP TABLE `ingredients`;--> statement-breakpoint
ALTER TABLE `__new_ingredients` RENAME TO `ingredients`;--> statement-breakpoint
CREATE TABLE `__new_steps` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`position` integer NOT NULL,
	`description` text NOT NULL,
	`recipe_id` integer,
	FOREIGN KEY (`recipe_id`) REFERENCES `recipes`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_steps`("id", "position", "description", "recipe_id") SELECT "id", "position", "description", "recipe_id" FROM `steps`;--> statement-breakpoint
DROP TABLE `steps`;--> statement-breakpoint
ALTER TABLE `__new_steps` RENAME TO `steps`;--> statement-breakpoint
CREATE TABLE `__new_recipes` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`description` text,
	`uri` text,
	`rate` integer NOT NULL,
	`duration` integer NOT NULL,
	`createdAt` integer DEFAULT '"2025-04-02T10:20:41.394Z"' NOT NULL,
	`updatedAt` integer DEFAULT '"2025-04-02T10:20:41.394Z"' NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_recipes`("id", "name", "description", "uri", "rate", "duration", "createdAt", "updatedAt") SELECT "id", "name", "description", "uri", "rate", "duration", "createdAt", "updatedAt" FROM `recipes`;--> statement-breakpoint
DROP TABLE `recipes`;--> statement-breakpoint
ALTER TABLE `__new_recipes` RENAME TO `recipes`;