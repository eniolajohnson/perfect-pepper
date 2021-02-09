set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;

create schema "public";

CREATE TABLE "users" (
	"userId" serial NOT NULL,
	"firstName" TEXT NOT NULL,
	"lastName" TEXT NOT NULL,
	"password" TEXT NOT NULL,
	"email" TEXT NOT NULL,
	"createdAt" TIMESTAMP NOT NULL,
	CONSTRAINT "users_pk" PRIMARY KEY ("userId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "recipes" (
	"recipeId" serial NOT NULL,
	"recipeTitle" TEXT NOT NULL,
	"createdBy" integer,
	"imageUrl" TEXT NOT NULL,
	CONSTRAINT "recipes_pk" PRIMARY KEY ("recipeId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "ingredients" (
	"ingredientId" serial NOT NULL,
	"ingredient" TEXT NOT NULL,
	"recipeId" integer NOT NULL,
	CONSTRAINT "ingredients_pk" PRIMARY KEY ("ingredientId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "recipeSteps" (
	"stepId" serial NOT NULL,
	"instruction" TEXT NOT NULL,
	"recipeId" integer NOT NULL,
	CONSTRAINT "recipeSteps_pk" PRIMARY KEY ("stepId")
) WITH (
  OIDS=FALSE
);





ALTER TABLE "ingredients" ADD CONSTRAINT "ingredients_fk0" FOREIGN KEY ("recipeId") REFERENCES "recipes"("recipeId");

ALTER TABLE "recipeSteps" ADD CONSTRAINT "recipeSteps_fk0" FOREIGN KEY ("recipeId") REFERENCES "recipes"("recipeId");




ALTER TABLE "recipes" ADD CONSTRAINT "recipes_fk0" FOREIGN KEY ("createdBy") REFERENCES "users"("userId");

ALTER TABLE "ingredients" ADD CONSTRAINT "ingredients_fk0" FOREIGN KEY ("recipeId") REFERENCES "recipes"("recipeId");

ALTER TABLE "recipeSteps" ADD CONSTRAINT "recipeSteps_fk0" FOREIGN KEY ("recipeId") REFERENCES "recipes"("recipeId");
