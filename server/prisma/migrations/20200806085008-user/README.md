# Migration `20200806085008-user`

This migration has been generated at 8/6/2020, 8:50:08 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
DROP INDEX "public"."Movie_year_key"

DROP INDEX "public"."Review_movieId_key"

DROP INDEX "public"."Review_rating_key"

DROP INDEX "public"."Review_userId_key"

ALTER TABLE "public"."Review" DROP CONSTRAINT IF EXiSTS "Review_movieId_fkey",
DROP CONSTRAINT IF EXiSTS "Review_userId_fkey";

ALTER TABLE "public"."Review" ADD FOREIGN KEY ("movieId")REFERENCES "public"."Movie"("id") ON DELETE CASCADE  ON UPDATE CASCADE

ALTER TABLE "public"."Review" ADD FOREIGN KEY ("userId")REFERENCES "public"."User"("id") ON DELETE CASCADE  ON UPDATE CASCADE

ALTER INDEX "public"."User_email_key" RENAME TO "User.email"
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration ..20200806085008-user
--- datamodel.dml
+++ datamodel.dml
@@ -1,0 +1,35 @@
+generator client {
+  provider = "prisma-client-js"
+}
+
+datasource db {
+  provider = "postgresql"
+  url = "***"
+}
+
+model Movie {
+  createdAt DateTime @default(now())
+  genre     String
+  id        Int      @default(autoincrement()) @id
+  title     String
+  year      Int      
+  Reviews    Review[]
+}
+
+model Review {
+  createdAt DateTime @default(now())
+  id        Int      @default(autoincrement()) @id
+  movieId   Int      
+  rating    Int      
+  text      String?
+  userId    Int      
+  Movie     Movie    @relation(fields: [movieId], references: [id])
+  User      User     @relation(fields: [userId], references: [id])
+}
+
+model User {
+  email    String  @unique
+  id       Int     @default(autoincrement()) @id
+  username String?
+  Review   Review[]
+}
```


