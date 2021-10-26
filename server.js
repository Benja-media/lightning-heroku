// Import dependencys
const express = require('express');
const path = require('path');
const fs = require('fs');
console.log("Dependencys are Loaded!")

// Import Json files
console.log("Your links are loading ...")
const config = require('./config.json')
console.log("Your links are Imported")
const svr = require('./svr/svr.json')
console.log("SVR Json Loaded.")


// Express
const app = express();
const port = process.env.PORT || 3000;
console.log("Express server has started!")
console.log("I am listing on port" + port)

fs.readFile('./config.json', 'utf8', (err, jsonString) => {
  if (err) {
    console.log("Whoops... File read failed:", err)
    return
  }
  try {
    const config = JSON.parse(jsonString)
    console.log("User name is curently set to:", config.user)
    
  } catch (err) {
    console.log('Whoops: Error parsing JSON string:', err)
  }
// Get link pages
try {
  if (config.symbol == "" || config.symbol == null) {
    app.get('/' + config.home, function(req, res) {
      res.sendFile(path.join(__dirname, 'views/link.html'));


      
    });
    console.log("Whoops... We could not find a symbol! This is okay!")
    console.log("Your page has been set to: http://localhost:" + port +  "/" + config.home);

  } else {
          app.get('/'+ config.symbol + '/' + config.home, function(req, res) {
      res.sendFile(path.join(__dirname, 'views/link.html'));
      
    });
    console.log("We found a symbol! (" + config.symbol +")")
    console.log("Your page is listing at http://localhost:" + port +  "/" + config.symbol + '/' + config.home);
    

    }
      } catch (err) {
  console.log("We tried to list your links but we have encountered an error. Please check /config.json for more!", err)
  }
})



const { writeFileSync } = require('fs');

const path = './new.json';
const config = { ip: '192.0.2.1', port: 3000 };

try {
  writeFileSync(path, JSON.stringify(config, null, 2), 'utf8');
  console.log('Data successfully saved to disk');
} catch (error) {
  console.log('An error has occurred ', error);
}

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
  
app.get('/new.json', function(req, res) {
  res.sendFile(path.join(__dirname, '/new.json'));
});
  
console.log("Static files have been loaded & published")
} catch (err) {
  console.log("We have encountered an error loading client-side Javascript. A reatart of the app is sugested")
  console.log(err)
}



if (process.env.PORT || port !== 3000) {
  console.log("Your host is listing it on port: " + port + " We have set it to 3000")
}

// Listen for app
app.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});

