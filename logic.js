import * as helper from "./helper.js";
let values,items,innerDelay,outterDelay,speed_multiplyer=5;
let height_multiplyer = 3;
let wrapContainer = document.querySelector('.wrap');
console.log(wrapContainer);
let speed_value = document.getElementById('speed'); 
let sort_box = document.getElementById('sort-box');
let input_elements= document.getElementById('no_of_elements');
let i,j;
let delay = 0;
let addedDelay = 0;


function insertionSort(values)
{
    let array = values;
    for (let i = 1; i <array.length; i++)
    {
        let current = array[i];
        let j = i-1; 
        while ((j > -1) && (current < array[j]))
        {
            updateDivs(j, j+1, 'check');
            updateDivs(j, j+1, 'reset previous');
            array[j+1] = array[j];
            j--;
        }
        array[j+1] = current;
        updateDivs(current, j+1, 'swap');
    }
    console.log(values);
}

function selectionSort(values)
{
    addedDelay = 0;
    let array = values;
    for (let i = 0; i<array.length; i++) 
    {
        let min = i;
        for (let j = i + 1; j<array.length; j++) 
        {
            updateDivs(min, j, 'check');
            updateDivs(min, j, 'reset previous');
            if (array[min] > array[j])
            {
                min = j;
            }
        }
        if (min !== i) {
            updateDivs(min, i,'swap');
            let tmp = array[i];
            array[i] = array[min];
            array[min] = tmp;
        }
    }
}

function bubbleSort(values)
{
    addedDelay = 0;
    let array = values;
    for(i=0;i<array.length-1;i++)
    {
        for(j=0;j<array.length-1-i;j++)
        {
            updateDivs(j, j+1, 'check');
            updateDivs(j, j+1, 'reset previous');
            if(array[j+1] < array[j])
            {
                updateDivs(j, j+1, 'swap');
                let tmp = array[j+1];
                array[j+1] = array[j];
                array[j] = tmp;
            }
        }
    }
    console.log(`the sorted array is ${array}`);
}

function updateDivs(currentIndex,nextIndex, action)
{
//    let totalDelay = (delay + addedDelay)/speed_value;
    let totalDelay = (delay + addedDelay);
  //  console.log(`the total delay is = ${totalDelay} and delay = ${delay} and added delay = ${addedDelay}`);
    let intervalId = setTimeout(()=>{
        console.log('update called');
        resetColor();
        let current_item= document.getElementById(currentIndex);    
        let next_item= document.getElementById(nextIndex);
        if(action === 'check')
        {
            current_item.style.backgroundColor = "black";
            next_item.style.backgroundColor = "black";
            
        }
        if(action === 'reset previous')
        {
            if(currentIndex !=0 )
            {
                let previous_item= document.getElementById(currentIndex-1);
                current_item.style.backgroundColor = 'hotpink';
                previous_item.style.backgroundColor= 'hotpink';
            }
        }
        if(action === 'swap')
        {
            console.log(`the value of the first parameter ${currentIndex}`);
            current_item.style.backgroundColor= 'crimson';
            next_item.style.background = 'purple';
            let temp=next_item.style.height;
            next_item.style.height= current_item.style.height;
            current_item.style.height= temp;
        }
        if(action == 'insert')
        {

        }
    
        },totalDelay);
        addedDelay += 50;
        delay = 50;
    
        return intervalId;
}

// FUNCTION TO RESET COLOR OF ITEMS
function resetColor()
{
    items = document.getElementsByClassName('item');
    for(let item of items)
    {
        item.style.backgroundColor= 'hotpink';
        item.style.border = 'none'; 
    }
}

// START BUTTON
let start_btn= document.getElementById('start');
start_btn.addEventListener('click',function(e){

    speed_value.disabled = true;
    let selectedAlgorithm = document.getElementById('selector').value;
    if(selectedAlgorithm == 'bubble')
    {
        bubbleSort(values);
    }
    else if(selectedAlgorithm == 'selection')
    {
        selectionSort(values);
    }
    else if(selectedAlgorithm == 'insertion')
    {
        insertionSort(values);
    }
    else
    {
        console.log(`i don't know what have you selected`);
    }
  
   
});

// RESET BUTTON
let reset_btn= document.getElementById('reset');
speed_value.disabled = false;
reset_btn.addEventListener('click',function(e){
    let no_of_elements = input_elements.value;
    values= helper.fillArray(no_of_elements);
});

// SPEED VALUE RANGE SLIDER
speed_value.addEventListener('input',function(e){
    speed_multiplyer = speed_value.value;
});

// REMOVE BUTTON
let remove_btn = document.getElementById('remove');
remove_btn.addEventListener('click',function(e){
    let previousItems = document.getElementsByClassName('item');
    console.log(previousItems);
    while(previousItems.length > 0)
    {
        previousItems[0].remove();
    }
    sort_box.style.animationName = 'hideBox';
    create_btn.disabled = false;
    speed_value.disabled = false;
    create_btn.className = "btn panel_item create size_one enabled";
    start_btn.style.visibility = 'hidden';
    reset_btn.style.visibility = 'hidden';
    remove_btn.style.visibility = 'hidden';

});

// CREATE BUTTON
let create_btn= document.getElementById('create');
create_btn.addEventListener('click',function (e)
{
    let change_size = false;
    e.target.disabled = true;
    e.target.className = "btn panel_item create size_one disabled";
    start_btn.style.visibility = 'visible';
    reset_btn.style.visibility = 'visible';
    remove_btn.style.visibility = 'visible';
    sort_box.style.animationName = 'showBox';
    wrapContainer.style.display = 'flex';
    let no_of_elements = input_elements.value;
    if(no_of_elements > 50)
    {
        change_size = true;
    }
    innerDelay = 250;
    outterDelay = 250 * no_of_elements;
   
    for(i=0;i<no_of_elements;i++)
    {
        let div = document.createElement('div');
        div.className = 'item';
        div.id = i;
        sort_box.append(div);
        if(change_size == true)
        {
            div.style.width = 1 + 'px';
            div.style.padding = 2 + 'px';
        }
    }

    values = helper.fillArray(no_of_elements);
    sort_box.style.display= 'flex';
    
    items = document.getElementsByClassName('item');
    for(let item of items)
    {
        item.style.display= 'block';
    }
   
});
 
// BUTTON EFFECT
let buttons = document.getElementsByTagName('button');
for(let button of buttons)
{
    button.addEventListener('click',(e)=>{
        let x = e.clientX - e.target.offsetLeft;
        let y = e.clientY - e.target.offsetTop;

        let blob = document.createElement('span');
        blob.style.left = x + 'px';
        blob.style.top = y + 'px';
        blob.id = 'blob';
        button.append(blob);

        setTimeout(()=>{
            blob.remove();
        },1000);

    });
}
