let server = require('./server/index.js');
let app = server.app
let port = 8288

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
