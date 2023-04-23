-- CreateTable
CREATE TABLE "donatory" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(250) NOT NULL,
    "user_name" VARCHAR(100) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "password" VARCHAR(100) NOT NULL,

    CONSTRAINT "donatory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "giver" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(250) NOT NULL,
    "user_name" VARCHAR(100) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "password" VARCHAR(100) NOT NULL,

    CONSTRAINT "giver_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(250) NOT NULL,
    "description" TEXT NOT NULL,
    "unit_price" INTEGER NOT NULL,
    "image" VARCHAR(250) NOT NULL,

    CONSTRAINT "product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product_request" (
    "id" SERIAL NOT NULL,
    "request_id" INTEGER NOT NULL,
    "product_id" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "unit_price" INTEGER NOT NULL,

    CONSTRAINT "product_request_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "request" (
    "id" SERIAL NOT NULL,
    "donatory_id" INTEGER NOT NULL,
    "giver_id" INTEGER,
    "total" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "request_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "product_request" ADD CONSTRAINT "fk_product_id" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "product_request" ADD CONSTRAINT "fk_request_id" FOREIGN KEY ("request_id") REFERENCES "request"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "request" ADD CONSTRAINT "fk_donatary_id" FOREIGN KEY ("donatory_id") REFERENCES "donatory"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "request" ADD CONSTRAINT "fk_giver_id" FOREIGN KEY ("giver_id") REFERENCES "giver"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
