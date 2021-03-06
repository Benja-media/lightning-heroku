// Import dependencys
const express = require('express');
const path = require('path');
const fs = require('fs');
console.log("Dependencys are Loaded!")

// Import Json files
console.log("Your links are loading ...")
const config = require('./template.json')
console.log("Your links are Imported")
const svr = require('./svr/svr.json')
console.log("SVR Json Loaded.")


// Express
const app = express();
const port = process.env.PORT || 3000;
console.log("Express server has started!")
console.log("I am listing on port" + port)

fs.readFile('./template.json', 'utf8', (err, jsonString) => {
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
  if (process.env.symbol == "" || process.env.symbol == null) {
    app.get('/' + config.home, function(req, res) {
      res.sendFile(path.join(__dirname, 'views/link.html'));


      
    });
    console.log("Whoops... We could not find a symbol! This is okay!")
    console.log("Your page has been set to: http://localhost:" + port +  "/" + process.env.home);

  } else {
          app.get('/'+ process.env.symbol + '/' + process.env.home, function(req, res) {
      res.sendFile(path.join(__dirname, 'views/link.html'));
      
    });
    console.log("We found a symbol! (" + process.env.symbol +")")
    console.log("Your page is listing at http://localhost:" + port +  "/" + process.env.symbol + '/' + process.env.home);
    

    }
      } catch (err) {
  console.log("We tried to list your links but we have encountered an error. Please check /config.json for more!", err)
  }
})

// Write file
const { writeFileSync } = require('fs');

const new_file = './wrote.json';
const new_json = {
  "user": process.env.User,
  "user_url": process.env.user_url,
  "media": process.env.prime_media,
  "symbol": process.env.symbol,
  "media_name": process.env.media_name,
  "name": process.env.Name,
  "photo": process.env.photo,
  "img_top": "150",
  "img_margin": "0",
  "display": process.env.name,
  "home": process.env.home,

  "msg": process.env.msg,

  "title1": process.env.Title1,
  "link1": process.env.Link1,

  "title2": process.env.Title2,
  "link2": process.env.Link2,

  "title3": process.env.Title3,
  "link3": process.env.Link3,

  "title4": process.env.Title4,
  "link4": process.env.Link4,

  "title5": process.env.Title5,
  "link5": process.env.Link5,
  
  "title6": process.env.Title6,
  "link6": process.env.Link6,
  
  "title7": process.env.Title7,
  "link7": process.env.Link6,

  "bio": process.env.bio,
  
  "err_link_title": process.env.err_link_title,
  "err_link_url": process.env.err_link_url,

  "Topic1": process.env.topic1,
  "Topic2": process.env.topic2
  
};

try {
  writeFileSync(new_file, JSON.stringify(new_json, null, 2), 'utf8');
  console.log('wrote.json has been saved to disk');
} catch (error) {
  console.log('An error has wtiring the links to disk. ', error);
}

// Get static files
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'views/index.html'));
});

// Allow client-side javascript:
try {
app.use(express.static('stat'));

app.get('/config.json', function(req, res) {
  res.sendFile(path.join(__dirname, '/template.json'));
});
  
app.get('/new.json', function(req, res) {
  res.sendFile(path.join(__dirname, '/wrote.json'));
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
