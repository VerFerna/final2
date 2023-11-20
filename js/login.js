/********* LOGIN ************/

// Función para iniciar sesión

function login(event) {
  event.preventDefault();

  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  const users = JSON.parse(localStorage.getItem("users")) || [];

  const user = users.find((u) => u.email === email && u.password === password);

  if (user) {
    localStorage.setItem("loggedInUser", JSON.stringify(user));
    window.location.href = "login-user.html";
  } else {
    const loginError = document.getElementById("login-error");
    loginError.textContent =
      "Inicio de sesión fallido. Verifica Email y Constrseña.";
  }
}

// Funcion para "REGISTRATE AQUÍ"
document
  .getElementById("show-register-form")
  .addEventListener("click", function () {
    document.getElementById("register-form").style.display = "block";
    document.getElementById("login-form").style.display = "none";
  });

// Función para registrar un nuevo usuario
function register(event) {
  event.preventDefault();

  const email = document.getElementById("registerEmail").value;
  const password = document.getElementById("registerPassword").value;
  const confirmPassword = document.getElementById("confirmPassword").value;
  const passwordError = document.getElementById("password-error");
  const registrationSuccess = document.getElementById("registration-success");
  const redirectCounter = document.getElementById("redirect-counter");

  if (password !== confirmPassword) {
    passwordError.textContent =
      "Las contraseñas no coinciden. Por favor, inténtalo de nuevo.";
    return; // Detener el proceso de registro si las contraseñas no coinciden
  }

  // Continuar con el registro si las contraseñas coinciden
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const user = { email, password };
  users.push(user);
  localStorage.setItem("users", JSON.stringify(users));

  registrationSuccess.style.display = "block";
  redirectCounter.style.display = "block";
  redirectUserToLogin(5); // Redirige al usuario después de 5 segundos
}

// Función para redirigir al usuario después de un cierto número de segundos
function redirectUserToLogin(seconds) {
  const redirectCounter = document.getElementById("redirect-counter");
  let countdown = seconds;

  const interval = setInterval(function () {
    countdown -= 1;
    redirectCounter.textContent = `Serás redirigido al inicio de sesión en... ${countdown} segundos`;

    if (countdown === 0) {
      clearInterval(interval); // Detener el contador
      window.location.href = "login-user.html"; // Redirigir al usuario
    }
  }, 1000);
}

//Cerrar Sesion//

function logout() {
  // Elimina la información de la sesión del usuario
  localStorage.removeItem("loggedInUser");
  let timerInterval;
  Swal.fire({
    title: "Cerraste la Sesión",
    html: "Saliendo en... <b></b> segundos.",
    timer: 3000, 
    timerProgressBar: true,
    icon: `success`,
    didOpen: () => {
      Swal.showLoading();
      const b = Swal.getHtmlContainer().querySelector("b");
      timerInterval = setInterval(() => {
        b.textContent = (Swal.getTimerLeft() / 1000).toFixed(0); 
      }, 100);
    },
    willClose: () => {
      clearInterval(timerInterval);
    },
  }).then((result) => {
    
    if (result.dismiss === Swal.DismissReason.timer) {
      // Redirige al usuario a la página de inicio de sesión u otra página deseada
      window.location.href = "login.html";
    }
  });
}

checkLoggedIn();
