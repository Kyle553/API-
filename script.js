// createUserName  — для створення користувача =================================================================================================================
async function createUserName () {
  let data = null
  try {
    const response = await fetch("http://127.0.0.1:5173/login", {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({
        username: `${inpText}`
      })
    });

    data = await response.json();
  } catch (error) {
      console.error(`CATCH ERROR: `, error.message)
  }
  
  console.log("createUserName: ", data);

  localStorage.setItem("FD_ID", `${data.id}`);
  FD_ID = localStorage.getItem("FD_ID");

  inp1.placeholder = "Введіть текст";
  inp1.value = "";
}

// POST_MSG — для надсилання повідомлень =================================================================================================================
async function POST_MSG () {
  let data = null;
  try {
    const response = await fetch("http://127.0.0.1:5173/msg", {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({
        id: `${FD_ID}`,
        msg: `${inpText}`
      })
    });

    data = await response.json();
  } catch (error) {
      console.error(`CATCH ERROR: `, error.message)
  }

  console.log("POST_MSG: ", data);

  inp1.value = "";

  return data;
}

// GET_LAST_MSG — для отримання повідомлень =================================================================================================================
async function GET_LAST_MSG () {
  let data = null;
  try {
    const response = await fetch("http://127.0.0.1:5173/msg", {method: "GET"});

    if (!response.ok) {
      throw new Error(`CODE ERROR: ${response.status}`);
    } 

    data = await response.json();
  } catch (error) {
      console.error(`CATCH ERROR: `, error.message)
  }

  console.log("GET_LAST_MSG: ", data);

  inp1.value = "";

  return data;
};

// GET_USER — для отримання користувача =================================================================================================================
async function GET_USER () {
  let data = null;
  try {
    const response = await fetch(`http://127.0.0.1:5173/user/${localStorage.getItem("FD_ID")}`, {method: "GET"});

    if (!response.ok) {
      throw new Error(`CODE ERROR: ${response.status}`);
    } 

    data = await response.json();
  } catch (error) {
      console.error(`CATCH ERROR: `, error.message)
  }

  console.log("GET_USER: ", data);

  inp1.value = "";
  
  return data;
};

// input =====================================================
const inp1 = document.querySelector(".inp");

let inpText = "";
inp1.addEventListener("input", (event) => {
  inpText = event.target.value;
});

// login =====================================================
let isLogged = null;
let FD_ID = localStorage.getItem("FD_ID") || null;

!localStorage.getItem("FD_ID") ? inp1.placeholder = "Введіть свій nickname" : isLogged = true;

// button =====================================================
const div1 = document.querySelector(".div1");

(async function () {
  div1.addEventListener("click", async () => {
    if (!isLogged) {
      await createUserName();
      console.log("Створене ID: ", FD_ID);
      isLogged = true;
      return;
    } 
    await POST_MSG();
  });

  inp1.addEventListener("keyup", async (event) => {
    if (event.key === "Enter") {
      if (!isLogged) {
        await createUserName();
        console.log("Створене ID: ", FD_ID);
        isLogged = true;
        return;
      } 
      await POST_MSG();
    }
  });
})();




// history msg =====================================================
let history = null;

// setTimeout(async () => {
//   history = await GET_LAST_MSG();
//   messages();
// }, 5000);

function messages () {
  history.forEach(objectMsg => {
    if (objectMsg.user.id === FD_ID) {
      const div1 = document.querySelector(".right");
      div1.classList.add("right")
      
      const div2 = document.createElement("div");
      div2.classList.add("message-style", "message-style-right")
      div1.appendChild(div2);
      
      const div3 = document.createElement("div");
      div3.classList.add("username", "username-right");
      div3.textContent = `${objectMsg.user.username}`
      div2.appendChild(div3);
  
      const div4 = document.createElement("div");
      div4.classList.add("message", "message-right");
      div4.textContent = `${objectMsg.msg}`
      div2.appendChild(div4);
  
      const div5 = document.createElement("div");
      div5.classList.add("date", "date-right")
      const timestamp = `${objectMsg.date}`;
      const date = new Date(Number(timestamp));
      const dateTime = `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
      div5.textContent = `${dateTime}`;
      div2.appendChild(div5);

      
      document.querySelector(".div2").append(div1);
    } else {
        const div1 = document.querySelector(".left");
        div1.classList.add("left")
  
        const div2 = document.createElement("div");
        div2.classList.add("message-style", "message-style-left")
        div1.appendChild(div2);
  
        const div3 = document.createElement("div");
        div3.classList.add("username", "username-left");
        div3.textContent = `${objectMsg.user.username}`
        div2.appendChild(div3);
  
        const div4 = document.createElement("div");
        div4.classList.add("message", "message-left");
        div4.textContent = `${objectMsg.msg}`
        div2.appendChild(div4);
  
        const div5 = document.createElement("div");
        div5.classList.add("date", "date-left")
        const timestamp = `${objectMsg.date}`;
        const date = new Date(Number(timestamp));
        const dateTime = `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
        div5.textContent = `${dateTime}`;
        div2.appendChild(div5);
        
        document.querySelector(".div2").append(div1);
    }
  });
}

// Розмір повідомлення за вмістом
// Перевірка на повторні повідомлення по msg id