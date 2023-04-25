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
      name: 'Royale Original Toilet Paper, 12 equal 24 Roll',
      category: categories[0]._id,
      description:
        'Bathroom Tissue. Facial Tissue. Paper Towels. Napkins. There’s a Royale for every room.',
      image: 'https://assets.shop.loblaws.ca/products/21363770/b2/en/front/21363770_front_a06_@2.png',
      price: 7.99,
      quantity: 20,
      inStock: true,
      purchaseCount: 0,
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
        'Tim Hortons Original Blend is a Perfectly Balanced, Medium Roast Coffee with a Smooth Finish.',
      image: 'https://m.media-amazon.com/images/W/IMAGERENDERING_521856-T1/images/I/813TwvYFi2L._AC_SX522_.jpg',
      price: 17.99,
      quantity: 20,
      inStock: true,
      purchaseCount: 0,
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
      image: 'https://i5.walmartimages.ca/images/Large/139/678/6000205139678.jpg',
      price: 4.19,
      quantity: 20,
      inStock: true,
      purchaseCount: 0,
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
    },

    {
      name: 'Tide PODS® Laundry Detergent',
      category: categories[2]._id,
      description:
        'Tide PODS® Original laundry detergent pacs offer a powerful clean that works on 100% of common stains, even in cold.',
      image: 'https://images.ctfassets.net/snqjgnra1eqk/5wEfI2jpYi0gglqSzWW1J9/fd6d69075a19fa67ebd4fd4ce4ee1580/Tide_Hagrid_Original_PODS_hero_1920x2287_0329.png?fm=png',
      price: 24.03,
      quantity: 20,
      inStock: true,
      purchaseCount: 0,
      AmazonHistory: {
        link: "https://www.amazon.ca/dp/B09PZKHBGP?pd_rd_i=B09PZKHBGP&pf_rd_p=f6bdd6c0-23bc-4750-82f8-87eefeb4cb4e&pf_rd_r=8CZCJPZRJ5CA10SXBDNC&pd_rd_wg=RJDnR&pd_rd_w=vkgS2&pd_rd_r=b7edd6c7-5609-48b7-8575-5081f90160e7",
        priceHistory: [{date: "March 1, 2023", price: 26.99}, {date: "March 7, 2023", price: 25.59}, {date: "March 14, 2023", price: 26.19}]
      },
      WalmartHistory: {
        link: "https://www.walmart.ca/en/ip/tide-pods-ultra-oxi-laundry-detergent-pacs/6000198099444", 
        priceHistory: [{date: "March 1, 2023", price: 25.99}, {date: "March 7, 2023", price: 27.59}, {date: "March 14, 2023", price: 31.99}]
      },
      LoblawsHistory: {
        link: "https://www.loblaws.ca/ultra-oxi-liquid-laundry-detergent-pods-61-count/p/21184841_EA",
        priceHistory: [{date: "March 1, 2023", price: 33.99}, {date: "March 7, 2023", price: 25.99}, {date: "March 14, 2023", price: 24.19}]
      }
    },

    {
      name: 'Pedigree Vitality+ Roasted Chicken & Vegetable Flavour Dry Dog Food',
      category: categories[1]._id,
      description:
        'PEDIGREE VITALITY+ Adult Roasted Chicken and Vegetable Flavour Food for Dogs is formulated to give dogs all of the energy and nourishment they need to continue living life to the fullest',
      image: 'https://i5.walmartimages.ca/images/Enlarge/683/106/6000197683106.jpg',
      price: 23.19,
      quantity: 20,
      inStock: true,
      purchaseCount: 0,
      AmazonHistory: {
        link: "https://www.amazon.ca/PEDIGREE-High-Protein-Adult-Food/dp/B08QCYQCBM/ref=sr_1_7?crid=368V77OYUP8DQ&keywords=dog+food+pedigree&qid=1680302887&sprefix=dog+food+pedigree%2Caps%2C254&sr=8-7",
        priceHistory: [{date: "March 1, 2023", price: 16.99}, {date: "March 7, 2023", price: 15.59}, {date: "March 14, 2023", price: 26.19}]
      },
      WalmartHistory: {
        link: "https://www.walmart.ca/en/ip/pedigree-vitality-roasted-chicken-vegetable-flavour-dry-dog-food-8kg/6000016948939", 
        priceHistory: [{date: "March 1, 2023", price: 25.99}, {date: "March 7, 2023", price: 17.59}, {date: "March 14, 2023", price: 21.99}]
      },
      LoblawsHistory: {
        link: "https://www.loblaws.ca/vitality-roasted-chicken-and-vegetable-flavour-dry/p/20039397001_EA",
        priceHistory: [{date: "March 1, 2023", price: 23.99}, {date: "March 7, 2023", price: 15.99}, {date: "March 14, 2023", price: 24.19}]
      }
    },

    {
      name: 'Glad Black Garbage Bags - Regular 74 Litres - 40 Trash Bags',
      category: categories[0]._id,
      description:
        'Count on GLAD outdoor bags to measure up to the task. Strong and sturdy, avoid the messiest garbage disasters. And with the Easy-Tie flaps you just tie, grab, toss, and you’re done.',
      image: 'https://i5.walmartimages.ca/images/Enlarge/811/201/6000202811201.jpg',
      price: 24.00,
      quantity: 20,
      inStock: true,
      purchaseCount: 0,
      AmazonHistory: {
        link: "https://www.amazon.ca/Glad-Black-Garbage-Bags-Litres/dp/B00BMBR0PE/ref=sr_1_12?crid=9KVJY44N6QA5&keywords=trash+bags+glad&qid=1680303088&sprefix=trash+bags+glad%2Caps%2C183&sr=8-12",
        priceHistory: [{date: "March 1, 2023", price: 16.99}, {date: "March 7, 2023", price: 15.59}, {date: "March 14, 2023", price: 26.19}]
      },
      WalmartHistory: {
        link: "https://www.walmart.ca/en/ip/glad-black-garbage-bags-giant-184-litres-40-trash-bags/6000039455638", 
        priceHistory: [{date: "March 1, 2023", price: 25.99}, {date: "March 7, 2023", price: 17.59}, {date: "March 14, 2023", price: 21.99}]
      },
      LoblawsHistory: {
        link: "https://www.loblaws.ca/black-garbage-bags-giant-184-litres/p/20360876_EA",
        priceHistory: [{date: "March 1, 2023", price: 23.99}, {date: "March 7, 2023", price: 15.99}, {date: "March 14, 2023", price: 24.19}]
      }
    },

    {
      name: 'Dove Original Deep Moisture Beauty Bar',
      category: categories[0]._id,
      description:
        'Bring superior care with Dove Original Beauty Bar. Enjoy soft, smooth, and healthy-looking skin with the gentle cleansing formula enriched with our signature ¼ moisturizing cream.',
      image: 'https://i5.walmartimages.ca/images/Enlarge/900/662/6000200900662.jpg',
      price: 13.19,
      quantity: 20,
      inStock: true,
      purchaseCount: 0,
      AmazonHistory: {
        link: "https://www.amazon.ca/Dove-Beauty-healthy-looking-White-count/dp/B0876WFZLR/ref=sr_1_1_sspa?crid=OST95I0U29J4&keywords=dove+soap&qid=1680463945&sprefix=dove+soap%2Caps%2C138&sr=8-1-spons&psc=1&spLa=ZW5jcnlwdGVkUXVhbGlmaWVyPUEzOUJNQVRON0k1NTVGJmVuY3J5cHRlZElkPUEwOTIxODgwMVdFVFRNT1ZHWDE3QSZlbmNyeXB0ZWRBZElkPUEwMTI3NDg5MzRINEYxV0pDREJETyZ3aWRnZXROYW1lPXNwX2F0ZiZhY3Rpb249Y2xpY2tSZWRpcmVjdCZkb05vdExvZ0NsaWNrPXRydWU=",
        priceHistory: [{date: "March 1, 2023", price: 16.99}, {date: "March 7, 2023", price: 15.59}, {date: "March 14, 2023", price: 12.19}]
      },
      WalmartHistory: {
        link: "https://www.walmart.ca/en/ip/dove-original-deep-moisture-beauty-bar/6000200703319", 
        priceHistory: [{date: "March 1, 2023", price: 15.99}, {date: "March 7, 2023", price: 17.59}, {date: "March 14, 2023", price: 21.99}]
      },
      LoblawsHistory: {
        link: "https://www.loblaws.ca/beauty-bar-more-moisturizing-than-bar-soap-deep-mo/p/21237519_EA",
        priceHistory: [{date: "March 1, 2023", price: 13.99}, {date: "March 7, 2023", price: 15.99}, {date: "March 14, 2023", price: 14.19}]
      }
    },

    {
      name: 'Scotch-Brite® Heavy Duty Scour Pad',
      category: categories[0]._id,
      description:
        'Scotch-Brite® Heavy Duty Scour Pad is for when its time to pull out all the stops. With its heavy-duty cleaning strength, you will save on elbow grease when scrubbing the kitchen clean. Great for any serious indoor and outdoor scouring jobs.',
      image: 'https://assets.shop.loblaws.ca/products/20854632/b2/en/front/20854632_front_a06_@2.png',
      price: 3.19,
      quantity: 20,
      inStock: true,
      purchaseCount: 0,
      AmazonHistory: {
        link: "https://www.amazon.ca/Scotch-Brite-Heavy-Duty-Scour-Pad/dp/B00565V2AG/ref=sr_1_18?crid=2P7HO1VBGSA2G&keywords=sponges+scotch+4+pack&qid=1680464469&sprefix=sponges+scotch+4+pack%2Caps%2C158&sr=8-18",
        priceHistory: [{date: "March 1, 2023", price: 6.99}, {date: "March 7, 2023", price: 5.59}, {date: "March 14, 2023", price: 2.19}]
      },
      WalmartHistory: {
        link: "https://www.walmart.ca/en/ip/scotch-brite-heavy-duty-scour-pad/6000016932568", 
        priceHistory: [{date: "March 1, 2023", price: 5.99}, {date: "March 7, 2023", price: 7.59}, {date: "March 14, 2023", price: 1.99}]
      },
      LoblawsHistory: {
        link: "https://www.loblaws.ca/scour-pad/p/20854632_EA",
        priceHistory: [{date: "March 1, 2023", price: 3.99}, {date: "March 7, 2023", price: 5.99}, {date: "March 14, 2023", price: 4.19}]
      }
    }

  ]);

  console.log('products seeded');

  await User.deleteMany();

  await User.create({
    firstName: 'Pamela',
    lastName: 'Washington',
    admin: true,
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
    admin: false,
    email: 'eholt@testmail.com',
    password: 'password12345'
  });

  await User.create({
    firstName: 'John',
    lastName: 'Abou',
    admin: true,
    email: 'jabou@test.com',
    password: 'password12345'
  });

  console.log('users seeded');

  process.exit();
});
