$("#close,#open,#area,#Search,#Categories,#Ingredients,#Contact").click(function(e)
{
let listOffset= $(".navBar").offset().left;
let listWidth =$(".navBar").innerWidth();
if(listOffset == 0){

$(".navBar").animate({left: -`${listWidth}`},1000);
$(".headerNav").animate({left:0},1000);
document.getElementById("open").classList.remove("d-none")
document.getElementById("close").classList.add("d-none")


}else{
    $(".navBar").animate({left:`0`},1000);
    $(".headerNav").animate({left:`${listWidth}`},1000);
    document.getElementById("open").classList.add("d-none")

    document.getElementById("close").classList.remove("d-none")

}
})
const spinner = document.getElementById("spinner");

async function getData(URL,value){
    spinner.classList.remove("d-none")
    ApiResponse = await fetch(`${URL}${value}`);
    ResponseData = await ApiResponse.json();
    spinner.classList.add("d-none");

    console.log(ResponseData)
}
 getPhoto ()
async function getPhoto (){
    await  getData('https://www.themealdb.com/api/json/v1/1/search.php?s=',"")
    var cartona=""
    for(var i=0; i<ResponseData.meals.length;i++){
        cartona +=`<div class="col-lg-3 col-md-12 food">
        <img src="${ResponseData.meals[i].strMealThumb}" class="w-100 rounded ">
        <div class="layer align-items-center">
        <h3 class="d-flex align-items-center pt-5"> ${ResponseData.meals[i].strMeal}</h3>
        </div>
        </div>`
    }
    document.getElementById("my-row").innerHTML=cartona;
    }

// Search
$("#Search").click(function(){
document.getElementById("input").classList.remove("d-none")
document.getElementById("my-row").innerHTML=""
document.getElementById("contact").classList.add('d-none')

})
$("#searchInput").keyup(async function()
{
   await getData("https://www.themealdb.com/api/json/v1/1/search.php?s=",this.value)
    
var cartona=""
for(var i=0; i<ResponseData.meals.length;i++){
cartona +=`<div class="col-3">
<img src="${ResponseData.meals[i].strMealThumb}" class="w-100 rounded food">
</div>`
}
document.getElementById("my-row").innerHTML=cartona;
console.log(cartona)
})

$("#letter").keyup(async function()
{

   await getData('https://www.themealdb.com/api/json/v1/1/search.php?f=',this.value)
    
var cartona=""
for(var i=0; i<ResponseData.meals.length;i++){
cartona +=`<div class="col-3">
<img src="${ResponseData.meals[i].strMealThumb}" class="w-100 rounded food">
</div>`
}
document.getElementById("my-row").innerHTML=cartona;
console.log(cartona)

})   

 
// categories
// page one
$("#Categories").click(async function(){
    document.getElementById("input").classList.add("d-none")
    document.getElementById("contact").classList.add('d-none')

  await  getData('https://www.themealdb.com/api/json/v1/1/categories.php',"")
    
var cartona=""
for(var i=0; i<ResponseData.categories.length;i++){
cartona +=`<div class="col-lg-3 col-md-12 food ">
<img src="${ResponseData.categories[i].strCategoryThumb}" class="w-100 rounded" >
<div class="layer align-items-center" onclick=getMeal("${ResponseData.categories[i].strCategory}") > 
<h3> ${ResponseData.categories[i].strCategory}</h3>
<p> ${ResponseData.categories[i].strCategoryDescription} </p>
</div>
</div>`
}
document.getElementById("my-row").innerHTML=cartona;
})

// page two

async function  getMeal(x){
    console.log(x)
    await  getData(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${x}`,"")
    var cartona=""
    for(var i=0; i<ResponseData.meals.length;i++){
    cartona +=`<div class="col-lg-3 col-md-12 food ">
    <img src="${ResponseData.meals[i].strMealThumb}" class="w-100 rounded">
    <div class="layer align-items-center" onclick=getDetails("${ResponseData.meals[i].idMeal}") >
    <h3 class="pt-5"> ${ResponseData.meals[i].strMeal}</h3>
    
    </div>
    </div>`
    }
    document.getElementById("my-row").innerHTML=cartona;
    
}
// page three

async function getDetails(idMeal)
{
await getData(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`,"")
let cartona=""
    cartona +=` <div class="col-4">
    <img src=${ResponseData.meals[0].strMealThumb} class="w-100"></img>
    <h2 class="text-white">${ResponseData.meals[0].strMeal}</h2>
</div>
<div class="col-8">
<h2 class="fw-bolder text-white">Instructions</h2>
<p class="text-white"> ${ResponseData.meals[0].strInstructions}</p>
<p class="text-white"><b class="fw-bolder text-white">Area :</b> ${ResponseData.meals[0].strArea}</p>
<p class="text-white"><b class="fw-bolder text-white">Category:  </b>${ResponseData.meals[0].strCategory}</p>
<h3 class=" text-white"> Recipes :</h3>


 <ul class="d-flex row p-0 " id="recipes">`
 for(var i=1; i<20;i++){
  // await console.log(ResponseData.meals[i].strIngredient+{i})
  if (ResponseData.meals[0][`strIngredient${i}`]!="" ){
  cartona+= `<li class="my-auto mx-1 p-1 alert-success rounded col-2 mt-3 w-auto">${ResponseData.meals[0][`strIngredient${i}`]}</li>`
    }}
    cartona+=`
</ul>
 <h3 class=" text-white"> Tags:</h3>

 <ul class="d-flex p-0" id="tags">
 <li class="my-3 mx-1 p-1 alert-danger rounded">${ResponseData.meals[0].strTags}</li>
 
</ul>

<a class="btn btn-success text-white" target="_blank" href=${ResponseData.meals[0].strSource}>Source</a>
<a class="btn youtube text-white" target="_blank"  href=${ResponseData.meals[0].strYoutube}">Youtub</a>
</div>`

    document.getElementById("my-row").innerHTML=cartona;
  
}


// Area

$("#area").click(async function(){
    document.getElementById("input").classList.add("d-none")
    document.getElementById("contact").classList.add('d-none')


    await  getData('https://www.themealdb.com/api/json/v1/1/list.php?a=list',"")
      
  var cartona=""
  for(var i=0; i<ResponseData.meals.length;i++){
  cartona +=`<div class="col-lg-3 col-md-12">
  <div class="dataArea" onclick=getArea("${ResponseData.meals[i].strArea}") >
   <i class="fa-solid fa-city fa-3x text-center"></i>
   <h2 class=text-light text-center >${ResponseData.meals[i].strArea} </h2>
   </div>
  </div>`
  }
  document.getElementById("my-row").innerHTML=cartona;
  })
 async function getArea(y){
  await  getData(`https:/www.themealdb.com/api/json/v1/1/filter.php?a=${y}`,"")
console.log(y)
  var cartona=""
  for(var i=0; i<ResponseData.meals.length;i++){
  cartona +=`<div class="col-lg-3 col-md-12 food ">
  <img src="${ResponseData.meals[i].strMealThumb}" class="w-100 rounded" >
  <div class=layer align-items-center  onclick=getDetails("${ResponseData.meals[i].idMeal}") >
  <h3 class="pt-5"> ${ResponseData.meals[i].strMeal}</h3>
  </div>
  </div>`
  }
  document.getElementById("my-row").innerHTML=cartona;
 }

//   Ingredients

$("#Ingredients").click(async function(){   
    document.getElementById("input").classList.add("d-none")
    document.getElementById("contact").classList.add('d-none')


 await  getData('https://www.themealdb.com/api/json/v1/1/list.php?i=list',"")    
  var cartona=""
  for(var i=0; i<20;i++){
  cartona +=`<div class="col-lg-3 col-md-12 text-center">
  <div onclick=getIngredients("${ResponseData.meals[i].strIngredient}")>
  <i class="fa-solid fa-bowl-food fa-3x"></i>
  <h2 class=text-light>${ResponseData.meals[i].strIngredient} </h2>
 <p class= pi text-light >${ResponseData.meals[i].strDescription} </p>
  </div>
  </div>`
  console.log(ResponseData)
  }
  document.getElementById("my-row").innerHTML=cartona;
  console.log(cartona)
})
async function getIngredients(z){
    console.log(z)
    await  getData(`https:/www.themealdb.com/api/json/v1/1/filter.php?i=${z}`,"")
    var cartona=""
    for(var i=0; i<ResponseData.meals.length;i++){
    cartona +=`<div class=col-lg-3 col-md-12 food ">
    <img src="${ResponseData.meals[i].strMealThumb}" class="w-100 rounded">
    <div class=layer align-items-center  onclick=getDetails("${ResponseData.meals[i].idMeal}") >
    <h3 class="pt-5"> ${ResponseData.meals[i].strMeal}</h3>
    </div>
    </div>`
    }
    console.log(cartona)
    document.getElementById("my-row").innerHTML=cartona;
   }


//  Contact 
   $("#Contact").click(function(){
    document.getElementById("contact").classList.remove('d-none')
    document.getElementById("my-row").innerHTML=""
    document.getElementById("input").classList.add("d-none")

    })
    let valid = false
$("#name").keyup(validName)
function validName(){
    var regx=/^[A-Za-z]+$/
    if (!regx.test($("#name").val()))
    {
        document.getElementById("nameError").classList.remove('d-none')
        return false
    }
    else{
        document.getElementById("nameError").classList.add('d-none')
        return true
    }
}

$("#Email").keyup(validEmail)
function validEmail(){
    var regx=/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    if (!regx.test($("#Email").val()))
    {
     document.getElementById("emailError").classList.remove('d-none')
    return false
    }
    else{
        document.getElementById("emailError").classList.add('d-none')
        return true
    }
}
$("#phone").keyup(vaidphone)
  function vaidphone(){
    var regx=/^\d{11}$/
    if (!regx.test($("#phone").val()))
    {
     document.getElementById("phoneError").classList.remove('d-none')
    return false
    }
    else{
        document.getElementById("phoneError").classList.add('d-none')
        return true

    }
  
}

$("#age").keyup(validage)
function validage(){
    var regx= /^[1-9][0-9]?$|^100$/
    if (!regx.test($("#age").val()))
    {
     document.getElementById("ageError").classList.remove('d-none')
    return false
    }
    else{
        document.getElementById("ageError").classList.add('d-none')
        return true
    }
}
 

$("#Password").keyup(validpassword)
function validpassword(){
    var regx= /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
    if (!regx.test($("#Password").val()))
    {
     document.getElementById("passwordError").classList.remove('d-none')
    return false
    }
    else{
        document.getElementById("passwordError").classList.add('d-none')
        return true
    }
}

$("#Repassword").keyup(vaildRepassword)
function vaildRepassword(){
    if($("#Password").val()!==$("#Repassword").val()){
        document.getElementById("RepasswordError").classList.remove('d-none')
       return false
    }
    else{
        document.getElementById("RepasswordError").classList.add('d-none')
        return true
    }
}



$("#name,#Email,#phone,#age,#Password,#Repassword").keyup(function(){

    if(validName()  && validEmail() && vaidphone() && validage() && validpassword() && vaildRepassword() ) 
   {        
    $("button").attr("disabled",false)
    }
    else{
        $("button").attr("disabled",true)

    }

})

