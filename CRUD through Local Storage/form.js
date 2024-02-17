let mainCont = document.getElementById("mainCont");
let form = document.getElementById("enquiryForm");

form.addEventListener('submit', (e) => {
    e.preventDefault();
    let user_name = e.target.username.value;
    let user_email = e.target.email.value;
    let user_contact = e.target.phone.value;
    
    let user_data = JSON.parse(localStorage.getItem("userDetails")) ?? [];
    user_data.push({
        "user_name": user_name,
        "user_email" : user_email,
        "user_contact" : user_contact
    })
    
    localStorage.setItem("userDetails", JSON.stringify(user_data));
    e.target.reset();
    displayData();
})

let displayData = () => {
    let user_data = JSON.parse(localStorage.getItem("userDetails")) ?? [];
    let finalData = "";
    user_data.forEach((ele, i) => {
        finalData += `<div class="formDataList">
        <span onclick="removeData(${i})">&times;</span>
        <h5>Name : </h5>
        <div>${ele.user_name}</div>
        
        <h5>Email : </h5>
        <div>${ele.user_email}</div>

        <h5>Phone Number : </h5>
        <div>${ele.user_contact}</div>
        </div>`
    })
    mainCont.innerHTML = finalData;
}

let removeData = (ind) => {
    let user_data = JSON.parse(localStorage.getItem("userDetails")) ?? [];
    user_data.splice(ind, 1);
    localStorage.setItem("userDetails", JSON.stringify(user_data));
    displayData();
}

displayData();