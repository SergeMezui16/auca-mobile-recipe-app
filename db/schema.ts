import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const DATABASE_NAME = 'recipe.db';

export const recipes = sqliteTable('recipes', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text().notNull(),
  description: text(),
  uri: text(),
  rate: integer().notNull(),
  duration: integer().notNull(),
  createdAt: integer({ mode: 'timestamp' }).notNull().default(new Date()),
  updatedAt: integer({ mode: 'timestamp' }).notNull().default(new Date()),
});

export const ingredients = sqliteTable('ingredients', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text().notNull(),
  quantity: integer().notNull(),
  unit: text().notNull(),
  recipeId: integer('recipe_id'),
});

export const steps = sqliteTable('steps', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  position: integer().notNull(),
  description: text().notNull(),
  recipeId: integer('recipe_id'),
});

export const comments = sqliteTable('comments', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  content: text().notNull(),
  author: text().notNull(),
  recipeId: integer('recipe_id'),
  createdAt: integer({ mode: 'timestamp' }).notNull().default(new Date()),
});

export type Comment = typeof comments.$inferSelect;
export type Recipe = typeof recipes.$inferSelect;
export type Ingredient = typeof ingredients.$inferSelect;
export type Step = typeof steps.$inferSelect;
