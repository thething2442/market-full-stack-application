import { sqliteTable, AnySQLiteColumn, foreignKey, primaryKey, text, integer, real } from "drizzle-orm/sqlite-core"
import { sql } from "drizzle-orm"

export const accounts = sqliteTable("accounts", {
	userId: text().notNull().references(() => users.id, { onDelete: "cascade" }),
	type: text().notNull(),
	provider: text().notNull(),
	providerAccountId: text().notNull(),
	refreshToken: text("refresh_token"),
	accessToken: text("access_token"),
	expiresAt: integer("expires_at"),
	tokenType: text("token_type"),
	scope: text(),
	idToken: text("id_token"),
	sessionState: text("session_state"),
},
	(table) => [
		primaryKey({ columns: [table.provider, table.providerAccountId], name: "accounts_provider_providerAccountId_pk" })
	]);

export const carts = sqliteTable("carts", {
	id: text().primaryKey().notNull(),
	userId: text().notNull().references(() => users.id, { onDelete: "cascade" }),
	productId: text().notNull().references(() => products.id, { onDelete: "cascade" }),
	quantity: integer().default(1).notNull(),
});

export const orderItems = sqliteTable("orderItems", {
	id: text().primaryKey().notNull(),
	orderId: text().notNull().references(() => orders.id, { onDelete: "cascade" }),
	productId: text().notNull().references(() => products.id, { onDelete: "cascade" }),
	quantity: integer().notNull(),
	priceAtPurchase: real().notNull(),
});

export const orders = sqliteTable("orders", {
	id: text().primaryKey().notNull(),
	userId: text().notNull().references(() => users.id, { onDelete: "cascade" }),
	status: text().default("pending").notNull(),
	totalAmount: real().notNull(),
	createdAt: integer().default(sql`(CURRENT_TIMESTAMP)`),
});

export const products = sqliteTable("products", {
	id: text().primaryKey().notNull(),
	name: text().notNull(),
	description: text(),
	price: real().notNull(),
	imageUrl: text(),
	thumbnail: text(),
	photoModel1: text(),
	photoModel2: text(),
	createdAt: integer().default(sql`(CURRENT_TIMESTAMP)`),
});

export const users = sqliteTable("users", {
	id: text().primaryKey().notNull(),
	name: text(),
	email: text().unique().notNull(),
	emailVerified: integer(),
	image: text(),
	hashedPassword: text(),
});

