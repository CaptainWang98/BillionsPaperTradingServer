-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Order" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "symbol" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "orderType" TEXT NOT NULL,
    "orderAmount" REAL NOT NULL,
    "filledAmount" REAL,
    "orderPrice" REAL NOT NULL,
    "filledPrice" REAL,
    "filledValue" REAL,
    "fee" REAL,
    "created" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fillTime" DATETIME,
    CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Order" ("created", "fee", "fillTime", "filledAmount", "filledPrice", "filledValue", "id", "orderAmount", "orderPrice", "orderType", "status", "symbol", "userId") SELECT "created", "fee", "fillTime", "filledAmount", "filledPrice", "filledValue", "id", "orderAmount", "orderPrice", "orderType", "status", "symbol", "userId" FROM "Order";
DROP TABLE "Order";
ALTER TABLE "new_Order" RENAME TO "Order";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
