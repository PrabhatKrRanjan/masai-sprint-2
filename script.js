var data = [];
document.getElementById("outputContainer").style.display = "none";
function orderItem() {
    var name = document.getElementById("name").value;
    var price = document.getElementById("price").value;
    var quantity = document.getElementById("quantity").value;
    var total = price * quantity;

    var item = {
        name : name,
        price : price,
        quantity : quantity,
        total : total,
    }
    
    var flag = false;
    for(var i = 0; i < data.length; i++) {
        if(data[i]["name"] == name) {
           flag = true;
           break;
        }
    }
    if(flag == true){
        var r = confirm("Same Item Found Press Ok To Add or Cancel to Discard Adding ... !!!")
        if(r == true){
            data.push(item); 
        }
    }
    else {
        data.push(item);
    }
    // console.log(data)   
    show(data);
}

function show(data) {
    var tdata = document.getElementById("tableData")
    tdata.innerHTML = "";

    document.getElementById("outputContainer").style.display = "block";
    var table = document.getElementById("tableData");
    
    for (var i = 0; i < data.length; i++) {
        var tr = document.createElement("tr");
        var td1 = document.createElement("td");
        var td2 = document.createElement("td");
        var td3 = document.createElement("td");
        var td4 = document.createElement("td");
        var td5 = document.createElement("td");
        var edit = document.createElement("button");
        var del = document.createElement("button");
        
        td1.innerHTML = data[i]["name"];
        td2.innerHTML = data[i]["price"];
        td3.innerHTML = data[i]["quantity"];
        td4.innerHTML = data[i]["total"];
        edit.id ="editButton"
        edit.innerHTML = "Edit";
        del.innerHTML = "Delete";
        
        edit.addEventListener('click', function(e) {
            editData(e);
        }) // Calling Edit Function
        del.addEventListener('click', delData ) // Cllaing Delete Function
        
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        tr.appendChild(td5);
        td5.appendChild(edit);
        td5.appendChild(del);
        table.appendChild(tr);
    }
}

// Edit Form Function

function editData (e){
    // edit.style.display = "none"
    var ele = e.target.parentElement.parentElement;
    var eName = ele.querySelectorAll("td")[0].innerHTML;
    var ePrice = ele.querySelectorAll("td")[1].innerHTML;
    var eQuantiy = ele.querySelectorAll("td")[2].innerHTML;

    document.getElementById("name").value = eName;
    document.getElementById("price").value = ePrice;
    document.getElementById("quantity").value = eQuantiy;

    var update =  document.createElement("button");
    update.innerHTML = "Update"
    e.target.parentElement.appendChild(update);

    update.addEventListener('click',function(e){
        updateData(e)
    })  //Calling Update Function

}

// Update Data
function updateData (e){
    var ele = e.target.parentElement.parentElement;
    var eName = ele.querySelectorAll("td")[0].innerHTML;
   
    e.target.style.display = "none";
    editButton.style.display = "block";

    var dat = document.getElementById("price").value;
    var thi = document.getElementById("quantity").value;
    var modify = Number(dat * thi);

    for( var i = 0; i < data.length; i++){ 
        if (data[i]["name"] == eName) {
            data[i]["name"] = document.getElementById("name").value;
            data[i]["price"] = document.getElementById("price").value;
            data[i]["quantity"] = document.getElementById("quantity").value;
            data[i]["total"] = modify
        }
    }
    console.log(data)
    ele.querySelectorAll("td")[0].innerHTML = document.getElementById("name").value;
    ele.querySelectorAll("td")[1].innerHTML = document.getElementById("price").value;
    ele.querySelectorAll("td")[2].innerHTML = document.getElementById("quantity").value;
    ele.querySelectorAll("td")[3].innerHTML = modify
}

// Delete Function

function delData (){
    var ele = this.parentElement.parentElement
    ele.remove();
    var rmName = ele.querySelectorAll("td")[0].innerHTML
    // console.log(rmName)
    for( var i = 0; i < data.length; i++){ 
        if ( data[i]["name"] == rmName) {
            data.splice(i, 1); 
        }
    }
    // console.log(data)delete ar[4]
}

function generateBill(){
    document.getElementById("outputContainer").style.display = "block";
    var divData = document.getElementById("display")
    divData.innerHTML = "";
    var display = document.getElementById("display");
    var dicountAmt = document.getElementById("discount").value;
    var dicountNum = Number(dicountAmt);
    var taxAmt = document.getElementById("tax").value;
    var taxnum = Number(taxAmt);

    console.log(data);
    var sum = 0;
    
    for(var i = 0; i < data.length; i++){
        sum += data[i]["total"];                  
    }
    console.log(sum);

    var discount1 = (sum*dicountNum)/100;
    var discount = sum - discount1;
    console.log(discount);
    var tax = (discount*taxnum)/100;
    var netVal = discount + tax;
    console.log(tax);

    var divs1 = document.createElement("div");
    var divs2 = document.createElement("div");
    var divs3 = document.createElement("div");
    var divs4 = document.createElement("div");

    divs1.innerHTML = "Total Sum = "+ sum;
    display.appendChild(divs1);
    divs2.innerHTML = "Discount Amount= "+ discount1;
    display.appendChild(divs2);
    divs3.innerHTML = "Tax Amount = "+ tax;
    display.appendChild(divs3);
    divs4.innerHTML = "Total Payable Amount = "+ netVal;
    display.appendChild(divs4);
}
