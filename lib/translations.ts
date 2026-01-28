
export const translations = {
    en: {
        nav: {
            tours: "Tours",
            aboutUs: "About us",
            contact: "Contact",
            cart: "Cart",
            profile: "Profile",
            support: "Support",
            settings: "Settings",
            logout: "Log out",
            loginSignup: "Log in or sign up",
        },
        footer: {
            support: "Support",
            contact: "Contact",
            legalNotice: "Legal Notice",
            privacyPolicy: "Privacy Policy",
            terms: "Terms and Conditions",
            company: "Company",
            aboutUs: "About Us",
            toursTickets: "Tours & Tickets",
            tagline: "Book unforgettable experiences with trusted local experts. Fast support, flexible booking, and great value—every time.",
        },
        common: {
            loading: "Loading...",
            error: "Error",
            success: "Success",
        }
    },
    it: {
        nav: {
            tours: "Tour",
            aboutUs: "Chi siamo",
            contact: "Contatto",
            cart: "Carrello",
            profile: "Profilo",
            support: "Supporto",
            settings: "Impostazioni",
            logout: "Disconnettersi",
            loginSignup: "Accedi o registrati",
        },
        footer: {
            support: "Supporto",
            contact: "Contatto",
            legalNotice: "Note Legali",
            privacyPolicy: "Informativa sulla privacy",
            terms: "Termini e Condizioni",
            company: "Azienda",
            aboutUs: "Chi siamo",
            toursTickets: "Tour e Biglietti",
            tagline: "Prenota esperienze indimenticabili con esperti locali di fiducia. Supporto rapido, prenotazione flessibile e ottimo rapporto qualità-prezzo, ogni volta.",
        },
        common: {
            loading: "Caricamento...",
            error: "Errore",
            success: "Successo",
        }
    }
};

export type Language = "en" | "it";
export type TranslationKeys = typeof translations.en;
