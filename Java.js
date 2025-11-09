const pf_projectItems = document.querySelectorAll('.project-item');
const pf_projectModal = document.getElementById('project-modal');
const pf_closeModalBtn = document.querySelector('.modal-close');
const pf_modalTitle = document.getElementById('modal-title');
const pf_modalDescription = document.getElementById('modal-description');

function pf_openProjectModal(title, description) {
    if (pf_modalTitle) pf_modalTitle.textContent = title;
    if (pf_modalDescription) pf_modalDescription.textContent = description;
    if (pf_projectModal) pf_projectModal.classList.add('show');
}

function pf_closeProjectModal() {
    if (pf_projectModal) pf_projectModal.classList.remove('show');
}

if (pf_projectItems.length > 0 && pf_projectModal && pf_closeModalBtn) {
    pf_projectItems.forEach(item => {
        item.addEventListener('click', () => {
            const title = item.getAttribute('data-title');
            const description = item.getAttribute('data-description');
            pf_openProjectModal(title, description);
        });
    });

    pf_closeModalBtn.addEventListener('click', pf_closeProjectModal);

    pf_projectModal.addEventListener('click', (event) => {
        if (event.target === pf_projectModal) {
            pf_closeProjectModal();
        }
    });
}

const pf_contactForm = document.getElementById('contact-form');
const pf_successMessage = document.getElementById('pf_form_success');

if (pf_contactForm) {
    pf_contactForm.addEventListener('submit', function (event) {
        event.preventDefault();
        pf_contactForm.style.display = 'none';
        pf_successMessage.classList.add('show');
    });
}

const pf_theme_toggle_btn = document.getElementById('pf_theme_toggle_btn'); // <-- MUDOU
const pf_body = document.body;
const pf_themeKey = 'portfolio-theme';
const pf_theme_icon_sun = document.getElementById('pf_theme_icon_sun');
const pf_theme_icon_moon = document.getElementById('pf_theme_icon_moon');

function pf_applyTheme(theme) {
    if (theme === 'dark') {
        pf_body.classList.add('dark-mode');
        if (pf_theme_icon_sun) pf_theme_icon_sun.classList.remove('hidden');
        if (pf_theme_icon_moon) pf_theme_icon_moon.classList.add('hidden');
    } else {
        pf_body.classList.remove('dark-mode');
        if (pf_theme_icon_sun) pf_theme_icon_sun.classList.add('hidden');
        if (pf_theme_icon_moon) pf_theme_icon_moon.classList.remove('hidden');
    }
}

function pf_saveTheme(theme) {
    localStorage.setItem(pf_themeKey, theme);
}

const pf_savedTheme = localStorage.getItem(pf_themeKey);

if (pf_savedTheme) {
    pf_applyTheme(pf_savedTheme);
} else {
    const pf_prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    pf_applyTheme(pf_prefersDark ? 'dark' : 'light');
}

if (pf_theme_toggle_btn) {
    pf_theme_toggle_btn.addEventListener('click', () => {
        const isDarkMode = pf_body.classList.contains('dark-mode');
        const newTheme = isDarkMode ? 'light' : 'dark'; 
        pf_applyTheme(newTheme);
        pf_saveTheme(newTheme);
    });
}

const pf_typing_element = document.getElementById('pf_typing_text');
const pf_text_array = ["Bem-vindo ao meu portfólio!", "Programador em formação."];
let pf_text_index = 0;
let pf_char_index = 0;
let pf_is_deleting = false;
const pf_typing_speed = 120;
const pf_erase_speed = 60;
const pf_delay_between_words = 2000;

function pf_type_effect() {
    const currentText = pf_text_array[pf_text_index];
    let displayText = "";

    if (pf_is_deleting) {
        displayText = currentText.substring(0, pf_char_index - 1);
        pf_char_index--;
    } else {
        displayText = currentText.substring(0, pf_char_index + 1);
        pf_char_index++;
    }

    if (pf_typing_element) {
        pf_typing_element.textContent = displayText;
    }

    let typeSpeed = pf_typing_speed;

    if (!pf_is_deleting && pf_char_index === currentText.length) {
        pf_is_deleting = true;
        typeSpeed = pf_delay_between_words;
    } else if (pf_is_deleting && pf_char_index === 0) {
        pf_is_deleting = false;
        pf_text_index++;
        if (pf_text_index === pf_text_array.length) {
            pf_text_index = 0;
        }
        typeSpeed = 500;
    } else if (pf_is_deleting) {
        typeSpeed = pf_erase_speed;
    }

    setTimeout(pf_type_effect, typeSpeed);
}

if (pf_typing_element) {
    setTimeout(pf_type_effect, 1200);
}

const pf_skillItems = document.querySelectorAll('.skill-item');
let pf_currentSkillCard = null; 

function pf_createSkillCard(item) {
    const skillName = item.getAttribute('data-skill-name');
    const description = item.getAttribute('data-description');

    const card = document.createElement('div');
    card.classList.add('skill-info-card');
    card.innerHTML = `
                <h4>${skillName}</h4>
                <p>${description}</p>
            `;

    item.appendChild(card);
    card.offsetWidth;
    card.classList.add('show');
    return card;
}

function pf_removeSkillCard() {
    if (pf_currentSkillCard) {
        pf_currentSkillCard.classList.remove('show'); 

        pf_currentSkillCard.addEventListener('transitionend', () => {
            if (pf_currentSkillCard && !pf_currentSkillCard.classList.contains('show')) {
                pf_currentSkillCard.remove();
                pf_currentSkillCard = null;
            }
        }, { once: true }); 
    }
}

if (pf_skillItems.length > 0) {

    pf_skillItems.forEach(item => {
        item.addEventListener('click', (event) => {
            event.stopPropagation(); 

            if (pf_currentSkillCard && pf_currentSkillCard.parentElement !== item) {
                pf_removeSkillCard();
            }

            else if (pf_currentSkillCard && pf_currentSkillCard.parentElement === item) {
                pf_removeSkillCard();
                return;
            }

            pf_currentSkillCard = pf_createSkillCard(item);
        });
    });

    document.addEventListener('click', (event) => {
        if (pf_currentSkillCard && !pf_currentSkillCard.contains(event.target)) {
            pf_removeSkillCard();
        }
    });
}

function mascara_telefone() {
    var tel = document.getElementById("telefone").value
    console.log(tel)
    tel = tel.slice(0, 14)
    console.log(tel)
    document.getElementById("telefone").value = tel
    tel = document.getElementById("telefone").value.slice(0, 10)
    console.log(tel)

    var tel_formatado = document.getElementById("telefone").value
    if (tel_formatado[0] != "(") {
        if (tel_formatado[0] != undefined) {
            document.getElementById("telefone").value = "(" + tel_formatado[0];
        }
    }

    if (tel_formatado[3] != ")") {
        if (tel_formatado[3] != undefined) {
            document.getElementById("telefone").value = tel_formatado.slice(0, 3) + ")" + tel_formatado[3]
        }
    }

    if (tel_formatado[9] != "-") {
        if (tel_formatado[9] != undefined) {
            document.getElementById("telefone").value = tel_formatado.slice(0, 9) + "-" + tel_formatado[9]
        }
    }
}