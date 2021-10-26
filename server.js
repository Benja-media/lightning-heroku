// Import dependencys
const express = require('express');
const path = require('path');
const fs = require('fs');

// Import Json files
const config = require('./config.json')
const svr = require('./svr/svr.json')


// Express
const app = express();
const port = process.env.PORT || 3000;

fs.readFile('./config.json', 'utf8', (err, jsonString) => {
  if (err) {
    console.log("File read failed:", err)
    return
  }
  try {
    const config = JSON.parse(jsonString)
    console.log("User name is:", config.user)
    
  } catch (err) {
    console.log('Error parsing JSON string:', err)
  }
// Get link pages
try {
  if (config.symbol == "" || config.symbol == null) {
    app.get('/' + config.home, function(req, res) {
      res.sendFile(path.join(__dirname, 'views/link.html'));


      
    });
    console.log("We could not find a symbol!")
    console.log("Link has been set to: http://localhost:" + port +  "/" + config.home);

  } else {
          app.get('/'+ config.symbol + '/' + config.home, function(req, res) {
      res.sendFile(path.join(__dirname, 'views/link.html'));
      
    });
    console.log("We found a symbol! (" + config.symbol +")")
    console.log("Link is listing at http://localhost:" + port +  "/" + config.symbol + '/' + config.home);
    

    }
      } catch (err) {
  console.log("We tried to list your links but we have encountered an error. Please check /config.json for more!", err)
  }
})
// Get static files
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'views/index.html'));
});

// Allow client-side javascript:
try {
app.use(express.static('stat'));

app.get('/config.json', function(req, res) {
  res.sendFile(path.join(__dirname, '/config.json'));
});
console.log("Static files have been loaded & published")
} catch (err) {
  console.log("We have encountered an error loading client-side Javascript. A reatart of the app is sugested")
  console.log(err)
}
// Listen for app
app.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});
