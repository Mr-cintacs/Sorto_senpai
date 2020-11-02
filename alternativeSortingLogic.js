//TIMED BUBBLE SORT
function timedSort(arr,sortingFunction)
{
    let i=0;
    for(i=0;i<arr.length-1;i++)
    {
        function sortIterate(i)
        {
            setTimeout(() => {
                sortingFunction(i);
                resetColor();
            }, (i*(outterDelay/speed_multiplyer)),i,innerDelay,speed_multiplyer);
        }
        sortIterate(i);
        resetColor();
    }
}
function bubbleSortCheck(i)
{
    let arr= values;
    let delay = innerDelay;
    let speed_mul= speed_multiplyer;
    for(let j=0;j<arr.length-1-i;j++)
    {
        function valueSwap(j)
        {
            setTimeout(() => {
                let next_item= document.getElementById(j+1);
                let current_item= document.getElementById(j);
                next_item.style.border = "3px black solid";
                current_item.style.border = "3px black solid";
                if(j !=0 )
                {
                   // let current_item = document.getElementById(j);
                    let previous_item= document.getElementById(j-1);
                    current_item.style.backgroundColor = 'hotpink';
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
                    console.log('swapping values');
                    current_item.style.backgroundColor= 'crimson';
                    next_item.style.background = 'purple';

                    //SWAPPING DIV HEIGHT VALUES
                    temp=next_item.style.height;
                    next_item.style.height= current_item.style.height;
                    current_item.style.height= temp;

                    //SWAPPING ARRAY VALUES
                    temp= arr[j+1]; 
                    arr[j+1]= arr[j];
                    arr[j]= temp;

                }
                
            }, j*delay/speed_mul);            
        }
        valueSwap(j);
    }
}