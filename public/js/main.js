/*price range*/

if ($.fn.slider) {
   $('#sl2').slider();
}

var RGBChange = function () {
   $('#RGB').css('background', 'rgb(' + r.getValue() + ',' + g.getValue() + ',' + b.getValue() + ')')
};

/*scroll to top*/

$(document).ready(function () {
   $(function () {
      $.scrollUp({
         scrollName: 'scrollUp', // Element ID
         scrollDistance: 300, // Distance from top/bottom before showing element (px)
         scrollFrom: 'top', // 'top' or 'bottom'
         scrollSpeed: 300, // Speed back to top (ms)
         easingType: 'linear', // Scroll to top easing (see http://easings.net/)
         animation: 'fade', // Fade, slide, none
         animationSpeed: 200, // Animation in speed (ms)
         scrollTrigger: false, // Set a custom triggering element. Can be an HTML string or jQuery object
         //scrollTarget: false, // Set a custom target element for scrolling to the top
         scrollText: '<i class="fa fa-angle-up"></i>', // Text for element, can contain HTML
         scrollTitle: false, // Set a custom <a> title if required.
         scrollImg: false, // Set true to use image
         activeOverlay: false, // Set CSS color to display scrollUp active point, e.g '#00FFFF'
         zIndex: 2147483647 // Z-Index for the overlay
      });
   });
});

/* add to card */
const addToCardButtons = document.querySelectorAll('.add-to-cart'),
   addToWishlistButtons = document.querySelectorAll('.add-to-wishlist'),
   addCommentButtons = document.querySelectorAll('.add-comment')

if (addToCardButtons) {
   addToCardButtons.forEach(btn => {
      btn.addEventListener('click', async e => {
         const productId = e.target.id
         try {
            let response = await fetch('/cart/add', {
               headers: {
                  'Content-type': 'application/json; charset=utf-8'
               },
               method: "POST",
               body: JSON.stringify({id: productId})
            })
            response = await response.json()
            if (response.ok) {
               alert('Product added to card')
            }
         } catch (e) {
            console.log(e)
         }
      })
   })
}

const removeFromCartBtns = document.querySelectorAll('[data-remove-id]'),
   incrementBtns = document.querySelectorAll('[data-increment-id]'),
   decrementBtns = document.querySelectorAll('[data-decrement-id]')

if (removeFromCartBtns) {
   removeFromCartBtns.forEach(btn => {
      btn.addEventListener('click', async e => {
         const id = e.currentTarget.getAttribute('data-remove-id')
         let response = await fetch('/cart/remove/'+id, {
            method: "DELETE"
         })
         response = await response.json()
         if (response.ok) {
            window.location.reload()
         }
      })
   })
}

function incrementDecrement(elements) {
   if (elements) {
      elements.forEach(btn => {
         btn.addEventListener('click', async e => {
            let url = 'increment', selector = 'data-increment-id'
            if (elements === decrementBtns) {
               url = 'decrement'
               selector = 'data-decrement-id'
            }
            const id = e.target.getAttribute(selector)
            let response = await fetch('/cart/' + url, {
               headers: {
                  'Content-type': 'application/json; charset=utf-8'
               },
               method: "POST",
               body: JSON.stringify({ id: id })
            })
            response = await response.json()
            if (response.ok) {
               window.location.reload()
            }
         })
      })
   }
}
incrementDecrement(incrementBtns)
incrementDecrement(decrementBtns)
