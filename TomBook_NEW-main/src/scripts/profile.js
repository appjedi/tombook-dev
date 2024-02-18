console.log("profile.js")
const SERVER_ROOT_URL="http://localhost:8080"
const postProfile = async () => {
    const data = {
        lastName: document.getElementById("lastName").value,
        firstName: document.getElementById("firstName").value,
        location: document.getElementById("location").value,
        interest: document.getElementById("interest").value,
        email: document.getElementById("email").value,
        password: document.getElementById("password").value,

    }
    console.log("DATA", data);
    const resp = await fetch(SERVER_ROOT_URL + "/profile", {
           method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
}