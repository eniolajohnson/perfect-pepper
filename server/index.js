require('dotenv/config');
const express = require('express');
const staticMiddleware = require('./static-middleware');

const pg = require('pg');

const app = express();

const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL
});

app.use(staticMiddleware);

const jsonMiddleware = express.json();

app.use(jsonMiddleware);

app.get('/api/recipes', (req, res) => {
  const sql = `
    select *
      from "recipes"
     order by "recipeId"
  `;
  db.query(sql)
    .then(result => {
      res.json(result.rows);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({
        error: 'an unexpected error occurred'
      });
    });
});

app.get('/api/recipes/:recipeId', (req, res) => {
  const recipeId = parseInt(req.params.recipeId, 10);
  if (!Number.isInteger(recipeId) || recipeId < 1) {
    res.status(400).json({
      error: 'recipeId must be a positive integer'
    });
    return;
  }

  // const sql = `
  // select *
  //   from "recipeSteps"
  //   join "ingredients" using("recipeId")
  //   where "recipeId" = $1
  //   order by "recipeSteps"."stepId"
  //   `;

  // const sql = `
  //   select "recipeSteps"."instruction",
  //           "ingredients"."ingredient"
  //   from "recipes"
  //   join "ingredients" using("recipeId")
  //   join "recipeSteps" using("recipeId")
  //   where "recipeId" = $1
  // `;

  const sql = `
    select *
    from "recipes"
    join "ingredients" using("recipeId")
    join "recipeSteps" using("recipeId")
    where "recipeId" = $1
  `;

//   const sql = `
//   with "ingredients" as (
//       select r."recipeId", array_to_json(array_agg(json_build_object('ingredient', r."ingredient"))) as matching
//       from (
//         select
//           "recipeId",
//           i."ingredient"
//         from "ingredients" i
//         join recipes using ("recipeId")
//         where (i."ingredient" is not null)
//       ) as r
//       group by r."recipeId"
//     ),
// "steps" as (
//       select s."recipeId", array_to_json(array_agg(json_build_object('step', s."instruction"))) as matching
//       from (
//         select
//           rs."recipeId",
//           "instruction"
//         from "recipeSteps" rs
//         join recipes using ("recipeId")
//       ) as s
//       group by s."recipeId"
// )
//     select
//       r."recipeId",
//       r."recipeTitle",
//       r."imageUrl",
//       coalesce((select matching from "ingredients" where "ingredients"."recipeId" = r."recipeId"), '[]'::json) as ingredients,
//       coalesce((select matching from "steps" where "steps"."recipeId" = r."recipeId"), '[]'::json) as steps
//     from "recipes" r
//     where r."recipeId" = $1;
//   `;

  const params = [recipeId]

  db.query(sql, params)
    .then(result => {
      const recipes = result.rows;
      res.status(201).json(recipes);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({
        error: 'an unexpected error occurred'
      });
    });
});

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});
