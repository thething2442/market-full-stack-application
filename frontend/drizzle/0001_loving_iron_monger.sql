ALTER TABLE `users` ADD `hashedPassword` text;--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);