/*
  Warnings:

  - A unique constraint covering the columns `[idMovie]` on the table `Movie` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Movie.idMovie_unique" ON "Movie"("idMovie");
