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
--> statement-breakpoint
CREATE TABLE `playlist` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text,
	`cover` text,
	`description` text,
	`createdAt` integer,
	`updatedAt` integer
);
--> statement-breakpoint
CREATE TABLE `song` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`cid` integer,
	`bvid` text,
	`title` text,
	`artistMid` integer,
	`artistName` text,
	`artistAvatar` text,
	`artwork` text,
	`color` text,
	`addedAt` integer
);
--> statement-breakpoint
CREATE TABLE `songToPlaylist` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`songId` integer NOT NULL,
	`playlistId` integer NOT NULL,
	`order` integer DEFAULT 0 NOT NULL,
	`createdAt` integer,
	`updatedAt` integer,
	FOREIGN KEY (`songId`) REFERENCES `song`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`playlistId`) REFERENCES `playlist`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `songId_idx` ON `songToPlaylist` (`songId`);--> statement-breakpoint
CREATE INDEX `playlistId_idx` ON `songToPlaylist` (`playlistId`);