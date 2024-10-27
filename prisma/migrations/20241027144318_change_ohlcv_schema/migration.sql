/*
  Warnings:

  - The primary key for the `Ohlcv` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Ohlcv` table. All the data in the column will be lost.
  - Added the required column `period` to the `Ohlcv` table without a default value. This is not possible if the table is not empty.
  - Added the required column `symbol_id` to the `Ohlcv` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Ohlcv" (
    "symbol_id" TEXT NOT NULL,
    "period" TEXT NOT NULL,
    "time_period_start" DATETIME NOT NULL,
    "time_period_end" DATETIME NOT NULL,
    "time_open" DATETIME,
    "time_close" DATETIME,
    "price_open" REAL,
    "price_high" REAL,
    "price_low" REAL,
    "price_close" REAL,
    "volume_traded" REAL NOT NULL,
    "trades_count" INTEGER NOT NULL,

    PRIMARY KEY ("period", "time_period_start")
);
INSERT INTO "new_Ohlcv" ("price_close", "price_high", "price_low", "price_open", "time_close", "time_open", "time_period_end", "time_period_start", "trades_count", "volume_traded") SELECT "price_close", "price_high", "price_low", "price_open", "time_close", "time_open", "time_period_end", "time_period_start", "trades_count", "volume_traded" FROM "Ohlcv";
DROP TABLE "Ohlcv";
ALTER TABLE "new_Ohlcv" RENAME TO "Ohlcv";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
