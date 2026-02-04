// Helpers
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

/* NAV: menú móvil */
const navToggle = $("#navToggle");
const navMenu = $("#navMenu");

if (navToggle && navMenu) {
  navToggle.addEventListener("click", () => {
    const open = navMenu.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(open));
  });

  // Cerrar menú al clickear un link (móvil)
  $$("#navMenu a").forEach(a => {
    a.addEventListener("click", () => {
      navMenu.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

/* DROPDOWN */
const dropdowns = $$("[data-dropdown]");
dropdowns.forEach(dd => {
  const btn = $(".dropdown__btn", dd);

  btn?.addEventListener("click", (e) => {
    e.stopPropagation();
    const isOpen = dd.classList.toggle("open");
    btn.setAttribute("aria-expanded", String(isOpen));
  });
});

// Cierra dropdown si clic fuera
document.addEventListener("click", () => {
  dropdowns.forEach(dd => {
    dd.classList.remove("open");
    const btn = $(".dropdown__btn", dd);
    btn?.setAttribute("aria-expanded", "false");
  });
});

/* Prefill del producto en contacto */
const productField = $("#productField");
$$("[data-prefill]").forEach(link => {
  link.addEventListener("click", () => {
    const val = link.getAttribute("data-prefill");
    if (productField && val) productField.value = val;
  });
});

/* Modal producto (detalle rápido) */
const modal = $("#modal");
const modalTitle = $("#modalTitle");
const modalDesc = $("#modalDesc");
const modalImg = $("#modalImg");
const modalPrice = $("#modalPrice");
const modalStock = $("#modalStock");
const modalCta = $("#modalCta");

function openModal(payload) {
  if (!modal) return;
  // payload: title|desc|img|price|stock
  const [title, desc, img, price, stock] = payload.split("|");

  if (modalTitle) modalTitle.textContent = title || "";
  if (modalDesc) modalDesc.textContent = desc || "";
  if (modalPrice) modalPrice.textContent = price || "";
  if (modalStock) {
    modalStock.textContent = stock || "";
    modalStock.className = "stock"; // reset
  }
  if (modalImg) {
    modalImg.src = img || "";
    modalImg.alt = title || "Producto";
  }
  if (modalCta) modalCta.setAttribute("data-prefill", title || "");

  modal.classList.add("show");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  if (!modal) return;
  modal.classList.remove("show");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

$$("[data-modal]").forEach(btn => {
  btn.addEventListener("click", () => {
    openModal(btn.getAttribute("data-modal") || "");
  });
});

$$("[data-close]").forEach(el => el.addEventListener("click", closeModal));
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModal();
});

// Si se hace click en "Consultar" dentro del modal, prefillea
if (modalCta) {
  modalCta.addEventListener("click", () => {
    const val = modalCta.getAttribute("data-prefill");
    if (productField && val) productField.value = val;
    closeModal();
  });
}

/* Form submit (simulado) */
const contactForm = $("#contactForm");
const formStatus = $("#formStatus");

if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    if (formStatus) {
      formStatus.textContent = "Mensaje listo. Como es página estática, conectá esto a WhatsApp o a un backend si querés enviar de verdad.";
    }
  });
}

/* Año footer */
const year = $("#year");
if (year) year.textContent = String(new Date().getFullYear());

/* Link activo (simple) */
const sections = ["#inicio","#destacados","#categorias","#sobre","#contacto"]
  .map(id => $(id))
  .filter(Boolean);

const navLinks = $$("#navMenu .nav__link").filter(a => a.getAttribute("href")?.startsWith("#"));

function setActiveLink() {
  let current = "#inicio";
  const y = window.scrollY + 120;

  sections.forEach(sec => {
    if (sec.offsetTop <= y) current = `#${sec.id}`;
  });

  navLinks.forEach(a => {
    const on = a.getAttribute("href") === current;
    a.style.opacity = on ? "1" : ".92";
  });
}

window.addEventListener("scroll", setActiveLink);
setActiveLink();
