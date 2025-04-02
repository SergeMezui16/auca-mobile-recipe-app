import { eq } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/expo-sqlite';
import { useDrizzleStudio } from 'expo-drizzle-studio-plugin';
import { useSQLiteContext } from 'expo-sqlite';

import * as schema from '@/db/schema';

export const useRecipe = () => {
  const context = useSQLiteContext();
  const db = drizzle(context, { schema });
  useDrizzleStudio(db);

  const getAllRecipePublished = () => {
    return db.query.recipes.findMany({
      where: (r) => eq(r.published, true),
      with: {
        comments: true,
        steps: true,
        ingredients: true,
      },
    });
  };

  const getAllRecipes = () => {
    return db.query.recipes.findMany({
      with: {
        comments: true,
        steps: true,
        ingredients: true,
      },
    });
  };

  const getRecipeById = (id: number) => {
    return db.query.recipes.findFirst({
      where: (r) => eq(r.id, id),
      with: {
        comments: true,
        steps: true,
        ingredients: true,
      },
    });
  };

  const getOneRandomRecipeId = async () => {
    const recipe = await db.query.recipes.findFirst();
    return recipe?.id;
  };

  const createRecipe = async (values: {
    name: string;
    description: string;
    rate: number;
    uri: string;
    duration: number;
  }) => {
    return db
      .insert(schema.recipes)
      .values({ ...values, createdAt: new Date(), updatedAt: new Date() })
      .returning();
  };

  const updateRecipe = async (
    id: number,
    values: {
      name: string;
      description: string;
      rate: number;
      uri: string;
      duration: number;
    }
  ) => {
    return db
      .update(schema.recipes)
      .set({ ...values, updatedAt: new Date() })
      .where(eq(schema.recipes.id, id))
      .returning();
  };

  const deleteRecipe = async (id: number) => {
    return db.delete(schema.recipes).where(eq(schema.recipes.id, id));
  };

  const addComment = async (values: { content: string; recipeId: number; author: string }) => {
    return db
      .insert(schema.comments)
      .values({ ...values, createdAt: new Date() })
      .returning();
  };

  const addStep = async (values: { position: number; description: string; recipeId: number }) => {
    return db.insert(schema.steps).values(values).returning();
  };

  const deleteStep = async (id: number) => {
    return db.delete(schema.steps).where(eq(schema.steps.id, id));
  };

  const addIngredient = async (values: {
    name: string;
    quantity: number;
    recipeId: number;
    unit: string;
  }) => {
    return db.insert(schema.ingredients).values(values).returning();
  };

  const deleteIngredient = async (id: number) => {
    return db.delete(schema.ingredients).where(eq(schema.ingredients.id, id));
  };

  const getRecipeIngredients = (id: number) => {
    return db.query.ingredients.findMany({
      where: (i) => eq(i.recipeId, id),
    });
  };

  const getRecipeSteps = (id: number) => {
    return db.query.steps.findMany({
      where: (i) => eq(i.recipeId, id),
    });
  };

  const getRecipeComments = (id: number) => {
    return db.query.comments.findMany({
      where: (i) => eq(i.recipeId, id),
    });
  };

  const publishRecipe = (id: number) => {
    return db
      .update(schema.recipes)
      .set({ published: true })
      .where(eq(schema.recipes.id, id))
      .returning();
  };

  return {
    publishRecipe,
    getRecipeIngredients,
    getRecipeSteps,
    getRecipeComments,
    getAllRecipePublished,
    getAllRecipes,
    getRecipeById,
    getOneRandomRecipeId,
    createRecipe,
    updateRecipe,
    deleteRecipe,
    addComment,
    addStep,
    deleteStep,
    addIngredient,
    deleteIngredient,
  };
};
