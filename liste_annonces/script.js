// Initial announcements data
const initialAnnouncements = [
  {
    title: "Besoin de matelas",
    location: "Cartier Bouzeguéne",
    organization: "Lancé par l'association Main solidaire",
    description:
      "Famille avec 3 enfants recherche 2 matelas en bon état pour remplacer les anciens, devenus inutilisables.",
  },
  {
    title: "Repas du soir",
    location: "Centre d'Adekar",
    organization: "Lancé par l'assication El Khir",
    description:
      "Personne âgée vivant seule demande des repas livrés pour le ftour durant les 10 derniers jours du Ramadan.",
  },
  {
    title: "Vêtements enfants",
    location: "Cité des 40 logements",
    organization: "Lancé par l'association Solidarité familiale",
    description:
      "Une mère de famille cherche des vêtements de printemps pour garçon (6 ans) et fille (9 ans), taille standard.",
  },
  {
    title: "Fourniture scolaire",
    location: "Adekar",
    organization: "Lancé par l'association Jeunes solidaire",
    description:
      "Étudiante en première année universitaire a besoin de cahiers, stylos, et sac à dos pour ses cours à Bejaia.",
  },
  {
    title: "Aide au loyer",
    location: "Quartier Thighilt",
    organization: "saithayat@gmail.com",
    description:
      "Jeune père sans emploi cherche un soutien pour payer une partie de son loyer du mois en cours (montant symbolique accepté).",
  },
]

// DOM Elements
const announcementCardsContainer = document.getElementById("announcement-cards")

// Number of announcements to show initially
const initialAnnouncementsCount = 2

// Flag to track if all announcements are shown
let allAnnouncementsShown = false

// Function to create announcement card HTML
function createAnnouncementCard(announcement, isNew = false) {
  const cardClass = isNew ? "announcement-card new-card" : "announcement-card"

  return `
        <div class="${cardClass}">
            <div class="d-flex justify-content-between align-items-start">
                <div>
                    <h3>
                        ${announcement.title} - <span>${announcement.location}</span>
                    </h3>
                    <p class="organization">${announcement.organization}</p>
                    <p>${announcement.description}</p>
                </div>
                <button class="btn donate-btn">Faire un don</button>
            </div>
        </div>
    `
}

// Function to render announcements
function renderAnnouncements(announcements, showAll = false) {
  if (!announcementCardsContainer) return

  announcementCardsContainer.innerHTML = ""

  // Determine how many announcements to show
  const announcementsToShow = showAll ? announcements : announcements.slice(0, initialAnnouncementsCount)

  announcementsToShow.forEach((announcement, index) => {
    announcementCardsContainer.innerHTML += createAnnouncementCard(announcement)
  })

  // Add animation to cards with a slight delay for each
  const cards = document.querySelectorAll(".announcement-card")
  cards.forEach((card, index) => {
    card.style.animationDelay = `${0.2 * (index + 1)}s`
    card.classList.add("fade-in")

    setTimeout(() => {
      card.classList.add("visible")
    }, 100 * index)
  })

  // Update the flag
  allAnnouncementsShown = showAll

  // Update the "Voir toutes les annonces" link text if all announcements are shown
  const seeAllLink = document.querySelector(".see-all-link")
  if (seeAllLink) {
    seeAllLink.textContent = allAnnouncementsShown ? "Masquer les annonces" : "Voir toutes les annonces"
  }
}

// Function to show all announcements
function showAllAnnouncements() {
  const announcements = getAnnouncementsFromStorage()
  renderAnnouncements(announcements, true)
  showNotification("Toutes les annonces sont maintenant affichées")
}

// Function to hide extra announcements
function hideExtraAnnouncements() {
  const announcements = getAnnouncementsFromStorage()
  renderAnnouncements(announcements, false)
  showNotification("Affichage réduit aux annonces principales")
}

// Function to toggle announcements display
function toggleAnnouncementsDisplay() {
  if (allAnnouncementsShown) {
    hideExtraAnnouncements()
  } else {
    showAllAnnouncements()
  }
}

// Function to get announcements from local storage
function getAnnouncementsFromStorage() {
  let announcements
  if (localStorage.getItem("announcements") === null) {
    announcements = [...initialAnnouncements]
    localStorage.setItem("announcements", JSON.stringify(announcements))
  } else {
    announcements = JSON.parse(localStorage.getItem("announcements"))
  }
  return announcements
}

// Function to add a new announcement (called from external form)
function addNewAnnouncement(announcementData) {
  // Get current announcements
  const announcements = getAnnouncementsFromStorage()

  // Add new announcement to the beginning
  announcements.unshift(announcementData)

  // Save to local storage
  localStorage.setItem("announcements", JSON.stringify(announcements))

  // Add to DOM (at the beginning)
  if (announcementCardsContainer) {
    announcementCardsContainer.insertAdjacentHTML("afterbegin", createAnnouncementCard(announcementData, true))

    // Get the new card and add visible class
    const newCard = announcementCardsContainer.querySelector(".announcement-card")
    newCard.classList.add("visible")

    // Remove new-card class after 5 seconds
    setTimeout(() => {
      newCard.classList.remove("new-card")
    }, 5000)
  }

  // Show notification
  showNotification("Nouvelle annonce ajoutée avec succès!")
}

// Function to show notification
function showNotification(message) {
  // Create notification element
  const notification = document.createElement("div")
  notification.className = "custom-notification"

  // Set content
  notification.innerHTML = `
        <div class="notification-icon">
            <i class="fas fa-info-circle"></i>
        </div>
        <div class="notification-content">
            ${message}
        </div>
        <button class="notification-close">
            <i class="fas fa-times"></i>
        </button>
    `

  // Add to DOM
  document.body.appendChild(notification)

  // Add event listener to close button
  notification.querySelector(".notification-close").addEventListener("click", () => {
    notification.style.animation = "slideOut 0.3s ease-in forwards"
    setTimeout(() => {
      notification.remove()
    }, 300)
  })

  // Auto dismiss after 4 seconds
  setTimeout(() => {
    if (document.body.contains(notification)) {
      notification.style.animation = "slideOut 0.3s ease-in forwards"
      setTimeout(() => {
        notification.remove()
      }, 300)
    }
  }, 4000)
}

// Animation on scroll
function animateOnScroll() {
  const cards = document.querySelectorAll(".announcement-card:not(.visible)")
  cards.forEach((card) => {
    const cardPosition = card.getBoundingClientRect().top
    const screenPosition = window.innerHeight / 1.3

    if (cardPosition < screenPosition) {
      card.classList.add("visible")
    }
  })
}

// Event Listeners
document.addEventListener("DOMContentLoaded", () => {
  // Load announcements from storage (initially limited)
  const announcements = getAnnouncementsFromStorage()
  renderAnnouncements(announcements, false)

  // Initial animation
  setTimeout(animateOnScroll, 100)

  // Animation on scroll
  window.addEventListener("scroll", animateOnScroll)

  // Donate button functionality
  document.addEventListener("click", (e) => {
    if (e.target && e.target.classList.contains("donate-btn")) {
      const card = e.target.closest(".announcement-card")
      const title = card.querySelector("h3").textContent.trim()
      showNotification(`Vous allez faire un don pour: ${title}`)
    }
  })

  // Radio button functionality - NAVIGATION ENTRE LES PAGES (CORRIGÉ)
  const radioButtons = document.querySelectorAll('input[name="announcementType"]')
  radioButtons.forEach((radio) => {
    radio.addEventListener("click", function () {
      if (this.id === "benevoles") {
        // Rediriger vers la page des bénévoles
        window.location.href = "../vendredi/index.html" // ou le nom de votre page principale
      }
      // Si c'est "besoins", on reste sur la page actuelle
    })
  })

  // Illustration hover effect
  const illustration = document.querySelector(".illustration")
  if (illustration) {
    illustration.addEventListener("mouseover", function () {
      this.style.transform = "translateY(-5px) scale(1.02)"
    })

    illustration.addEventListener("mouseout", function () {
      this.style.transform = "translateY(0) scale(1)"
    })
  }

  // See all link - Toggle between showing all and limited announcements
  const seeAllLink = document.querySelector(".see-all-link")
  if (seeAllLink) {
    seeAllLink.addEventListener("click", (e) => {
      e.preventDefault()
      toggleAnnouncementsDisplay()
    })
  }

  // Simulate receiving new announcements from external form
  window.addEventListener("message", (event) => {
    // Check if the message is an announcement
    if (event.data && event.data.type === "newAnnouncement") {
      addNewAnnouncement(event.data.announcement)
    }
  })

  // For demonstration purposes - simulate a new announcement coming in after 10 seconds
  setTimeout(() => {
    const demoAnnouncement = {
      title: "Don de vêtements",
      location: "Centre ville",
      organization: "Lancé par l'association Solidarité",
      description: "Besoin urgent de vêtements chauds pour les sans-abris pendant la période hivernale.",
    }
    addNewAnnouncement(demoAnnouncement)
  }, 10000)
})

// Expose the function to window so it can be called from external forms
window.addNewAnnouncement = addNewAnnouncement

// Navigation active link functionality
document.querySelectorAll(".navbar-nav .nav-link").forEach((link) => {
  link.addEventListener("click", function () {
    document.querySelectorAll(".navbar-nav .nav-link").forEach((el) => el.classList.remove("active"))
    this.classList.add("active")
  })
})

