// =========================================================
// Registro de usuarios ANDROVIX-J
// Función: validar formulario, crear objeto JSON y guardar
// usuarios registrados en localStorage.
// =========================================================

const CLAVE_USUARIOS = "usuariosAndrovix";

const formularioRegistro = document.getElementById("formularioRegistro");
const alertaRegistro = document.getElementById("alertaRegistro");

const campos = {
    nombreCompleto: {
        input: document.getElementById("nombreCompleto"),
        grupo: document.getElementById("grupoNombre"),
        error: document.getElementById("errorNombre")
    },
    telefono: {
        input: document.getElementById("telefono"),
        grupo: document.getElementById("grupoTelefono"),
        error: document.getElementById("errorTelefono")
    },
    email: {
        input: document.getElementById("email"),
        grupo: document.getElementById("grupoEmail"),
        error: document.getElementById("errorEmail")
    },
    password: {
        input: document.getElementById("password"),
        grupo: document.getElementById("grupoPassword"),
        error: document.getElementById("errorPassword")
    },
    confirmarPassword: {
        input: document.getElementById("confirmarPassword"),
        grupo: document.getElementById("grupoConfirmarPassword"),
        error: document.getElementById("errorConfirmarPassword")
    }
};

const expresiones = {
    nombre: /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ\s]{3,60}$/,
    telefono: /^\d{10}$/,
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/
};

function obtenerUsuariosRegistrados() {
    const usuariosGuardados = localStorage.getItem(CLAVE_USUARIOS);

    if (!usuariosGuardados) {
        return [];
    }

    try {
        const usuarios = JSON.parse(usuariosGuardados);
        return Array.isArray(usuarios) ? usuarios : [];
    } catch (error) {
        console.error("No se pudieron leer los usuarios guardados:", error);
        return [];
    }
}

function guardarUsuariosRegistrados(usuarios) {
    localStorage.setItem(CLAVE_USUARIOS, JSON.stringify(usuarios));
}

function mostrarError(campo, mensaje) {
    campo.grupo.classList.remove("campo-correcto");
    campo.grupo.classList.add("campo-error");
    campo.error.textContent = mensaje;
    campo.error.classList.add("activo");
}

function mostrarCorrecto(campo) {
    campo.grupo.classList.remove("campo-error");
    campo.grupo.classList.add("campo-correcto");
    campo.error.textContent = "";
    campo.error.classList.remove("activo");
}

function limpiarEstadoCampo(campo) {
    campo.grupo.classList.remove("campo-error", "campo-correcto");
    campo.error.textContent = "";
    campo.error.classList.remove("activo");
}

function mostrarAlerta(mensaje, tipo = "danger") {
    alertaRegistro.textContent = mensaje;
    alertaRegistro.className = `alert alerta-${tipo} alerta-registro activo`;
}

function limpiarAlerta() {
    alertaRegistro.textContent = "";
    alertaRegistro.className = "alert alerta-registro";
}

function validarNombre() {
    const valor = campos.nombreCompleto.input.value.trim();

    if (!valor) {
        mostrarError(campos.nombreCompleto, "El nombre completo es obligatorio.");
        return false;
    }

    if (!expresiones.nombre.test(valor)) {
        mostrarError(campos.nombreCompleto, "Ingresa solo letras y espacios. Mínimo 3 caracteres.");
        return false;
    }

    mostrarCorrecto(campos.nombreCompleto);
    return true;
}

function validarTelefono() {
    const valor = campos.telefono.input.value.trim();

    if (!valor) {
        mostrarError(campos.telefono, "El número de teléfono es obligatorio.");
        return false;
    }

    if (!expresiones.telefono.test(valor)) {
        mostrarError(campos.telefono, "El teléfono debe tener exactamente 10 dígitos numéricos.");
        return false;
    }

    mostrarCorrecto(campos.telefono);
    return true;
}

function validarEmail({ validarDuplicado = false } = {}) {
    const valor = campos.email.input.value.trim().toLowerCase();

    if (!valor) {
        mostrarError(campos.email, "El correo electrónico es obligatorio.");
        return false;
    }

    if (!expresiones.email.test(valor)) {
        mostrarError(campos.email, "Ingresa un correo electrónico válido.");
        return false;
    }

    if (validarDuplicado) {
        const usuarios = obtenerUsuariosRegistrados();
        const emailExiste = usuarios.some(usuario => usuario.email.toLowerCase() === valor);

        if (emailExiste) {
            mostrarError(campos.email, "Este correo ya está registrado.");
            return false;
        }
    }

    mostrarCorrecto(campos.email);
    return true;
}

function validarPassword() {
    const valor = campos.password.input.value;

    if (!valor) {
        mostrarError(campos.password, "La contraseña es obligatoria.");
        return false;
    }

    if (!expresiones.password.test(valor)) {
        mostrarError(campos.password, "Usa mínimo 8 caracteres, una mayúscula, una minúscula y un número.");
        return false;
    }

    mostrarCorrecto(campos.password);
    return true;
}

function validarConfirmarPassword() {
    const password = campos.password.input.value;
    const confirmarPassword = campos.confirmarPassword.input.value;

    if (!confirmarPassword) {
        mostrarError(campos.confirmarPassword, "Confirma tu contraseña.");
        return false;
    }

    if (password !== confirmarPassword) {
        mostrarError(campos.confirmarPassword, "Las contraseñas no coinciden.");
        return false;
    }

    mostrarCorrecto(campos.confirmarPassword);
    return true;
}

function validarFormularioCompleto() {
    const nombreValido = validarNombre();
    const telefonoValido = validarTelefono();
    const emailValido = validarEmail({ validarDuplicado: true });
    const passwordValida = validarPassword();
    const confirmarPasswordValida = validarConfirmarPassword();

    return nombreValido && telefonoValido && emailValido && passwordValida && confirmarPasswordValida;
}

function crearUsuarioDesdeFormulario() {
    return {
        nombreCompleto: campos.nombreCompleto.input.value.trim(),
        telefono: campos.telefono.input.value.trim(),
        email: campos.email.input.value.trim().toLowerCase(),
        password: campos.password.input.value
    };
}

function registrarUsuario(evento) {
    evento.preventDefault();
    limpiarAlerta();

    if (!validarFormularioCompleto()) {
        mostrarAlerta("Revisa los campos marcados antes de registrarte.", "danger");
        return;
    }

    const usuariosRegistrados = obtenerUsuariosRegistrados();
    const nuevoUsuario = crearUsuarioDesdeFormulario();

    usuariosRegistrados.push(nuevoUsuario);
    guardarUsuariosRegistrados(usuariosRegistrados);

    mostrarAlerta("Registro exitoso. Usuario guardado en localStorage.", "success");
    formularioRegistro.reset();

    Object.values(campos).forEach(limpiarEstadoCampo);
}

function alternarVisibilidadPassword(boton) {
    const idInput = boton.dataset.passwordToggle;
    const inputPassword = document.getElementById(idInput);
    const icono = boton.querySelector("i");
    const passwordOculta = inputPassword.type === "password";

    inputPassword.type = passwordOculta ? "text" : "password";
    icono.classList.toggle("fa-eye", !passwordOculta);
    icono.classList.toggle("fa-eye-slash", passwordOculta);
    boton.setAttribute("aria-label", passwordOculta ? "Ocultar contraseña" : "Mostrar contraseña");
}

campos.nombreCompleto.input.addEventListener("blur", validarNombre);
campos.telefono.input.addEventListener("blur", validarTelefono);
campos.email.input.addEventListener("blur", () => validarEmail());
campos.password.input.addEventListener("blur", () => {
    validarPassword();

    if (campos.confirmarPassword.input.value) {
        validarConfirmarPassword();
    }
});
campos.confirmarPassword.input.addEventListener("blur", validarConfirmarPassword);

campos.telefono.input.addEventListener("input", () => {
    campos.telefono.input.value = campos.telefono.input.value.replace(/\D/g, "").slice(0, 10);
});

document.querySelectorAll("[data-password-toggle]").forEach(boton => {
    boton.addEventListener("click", () => alternarVisibilidadPassword(boton));
});

formularioRegistro.addEventListener("submit", registrarUsuario);
