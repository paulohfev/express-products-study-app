const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const errorController = require('./controllers/error');
const sequelize = require('./utils/database');
const Product = require('./models/product');
const User = require('./models/user');

const app = express();
app.set('view engine', 'ejs');
// configs express where to compile templates and where to find them
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  User.findByPk(1)
    .then((user) => {
      // stores the sequelized user in the req user the user field. If done to the body (req.body.user), we would be overriding.
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

// Relations
  // CASCADE ~> anything belonging to a user would also be deleted
Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
User.hasMany(Product);

sequelize
  // force true overrides tables with new changes in models, etc. (NOT TO BE USED IN PRODUCTION)
  .sync()
  .then(result => {
    // Create a user after the tables have been created.
    return User.findByPk(1)
    // console.log(result);
  })
  .then(user => {
    if (!user) {
      return User.create({ name: 'Paulo', email: 'test@test.com' })
    }
    return user;
  })
  .then(user => {
    console.log(user)
    app.listen(3000);
  })
  .catch(err => {
    console.log(err);
  });
