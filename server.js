var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;
/*var config = {
    user: 'somnathsinha1'
    database: 'somnathsinha1'
    port: '5432'
    password: process.env.DB_PASSWORD
}*/
var pool = new Pool(config);

var app = express();
app.use(morgan('combined'));

var articles= {
 'article-one' : 
 {
    title: 'ArticleOne|Somnath',
    heading: 'Article One',
    content:`
    <p>
    This is the first content for Article One
    </p>
    <p>
    This is the second content for Article One
    </p>`
  },
    'article-two' :{
         title: 'ArticleTwo|Somnath',
    heading: 'Article Two',
    content:`
    <p>
    This is the first content for Article Two
    </p>
    <p>
    This is the second content for Article Two
    </p>`
        
    }, 
    'article-three' :{
         title: 'ArticleThree|Somnath',
    heading: 'Article Three',
    content:`
    <p>
    This is the first content for Article Three
    </p>
    <p>
    This is the second content for Article Three
    </p>`
        
    }
    
};
function createTemplate(data)
{
    var title=data.title;
    var heading=data.heading;
    var content=data.content;
    
    var htmltemplate =`
<html>
    <head>
        <title>
            ${title}
        </title>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <link href="/ui/style.css" rel="stylesheet" />
    
    </head>
<body>
  <div class="container">
    <div>
    <div>
        <a href="\">Home</a>
    </div>
    <div>
        <h1>${heading}</h1>
    </div>
    <div>${content}</div>
   </div>
  </div> 
</body>
</html>

`
return htmltemplate;
}

   





app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});
app.get('/favicon.ico', function (req, res) {
  res.send('null');
});
app.get('/test-db', function (req, res) {
    pool.query('SELECT * FROM test', function(err,result)
    {
        if(err){
            res.status(500).send(err.toString());
        }
        else{
            res.send(JSON.stringify(result));
        }
    })
  
});
app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});
app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

var counter=0;
app.get('/counter', function (req, res) {
    counter=counter+1;
  res.send(counter.toString());
});
app.get('/:articleName', function (req, res){
  var articleName = req.params.articleName;
  res.send(createTemplate(articles[articleName]));
});




var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
