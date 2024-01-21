// this variables get the html elements through dom
const input_elem = document.getElementById("input-id");
const display_elem = document.getElementById("display-item");
const save_elem = document.getElementById('save')
const delete_elem = document.getElementById("delete")


// condition to check for availability of items in local storage
if (localStorage.names) {
    listItems = JSON.parse(localStorage.names);
    display(listItems)
} else {
    listItems = [];
}


// this will save a url from an input when a button is clicked
save_elem.addEventListener("click", function(){
    chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
        let url_value = tabs[0].url;
        if (!listItems.includes(url_value)) {
            listItems.push(url_value);
        }
        
    });
    clear_input()
    clear_fromLS()
    save_toLS()
    display(listItems)
})


// this will delete the urls when a button is clicked
delete_elem.addEventListener("click", function(){
    listItems = []
    clear_fromLS()
    clear_page()
})


// this function displays the url on the page
function display(items){
    clear_page()
    for (let i = 0; i < items.length; i++) {

        let li = document.createElement("li");
        let anchor = document.createElement("a");

        anchor.href = items[i]
        anchor.target = "_blank";

        anchor.appendChild(document.createTextNode(items[i]));
        li.appendChild(anchor)

        li.style.listStyle = 'none'
        li.style.padding = '10px'
        li.style.fontWeight = 'bold'

        display_elem.appendChild(li);
    }
}


// this function clears the urls from the page
function clear_page(){
    display_elem.innerHTML = " "
}

// this function saves the url into local storage
function save_toLS(){
    localStorage.setItem("names", JSON.stringify(listItems));
}

// this will clear the local storage
function clear_fromLS(){
    localStorage.clear()

}

// This will clear the input after items added to listItems 
 function clear_input(){
    input_elem.value = ""
 }
