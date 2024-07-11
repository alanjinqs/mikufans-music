CREATE TABLE `currentQueue` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`songId` integer NOT NULL,
	FOREIGN KEY (`songId`) REFERENCES `song`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `currentQueueMeta` (
	`key` text PRIMARY KEY NOT NULL,
	`value` text
);
