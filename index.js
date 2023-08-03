let id = -1;

const display = (data) => {
  console.log(data);
  data.map((ele) => {
    let img = document.createElement("img");
    img.src = ele.studentImg;

    let name = document.createElement("h3");
    name.innerHTML = ele.studentName;

    let num = document.createElement("h3");
    num.innerHTML = ele.studentNum;

    let email = document.createElement("h4");
    email.innerHTML = ele.studentEmail;

    let course = document.createElement("h5");
    course.innerHTML = ele.studentCourse;

    let btn1 = document.createElement("button"); // Update button 
    btn1.innerHTML = "Update";
    btn1.addEventListener("click", () => {
      
      document.getElementById("simg").value = ele.studentImg;
      document.getElementById("sname").value = ele.studentName;
      document.getElementById("idno").value = ele.studentNum;
      document.getElementById("email").value = ele.studentEmail;
      document.getElementById("course").value = ele.studentCourse;
      document.getElementById("subform").value = "Update";

      id = ele.id;
    });

    let btn2 = document.createElement("button"); //For Delet Button
    btn2.innerHTML = "Delete";
    btn2.addEventListener("click", () => {
      deletdata(ele.id);
    });

    let div = document.createElement("div");
    div.setAttribute("id", "main-div");

    div.append(img, name, num, email, course, btn1, btn2);
    document.getElementById("sdb").append(div);
  });
};
;

const deletdata = async (id) => {
  fetch(`http://localhost:8080/students/${id}`, {
    method: "DELETE",
  });
};

document.querySelector("#form").addEventListener("submit", (e) => {
  e.preventDefault();

  let type = document.getElementById("subform").value;
  console.log(type);

  let student = {
    studentImg: document.getElementById("simg").value,
    studentName: document.getElementById("sname").value,
    studentNum: document.getElementById("idno").value,
    studentEmail: document.getElementById("email").value,
    studentCourse: document.getElementById("course").value,
  };
  
  console.log(student);

  if (type == "submit"){

      fetch("http://localhost:8080/students", {
        method: "POST",
        body: JSON.stringify(student),
        headers: { "Content-Type": "application/json" },
      })
       
  }
  else{

    fetch(`http://localhost:8080/students/${id}`, {
      method: "PATCH",
      body: JSON.stringify(student),
      headers: { "Content-Type": "application/json" },
    })

    document.getElementById("simg").value = "";
    document.getElementById("sname").value = "";
    document.getElementById("idno").value = "";
    document.getElementById("email").value = "";
    document.getElementById("course").value = "";
    document.getElementById("subform").value = "submit";

    id = -1;
     
  }
});

fetch("http://localhost:8080/students")
  .then((sss) => sss.json())
  .then((dbdata) => display(dbdata));
 