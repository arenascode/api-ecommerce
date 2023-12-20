
const form = document.querySelector('form')

if (form instanceof HTMLFormElement) {
  form.addEventListener('submit', (e) => {
    e.preventDefault()
    console.log(`sending data!`);

    const formData = new FormData(form)
    const email = formData.get('email')
    const password = formData.get('password')

    console.log(email, password);
    const userCredentials = {
      email,
      password
    }
    fetch('http://localhost:8080/api/sessions/login', {
      method: "POST",
      body: JSON.stringify(userCredentials),
      headers: {"Content-Type": "application/json"}
    }).then(res => {
      console.log(res)
      if (res.status == 200) {
        console.log(`enter here`);
        window.location.replace("http://127.0.0.1:5173/");
      }
    })
  })
}