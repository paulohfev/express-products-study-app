const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// configs to use pug templating engine
app.set('view engine', 'pug');
// configs express where to compile templates and where to find them
app.set('views', 'views');

const adminData = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminData.routes);
app.use(shopRoutes);

app.use((req, res, next) => {
  res.status(404).render('404');
});

app.listen(3000);
