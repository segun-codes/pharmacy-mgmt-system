const rigupSever = require('./helper/server');


const app = rigupSever();
const port = 3000; // change this to dynamic use case later

app.listen(port, () => {
  console.log(`Server up and running on port ${port}`);
});
