-- CreateTable
CREATE TABLE "Ohlcv" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "time_period_start" DATETIME NOT NULL,
    "time_period_end" DATETIME NOT NULL,
    "time_open" DATETIME NOT NULL,
    "time_close" DATETIME NOT NULL,
    "price_open" REAL NOT NULL,
    "price_high" REAL NOT NULL,
    "price_low" REAL NOT NULL,
    "price_close" REAL NOT NULL,
    "volume_traded" REAL NOT NULL,
    "trades_count" INTEGER NOT NULL
);
