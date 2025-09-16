import { relations } from "drizzle-orm/relations";
import { users, accounts, products, carts, orderItems, orders } from "./schema";

export const accountsRelations = relations(accounts, ({ one }) => ({
	user: one(users, {
		fields: [accounts.userId],
		references: [users.id]
	}),
}));

export const usersRelations = relations(users, ({ many }) => ({
	accounts: many(accounts),
	carts: many(carts),
	orders: many(orders),
}));

export const cartsRelations = relations(carts, ({ one }) => ({
	product: one(products, {
		fields: [carts.productId],
		references: [products.id]
	}),
	user: one(users, {
		fields: [carts.userId],
		references: [users.id]
	}),
}));

export const productsRelations = relations(products, ({ many }) => ({
	carts: many(carts),
	orderItems: many(orderItems),
}));

export const orderItemsRelations = relations(orderItems, ({ one }) => ({
	product: one(products, {
		fields: [orderItems.productId],
		references: [products.id]
	}),
	order: one(orders, {
		fields: [orderItems.orderId],
		references: [orders.id]
	}),
}));

export const ordersRelations = relations(orders, ({ one, many }) => ({
	orderItems: many(orderItems),
	user: one(users, {
		fields: [orders.userId],
		references: [users.id]
	}),
}));