let values,items,innerDelay,outterDelay,speed_multiplyer=5;
let height_multiplyer = 3;
let speed_value = document.getElementById('speed'); 
let sort_box = document.getElementById('sort-box');
let input_elements= document.getElementById('no_of_elements');
let pause= 1;
console.log(speed_multiplyer);

let getRandom=(min,max)=>{
    return  Math.floor(Math.random() * (max - min  + 1 )) + min;
}

//FUNCTION TO PUT RANDOM VALUES IN ARRAY
function fillArray(no_of_elements)
{
    arr= [];
    for(let i=0;i<no_of_elements;i++)
    {
        random_no= getRandom(5,100);
        arr.push(random_no);
    }

    //ADJUST HEIGHT OF DIVS ACCORDING TO ARRAY VALUE
    items= document.getElementsByClassName('item');
    let index= 0;
    for(let item of items)
    {
        item.style.height= arr[index]*height_multiplyer+'px';
        index=index + 1;
    }
    resetColor();
    console.log(arr);
    return arr;
}

//TIMED BUBBLE SORT
function sortCheck(){

    let arr= values;
    let delay = innerDelay;
    let speed_mul= speed_multiplyer;
    for(let j=0;j<arr.length-1;j++)
    {
        function valueSwap(j)
        {
            console.log('value swap called');
            setTimeout(() => {
                let smaller_item= document.getElementById(j+1);
                let larger_item= document.getElementById(j);
                smaller_item.style.border = "3px black solid";
                larger_item.style.border = "3px black solid";
                if(j !=0 )
                {
                    let current_item = document.getElementById(j);
                    let previous_item= document.getElementById(j-1);
                    current_item.style.background = 'hotpink';
                    previous_item.style.backgroundColor= 'hotpink';
                    previous_item.style.border = "none";
                }
                if(j == arr.length-2)
                {
                    console.log('in the block');
                    resetColor();
                }
                if(arr[j+1] < arr[j])
                {
                    larger_item.style.backgroundColor= 'crimson';
                    smaller_item.style.background = 'purple';
                    temp=smaller_item.style.height;
                    smaller_item.style.height= larger_item.style.height;
                    larger_item.style.height= temp;

                    temp= arr[j+1]; 
                    arr[j+1]= arr[j];
                    arr[j]= temp;

                }
                
            }, j*delay/speed_mul);            
        }
        valueSwap(j);
    }
}
function timedBubbleSort(arr)
{
    let i=0;
    let reduce_delay=250;
    for(i=0;i<arr.length-1;i++)
    {
        function sortIterate(i)
        {
            setTimeout(() => {
                reduce_delay= 250;
                if(i!=0)
                {
                    reduce_delay= i*reduce_delay;
                }
                console.log('the delay is reduced by: ' + reduce_delay)
                sortCheck();
                resetColor();
            }, (i*outterDelay/speed_multiplyer),i,innerDelay,speed_multiplyer);
        }
        sortIterate(i);
    }
}
//END

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
   timedBubbleSort(values);
   console.log('start clicked');
});

// RESET BUTTON
let reset_btn= document.getElementById('reset');
reset_btn.addEventListener('click',function(e){
    let no_of_elements = input_elements.value;
    values= fillArray(no_of_elements);
    console.log('reset clicked');
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

    values = fillArray(no_of_elements);
    sort_box.style.display= 'flex';
    
    items = document.getElementsByClassName('item');
    for(let item of items)
    {
        item.style.display= 'block';
    }
   
});
 
// BUTTON EFFECT
let buttons = document.getElementsByTagName('button');
console.log(buttons);
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


