console.log('Loaded!');
var img = document.getElementById('madi');
var marginleft=0;
function moveRight()
{
    marginleft = marginleft + 1;
    img.style.marginleft = marginleft + 'px';
}
img.onclick =  function()
{
       var interval=setInterval(moveRight, 10);
       //img.style.marginleft = '100px';
};