$(function(){
  
  $(".iziModal").iziModal({
   width: 900,
   radius: 5,
   padding: 2,
   group: 'products',
   loop: true,
   headerColor: 'rgb(39 39 39)',
   closeButton: true,
   navigateArrows: false,
   overlayColor: 'rgb(0 0 0 / 85%)',
   onClosed: function(){
     
     
  },
   timeoutProgressbarColor: 'rgba(255,255,255,0.5)',
 });
 
  
 });
 
 $('.table__carusel').owlCarousel({
  loop:true,
  margin:10,
  nav:false,
  dots: true,
  responsive:{
      0:{
          items:1
      },
      600:{
          items:1
      },
      1000:{
          items:1
      }
  }
})

$('.carusel__list').owlCarousel({
    loop:true,
    margin:10,
    nav: false,
    dots: true,
    navText: ['',''],
    responsive:{
        0:{
            items:1
        },
        600:{
            items:3
        },
        1000:{
            items:6
        }
    }
  })
$('.reviews__carousel').owlCarousel({
    loop:true,
    margin:5,
    nav: true,
    dots: false,
    navText: ['',''],
    responsive:{
        0:{
            items:1
        },
        750:{
            items:2
        },
        1000:{
            items:3
        }
    }
})
$('.mobiMenu').on('click ', function() {
    if ($('.mobiMenu-icon').hasClass('isOpen')) {
        $('.mobiMenu-label').text('Menu');
        $('.mobiMenu-icon').removeClass('isOpen');
        $('.mobi_list').removeClass('active');
    } else {
      $('.mobiMenu-icon').addClass('isOpen');
      $('.mobiMenu-label').text('Close');
      $('.mobi_list').addClass('active');
      
    }
  });

$(function(){
    $(window).scroll(function(){
      var winTop = $(window).scrollTop();
      if(winTop >= 40){
        $("nav").addClass("sticky-header");
      }else{
        $("nav").removeClass("sticky-header");
      }//if-else
    });//win func.
  });//ready func.
//  var checkbox = document.getElementById("ViewGrid");

//  if (sessionStorage.getItem("mode") == "grid") {
//   grid(); 
// } else {
//   flex();
// }

// checkbox.addEventListener("change", function() {
//   if (checkbox.checked) {
//     grid(); 
//   } else {
//     flex();
//   }
// });
// function grid() {
//   document.querySelector(".product-list").classList.add("grid"); 
//   checkbox.checked = true; 
//   sessionStorage.setItem("mode", "grid");
// }
 

// function flex() {
//   document.querySelector(".product-list").classList.remove("grid"); 
//   checkbox.checked = false; 
//   sessionStorage.setItem("mode", "flex");
// }
 
function openKids(evt, openKids) {
  var i, tabcontent, tablinks;

  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
  }

  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  document.getElementById(openKids).style.display = "block";
  evt.currentTarget.className += " active";
}
document.getElementById("defaultOpen").click();