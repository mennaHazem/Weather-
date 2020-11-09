/* Global Variables */
let baseURL ='api.openweathermap.org/data/2.5/weather?zip=<ZIP>&appid=ec65a9e2af33a7b83dbdac54c0d6a948&units=i';
let key = 'ec65a9e2af33a7b83dbdac54c0d6a948'
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

// add event listner 
document.getElementById('generate').addEventListener('click', performAction);

/* call the function by event listener */
function performAction(e) {
  e.preventDefault();
  // get the input values of the user
  const theZip = document.getElementById('zip').value;
  const theFeelings = document.getElementById('feelings').value;
  console.log(newDate);
  getWeather(baseURL, theZip, key)
    .then(function (data) {
      //Post request
      postData('/add', {temperature: data.temp, date: newDate, user_response: theFeelings})
    }).then(function() {
      //update the browser
      updateUI()
    })

}

/* GET Web API Data function*/
const getWeather = async (baseURL, theZip, key) => {
   const response = await fetch(baseURL + theZip + key);
   console.log(response);
   try {
     const userData = await response.json();
     console.log(userData);
     return userData;
    }
  catch(error) {
    console.log("error", error);
  }
}

/*post the data */
const postData = async (url = '', data = {}) => {
  const requested = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data),
  })

  try {
    const newData = await requested.json();
    console.log(newData);
    return newData;
  }
  catch (error) {
    console.log('error', error);
  }
};


const updateUI = async () => {
  const request = await fetch('/all');
  try {
    const theData = await request.json()

    // update new entry values
    document.getElementById('date').innerHTML = theData.date;
    document.getElementById('temp').innerHTML = theData.temperature;
    document.getElementById('content').innerHTML = theData.user_response;
  }
  catch (error) {
    console.log("error", error);
  }
};
