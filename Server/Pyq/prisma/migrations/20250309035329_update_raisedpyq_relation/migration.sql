-- CreateTable
CREATE TABLE "RaisedPyq" (
    "id" TEXT NOT NULL,
    "pyqId" INTEGER NOT NULL,

    CONSTRAINT "RaisedPyq_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "RaisedPyq_pyqId_key" ON "RaisedPyq"("pyqId");

-- AddForeignKey
ALTER TABLE "RaisedPyq" ADD CONSTRAINT "RaisedPyq_pyqId_fkey" FOREIGN KEY ("pyqId") REFERENCES "PYQ"("id") ON DELETE CASCADE ON UPDATE CASCADE;
