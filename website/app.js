/* Global Variables */
let baseURL ='https://api.openweathermap.org/data/2.5/weather?zip=';
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
  const content = document.getElementById('feelings').value;

  getWeather(baseURL, theZip, key)
    .then(function (userData) {
      //Post request
      postData('/add', {date: newDate, temp: userData.main.temp, content})
    }).then(function (newData) {
      //update the browser
      updateUI()
    })

}

/* GET Web API Data function*/
const getWeather = async (baseURL, theZip, key) => {
   const res = await fetch(baseURL + theZip + key);
   try {
     const userData = await res.json();
     return userData;
  }catch (error) {
    console.log("error", error);
  }
}

/*post the data */
const postData = async (url = '', data = {}) => {
  const req = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      date: data.date,
      temp: data.temp,
      content: data.content
    })
  })

  try {
    const newData = await req.json();
    console.log(newData);
    return newData;
  }
  catch (error) {
    console.log(error);
  }
};


const updateUI = async () => {
  const request = await fetch('/all');
  try {
    const theData = await request.json()

    // update new entry values
    document.getElementById('date').innerHTML = theData.date;
    document.getElementById('temp').innerHTML = theData.temp;
    document.getElementById('content').innerHTML = theData.content;
  }
  catch (error) {
    console.log("error", error);
  }
};