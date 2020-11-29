# Migration `20201129005631-add-url-to-movie`

This migration has been generated at 11/29/2020, 12:56:31 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql

```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200806154244-rating..20201129005631-add-url-to-movie
--- datamodel.dml
+++ datamodel.dml
@@ -3,34 +3,34 @@
 }
 datasource db {
   provider = "postgresql"
-  url = "***"
+  url = "***"
 }
 model Movie {
   createdAt DateTime @default(now())
   genre     String
   id        Int      @default(autoincrement()) @id
   title     String
-  year      Int      
-  rating    Float
-  Reviews    Review[]
+  url       String
+  year      Int
+  Review    Review[]
 }
 model Review {
   createdAt DateTime @default(now())
   id        Int      @default(autoincrement()) @id
-  movieId   Int      
-  rating    Int      
+  movieId   Int
+  rating    Int
   text      String?
-  userId    Int      
+  userId    Int
   Movie     Movie    @relation(fields: [movieId], references: [id])
   User      User     @relation(fields: [userId], references: [id])
 }
 model User {
-  email    String  @unique
-  id       Int     @default(autoincrement()) @id
+  email    String   @unique
+  id       Int      @default(autoincrement()) @id
   username String?
   Review   Review[]
-}
+}
```


