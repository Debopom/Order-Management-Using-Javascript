const drink_size = document.querySelector("#size");
const current_cost = document.querySelector("#current-cost");
const type = document.querySelector("#type");
const ingredientsCheckboxes = document.querySelector("#ingredients-checkboxes");
const base = document.querySelector('#base-drop');
var total_price =0;
const order_favourite = document.getElementById('order-favourite');
if(localStorage.getItem('favoriteDrink')!== null){
    order_favourite.disabled = false;
}


fetch('ingredients.json')
            .then(response => response.json())
            .then(data => {
                // Access the select dropdown element
                const ingredient = data.ingredients;
                
               

                // Add options to the select dropdown
                ingredient.forEach(item => {
                    // Create the checkbox element
                    const checkbox = document.createElement('input');
                    checkbox.type = 'checkbox';
                    checkbox.value = item.name;
                    checkbox.name = 'ingredients-chk';
                    checkbox.addEventListener('change', fav_check);
                    
                    
                    // Create the label for the checkbox
                    const label = document.createElement('label');
                    label.textContent = item.name;
                    
                    // Append the checkbox and label to the container
                    ingredientsCheckboxes.appendChild(checkbox);
                    ingredientsCheckboxes.appendChild(label);
                    
                    // Add a line break for better spacing
                    ingredientsCheckboxes.appendChild(document.createElement('br'));
                  });
                })




function fav_check(){
    console.log('is checked');
    var ingredients_chk = document.getElementsByName('ingredients-chk');
    var all_ingredients = " : ";
    

    var ingredients = [];
    //ingredients
    for (let i = 0; i < ingredients_chk.length; i++) {
        if (ingredients_chk[i].checked) {
        ingredients.push(ingredients_chk[i].value);
        
        }
        
    }
    for(let i = 0; i < ingredients.length; i++){
        all_ingredients = all_ingredients+ingredients[i]+",";
    }
    const favourite = document.getElementById('save-favourite');
    

    if(drink_size==-1||type==-1||ingredients==0){
        favourite.disabled = true;
    }else{
        favourite.disabled = false;
    }

}
function currentDrink(){
    var drink_size_sm;
    var ingredients_chk = document.getElementsByName('ingredients-chk');
    
    var all_ingredients = " : ";

    var current_drink = "";
    var drink_cost =0;
    
    if(drink_size.value==2.50){
        drink_size_sm='Small';
    }
    else if(drink_size.value==3.00){
        drink_size_sm='Medium';
    }
    else if(drink_size.value==3.55){
        drink_size_sm='Large';
    }
    else if(drink_size.value==4.20){
        drink_size_sm='Extra Large';
    }
    var ingredients = [];
    //ingredients
    for (let i = 0; i < ingredients_chk.length; i++) {
        if (ingredients_chk[i].checked) {
          ingredients.push(ingredients_chk[i].value);
          
        }
        
    }
    for(let i = 0; i < ingredients.length; i++){
        all_ingredients = all_ingredients+ingredients[i]+",";
    }

    //extras
    var extras_chk = document.getElementsByName('extras-chk');
    var extras = [];
    var all_extras = "";

    for (let i = 0; i < extras_chk.length; i++) {
        if (extras_chk[i].checked) {
            extras.push(extras_chk[i].value);
          
        }
        
    }

    for(let i = 0; i < extras.length; i++){
        all_extras = all_extras+extras[i]+",";
    }

    var total_cost_drink = parseFloat(drink_size.value)+0.75*extras.length;
    total_price = total_price+total_cost_drink

    console.log(all_extras);
    if(extras.length>0){
        current_drink = drink_size_sm +" " +type.value+" "+ all_ingredients +"with "+base.value +" and extra "+all_extras + "| Total = "+total_cost_drink;

    }
    else{
        current_drink = drink_size_sm +" " +type.value+" "+ all_ingredients +"with "+base.value +"| Total = "+total_cost_drink ;
    }
    

    
    console.log(current_drink);


    console.log(total_price);
    return  current_drink;
}
function calculateCost() {
    
    var current_drink = currentDrink();





    const myList = document.getElementById('current-order');

    // Create a new list item element
    const newItem = document.createElement('li');

    // Create a text node for the content of the list item
    const itemText = document.createTextNode(current_drink);

    // Append the text node to the list item
    newItem.appendChild(itemText);

    // Append the list item to the ul element
    myList.appendChild(newItem);

    const total = document.getElementById('total-cost');
    total.innerHTML = "£"+total_price;


    const formElement = document.getElementById('order-form');
    formElement.reset();
    

}          

function update_current_drink(event){
    //extras
    var extras_chk = document.getElementsByName('extras-chk');
    var extras = [];

    for (let i = 0; i < extras_chk.length; i++) {
        if (extras_chk[i].checked) {
            extras.push(extras_chk[i].value);
          
        }
        
    }
    var total_cost_drink = parseFloat(drink_size.value)+0.75*extras.length;
    
    
    
    var size = drink_size.value;
    current_cost.innerHTML = "£"+total_cost_drink;

    
}

function selectType(){
    
    
    if(type.value=='smoothie'){
       
        const extrascheckboxes = document.getElementById('extras-checkboxes');
        extrascheckboxes.innerHTML = '';
        var selectDropdown = document.getElementById('base-drop');
        while (selectDropdown.options.length > 0) {
            selectDropdown.remove(0);
          }
        fetch('ingredients.json')
            .then(response => response.json())
            .then(data => {

                // Access the select dropdown element
                
                const smoothie = data.smoothie_bases;
                
                var selectDropdown = document.getElementById('base-drop');
               

                // Add options to the select dropdown
                smoothie.forEach(option => {
                    var optionElement = document.createElement('option');
                    optionElement.value =  option.name;
                    optionElement.textContent = option.name;
                    selectDropdown.appendChild(optionElement);
                });
            });

    }
    else if(type.value=='milkshake'){
        const extrascheckboxes = document.getElementById('extras-checkboxes');
        extrascheckboxes.innerHTML = '';
        var selectDropdown = document.getElementById('base-drop');
        while (selectDropdown.options.length > 0) {
            selectDropdown.remove(0);
        }
        fetch('ingredients.json')
            .then(response => response.json())
            .then(data => {
                // Access the select dropdown element
                const milkshake = data.milkshake_bases;
                
                
               

                // Add options to the select dropdown
                milkshake.forEach(option => {
                    var optionElement = document.createElement('option');
                    optionElement.value =option.name;
                    optionElement.textContent = option.name;
                    selectDropdown.appendChild(optionElement);
                });
            });

            fetch('ingredients.json')
            .then(response => response.json())
            .then(data => {
                // Access the checkbox container element
                const checkboxContainer = document.getElementById('extras-checkboxes');
                const extras = data.extras;

                // Create checkboxes based on the JSON data
                extras.forEach(item => {
                // Create the checkbox element
                const checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.value = item.name;
                checkbox.name = 'extras-chk';
                checkbox.addEventListener('change',  update_current_drink);
                
                // Create the label for the checkbox
                const label = document.createElement('label');
                label.textContent = item.name;
                
                // Append the checkbox and label to the container
                checkboxContainer.appendChild(checkbox);
                checkboxContainer.appendChild(label);
                
                // Add a line break for better spacing
                checkboxContainer.appendChild(document.createElement('br'));
                });
            });

    }
    
}

function placeOrder(){
    alert("Order has been placed");
    location.reload();

}
function addfav(){
    var current_drink= currentDrink();
    const delimiter = "=";
    console.log(current_drink)

// Split the text into an array of substrings
    const substrings = current_drink.split(delimiter);

    console.log(substrings);

  // Create an object to store the drink details
  const favoriteDrink = {
    name: substrings[0],
    cost: substrings[1]
  };

  // Store the favorite drink in local storage, overwriting any existing favorite
  localStorage.setItem('favoriteDrink', JSON.stringify(favoriteDrink));
  

  

  // Display a success message
  alert('Favorite drink saved!');

}

function order_fav(){
    const value = localStorage.getItem('favoriteDrink');
    const obj = JSON.parse(value);
    total_price= total_price+ parseFloat(obj.cost);
    var current_drink = obj.name+obj.cost;
    console.log(obj.name);




    const myList = document.getElementById('current-order');

    // Create a new list item element
    const newItem = document.createElement('li');

    // Create a text node for the content of the list item
    const itemText = document.createTextNode(current_drink);

    // Append the text node to the list item
    newItem.appendChild(itemText);

    // Append the list item to the ul element
    myList.appendChild(newItem);

    const total = document.getElementById('total-cost');
    total.innerHTML = "£"+total_price;


    const formElement = document.getElementById('order-form');
    formElement.reset();

}
