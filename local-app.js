const {app, setEndpoint} = require('./app')

setEndpoint("http://localhost:8000");
app.listen(3000, () => {
    console.log('listening');
})

var local = '/test'