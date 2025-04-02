import { relations } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const DATABASE_NAME = 'recipe.db';

export const recipes = sqliteTable('recipes', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text().notNull(),
  description: text(),
  uri: text(),
  rate: integer().notNull(),
  duration: integer().notNull(),
  published: integer({ mode: 'boolean' }).notNull().default(false),
  createdAt: integer({ mode: 'timestamp' }).notNull().default(new Date()),
  updatedAt: integer({ mode: 'timestamp' }).notNull().default(new Date()),
});

export const recipesRelations = relations(recipes, ({ many }) => ({
  ingredients: many(ingredients),
  steps: many(steps),
  comments: many(comments),
}));

export const ingredients = sqliteTable('ingredients', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text().notNull(),
  quantity: integer().notNull(),
  unit: text().notNull(),
  recipeId: integer('recipe_id').references(() => recipes.id),
});

export const ingredientsRelations = relations(ingredients, ({ one }) => ({
  recipe: one(recipes, {
    fields: [ingredients.recipeId],
    references: [recipes.id],
  }),
}));

export const steps = sqliteTable('steps', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  position: integer().notNull(),
  description: text().notNull(),
  recipeId: integer('recipe_id').references(() => recipes.id),
});

export const stepsRelations = relations(steps, ({ one }) => ({
  recipe: one(recipes, {
    fields: [steps.recipeId],
    references: [recipes.id],
  }),
}));

export const comments = sqliteTable('comments', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  content: text().notNull(),
  author: text().notNull(),
  recipeId: integer('recipe_id').references(() => recipes.id),
  createdAt: integer({ mode: 'timestamp' }).notNull().default(new Date()),
});

export const commentsRelations = relations(comments, ({ one }) => ({
  recipe: one(recipes, {
    fields: [comments.recipeId],
    references: [recipes.id],
  }),
}));

export type Recipe = typeof recipes.$inferSelect;
export type Ingredient = typeof ingredients;
export type Step = typeof steps;
export type Comment = typeof comments;
