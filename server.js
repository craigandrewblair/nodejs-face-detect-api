const bodyParser = require ('body-parser');
const express = require ('express');
const app = express();
const port = 4000;

app.use(express.static(__dirname + '/public'));
app.get('/',(req, res) => res.send('Express root route'));

app.listen(port, () => console.log(`Express listening on port ${port}`));


/**
/ -> res = Express root route
/register POST -> res(UserObj)
/signin POST -> success/fail
/profile:userId -> GET user
/image -> PUT -> user
 */