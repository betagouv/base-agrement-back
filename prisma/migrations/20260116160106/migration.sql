-- CreateTable
CREATE TABLE "hello_world" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT,

    CONSTRAINT "hello_world_pkey" PRIMARY KEY ("id")
);
