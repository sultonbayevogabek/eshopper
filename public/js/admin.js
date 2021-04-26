const productDeleteBtns = document.querySelectorAll('[data-product-delete]')

productDeleteBtns.forEach(btn => {
   btn.addEventListener('click', async e => {
      const id = e.target.getAttribute('data-product-delete')
      let response = await fetch('/admin/product/remove/' + id, {
         method: 'DELETE'
      })
      response = await response.json()
      if (response.ok) {
         window.location.reload()
      }
   })
})