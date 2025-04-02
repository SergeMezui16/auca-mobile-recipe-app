import { drizzle } from 'drizzle-orm/expo-sqlite';
import { openDatabaseSync } from 'expo-sqlite';

import * as schema from '@/db/schema';

const expo = openDatabaseSync(schema.DATABASE_NAME, { enableChangeListener: true });
const db = drizzle(expo, { schema });
