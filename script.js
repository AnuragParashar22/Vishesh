


function horizontalLoop(items, config) {
    items = gsap.utils.toArray(items);
    config = config || {};
    let tl = gsap.timeline({repeat: config.repeat, paused: config.paused, defaults: {ease: "none"}, onReverseComplete: () => tl.totalTime(tl.rawTime() + tl.duration() * 100)}),
        length = items.length,
        startX = items[0].offsetLeft,
        times = [],
        widths = [],
        xPercents = [],
        curIndex = 0,
        pixelsPerSecond = (config.speed || 1) * 100,
        snap = config.snap === false ? v => v : gsap.utils.snap(config.snap || 1), // some browsers shift by a pixel to accommodate flex layouts, so for example if width is 20% the first element's width might be 242px, and the next 243px, alternating back and forth. So we snap to 5 percentage points to make things look more natural
        totalWidth, curX, distanceToStart, distanceToLoop, item, i;
    gsap.set(items, { // convert "x" to "xPercent" to make things responsive, and populate the widths/xPercents Arrays to make lookups faster.
        xPercent: (i, el) => {
            let w = widths[i] = parseFloat(gsap.getProperty(el, "width", "px"));
            xPercents[i] = snap(parseFloat(gsap.getProperty(el, "x", "px")) / w * 100 + gsap.getProperty(el, "xPercent"));
            return xPercents[i];
        }
    });
    gsap.set(items, {x: 0});
    totalWidth = items[length-1].offsetLeft + xPercents[length-1] / 100 * widths[length-1] - startX + items[length-1].offsetWidth * gsap.getProperty(items[length-1], "scaleX") + (parseFloat(config.paddingRight) || 0);
    for (i = 0; i < length; i++) {
        item = items[i];
        curX = xPercents[i] / 100 * widths[i];
        distanceToStart = item.offsetLeft + curX - startX;
        distanceToLoop = distanceToStart + widths[i] * gsap.getProperty(item, "scaleX");
        tl.to(item, {xPercent: snap((curX - distanceToLoop) / widths[i] * 100), duration: distanceToLoop / pixelsPerSecond}, 0)
          .fromTo(item, {xPercent: snap((curX - distanceToLoop + totalWidth) / widths[i] * 100)}, {xPercent: xPercents[i], duration: (curX - distanceToLoop + totalWidth - curX) / pixelsPerSecond, immediateRender: false}, distanceToLoop / pixelsPerSecond)
          .add("label" + i, distanceToStart / pixelsPerSecond);
        times[i] = distanceToStart / pixelsPerSecond;
    }
    function toIndex(index, vars) {
        vars = vars || {};
        (Math.abs(index - curIndex) > length / 2) && (index += index > curIndex ? -length : length); // always go in the shortest direction
        let newIndex = gsap.utils.wrap(0, length, index),
            time = times[newIndex];
        if (time > tl.time() !== index > curIndex) { // if we're wrapping the timeline's playhead, make the proper adjustments
            vars.modifiers = {time: gsap.utils.wrap(0, tl.duration())};
            time += tl.duration() * (index > curIndex ? 1 : -1);
        }
        curIndex = newIndex;
        vars.overwrite = true;
        return tl.tweenTo(time, vars);
    }
    tl.next = vars => toIndex(curIndex+1, vars);
    tl.previous = vars => toIndex(curIndex-1, vars);
    tl.current = () => curIndex;
    tl.toIndex = (index, vars) => toIndex(index, vars);
    tl.times = times;
    tl.progress(1, true).progress(0, true); // pre-render for performance
    if (config.reversed) {
      tl.vars.onReverseComplete();
      tl.reverse();
    }
    return tl;
    }

    const boxes = gsap.utils.toArray("#scrollerelem"),
loop = horizontalLoop(boxes, {paused: false,repeat:-1});

// const scroll = new LocomotiveScroll({
//     el: document.querySelector('#main'),
//     smooth: true
// });



// gsap.to("#part3rightone",{
//       y:-300,
//       ease:Linear.easeNone,
//     //   opacity:0,
//         scrollTrigger:{
//             trigger:"#part3",
//             scroller:"body",
//             pin:true,
//             start:'top 0%',
//             end:'top 70%',
//             markers:true,
//             toggleActions: 'play reverse play reverse',
//             scrub:4
//           }
    
// })

// gsap.to(".one",{
//       y:-300,
//         scrollTrigger:{
//             trigger:"#part3right",
//             scroller:"body",
//             ,
//             start:'top 0%',
//             end:'top 90%',
//             markers:true,
//             scrub:4
//           }
    
// })






// gsap.from("#mid>#imgdiv",{
//     y:400,
//     duration:0.5,
//     ease:Linear.easeNone,
//     scrollTrigger:{
//       trigger:"#part5",
//       scroller:"body",
//       marker:true,
//       // start:"top 80%",
//       // end:"+=100%",
//       scrub:true
//     }
//   })
//   gsap.from("#left>#imgdiv",{
//     y:-400,
//     duration:0.5,
//     ease:Linear.easeNone,
//     scrollTrigger:{
//       trigger:"#part5",
//       scroller:"body",
//       marker:true,
//       // start:"top 80%",
//       // end:"+=100%",
//       scrub:true
//     }
//   })
  







   document.querySelector("#part4_box1").addEventListener("mousemove",function(dets){
        document.querySelector("#part4_box1>#circle").style.display="flex";
        document.querySelector("#part4_box1>#circle").style.left = `${dets.x}px`;
        document.querySelector("#part4_box1>#circle").style.top = `${dets.y-50}px`;
      
      })
    document.querySelector("#part4_box1").addEventListener("mouseleave",function(dets){
        document.querySelector("#part4_box1>#circle").style.display="none";
        document.querySelector("#part4_box1>#circle").style.left = `${dets.x}px`;
        document.querySelector("#part4_box1>#circle").style.top = `${dets.y-50}px`;
      
      })


   document.querySelector("#part4_box2").addEventListener("mousemove",function(dets){
        document.querySelector("#part4_box2>#circle").style.display="flex";
        document.querySelector("#part4_box2>#circle").style.left = `${dets.x}px`;
        document.querySelector("#part4_box2>#circle").style.top = `${dets.y-50}px`;
      
      })
    document.querySelector("#part4_box2").addEventListener("mouseleave",function(dets){
        document.querySelector("#part4_box2>#circle").style.display="none";
        document.querySelector("#part4_box2>#circle").style.left = `${dets.x}px`;
        document.querySelector("#part4_box2>#circle").style.top = `${dets.y-50}px`;
      
      })


   document.querySelector("#part4_box3").addEventListener("mousemove",function(dets){
        document.querySelector("#part4_box3>#circle").style.display="flex";
        document.querySelector("#part4_box3>#circle").style.left = `${dets.x}px`;
        document.querySelector("#part4_box3>#circle").style.top = `${dets.y-50}px`;
      
      })
    document.querySelector("#part4_box3").addEventListener("mouseleave",function(dets){
        document.querySelector("#part4_box3>#circle").style.display="none";
        document.querySelector("#part4_box3>#circle").style.left = `${dets.x}px`;
        document.querySelector("#part4_box3>#circle").style.top = `${dets.y-50}px`;
      
      })

      var submit = function(){
        document.querySelector("#msgform").submit();
      }


      var btn =  document.querySelectorAll(".nav-btn");
      var images =  document.querySelectorAll(".img-slide");
      var slide = function(manual){
        btn.forEach(function(elem){
            elem.classList.remove("active")
        })
        images.forEach(function(elem){
            elem.classList.remove("active")
        })
        btn[manual].classList.add("active")
        images[manual].classList.add("active")
      }
      btn.forEach((elem,i)=>{
       elem.addEventListener("click",() =>{
        slide(i);
       })
      })
     
      var no = 1;

      setInterval(() => {
    
        btn.forEach(function(elem){
            elem.classList.remove("active")
        })
        images.forEach(function(elem){
            elem.classList.remove("active")
        })
        btn[no].classList.add("active");
        images[no].classList.add("active");
        no = no+1;
        if(no > 3) no = 0 ;
      }, 4000);



      gsap.from("#nav",{
        y:-50,
        opacity:0,
        delay:1,
        duration:1,
        ease: "power2.out"
      })
      gsap.from(".home",{
        
        opacity:0,
        delay:1.5,
        duration:0.5,
        ease: "power2.out"
      })
      gsap.from(".content",{
        y:100,
        opacity:0,
        delay:2,
        duration:0.5,
        ease: "power2.out"
      })


    
   var flag = 1;
   document.querySelector("#nav>i").addEventListener("click",function(){
    document.querySelector("#nav").style.width = "100%";
    document.querySelector("#nav").style.marginLeft = "0vw";
    document.querySelector("#nav").style.marginTop = "0vw";
    document.querySelector("#navleft").style.left = "0%";

   })
   document.querySelector("#navleft>button").addEventListener("click",function(){
    document.querySelector("#nav").style.width = "95%";
    document.querySelector("#nav").style.marginLeft = "2.5vw";
    document.querySelector("#nav").style.marginTop = "2.5vw";
    document.querySelector("#navleft").style.left = "-110%";

   })




  var dot = document.querySelectorAll("#part6btnopt>div");
  dot.forEach(function(elem,indx){
    elem.addEventListener("click",function(){
      if(indx == 0){
       
        document.querySelector("#part61").style.display = "flex";
      }else if(indx === 1){
      document.querySelector("#part62").style.display = "flex";
    
        document.querySelector("#part61").style.display = "none";
        document.querySelector("#part63").style.display = "none";
    
      }
      else if(indx == 2){

        document.querySelector("#part63").style.display = "flex";
    
        document.querySelector("#part61").style.display = "none";
        document.querySelector("#part62").style.display = "none";
    
      }
    })
  })