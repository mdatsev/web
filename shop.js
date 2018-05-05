let itemsData = [
    {
        id: "1",
        name: "Дудук",
        price: 1,
        description: "Дудудудудудудудуду"
    },
    {
        id: "chasovnik",
        name: "Каишка от часовника",
        price: 23,
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    },
    {
        id: "3",
        name: "Poster",
        price: 32.55,
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    },
    {
        id: "4",
        name: "forth",
        price: 99.00,
        description: ""
    }
]

let wrapper = document.getElementById("wrapper");

const path = id => `images/image (${id}).jpg`

for(let i = 0; i <= 3; i++)
{
    let box = document.createElement('div');
    box.className = "box";
    let title = document.createElement('h1');
    title.className = "title";
    title.innerText = itemsData[i] && itemsData[i].name;
    box.appendChild(title);
    let price = document.createElement('h2');
    price.className = "price";
    price.innerText = itemsData[i] && "$" + itemsData[i].price;
    box.appendChild(price);
    let img = document.createElement('img');
    img.className = "img";
    img.setAttribute('src', path(itemsData[i] ? itemsData[i].id : i + 1));
    box.appendChild(img)
    let btn = document.createElement('button');
    btn.className = "open";
    btn.innerText = "Buy";
    btn.setAttribute("id", i);
    box.appendChild(btn);
    wrapper.appendChild(box)
}


// Get the modal
var modal = document.getElementById('myModal');

// Get the button that opens the modal
var btns = document.getElementsByClassName("open");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal 
[].forEach.apply(btns, [b => b.onclick = function() {
    console.log(b.id)
    document.getElementById("item-description").innerText =  itemsData[b.id] && itemsData[b.id].description;
    document.getElementById("item-image").setAttribute("src", path(itemsData[b.id] ? itemsData[b.id].id : +b.id + 1))
    modal.style.display = "block";
}])

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}