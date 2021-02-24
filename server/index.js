require('dotenv/config');
const express = require('express');
const staticMiddleware = require('./static-middleware');
const argon2 = require('argon2');
const pg = require('pg');
const jwt = require('jsonwebtoken');
const ClientError = require('./client-error');
const errorMiddleware = require('./error-middleware');

const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL
});

const app = express();

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

app.get('/api/ingredients', (req, res) => {
  const sql = `
    select *
      from "ingredients"
     order by "ingredientId"
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

app.get('/api/recipes/rotd', (req, res) => {
  const recipeId = Math.round(Math.random() * 12)
  const sql = `
    select *
      from "recipes"
     where "recipeId" = $1
  `;

  const params = [recipeId]

  db.query(sql, params)
    .then(result => {
      const recipe = result.rows
      res.json(recipe);
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

  const sql = `
    select *
    from "recipes"
    join "ingredients" using("recipeId")
    join "recipeSteps" using("recipeId")
    where "recipeId" = $1
  `;

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

app.post('/api/recipes', (req, res) => {
  const { recipeTitle, imageUrl } = req.body;

  const sql = `
    insert into "recipes" ("recipeTitle", "imageUrl")
    values ($1, $2)
    returning *
  `;
  const params = [recipeTitle, imageUrl];
  db.query(sql, params)
    .then(result => {
      const [recipe] = result.rows;
      res.status(201).json(recipe);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({
        error: 'an unexpected error occurred'
      });
    });
});

app.post('/api/ingredients', (req, res) => {
  const { ingredient, recipeId }= req.body;

  const sql = `
    insert into "ingredients" ("ingredient", "recipeId")
    values ($1, $2)
    returning *
  `;
  const params = [ingredient, recipeId];
  db.query(sql, params)
    .then(result => {
      const ing = result.rows;
      res.status(201).json(ing);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({
        error: 'an unexpected error occurred'
      });
    });
});

app.post('/api/steps', (req, res) => {
  const { step, recipeId } = req.body;

  const sql = `
    insert into "recipeSteps" ("instruction", "recipeId")
    values ($1, $2)
    returning *
  `;
  const params = [step, recipeId];
  db.query(sql, params)
    .then(result => {
      const step = result.rows;
      res.status(201).json(step);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({
        error: 'an unexpected error occurred'
      });
    });
});

app.post('/api/auth/sign-up', (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    throw new ClientError(400, 'username and password are required fields');
  }
  argon2
    .hash(password)
    .then(hashedPassword => {
      const sql = `
        insert into "users" ("username", "hashedPassword")
        values ($1, $2)
        returning "userId", "username", "createdAt"
      `;
      const params = [username, hashedPassword];
      return db.query(sql, params);
    })
    .then(result => {
      const [user] = result.rows;
      res.status(201).json(user);
    })
    .catch(err => next(err));
});

app.post('/api/auth/sign-in', (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    throw new ClientError(401, 'invalid login');
  }
  const sql = `
    select "userId",
           "hashedPassword"
      from "users"
     where "username" = $1
  `;
  const params = [username];
  db.query(sql, params)
    .then(result => {
      const [user] = result.rows;
      if (!user) {
        throw new ClientError(401, 'invalid login');
      }
      const { userId, hashedPassword } = user;
      return argon2
        .verify(hashedPassword, password)
        .then(isMatching => {
          if (!isMatching) {
            throw new ClientError(401, 'invalid login');
          }
          const payload = { userId, username };
          const token = jwt.sign(payload, process.env.TOKEN_SECRET);
          res.json({ token, user: payload });
        });
    })
    .catch(err => next(err));
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});
