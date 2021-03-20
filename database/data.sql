insert into "users" ("username", "hashedPassword")
values ('admin', '$argon2i$v=19$m=4096,t=3,p=1$/HRGxxv3sHJuH6lSNBElbA$AzsogQ8UaALnFd3FumSCUqQS5ia4UwoLRhDDtw+iXFI'),
('Sarah', '$argon2i$v=19$m=4096,t=3,p=1$d5ABid2/y7YIfTlxEuttkg$sCoaLcN7rSqNqUoynoD1BwCILXokXbxM5S5YLVTeO0Y')
;

insert into "recipes" (
  "recipeTitle",
  "imageUrl"
) values ('Italian Chicken Bake', 'https://lh3.googleusercontent.com/Y8jqHH8DNlbrCquKIPvHZ1aJjENvFF_BjP0KVdIyZUhB4NzMzt_Q4mKg9NEmgE6NYGVYrOreCFfKJXziJhOX9w=s640-c-rw-v1-e365'),
       ('Chinese Chicken Thighs',
       'https://lh3.googleusercontent.com/Ft4G5LnYbYSoXVFnu8u4BguWt-fN41P44Ymw-t9XdXQM0n7zsXGqz9DOndH87BvNUBctPISa0fpxZGoUiQ8GrQ=s640-c-rw-v1-e365'),
       ('Fudgy Brownies',
       'https://sugargeekshow.com/wp-content/uploads/2019/10/fudgy_brownie_recipe_featured.jpg.webp'),
       ('Ground Beef Soup',
       'https://lh3.googleusercontent.com/jCsjt6Jz8b-CmUPUTVX1iJuChc2x8jvXwb9C1ZQ5J4k2QQYNMz-Y4zN1a_l_Z0Dbo5suGjJJqFduI-YhRDJ2=s640-c-rw-v1-e365'),
       ('Beef Pasta Bake', 'https://lh3.googleusercontent.com/EjSsmbO_mVKODzgi78ZOImeO-lmLzsN_-L20GjHYrH5S58ERcJsx3TNoWQUOkXqhr-IrHs9vpiPvOh2Whwy-=s640-c-rw-v1-e365'),
       ('Ground Beef Casserole', 'https://lh3.googleusercontent.com/P7_SxzZ4op8XMiKCOSsTRg39jCgNpXRMiwH9BxwKgyMbyNVLsuYf9D8za_eJ7dhjLVdzGZtmfgzVxxJnKfDoF54=s640-c-rw-v1-e365'),
       ('Creamed Corn Casserole', 'https://lh3.googleusercontent.com/Qf6oZdI6EOjJ4VoQy4y56oh2wWW_dm55ouV7mQwc13EUN2MYY_4bDRYMF8c3VsJMr1sUqvRbiITvtsV-3gFU=s640-c-rw-v1-e365'),
       ('Salmon', 'https://lh3.googleusercontent.com/vRaQQIces1TJN5VBfdG5CzIRJ5G-u1VBxMvepLfHfSGHFtxlHKxIfznk3QQHbPZalBUOpI5nYBqRnpLLQsZnyI0=s640-c-rw-v1-e365'),
       ('Shrimp Stir Fry', 'https://lh3.googleusercontent.com/Mwk7wBWMM9wf1cNA1ZBagFjF78okmxXvfisoqsb1eE9kpej6_iYigVN1Gwpvd40Szt6uEr47s3FG-p4CtlcMM9Y=s640-c-rw-v1-e365'),
       ('Frittata', 'https://lh3.googleusercontent.com/Sp2KZ4GJHd0pIUJM7CC5hC4PzKPwk_z3MFcBbt4EE7hDl5ICycX9vTGiXm3d8mYnp1CwttrL89SmS0SdYs1y=s640-c-rw-v1-e365'),
       ('Crepes', 'https://lh3.googleusercontent.com/NTF5D87O6D_4hAKrrryS7RS67AeK1o4gASliFCyQbszstZgIn-_JuhxwlkOutbU5Im7yGBtbWrgv74y9H3-c=s640-c-rw-v1-e365')
;

insert into "ingredients" ("recipeId", "ingredient")
values (1, '4 boneless, skinless chicken breasts'),
       (1, '6 tablespoons prepared pesto'),
       (1, '2 Roma tomatoes'),
       (1, '1 cup mozzarella cheese (grated)')
;

insert into "recipeSteps" ("recipeId", "instruction")
values (1, 'Trim the chicken and lay them in a glass baking dish in a single layer.'),
       (1, 'Spread 1-2 tablespoons of the pesto on top of each chicken breast.'),
       (1, 'Cut the roma tomatoes into slices approx 1/2" thick and lay 2 slices on top of each chicken breast.'),
       (1, 'Sprinkle the cheese over the top of the chicken breasts.'),
       (1, 'Bake at 400F for 30-40 minutes or until the chicken is done and the juices run clear.'),
       (1, 'Serve over a bed of rice or a plate of pasta. Enjoy!')
;

insert into "ingredients" ("recipeId", "ingredient")
values (2, '6 free range chicken thighs'),
       (2, '2 tbsp olive oil'),
       (2, '1/2 tsp minced ginger'),
       (2, '2 cloves minced garlic'),
       (2, '3 tbsp honey'),
       (2, '2 tbsp dark soy sauce'),
       (2, '2 tsp sesame seeds'),
       (2, 'Seasoning')
;

insert into "recipeSteps" ("recipeId", "instruction")
values (2, 'Prepare the garlic and ginger by mincing each'),
       (2, 'Prepare the marinade by placing all of the ingredients in a bowl, except the chicken thighs, and mixing together'),
       (2, 'Place the chicken thighs in the marinade and cover mix well.'),
       (2, 'Place clingfilm on the bowl and place in the fridge for at least one hour.'),
       (2, 'Pre-heat your oven at 200C / 180C Fan.'),
       (2, 'Now place the chicken and marinade into a suitably sized casserole dish and cook in the oven for 35 minutes being mindful to turn the chicken every 10 minutes.'),
       (2, 'Once 35 minutes is up the chicken will be ready. However, if you like the honey it a little more caramelized then just leave it for a further 5-10 minutes.'),
       (2, 'Wonderful fragrant and sweet Chinese chicken thighs are ready. Serve with jasmine rice and you willll have a true taste of Asia. Yum!')
;

insert into "ingredients" ("recipeId", "ingredient")
values (3, '8 ounces unsalted butter'),
       (3, '4 ounces chocolate (dark, semi-sweet or milk)'),
       (3, '4 large eggs'),
       (3, '6 ounces sugar'),
       (3, '4 ounces brown sugar'),
       (3, '2 ounces cocoa powder'),
       (3, '5 ounces AP flour (or cake flour for a more tender brownie)'),
       (3, '2 teaspoons vanilla extract'),
       (3, '1 teaspoon salt')
;

insert into "recipeSteps" ("recipeId", "instruction")
values (3, 'Preheat your oven to 350ºF. Line a 9x13 1/4 sheet pan with parchment paper so there is 1 inch of overhang on all sides.'),
       (3, 'Sift together the flour, cocoa powder, and salt to remove lumps and then set aside.'),
       (3, 'Melt your butter, oil, and chocolate together in a heatproof bowl over simmering water. Whisk occasionally until the butter is melted then remove from the heat.'),
       (3, 'In a large heatproof bowl, whisk together your white sugar, brown sugar, vanilla, and room temperature eggs in a bowl until thick and glossy or whip on your stand mixer for about 4 minutes on medium-high.'),
       (3, 'Add your hot melted chocolate mixture to the egg/sugar mixture and whisk for one minute or until the sugar is dissolved. Rub the mixture between your fingers, if you can still feel granules then keep whisking.'),
       (3, 'If your mixture is no longer warm, you can return the bowl to your pot of simmering water and whisk for another minute until the granules are dissolved. This is what makes the crackly crust.'),
       (3, 'Add in the flour mixture and chocolate chips to the egg mixture and fold gently until just combined. Do not over-mix it.'),
       (3, 'Pour your batter into the parchment-lined pan. Place the pan in the center of the oven and bake for 18-20 minutes or until a toothpick comes out from the center with a few sticky moist crumbs.'),
       (3, 'Let your brownies cool until the pan is barely warm before removing the parchment paper and slicing the brownies.')
;

insert into "ingredients" ("recipeId", "ingredient")
values (4, '1 pound ground beef'),
       (4, '2 quarts water'),
       (4, '1 small onion (chopped fine)'),
       (4, '2 cans tomato sauce (15 ounce size)'),
       (4, '1 tablespoon salt'),
       (4, '1 tablespoon black pepper'),
       (4, '3 cans mixed vegetables (15 ounce size, drained)')
;

insert into "recipeSteps" ("recipeId", "instruction")
values (4, 'Heat a stock pot over medium-high heat.'),
       (4, 'Add the ground beef and cook, stirring, until the beef is no longer pink. Drain off any excess grease.'),
       (4, 'Add the water and onion to the stock pot. Bring to a boil and let simmer for 15 minutes.'),
       (4, 'Stir in the tomato sauce, salt, and pepper. '),
       (4, 'Simmer for 5 minutes then stir in the mixed vegetables.'),
       (4, 'Cook for 5 more minutes then serve.')
;

insert into "ingredients" ("recipeId", "ingredient")
values (5, '1 pound ground beef (or Ground Turkey)'),
       (5, '1 jar spaghetti sauce (I use Ragu Garden Combination)'),
       (5, '1 cup shredded cheddar cheese'),
       (5, '1 box noodles (Rigatoni Pasta)'),
       (5, '1 cup shredded cheese (Mozzarella)'),
       (5, 'garlic salt (With Parsley)')
;

insert into "recipeSteps" ("recipeId", "instruction")
values (5, 'Cook your hamburger in a skillet till browned evenly. Also cook pasta like it says on the box.'),
       (5, 'Once your hamburger is browned pour the pasta sauce over the hamburger and cook on low until your pasta noodles are cooked.'),
       (5, 'Once pasta noodles are cooked, drain and pour back into pan, then add the Hamburger and Spaghetti sauce in the noodle pan and mix it together.'),
       (5, 'Pour it into a pan, and the add the mixed cheeses over the top covering it. If you like extra cheese add more!'),
       (5, 'Then once you have the pasta bake spread evenly over pan, sprinkle with a little garlic salt with parsley to add some extra flavor!'),
       (5, 'Pop into a 350 degree oven for about 15-20 minutes, or until the cheese has been cooked and its light brown, as seen in picture above!'),
       (5, 'Then take out of oven and serve!')
;

insert into "ingredients" ("recipeId", "ingredient")
values (6, '1 1/2 pound ground beef (or Ground Turkey)'),
       (6, '1 can green beans (drained)'),
       (6, '1 can cream of chicken (or 1/2 cup milk)'),
       (6, 'tater tots'),
       (6, 'cheese (grated, Cheddar or American)')
;

insert into "recipeSteps" ("recipeId", "instruction")
values (6, 'Brown ground beef and drain.'),
       (6, 'Place in buttered baking dish and add drained green beans.'),
       (6, 'Stir together the soup and milk and mix with the ground beef and green beans.'),
       (6, 'On the top put one layer of Tater Tots (one small bag) and grated cheese.'),
       (6, 'Bake at 350 degrees for 45 minutes.')
;

insert into "ingredients" ("recipeId", "ingredient")
values (7, '1/2 cup butter (melted and cooled)'),
       (7, '1/4 cup flour'),
       (7, '1/4 cup sugar'),
       (7, '2 eggs (well beaten)'),
       (7, '1 cup milk'),
       (7, '15.25 ounces sweet corn (whole kernel, drained)'),
       (7, '14.75 ounces cream style sweet corn'),
       (7, '1/2 teaspoon salt'),
       (7, 'pepper (to taste)')
;

insert into "recipeSteps" ("recipeId", "instruction")
values (7, 'Preheat oven to 350 degrees.'),
       (7, 'In a sauce pan, heat the butter slowly over medium-low heat, swirling the pan until it is just melted. Set it aside while you measure out the rest of the ingredients.'),
       (7, 'Whisk the flour into the melted and cooled butter until well incorporated. Then whisk in the sugar, eggs and milk.'),
       (7, 'Stir the creamed corn into the butter mixture, along with the drained whole kernel corn. Season with salt and pepper.'),
       (7, 'Pour into a shallow 8x8" baking dish.'),
       (7, 'Bake uncovered at 350 degrees for approximately 1 hour and 15 minutes, until the center is set and the corn casserole is brown and caramelized on top. Let stand for 5 minutes, serve warm.')
;

insert into "ingredients" ("recipeId", "ingredient")
values (8, '1 pound salmon (boned)'),
       (8, '1/2 Orange'),
       (8, '1 tablespoon balsamic vinegar'),
       (8, '1 tablespoon pure maple syrup'),
       (8, '1 teaspoon Dijon mustard'),
       (8, '1 tablespoon coconut oil'),
       (8, '1 green onion (chopped)')
;

insert into "recipeSteps" ("recipeId", "instruction")
values (8, 'Preheat oven to 425 F.'),
       (8, 'Combine maple syrup, balsamic vinegar, and dijon mustard with orange juice and set aside.'),
       (8, 'Heat an oven-safe frying pan over medium-high heat. Add coconut oil. Then add the salmon. It will sear quickly. Flip it over, and turn off the heat. Leaving the fish in the pan, pour the orange juice mixture over it. Sprinkle on chopped onion.'),
       (8, 'Move the hot pan to the oven and cook, uncovered, for 6 to 9 minutes for the salmon to finish cooking inside. The juice mixture should be reduced to a nice glaze. Watch it closely to make sure it doeS not boil dry and burn.'),
       (8, 'Serve with the glaze scraped from the pan and drizzled over the salmon. Leftovers keep well in the fridge and are nice served on a lettuce salad')
;

insert into "ingredients" ("recipeId", "ingredient")
values (9, '1 pound medium shrimp (peeled and deveined)'),
       (9, '1 tablespoon cornstarch'),
       (9, '2 1/2 tablespoons canola oil (divided)'),
       (9, '1/4 cup green onions (diagonally cut)'),
       (9, '2 teaspoons peeled fresh ginger (minced)'),
       (9, '3 garlic cloves (thinly sliced)'),
       (9, '2 cups broccoli florets'),
       (9, '1/4 cup reduced sodium soy sauce'),
       (9, '2 tablespoons rice vinegar'),
       (9, '1 teaspoon honey'),
       (9, '1/8 teaspoon crushed red pepper')
;

insert into "recipeSteps" ("recipeId", "instruction")
values (9, 'Blot shrimp with a paper towel to dry and place in a medium bowl with cornstarch. Toss to coat.'),
       (9, 'Heat a large wok or skillet over high heat. Add 1 tablespoon oil and shrimp to pan; stir-fry about 4 minutes, or until golden brown. Do not over cook.'),
       (9, 'Remove shrimp from pan. Add 1 1/2 teaspoons oil and stir-fry green onions, ginger, and garlic for 45 seconds. Remove from pan and add to the shrimp.'),
       (9, 'Add the remaining 1 tablespoon oil to pan and stir-fry broccoli for 1 1/2 minutes. Stir in shrimp and onion mixture to pan. Pour in soy sauce, rice vinegar, honey, and red pepper flakes and bring to a boil. Cook just 1 minute or until broccoli is crisp-tender.'),
       (9, 'Serve immediately over rice.')
;

insert into "ingredients" ("recipeId", "ingredient")
values (10, '2 tablespoons oil (or butter)'),
       (10, '1/4 cup onion (chopped)'),
       (10, '2 cups vegetables (chopped*)'),
       (10, '6 eggs'),
       (10, 'salt (to taste)'),
       (10, 'pepper (to taste)')
;

insert into "recipeSteps" ("recipeId", "instruction")
values (10, 'Preheat oven to 400 F.'),
       (10, 'In a large skillet, heat oil over medium heat. Saute onion (If using potatoes or peppers, add these here too) until translucent.'),
       (10, 'Add any other vegetables and cook until soft but not completely cooked through.'),
       (10, 'Meanwhile, crack eggs in a medium-size bowl, and scramble them with a whisk or a fork. Add salt and pepper to taste.'),
       (10, 'Place sauteed vegetables in a greased pie dish or an 8x8-inch baking dish. Pour egg mixture evenly over the vegetables.'),
       (10, 'Bake for 20-30 minutes until the top of the eggs is no longer wet.'),
       (10, 'Remove from oven, allow it to cool slightly, then slice and serve. ')
;

insert into "ingredients" ("recipeId", "ingredient")
values (11, '1 cup milk'),
       (11, '1/2 cup flour'),
       (11, '3 eggs')
;

insert into "recipeSteps" ("recipeId", "instruction")
values (11, 'Preheat a small, lightly greased skillet.'),
       (11, 'Whisk together the milk, flour, and eggs unt,il smooth.'),
       (11, 'Pour 1/3 cup of the crepe batter onto the skillet. Tilt the skillet to spread the batter evenly on the bottom. Let cook until the bottom is dry. Carefully turn the crepe over using a large spatula and cook on the other side until the crepe is firm.'),
       (11, 'Remove from the pan and let cool on paper toweling. Stack the cooked crepes with paper towels between them while preparing the remaining crepes.'),
       (11, 'Fill the crepes as desired and serve immediately')
;
