const form = document.querySelector('form')
const fieldset = document.querySelector('fieldset')
const legend = document.querySelector('legend')
const inputs = document.querySelectorAll('input')
const section = document.querySelector('section')
const email = document.querySelector('[data-email]')
const password = document.querySelector('[data-password]')
const aviso = document.querySelector('[data-aviso]')


// function para autenticar usuario
async function autenticar() {
    try {
        await fetch('dados.json')
            .then(response => response.json().then(dados => {
                let autenticado = true
                dados.forEach(element => {
                    if (element.email == email.value && element.password == password.value) {
                        form.style = `
                        transform: scale(1.5);
                        border-radius: 100%;
                        transition: 2s;
                        width: 250px;
                        `
                        legend.style.visibility = 'hidden'
                        setTimeout(() => {
                            form.style.display = 'none'
                            section.style.display = 'block'
                        }, 3000)
                        aviso.style.display = 'none'
                        autenticado = false
                    }
                });
                if (autenticado) {
                    aviso.textContent = 'email ou senha incorreto(s)'
                    aviso.style.display = 'block'
                    autenticado = true
                }
            }))
            .catch(e => aviso.textContent = 'Sistema Indisponivel')
    } catch (erro) {
        aviso.textContent = 'Tente novamente mais tarde!'
    }
}

// Verifica email e senha e mostra avisos correspondentes. Se sucesso logada no sistema
form.addEventListener('submit', async e => {
    e.preventDefault()

    if (email.value && password.value && password.value.length >= 6) {
        await autenticar(e)
    } else {
        aviso.textContent = 'Digite um email e/ou senha'
        aviso.style.display = 'block'
    }
    setTimeout(() => aviso.style.display = 'none', 4000)
    password.chec
})

// Aparencia e aviso sobre requisitos de senha
password.addEventListener('keyup', () => {
    if (password.value.length < 6) {
        password.style.outline = '3px solid red'
        aviso.textContent = 'Minimo 6 caracteres'
        aviso.style.display = 'block'
    } else {
        password.style.outline = '3px solid rgb(55,240,40)'
        aviso.style.display = 'none'
    }
})

// Animação ao estar com o mouse sobre o formulario
fieldset.addEventListener('mouseover', (e) => {
    inputs.forEach(e => e.style.visibility = 'visible')
    legend.style = `
    font-size: 22px;
    transform: translateY(0) translateX(0);
    transition: 1s;`
    document.querySelector('button').style.visibility = 'visible'

})

fieldset.addEventListener('mouseleave', (e) => {
    inputs.forEach(e => e.style.visibility = 'hidden')
    legend.style = `
    font-size: 50px;
    transform: translateY(100) translateX(190);
    transition: 1s;`
    document.querySelector('button').style.visibility = 'hidden'
})