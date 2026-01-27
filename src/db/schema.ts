import {
    integer,
    pgTable,
    serial,
    unique,
    uuid,
    varchar,
} from 'drizzle-orm/pg-core';

export const usersTable = pgTable('users', {
    id: uuid('id').primaryKey().defaultRandom(),
    username: varchar('username', { length: 128 }).notNull().unique(),
    passwordHash: varchar('password_hash', { length: 256 }).notNull(),
});

export const subjectsTable = pgTable(
    'subjects',
    {
        id: uuid('id').primaryKey().defaultRandom(),
        name: varchar('name', { length: 128 }).notNull(),
        userId: uuid('user_id')
            .references(() => usersTable.id)
            .notNull(),
        classesAttended: integer('classes_attended').default(0).notNull(),
        totalClasses: integer('total_classes').default(0).notNull(),
        occurrence: integer('occurrence')
            .array()
            .notNull()
            .default([0, 0, 0, 0, 0, 0, 0]),
    },
    (table) => [unique().on(table.userId, table.name)]
);
