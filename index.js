import {menuArray} from './data.js'

// {
//     id: $quantityOfOrder
// }
let orders = {}

const main = document.querySelector('main')
const paymentModal = document.getElementById('payment-modal')
const form1 = document.getElementById('form1')
const changeThemeBtn = document.getElementById('dark-theme-Btn')

main.addEventListener('click',function(e){
    if(e.target.dataset.addButton){
        addToCart(e.target.dataset.addButton)
    }
   
    else if(e.target.dataset.removeButton){
        removeFromCart(e.target.dataset.removeButton)
    }
    else if (e.target.id == 'complete-order'){
         paymentModal.classList.toggle('hidden')
      
         document.addEventListener('click',closePaymentModal)
         event.stopPropagation()
    }  
})

paymentModal.addEventListener('click',function(e){
    event.stopPropagation()
})

form1.addEventListener('submit',function(){
    event.preventDefault()
    
    console.log('submitted')
    form1.reset()
    
    completeOrder()    
})

changeThemeBtn.addEventListener('click',function(){
    const body = document.querySelector('body')
    body.classList.toggle('dark-theme')
})

function completeOrder(){
    orders = {}
 
    renderOrder(orders)
    
    document.getElementById('thankyou-dialog').classList.remove('hidden')
    closePaymentModal()
    
    
}

function closePaymentModal(){
    document.getElementById('payment-modal').classList.toggle('hidden')
    document.removeEventListener('click',closePaymentModal)

}

function addToCart(id){
    if(orders[id]){
        orders[id] += 1
    }
    else{
        orders[id] = 1
    }
    
    renderOrder(orders)
   
}

function removeFromCart(id){
   
    orders[id] -= 1
  
    if(!orders[id]){
        delete orders[id]
    }
    
    renderOrder(orders)
}

// !!! Dyanamically add and remove

// <div class="order-item">
//     <div>
//         <h3>Pizza</h3>
//         <button class="remove-btn">remove</button>
//         <p>quantity</p>
//     </div>
//     <h3>21$</h3>
// </div>


function createOrderItem(obj,quantity){
    
    const orderItem = document.createElement('div')
    orderItem.classList.add('order-item')
    
        const div = document.createElement('div')
        
            const name = document.createElement('h3')
            name.textContent = obj.name 
            
            const button = document.createElement('button')
            button.classList.add('remove-btn')
            button.textContent = 'remove'
            button.dataset.removeButton = obj.id
            
            div.appendChild(name)
            div.appendChild(button)
            
            if(quantity>1){
                const quantityEl = document.createElement('p')
                quantityEl.textContent = 'x' + quantity 
                div.appendChild(quantityEl)
            }
        
            
        const price = document.createElement('h3')
        price.textContent = obj.price * quantity + '$' 
        
        orderItem.appendChild(div)
        orderItem.appendChild(price)
    
    return orderItem

}

function renderOrder(ordersObj){
    const ordersEl = document.querySelector('#order-section')
  
    let totalPrice = 0
    const orderItemsEl = document.querySelector('.order-items')
    const fragment = document.createDocumentFragment()
    
    for (let id in ordersObj){
        
        const dish =  menuArray.filter(function(dish){
            return dish.id == id
        })[0]
        
        const quantity = ordersObj[id]
        
        const orderItem = createOrderItem(dish, ordersObj[id] )
        fragment.appendChild(orderItem) 
        
        totalPrice += dish.price * quantity
    }
    

    orderItemsEl.textContent= ''
    orderItemsEl.appendChild(fragment)
    
    document.getElementById('total-price').textContent = '$' + totalPrice
    
    
    if(Object.keys(ordersObj).length){
        ordersEl.classList.remove('hidden')
    }
    else{
        ordersEl.classList.add('hidden')
    }
}



// !!!! Render this piece of html dynamically using javaScript

    // <div class="food-item">
    //     <div class="food-item-container">
    //         <div class="food-emoji">🍕</div>
    //         <div>
    //             <h3>Pizza</h3>
    //             <p class="light">pepperoni, mushrom, mozarella </p>
    //             <h3>$14</h3>
    //         </div>
    //     </div>
    //     <button class="add-btn">+</button>
    // </div>

function createFoodItem(obj){
    const foodItem = document.createElement('div')
    foodItem.classList.add('food-item')
    
        const container = document.createElement('div')
        container.classList.add('food-item-container')
        
            const foodEmoji = document.createElement('div')
            foodEmoji.classList.add('food-emoji')
            foodEmoji.textContent = obj.emoji
            
            const div = document.createElement('div')
            
                const name = document.createElement('h3')
                name.textContent = obj.name 
            
                const ingredients = document.createElement('p')
                ingredients.textContent = obj.ingredients.join(', ') 
                
                const price = document.createElement('h3')
                price.textContent = obj.price + '$' 
                
                div.appendChild(name)
                div.appendChild(ingredients)
                div.appendChild(price)
            
            container.appendChild(foodEmoji)
            container.appendChild(div)
        
        const button = document.createElement('button')
        button.classList.add('add-btn')
        button.textContent = '+'
        button.dataset.addButton = obj.id
        
        foodItem.appendChild(container)
        foodItem.appendChild(button)
    
    return foodItem
}
    
function renderFoodItems(menuArray){
    const foodCategoryEL = document.querySelector('.food-category')
    const fragment = document.createDocumentFragment()
    
    menuArray.forEach(function(item){
        const foodItem = createFoodItem(item)
        fragment.appendChild(foodItem)
    })
    
    foodCategoryEL.appendChild(fragment)
}


renderFoodItems(menuArray)