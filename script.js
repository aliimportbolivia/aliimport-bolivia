/* =========================================================
   DATOS PRINCIPALES
   Cambia estas dos constantes cuando tengas los datos finales.
   ========================================================= */
const WHATSAPP_NUMBER = "59173004453";
const QUOTE_EMAIL = "aliimport.bolivia@gmail.com";

const WHATSAPP_MESSAGE =
  "Hola ALIIMPORT, quiero cotizar una importación.";

const processStages = {
  origen: {
    number: "01",
    label: "ORIGEN",
    title: "Producto, proveedor y negociación",
    image: "assets/proceso-origen.png",
    alt: "Buque portacontenedores y mercancías en origen",
    introduction:
      "La importación comienza con una decisión bien sustentada. Antes de comprar, ordenamos la información comercial y revisamos la viabilidad inicial del producto.",
    details: [
      "Definición de características, cantidad y presupuesto.",
      "Búsqueda y comparación de fábricas o proveedores.",
      "Revisión de condiciones comerciales y documentación disponible.",
      "Estimación preliminar de compra, transporte y costos asociados.",
    ],
    result:
      "Resultado: una alternativa de compra clara para decidir si conviene avanzar.",
  },
  transito: {
    number: "02",
    label: "TRÁNSITO",
    title: "Compra, transporte y seguimiento",
    image: "assets/proceso-transporte.png",
    alt: "Avión, camión y rutas de transporte internacional",
    introduction:
      "Una vez confirmada la operación, coordinamos los actores y documentos necesarios para que la mercancía salga de origen por la ruta definida.",
    details: [
      "Coordinación de compra y comunicación con el proveedor.",
      "Consolidación, embalaje y traslado interno cuando corresponde.",
      "Elección de transporte marítimo, aéreo o terrestre.",
      "Seguimiento de hitos y comunicación de avances al cliente.",
    ],
    result:
      "Resultado: una carga identificada, documentada y acompañada durante su recorrido.",
  },
  bolivia: {
    number: "03",
    label: "BOLIVIA",
    title: "Aduana, nacionalización y entrega",
    image: "assets/proceso-bolivia.png",
    alt: "Mapa de Bolivia y conexión logística de llegada",
    introduction:
      "Al arribo, organizamos la información y coordinamos la etapa aduanera con profesionales autorizados para completar la operación conforme a normativa.",
    details: [
      "Revisión y entrega de documentos de la operación.",
      "Coordinación con despachantes de aduana autorizados.",
      "Seguimiento de nacionalización y liberación de la mercancía.",
      "Coordinación de retiro y entrega en el destino acordado.",
    ],
    result:
      "Resultado: mercancía nacionalizada y coordinada para su entrega final.",
  },
};

function refreshIcons() {
  if (window.lucide) {
    window.lucide.createIcons({
      attrs: {
        "aria-hidden": "true",
        "stroke-width": 2,
      },
    });
  }
}

function configureWhatsAppLinks() {
  const whatsappUrl =
    `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
      WHATSAPP_MESSAGE,
    )}`;

  document.querySelectorAll("[data-whatsapp]").forEach((link) => {
    link.href = whatsappUrl;
  });
}

function configureMobileMenu() {
  const button = document.querySelector("#mobile-menu-button");
  const panel = document.querySelector("#mobile-menu-panel");

  if (!button || !panel) return;

  function setMenu(open) {
    panel.hidden = !open;
    button.setAttribute("aria-expanded", String(open));
    button.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
    button.innerHTML = `<i data-lucide="${open ? "x" : "menu"}"></i>`;
    refreshIcons();
  }

  button.addEventListener("click", () => {
    const isOpen = button.getAttribute("aria-expanded") === "true";
    setMenu(!isOpen);
  });

  panel.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => setMenu(false));
  });
}

function configureProcessModal() {
  const backdrop = document.querySelector("#process-modal-backdrop");
  const closeButton = document.querySelector("#modal-close");
  const contactButton = document.querySelector("#modal-contact");

  if (!backdrop || !closeButton || !contactButton) return;

  function closeModal() {
    backdrop.hidden = true;
    document.body.style.overflow = "";
  }

  function openModal(stageKey) {
    const stage = processStages[stageKey];
    if (!stage) return;

    const image = document.querySelector("#modal-image");
    image.src = stage.image;
    image.alt = stage.alt;
    document.querySelector("#modal-stage").textContent =
      `${stage.number} · ${stage.label}`;
    document.querySelector("#process-modal-title").textContent = stage.title;
    document.querySelector("#modal-introduction").textContent =
      stage.introduction;
    document.querySelector("#modal-result").textContent = stage.result;
    document.querySelector("#modal-details").innerHTML = stage.details
      .map(
        (detail) =>
          `<li><i data-lucide="check"></i><span>${detail}</span></li>`,
      )
      .join("");

    backdrop.hidden = false;
    document.body.style.overflow = "hidden";
    refreshIcons();
    closeButton.focus();
  }

  document.querySelectorAll("[data-process]").forEach((button) => {
    button.addEventListener("click", () => {
      openModal(button.dataset.process);
    });
  });

  closeButton.addEventListener("click", closeModal);
  contactButton.addEventListener("click", closeModal);
  backdrop.addEventListener("mousedown", (event) => {
    if (event.target === backdrop) closeModal();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !backdrop.hidden) closeModal();
  });
}

function configureQuoteForm() {
  const form = document.querySelector("#quote-form");
  if (!form) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const data = new FormData(form);
    const product = data.get("producto") || "Producto por definir";
    const subject = `Solicitud de cotización: ${product}`;
    const message = [
      "Hola ALIIMPORT:",
      "",
      "Quiero solicitar una cotización de importación con los siguientes datos:",
      "",
      `Nombre: ${data.get("nombre") || ""}`,
      `WhatsApp: ${data.get("telefono") || ""}`,
      `Producto: ${product}`,
      `Cantidad: ${data.get("cantidad") || "No especificada"}`,
      `Experiencia: ${data.get("experiencia") || ""}`,
      "",
      `Detalles: ${data.get("detalles") || ""}`,
    ].join("\n");

    window.location.href =
      `mailto:${QUOTE_EMAIL}?subject=${encodeURIComponent(subject)}` +
      `&body=${encodeURIComponent(message)}`;
  });
}

document.addEventListener("DOMContentLoaded", () => {
  configureWhatsAppLinks();
  configureMobileMenu();
  configureProcessModal();
  configureQuoteForm();
  refreshIcons();
});
