const newPasswordForm = document.querySelector("form");
const dataUser = document.querySelector("button");

function sendNewPassword(e) {
  e.preventDefault();
  if (newPasswordForm instanceof HTMLFormElement) {
    console.log(`sending pass`);
    const dataForm = new FormData(newPasswordForm);
    const password = dataForm.get("password");
    const confirmPass = dataForm.get("confirmPassword");
    console.log(password);
    console.log(confirmPass);

    if (password === confirmPass) {
      const dataToSend = {
        newPass: password,
        userId: dataUser.dataset.userid,
        userToken: dataUser.dataset.token,
      };
      fetch("/api/sessions/restorePassword/newPass", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(dataToSend),
      }).then((response) => {
        if (response.status == 200) {
          response.json().then(result => alert(`${result.data}`))
          window.location.href = '/login'
        } else if (response.status == 400) {
          response.json().then(error => {
            alert(`${error.message}`)
          })
        }
      })
    } else {
      alert("Both passwords must match");
    }
  }
  // newPasswordForm.reset();
}

newPasswordForm.addEventListener("submit", sendNewPassword);
