const db = require('./connection');
const { User, Product, Category } = require('../models');

db.once('open', async () => {
  await Category.deleteMany();

  const categories = await Category.insertMany([
    { name: 'Household Supplies' },
    { name: 'Food' },
    { name: 'Hygiene' },
  ]);

  console.log('categories seeded');

  await Product.deleteMany();

  const products = await Product.insertMany([
    {
      name: 'Toilet Paper',
      category: categories[0]._id,
      description:
        'Donec volutpat erat erat, sit amet gravida justo sodales in. Phasellus tempus euismod urna. Proin ultrices nisi ut ipsum congue, vitae porttitor libero suscipit. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aliquam lacinia a nisi non congue.',
      image: 'toilet-paper.jpg',
      price: 7.99,
      quantity: 20,
      AmazonHistory: {
        link: "https://www.amazon.ca/Royale-Velour-Plush-Toilet-tissues/dp/B082TDBJLQ/ref=sr_1_3?crid=6UHTW9PTWUKS&keywords=Original+Toilet+Paper%2C+12%3D24+Rolls%2C+242+Bath+Tissues+per+roll&qid=1680104407&sprefix=original+toilet+paper%2C+12+24+rolls%2C+242+bath+tissues+per+roll%2Caps%2C423&sr=8-3",
        priceHistory: [{date: "March 1, 2023", price: 6.99}, {date: "March 7, 2023", price: 8.59}, {date: "March 14, 2023", price: 9.99}]
      },
      WalmartHistory: {
        link: "https://www.walmart.ca/en/ip/Royale-Velour-Toilet-Paper-12-Equals-48-Rolls-284-Bath-Tissues-per-roll-12-Rolls-Pack-of-1/PRD1VKQXEDKI4ZR", 
        priceHistory: [{date: "March 1, 2023", price: 5.99}, {date: "March 7, 2023", price: 7.59}, {date: "March 14, 2023", price: 10.99}]
      },
      LoblawsHistory: {
        link: "https://www.loblaws.ca/original-toilet-paper-12-24-rolls-242-bath-tissues/p/21363770_EA",
        priceHistory: [{date: "March 1, 2023", price: 3.99}, {date: "March 7, 2023", price: 8.99}, {date: "March 14, 2023", price: 15.99}]
      }
    },
    {
      name: 'Tim Hortons Coffee',
      category: categories[1]._id,
      description:
        'TIM HORTONS ORIGINAL BLEND IS A PERFECTLY BALANCED, MEDIUM ROAST COFFEE WITH A SMOOTH FINISH.',
      image: 'tim-hortons.jpg',
      price: 17.99,
      quantity: 40,
      AmazonHistory: {
        link: "https://www.amazon.ca/Tim-Hortons-Original-Coffee-Medium/dp/B014JE3MCU/ref=sr_1_7?crid=1D5G9L7126TOO&keywords=coffee&qid=1680108315&sprefix=coffee%2Caps%2C180&sr=8-7",
        priceHistory: [{date: "March 1, 2023", price: 16.99}, {date: "March 7, 2023", price: 18.59}, {date: "March 14, 2023", price: 29.99}]
      },
      WalmartHistory: {
        link: "https://www.walmart.ca/en/ip/Tim-Hortons-Fine-Grind-Coffee/6000187769640", 
        priceHistory: [{date: "March 1, 2023", price: 15.99}, {date: "March 7, 2023", price: 17.59}, {date: "March 14, 2023", price: 21.99}]
      },
      LoblawsHistory: {
        link: "https://www.loblaws.ca/original-fine-grind-coffee/p/20875767_EA",
        priceHistory: [{date: "March 1, 2023", price: 19.99}, {date: "March 7, 2023", price: 28.99}, {date: "March 14, 2023", price: 25.99}]
      }
    },
    {
      name: 'Sensodyne Whitening & Tartar Toothpaste',
      category: categories[1]._id,
      description:
        'Clinically proven to build relief and daily protection for sensitive teeth.',
      image: 'Sensodyne.jpg',
      price: 4.19,
      quantity: 70,
      AmazonHistory: {
        link: "https://www.amazon.ca/Sensodyne-Whitening-Tarter-Fighting-Toothpaste/dp/B005CSKBHC/ref=sr_1_2_sspa?crid=3QI76QHY8F5WZ&keywords=toothpaste%2BSENSODYNE&qid=1680108604&sprefix=toothpaste%2Bsensodyne%2Caps%2C371&sr=8-2-spons&spLa=ZW5jcnlwdGVkUXVhbGlmaWVyPUEzUVFFTjQ5M1gzM1lMJmVuY3J5cHRlZElkPUEwNTY0NzY5MU5KQ1VYWVJNTDE4NSZlbmNyeXB0ZWRBZElkPUEwMTAyMjQ2V1dJUzNPU1g2VUZMJndpZGdldE5hbWU9c3BfYXRmJmFjdGlvbj1jbGlja1JlZGlyZWN0JmRvTm90TG9nQ2xpY2s9dHJ1ZQ&th=1",
        priceHistory: [{date: "March 1, 2023", price: 6.99}, {date: "March 7, 2023", price: 5.59}, {date: "March 14, 2023", price: 6.19}]
      },
      WalmartHistory: {
        link: "https://www.walmart.ca/en/ip/sensodyne-whitening-tartar-sensitivity-toothpaste/6000016951106", 
        priceHistory: [{date: "March 1, 2023", price: 5.99}, {date: "March 7, 2023", price: 7.59}, {date: "March 14, 2023", price: 1.99}]
      },
      LoblawsHistory: {
        link: "https://www.loblaws.ca/whitening-plus-tartar-fighting-toothpaste/p/20301179001_EA",
        priceHistory: [{date: "March 1, 2023", price: 3.99}, {date: "March 7, 2023", price: 5.99}, {date: "March 14, 2023", price: 4.19}]
      }
    }
  ]);

  console.log('products seeded');

  await User.deleteMany();

  await User.create({
    firstName: 'Pamela',
    lastName: 'Washington',
    email: 'pamela@testmail.com',
    password: 'password12345',
    orders: [
      {
        products: [products[0]._id]
      }
    ]
  });

  await User.create({
    firstName: 'Elijah',
    lastName: 'Holt',
    email: 'eholt@testmail.com',
    password: 'password12345'
  });

  console.log('users seeded');

  process.exit();
});
