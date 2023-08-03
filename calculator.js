function main(){
    let obj = {
        first: 0,
        second: 0,
        operator: 0,
        result: 0,
    };
    let count = 1;
    display_buttons(obj, count);
}
main();

function add(var1, var2){
    return var1 + var2;
}
function subtract(var1,var2){
    return var1 - var2;
}
function multiply(var1,var2){
    return var1*var2;
}
function divide(var1,var2){
    return var1/var2;
}

function operator(num1, num2, operator){
    if (operator == "+"){
        return add(num1,num2);
    }else if (operator =="-"){
        return subtract(num1,num2);
    }else if(operator == "x"){
        return multiply(num1,num2);
    }else{
        return divide(num1,num2);
        
    }
}

function display_buttons(obj, count){
    const display = document.querySelector(".display");
    class_names = [".seven", ".eight", ".nine", ".divide", 
                    ".four", ".five", ".six", ".times", ".one",
                    ".two", ".three", ".minus", ".zero", ".equals",
                    ".clear", ".plus" ]

    for (let i = 0; i < class_names.length; i++){
        let button = document.querySelector(class_names[i]);
        button.addEventListener("click", function(e){
            let show = returnDisplay(i);
            if (Number.isInteger(show) && count==1){
                obj = checkDisplayInt(obj,show,count);
                console.log("before display:", obj)
                showDisplay(obj.first,display);
                count = 1;
            }else if(Number.isInteger(show) &&count!=1){
                obj = checkDisplayInt(obj,show,count);
                showDisplay(obj.second,display);
                count = 3;
            }else{
                showDisplay(show,display)
                count++;
            }
            obj = changeObject(obj,show,count);
            console.log(obj);
            if(count > 3 && show =="="){
                getResult(obj, display);
                count=2;
            }
            if(show ==" "){
                count=1;
            }
        })
    }
}
function clearCalculator(obj){
    obj.first=0;
    obj.second=0;
    obj.operator=0;
    obj.result=0;
    return obj;
}

function checkDisplayInt(obj,show,count){
    if (count == 1 && Number.isInteger(show)){
        let temp = "" + obj.first + show;
        obj.first = Number(temp);
        return obj;
    }else {
        let temp = "" + obj.second + show;
        obj.second = parseInt(temp);
        return obj;
    }
}

function returnDisplay(index){
    if (index==0){
        return 7;
    }else if(index==1){
        return 8;
    }else if(index==2){
        return 9;
    }else if(index==3){
        return "/";
    }else if(index==4){
        return 4;
    }else if(index==5){
        return 5;
    }else if(index==6){
        return 6;
    }else if(index==7){
        return "x";
    }else if(index==8){
        return 1;
    }else if(index==9){
        return 2;
    }else if(index==10){
        return 3;
    }else if(index==11){
        return "-";
    }else if(index==12){
        return 0;
    }else if(index==13){
        return '=';
    }else if(index==14){
        return " ";
    }else{
        return "+";
}
}

function showDisplay(element,display){
    display = document.querySelector(".display");
    resetDisplay(display);
    const content = document.createElement('div');
    content.classList.add("number_displayed");
    content.innerHTML = element;
    display.appendChild(content);
}

function resetDisplay(parent){
    while (parent.firstChild){
        parent.removeChild(parent.firstChild);
    }
}

function changeObject(object, show, count){
    if (count < 4){
        if (count == 1 && Number.isInteger(show)){
            object.first = object.first;
        }else if (count == 3 && Number.isInteger(show)){
            object.second = object.second;
        }else if(show==" "){
            object = clearCalculator(object);
        }
        else{
            object.operator = show;
        }
    }
    return object;
}

function getResult(obj, display){
    obj.result = operator(obj.first,obj.second,obj.operator);
    resetDisplay(display);
    showDisplay(obj.result);
    obj.first=obj.result;
    obj.second = 0;
    return obj;
}