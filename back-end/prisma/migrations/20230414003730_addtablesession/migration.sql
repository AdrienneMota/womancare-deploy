-- CreateTable
CREATE TABLE "Session" (
    "id" SERIAL NOT NULL,
    "giver_id" INTEGER NOT NULL,
    "token" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_giver_id_fkey" FOREIGN KEY ("giver_id") REFERENCES "giver"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
