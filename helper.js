export {getRandom , fillArray};
let getRandom=(min,max)=>{
    return  Math.floor(Math.random() * (max - min  + 1 )) + min;
}
//FUNCTION TO PUT RANDOM VALUES IN ARRAY
function fillArray(no_of_elements)
{
    let arr= [];
    for(let i=0;i<no_of_elements;i++)
    {
        let random_no= getRandom(5,100);
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
    return arr;
}
