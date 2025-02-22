/*
  Warnings:

  - You are about to drop the column `genreIds` on the `Movie` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[movieId]` on the table `Movie` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Movie" DROP COLUMN "genreIds";

-- CreateIndex
CREATE UNIQUE INDEX "Movie_movieId_key" ON "Movie"("movieId");
