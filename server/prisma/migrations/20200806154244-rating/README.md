# Migration `20200806154244-rating`

This migration has been generated at 8/6/2020, 3:42:44 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "public"."Movie" ADD COLUMN "rating" Decimal(65,30)  NOT NULL ;
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200806085008-user..20200806154244-rating
--- datamodel.dml
+++ datamodel.dml
@@ -3,17 +3,18 @@
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
   year      Int      
+  rating    Float
   Reviews    Review[]
 }
 model Review {
```


