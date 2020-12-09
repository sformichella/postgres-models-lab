const app = require('./app');
const port = 7890;


app.listen(port, () => {
  console.log(`Started on ${port}.`);
});
