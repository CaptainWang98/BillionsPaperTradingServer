-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_FillLog" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "symbol" TEXT NOT NULL,
    "filledAmount" REAL NOT NULL,
    "filledPrice" REAL NOT NULL,
    "filledValue" REAL NOT NULL,
    "created" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fee" REAL NOT NULL,
    CONSTRAINT "FillLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "FillLog_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_FillLog" ("created", "fee", "filledAmount", "filledPrice", "filledValue", "id", "orderId", "symbol", "userId") SELECT "created", "fee", "filledAmount", "filledPrice", "filledValue", "id", "orderId", "symbol", "userId" FROM "FillLog";
DROP TABLE "FillLog";
ALTER TABLE "new_FillLog" RENAME TO "FillLog";
CREATE TABLE "new_Order" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "symbol" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "orderType" TEXT NOT NULL,
    "orderAmount" REAL NOT NULL,
    "filledAmount" REAL NOT NULL,
    "orderPrice" REAL NOT NULL,
    "filledPrice" REAL NOT NULL,
    "filledValue" REAL NOT NULL,
    "fee" REAL NOT NULL,
    "created" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fillTime" DATETIME NOT NULL,
    CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Order" ("created", "fee", "fillTime", "filledAmount", "filledPrice", "filledValue", "id", "orderAmount", "orderPrice", "orderType", "status", "symbol", "userId") SELECT "created", "fee", "fillTime", "filledAmount", "filledPrice", "filledValue", "id", "orderAmount", "orderPrice", "orderType", "status", "symbol", "userId" FROM "Order";
DROP TABLE "Order";
ALTER TABLE "new_Order" RENAME TO "Order";
CREATE TABLE "new_OrderLog" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "symbol" TEXT NOT NULL,
    "orderType" TEXT NOT NULL,
    "orderAmount" REAL NOT NULL,
    "orderPrice" REAL NOT NULL,
    "created" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fee" REAL NOT NULL,
    CONSTRAINT "OrderLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "OrderLog_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_OrderLog" ("created", "fee", "id", "orderAmount", "orderId", "orderPrice", "orderType", "symbol", "userId") SELECT "created", "fee", "id", "orderAmount", "orderId", "orderPrice", "orderType", "symbol", "userId" FROM "OrderLog";
DROP TABLE "OrderLog";
ALTER TABLE "new_OrderLog" RENAME TO "OrderLog";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
