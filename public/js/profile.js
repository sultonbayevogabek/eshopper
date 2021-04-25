const userPhotoElement = document.getElementById('user_photo')
const deleteAccountBtn = document.querySelector('.delete-account')

if (userPhotoElement) {
   userPhotoElement.addEventListener('change', async e => {
      if (e.target.files.length) {
         const formData = new FormData()
         formData.append('photo', e.target.files[0])
         console.log(e.target.files[0])
         let response = await fetch('/account/photo', {
            method: "POST",
            body: formData
         })
         response = await response.json()
         console.log(response)
         if (response.ok) {
            window.location.reload()
         }
      }
   })
}