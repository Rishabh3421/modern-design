function loaderAnimation(){
    var tl = gsap.timeline()

tl.from(".line h1",{
    y:150,
    stagger:.2,
})
tl.from(".line1-number",{
    opacity:0,
    onStart:function(){
        var timer = document.querySelector(".line1-number h5");
        var num = 0;
        var intervalId = setInterval(() => {
           if(num < 100) {
              timer.innerHTML = num++;
              
           } else {
              timer.innerHTML = num;
              clearInterval(intervalId); // Stop the interval
           }
        }, 25);
    }
})
tl.to(".line h2",{
    opacity:1,
    animationName:"flicker"
})
tl.to("#loader",{
   y:-1000,
    duration:.5,
    delay:3
}),
tl.from("#page1",{
    y:1200,
    opacity:0,
    ease:Power4
}),
tl.to("#loader",{
    display:none,
})
}

loaderAnimation();