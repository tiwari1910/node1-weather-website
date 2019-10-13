const weatherForm = document.querySelector('form')
const search = document.querySelector('input')

const locationName = document.querySelector('#location-name')
const weatherInfo = document.querySelector('#weather-info')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value
    locationName.textContent = 'Loading...'
    weatherInfo.textContent = ''

    fetch('/weather?address='+location).then((response) => {
        response.json().then((data) => {
          if(data.error){
              weatherInfo.textContent = data.error
          }else{
              locationName.textContent = data.location
              weatherInfo.textContent = data.forecast
          }
        })
    })
})
