// createUserName =================================================================================================================
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

  inp1.placeholder = "Введіть текст";
  inp1.value = "";
}

// POST_MSG =================================================================================================================
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

  localStorage.setItem("LAST_MSG", `${data.msg}`);
  localStorage.setItem("LAST_ID_MSG", `${data.id}`);
  localStorage.setItem("LAST_DATE_MSG", `${data.date}`);

  inp1.value = "";
}

// GET_LAST_MSG =================================================================================================================
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
  
  const all_msg = data.map((data) => ({
    username: data.user.username,
    msg_id: data.id,
    msg: data.msg,
    date: data.date
  }));

  inp1.value = "";

  return all_msg;
};

// GET_USER =================================================================================================================

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
};


// input =====================================================
const inp1 = document.querySelector(".inp");

let inpText = "";
inp1.addEventListener("input", (event) => {
  inpText = event.target.value;
});

// button =====================================================
let div1 = document.querySelector(".div1");

div1.addEventListener("click", async () => {
  // createUserName();
  //
  //
  //
  //
});

let FD_ID = localStorage.getItem("FD_ID");