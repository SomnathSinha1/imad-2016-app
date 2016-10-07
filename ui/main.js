var button=document.getElementById('counter');
button.onclick= function()
{
    var request = new XMLHttpRequest();
    
    request.onreadystatechange = function()
    {
       if(request.readyState=== XMLHttpRequest.DONE) {
           if(request.status===200)
           {
               var counter1= request.responseText;
               var span=document.getElementById('count');
               span.innerHTML = counter1.toString();
           }
       }
    };
    
    request.open('GET', 'http://somnathsinha1.imad.hasura-app.io/', true);
    request.send(null);
    
};