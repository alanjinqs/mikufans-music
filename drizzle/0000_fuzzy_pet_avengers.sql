CREATE TABLE `artist` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text,
	`avatar` text
);
--> statement-breakpoint
CREATE TABLE `playlist` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text,
	`cover` text,
	`owner` integer,
	`description` text,
	`createdAt` integer,
	`updatedAt` integer,
	FOREIGN KEY (`owner`) REFERENCES `artist`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `song` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`cid` integer,
	`bvid` text,
	`title` text,
	`artist` integer,
	`artwork` text,
	`addedAt` integer,
	FOREIGN KEY (`artist`) REFERENCES `artist`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `songToPlaylist` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`songId` integer NOT NULL,
	`playlistId` integer NOT NULL,
	`createdAt` integer,
	`updatedAt` integer,
	FOREIGN KEY (`songId`) REFERENCES `song`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`playlistId`) REFERENCES `playlist`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `songId_idx` ON `songToPlaylist` (`songId`);--> statement-breakpoint
CREATE INDEX `playlistId_idx` ON `songToPlaylist` (`playlistId`);