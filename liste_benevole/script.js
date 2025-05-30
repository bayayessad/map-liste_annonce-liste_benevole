// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
  // Get all announcement cards
  const cards = document.querySelectorAll(".announcement-card")

  // Number of cards to show initially
  const initialCardsCount = 2

  // Hide cards beyond the initial count
  for (let i = initialCardsCount; i < cards.length; i++) {
    cards[i].style.display = "none"
  }

  // Add event listener to "Voir toutes les annonces" link
  const seeAllLink = document.querySelector(".see-all-link")
  if (seeAllLink) {
    seeAllLink.addEventListener("click", (e) => {
      e.preventDefault()

      // Show all cards
      cards.forEach((card) => {
        card.style.display = "block"

        // Trigger animation for newly visible cards
        setTimeout(() => {
          card.style.opacity = "1"
          card.style.transform = "translateY(0)"
        }, 100)
      })
    })
  }

  // Animation on scroll
  const animateOnScroll = () => {
    const visibleCards = document.querySelectorAll(
      '.announcement-card[style*="display: block"], .announcement-card:not([style*="display"])',
    )

    visibleCards.forEach((card) => {
      const cardPosition = card.getBoundingClientRect().top
      const screenPosition = window.innerHeight / 1.3

      if (cardPosition < screenPosition) {
        card.style.opacity = "1"
        card.style.transform = "translateY(0)"
      }
    })
  }

  // Initial animation
  setTimeout(animateOnScroll, 100)

  // Animation on scroll
  window.addEventListener("scroll", animateOnScroll)

  // Apply button functionality
  const applyButtons = document.querySelectorAll(".apply-btn")

  applyButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const announcementTitle = this.closest(".announcement-card").querySelector("h3").textContent
      alert(`Vous allez postuler pour: ${announcementTitle}\nUn formulaire de candidature va s'ouvrir.`)
    })
  })

  // Radio button functionality - NAVIGATION ENTRE LES PAGES (CORRIGÉ)
  const radioButtons = document.querySelectorAll('input[name="announcementType"]')

  radioButtons.forEach((radio) => {
    radio.addEventListener("click", function () {
      if (this.id === "besoins") {
        // Rediriger vers la page des besoins
        window.location.href = "./index2.html"
      }
      // Si c'est "benevoles", on reste sur la page actuelle
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
})

// Navigation active link functionality
document.querySelectorAll(".navbar-nav .nav-link").forEach((link) => {
  link.addEventListener("click", function () {
    document.querySelectorAll(".navbar-nav .nav-link").forEach((el) => el.classList.remove("active"))
    this.classList.add("active")
  })
})

