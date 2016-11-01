var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;
var config = {
    user: 'somnathsinha1',
    database: 'somnathsinha1',
    port: '5432',
    password: process.env.DB_PASSWORD
};
var pool = new Pool(config);

var app = express();
app.use(morgan('combined'));

var articles= {
 'article-one' : 
 {
    title: 'The Billionaire striving to change the world!! |Somnath',
    heading: 'The Billionaire striving to change the world!! ',
    content:`
   <div dir="ltr" style="text-align: left;" trbidi="on">
We all have been thinking and talking of bringing about changes, in ourselves, in our families, workplaces, surroundings, or mostly in our countries and the world.<br />
But, not many of us have actually been able to bring about the same.<br />
But today let me share with you the story of someone who has and is all set to bring around the change, the much required one in the entire world.<br />
They say, the more you have, the more you crave for, and the more you get, the more you crave for, again, and this all continues. Yeah, true!! We have seen this, heard this or even felt this sometime or the other.<br />
But the person I am talking about has not been the way people expect one in his shoes to be.<br />
<br />
I am talking about Manoj Bhargava, an India born entrepreneur, who accompanied his parents to the US in his teenage years, and later on settled there itself. He is mostly known for his major product, that is, 5 Hour Energy, an energy drink, highly popular in the United States, occupying over 90% of the total market share.<br />
<img alt="Image result for manoj bhargava" src="data:image/jpeg;base64,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" />&nbsp;<img alt="Image result for five hour energy" src="data:image/jpeg;base64,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" /><br />
His company has acquired a net worth of around 4 billion dollars.<br />
Yet many of you may be hearing the name for the first time if you people have not stumbled upon any of the YouTube ads, regarding one of his noblest initiatives.<br />
So what makes him a great person??<br />
His entrepreneurial success?? Maybe. But what's &nbsp;even greater is his initiatives and plans for the future in concern of the entire world. And what's that??<br />
If you have heard of Billions In Change before, you can very well understand, what I am about to talk of, but if not, then please hold on.<br />
Billions In Change, is an organization started by the Lucknow born, US based Entrepreneur, Mr. Bhargava for the betterment of our society and finding solutions to the grave problems the world is facing now, with the use of amazingly efficient and breathtaking technology.<br />
So what are his projects??<br />
The foremost of all is generating FREE ELECTRICITY for the ENTIRE WORLD!!<br />
Well, I tried to enlarge the points of emphasis as big as your would eyes would get while reading these.<br />
Yes, Bhargava is on a mission to provide free electricity to the whole world, including developing countries like India and others in the subcontinent.<br />
Now the big question comes, HOW????<br />
Well, this is answered by Bhargava's innovative product, aptly named in accordance to its objective, The Free Electric.<br />
Now what is Free Electric??<br />
Attached here is the overview video to the description of Free Electric!<br />
<br />
<br />
According to the website, <a href="http://billionsinchange.com/">billionsinchange.com</a><br />
<b>The Problem</b>: &nbsp;<span 16px="" 25.6px="" color:="" font-family:="" font-size:="" light="" line-height:="" next="" red="" w01="">Imagine your life without electricity. Not only would you have no cell phone, computer or television. It would be difficult to light and heat your home or prepare food without burning wood or coal. Your home would be smoky. Food storage would be impossible. That’s how half the world currently lives. Now imagine the difference electrical power could make to those people.</span><br />
<span 16px="" 25.6px="" color:="" font-family:="" font-size:="" light="" line-height:="" next="" red="" w01=""><b>The Solution:</b></span><span 16px="" 25.6px="" color:="" font-family:="" font-size:="" light="" line-height:="" next="" red="" w01="">The Free Electric machine gives people the power to generate electricity themselves – pollution free. The machine is small, light and simple. Here’s how it works: A person pedals a hybrid bicycle. The bicycle wheel drives a flywheel, which turns a generator, which charges a battery. Pedaling for one hour yields electricity for 24 hours with no utility bill, and no exhaust, no waste.</span><br />
<span 16px="" 25.6px="" color:="" font-family:="" font-size:="" light="" line-height:="" next="" red="" w01=""><br /></span>
<span 16px="" 25.6px="" color:="" font-family:="" font-size:="" light="" line-height:="" next="" red="" w01="">This was just one of his great initiatives to bring a vast change in the world. So what else??</span><br />
<span 16px="" 25.6px="" color:="" font-family:="" font-size:="" light="" line-height:="" next="" red="" w01="">So what is the next biggest problem??&nbsp;</span><br />
<span 16px="" 25.6px="" color:="" font-family:="" font-size:="" light="" line-height:="" next="" red="" w01="">Water shortage. The most important places on the earth are likely to get deserted within a matter of years, if the problem is not addressed now.<br />So, the solution crafted by Bhargava is RAIN MAKER!!</span><br />
<iframe allowfullscreen="" frameborder="0" height="407" src="https://www.youtube.com/embed/UOm6l_o5eIk" width="479"></iframe>
<span 16px="" 25.6px="" color:="" font-family:="" font-size:="" light="" line-height:="" next="" red="" w01=""><br /></span><br />
Above is the overview of the revolutionary Rain maker.<br />
<b><u>The Problem</u></b>: <b>Water Shortages</b>, So much of water, rather salt sea water all around, but not a drop to drink.<br />
<u><b>The Solution</b></u>:<b> Rain Maker</b>.<br />
<span 16px="" 25.6px="" color:="" font-family:="" font-size:="" light="" line-height:="" next="" red="" w01="">&nbsp;It mimics nature, turning seawater or polluted water into fresh water suitable for drinking and agriculture. Rain Maker makes more than just a little water. One machine the size of small car can make a thousand gallons per hour. Unlike other desalination systems, Rain Maker recycles its heat energy making it incredibly clean and efficient.</span><br />
<span 16px="" 25.6px="" color:="" font-family:="" font-size:="" light="" line-height:="" next="" red="" w01=""><br /></span>
<span 16px="" 25.6px="" color:="" font-family:="" font-size:="" light="" line-height:="" next="" red="" w01="">It still doesn't end here. This guy has some more really serious plans!!</span><br />
<span 16px="" 25.6px="" color:="" font-family:="" font-size:="" light="" line-height:="" next="" red="" w01="">&nbsp;<u>The Problem:</u> <b>Limited Clean Energy</b>. Burning fossil fuels and generating nuclear reactions to extract energy, comes at a cost far too much for the environment to be sustainable to development. So, what is it??</span><br />
<span 16px="" 25.6px="" color:="" font-family:="" font-size:="" light="" line-height:="" next="" red="" w01="">Look right below your feet. Confused!! Read on.</span><br />
<span 16px="" 25.6px="" color:="" font-family:="" font-size:="" light="" line-height:="" next="" red="" w01=""><b><u>The Solution</u></b>:<b> Limitless Energy</b></span><br />
<center><iframe allowfullscreen="" frameborder="0" height="407" src="https://www.youtube.com/embed/jD-_ACt7Q1U" width="479"></iframe></center>
<span 16px="" 25.6px="" color:="" font-family:="" font-size:="" light="" line-height:="" next="" red="" w01=""><br /></span><br />
<span 16px="" 25.6px="" color:="" font-family:="" font-size:="" light="" line-height:="" next="" w01="">Not too far below the surface of the Earth, it’s hot. That heat can create enough clean energy to power the world, and help keep things cool above. Using cables made from graphene, a form of pure carbon 100 times stronger that steel, that heat can be conducted to the surface of the Earth to run turbines and generate electricity – without burning anything. This is Limitless Energy. Watch the video to get a deeper dive.</span><br />
<span 16px="" 25.6px="" color:="" font-family:="" font-size:="" light="" line-height:="" next="" w01=""><br /></span>
<span 16px="" 25.6px="" color:="" font-family:="" font-size:="" light="" line-height:="" next="" w01="">Not only these, but also a health solution has also been framed out by his team.</span><br />
<span 16px="" 25.6px="" color:="" font-family:="" font-size:="" light="" line-height:="" next="" w01="">RENEW: Blood Flow Enhancement Machine.</span><br />
<span 16px="" 25.6px="" color:="" font-family:="" font-size:="" light="" line-height:="" next="" w01=""><b><u>The Problem</u>: Poor Blood Circulation.</b></span><br />
<span 16px="" 25.6px="" color:="" font-family:="" font-size:="" light="" line-height:="" next="" w01=""><span 16px="" 25.6px="" color:="" font-family:="" font-size:="" light="" line-height:="" next="" red="" w01="">Good blood circulation is the cornerstone of good health. Blood delivers nutrients and oxygen and removes waste from our cells. When blood flows freely and efficiently, the body is able to defend itself against disease. But poor blood flow can result in serious health problems like heart disease, diabetes, stroke, high blood pressure, dementia and cancer.</span></span><br />
<span 16px="" 25.6px="" color:="" font-family:="" font-size:="" light="" line-height:="" next="" w01=""><span 16px="" 25.6px="" color:="" font-family:="" font-size:="" light="" line-height:="" next="" red="" w01=""><b><u>The Solution:</u> RENEW</b></span></span><br />
<span 16px="" 25.6px="" color:="" font-family:="" font-size:="" light="" line-height:="" next="" w01=""><span 16px="" 25.6px="" color:="" font-family:="" font-size:="" light="" line-height:="" next="" red="" w01=""><span 16px="" 25.6px="" color:="" font-family:="" font-size:="" light="" line-height:="" next="" w01="">Renew is a blood flow enhancement machine that uses ECP (External Counterpulsation). ECP enhances blood flow by squeezing blood from the lower body into the core body while the heart is at rest. It’s like an auxiliary heart pumping blood between heartbeats. This action increases circulation while reducing the heart’s workload. The enhanced circulation widens blood vessels causing more blood to reach all areas of the body.</span></span></span><br />
<iframe allowfullscreen="" frameborder="0" height="407" src="https://www.youtube.com/embed/vPP36EV6jIg" width="479"></iframe>
<span 16px="" 25.6px="" color:="" font-family:="" font-size:="" light="" line-height:="" next="" w01=""><span 16px="" 25.6px="" color:="" font-family:="" font-size:="" light="" line-height:="" next="" red="" w01=""><span 16px="" 25.6px="" color:="" font-family:="" font-size:="" light="" line-height:="" next="" w01=""><br /></span></span></span><br />
<br />
So this was the inspiring story a person, with all the wealth a person craves for and slogs all his life to achieve, but who is more interested in giving away to the world rather than craving for more endlessly!!!<br />
<br />
To know more about this project visit&nbsp;<a href="http://billionsinchange.com/">http://billionsinchange.com/</a><br />
<br />
Watch the whole film:&nbsp;<a href="http://billionsinchange.com/film">http://billionsinchange.com/film</a><br />
<br />
Ifyou liked this post and are inspired or left hungry for more inspiration,please subscribe to my blog, +1 this post, share it&nbsp;and leave your comments and suggestions, so that I can improve my content to suit your tastes.<br />
Thank you!!!</div>
`
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

`;
return htmltemplate;
}

   





app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});
app.get('/feed.html', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'feed.html'));
});
app.get('/favicon.ico', function (req, res) {
    res.sendFile(path.join(__dirname,  'favicon.ico'));
  
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
    });
  
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
