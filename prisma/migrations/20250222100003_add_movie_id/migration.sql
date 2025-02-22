/*
  Warnings:

  - Added the required column `backdropPath` to the `Movie` table without a default value. This is not possible if the table is not empty.
  - Added the required column `genreIds` to the `Movie` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mediaType` to the `Movie` table without a default value. This is not possible if the table is not empty.
  - Added the required column `movieId` to the `Movie` table without a default value. This is not possible if the table is not empty.
  - Added the required column `originalTitle` to the `Movie` table without a default value. This is not possible if the table is not empty.
  - Added the required column `popularity` to the `Movie` table without a default value. This is not possible if the table is not empty.
  - Added the required column `posterPath` to the `Movie` table without a default value. This is not possible if the table is not empty.
  - Added the required column `voteAverage` to the `Movie` table without a default value. This is not possible if the table is not empty.
  - Added the required column `voteCount` to the `Movie` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Movie" ADD COLUMN     "backdropPath" TEXT NOT NULL,
ADD COLUMN     "genreIds" JSONB NOT NULL,
ADD COLUMN     "mediaType" TEXT NOT NULL,
ADD COLUMN     "movieId" INTEGER NOT NULL,
ADD COLUMN     "originalTitle" TEXT NOT NULL,
ADD COLUMN     "popularity" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "posterPath" TEXT NOT NULL,
ADD COLUMN     "releaseDate" TEXT,
ADD COLUMN     "voteAverage" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "voteCount" INTEGER NOT NULL;
