const name = document.getElementById("name");
const age_result = document.getElementById("ageDisplay");
const input_fields = document.getElementById("input_fields");
const reset_button = document.getElementById("reset_button");
const button = document.querySelector("#button1");

button.addEventListener("click", function () {
  getAge();
});

function getAge() {
  const name = document.getElementById("name").value;
  $.ajax({
    url: `https://api.agify.io/?name=${name}`,
    type: "GET",
    success: function (data) {
      age_result.innerHTML = "";
      if (data.age === null) {
        age_result.innerText = "Invalid Name";
        age_result.style.fontFamily = "Comforter";
        age_result.style.letterSpacing = "7px";
      } else {
        input_fields.hidden = true;
        getFacts(data.age);
      }
    },
    error: function () {
      age_result.textContent = "There was an error!";
    },
  });
}

function getFacts(age) {
  const urls = [];

  // http://numbersapi.com/#random/date  check this site to know more about this API
  const trivia = `http://numbersapi.com/${age}/trivia`;
  const math = `http://numbersapi.com/${age}/math`;
  const year = `http://numbersapi.com/${age}/year`;

  urls.push(trivia);
  urls.push(math);
  urls.push(year);

  const ele = document.createElement("p");
  ele.innerText = age;
  ele.style.fontSize = "40px";
  ele.style.fontFamily = "Comforter";
  age_result.appendChild(ele);

  const ele2 = document.createElement("p");
  ele2.innerText = "Some Fun Facts related to your age are: ";
  ele2.style.fontSize = "25px";
  ele.style.fontFamily = "Open Sans";
  ele.style.letterSpacing = "3px";
  age_result.appendChild(ele2);

  urls.forEach(async (item) => {
    $.ajax({
      url: item,
      type: "GET",
      success: function (data) {
        const ele = document.createElement("p");
        ele.innerText = data;
        ele.style.fontSize = "20px";
        ele.style.fontFamily = "Open Sans";
        ele.style.letterSpacing = "2px";
        age_result.appendChild(ele);
      },
      error: function () {
        console.log("Error while fetching!!");
      },
    });
  });

  const reset_btn = document.createElement("button");
  reset_btn.innerHTML = "Enter another name";
  reset_btn.className = "btn btn-outline-light";
  reset_btn.style.fontSize = "20px";
  reset_btn.style.marginTop = "1rem";
  reset_btn.style.display = "block";
  reset_btn.addEventListener("click", function () {
    input_fields.hidden = false;
    age_result.innerHTML = "Your age <br> --";
    reset_button.innerHTML = "";
  });
  reset_button.appendChild(reset_btn);
}

//-------------------- OLD------------------------------------------------------

// const name=document.getElementById('name');
// const age_result=document.getElementById('ageDisplay');
// button1.addEventListener('click',getAge);
// function getAge(name){
//     fetch('https://api.agify.io/?name=${name}')
//     .then(res=>res.json())
//     .then(data=>{
//         age_result.innerHTML=`${data.age}`
//     })
// }
