/**
 * Translation System for TrackFlow Landing Page
 * Supports English and Spanish translations
 */

class LanguageManager {
  constructor() {
    this.currentLanguage = this.getStoredLanguage() || 'en';
    this.languages = ['en', 'es'];
    this.translations = {
      en: {
        'Home': 'Home',
        'Services': 'Services',
        'Contact': 'Contact',
        'Logistics Solutions for E-commerce Growth': 'Logistics Solutions for E-commerce Growth',
        'Warehouse management, last-mile delivery, and reverse logistics all in one platform': 'Warehouse management, last-mile delivery, and reverse logistics all in one platform',
        'Get Started': 'Get Started',
        'Our Services': 'Our Services',
        'Warehouse Management': 'Warehouse Management',
        'Complete inventory management, storage, and fulfillment solutions for your e-commerce business': 'Complete inventory management, storage, and fulfillment solutions for your e-commerce business',
        'Last-Mile Delivery': 'Last-Mile Delivery',
        'Fast and reliable delivery from our warehouse to your customers\' doorstep': 'Fast and reliable delivery from our warehouse to your customers\' doorstep',
        'Reverse Logistics': 'Reverse Logistics',
        'Handle returns, refurbishment, and restocking with our efficient reverse logistics network': 'Handle returns, refurbishment, and restocking with our efficient reverse logistics network',
        'Real-Time Tracking': 'Real-Time Tracking',
        'Monitor your shipments 24/7 with our advanced tracking and reporting systems': 'Monitor your shipments 24/7 with our advanced tracking and reporting systems',
        'Partner with TrackFlow': 'Partner with TrackFlow',
        'Tell us about your e-commerce business and we\'ll create a custom logistics solution': 'Tell us about your e-commerce business and we\'ll create a custom logistics solution',
        'Personal Information': 'Personal Information',
        'Full Name': 'Full Name',
        'Business Email': 'Business Email',
        'Phone Number': 'Phone Number',
        'International format': 'International format',
        'Business Information': 'Business Information',
        'Company Name': 'Company Name',
        'Your Role': 'Your Role',
        'Industry': 'Industry',
        'Select Industry': 'Select Industry',
        'Fashion': 'Fashion',
        'Electronics': 'Electronics',
        'Cosmetics': 'Cosmetics',
        'Other': 'Other',
        'What industry is your business in?': 'What industry is your business in?',
        'Location': 'Location',
        'Country': 'Country',
        'Select Country': 'Select Country',
        'United States': 'United States',
        'Spain': 'Spain',
        'Where is your business located?': 'Where is your business located?',
        'Additional Information': 'Additional Information',
        'Tell us about your logistics needs': 'Tell us about your logistics needs',
        'Max 500 characters': 'Max 500 characters',
        'I agree to the terms and conditions': 'I agree to the terms and conditions',
        'I have read and accept the privacy policy': 'I have read and accept the privacy policy',
        'Send me industry insights and company updates': 'Send me industry insights and company updates',
        'Send Application': 'Send Application',
        'Clear': 'Clear',
        'Get in Touch': 'Get in Touch',
        'Los Angeles Office': 'Los Angeles Office',
        'USA': 'USA',
        'Los Angeles, California': 'Los Angeles, California',
        'Zaragoza Office': 'Zaragoza Office',
        'Spain': 'Spain',
        'Zaragoza, Aragón': 'Zaragoza, Aragón',
        'About TrackFlow': 'About TrackFlow',
        'Leading warehouse management and last-mile delivery solutions for e-commerce businesses': 'Leading warehouse management and last-mile delivery solutions for e-commerce businesses',
        'Quick Links': 'Quick Links',
        'Legal': 'Legal',
        'Privacy Policy': 'Privacy Policy',
        'Terms of Service': 'Terms of Service',
        'Cookies': 'Cookies',
        'Follow Us': 'Follow Us',
        'LinkedIn': 'LinkedIn',
        'Twitter': 'Twitter',
        'Facebook': 'Facebook',
        '© 2009-2026 TrackFlow. All rights reserved.': '© 2009-2026 TrackFlow. All rights reserved.'
      },
      es: {
        'Home': 'Inicio',
        'Services': 'Servicios',
        'Contact': 'Contacto',
        'Logistics Solutions for E-commerce Growth': 'Soluciones Logísticas para el Crecimiento del E-commerce',
        'Warehouse management, last-mile delivery, and reverse logistics all in one platform': 'Gestión de almacenes, entregas de última milla y logística inversa en una sola plataforma',
        'Get Started': 'Comenzar Ahora',
        'Our Services': 'Nuestros Servicios',
        'Warehouse Management': 'Gestión de Almacenes',
        'Complete inventory management, storage, and fulfillment solutions for your e-commerce business': 'Soluciones completas de gestión de inventario, almacenamiento y cumplimiento para tu negocio de e-commerce',
        'Last-Mile Delivery': 'Entregas de Última Milla',
        'Fast and reliable delivery from our warehouse to your customers\' doorstep': 'Entregas rápidas y confiables desde nuestro almacén hasta la puerta de tus clientes',
        'Reverse Logistics': 'Logística Inversa',
        'Handle returns, refurbishment, and restocking with our efficient reverse logistics network': 'Gestiona devoluciones, reacondicionamiento y reabastecimiento con nuestra red logística inversa',
        'Real-Time Tracking': 'Seguimiento en Tiempo Real',
        'Monitor your shipments 24/7 with our advanced tracking and reporting systems': 'Monitorea tus envíos 24/7 con nuestros sistemas avanzados de seguimiento e informes',
        'Partner with TrackFlow': 'Asociarse con TrackFlow',
        'Tell us about your e-commerce business and we\'ll create a custom logistics solution': 'Cuéntanos sobre tu negocio de e-commerce y crearemos una solución logística personalizada',
        'Personal Information': 'Información Personal',
        'Full Name': 'Nombre Completo',
        'Business Email': 'Correo Empresarial',
        'Phone Number': 'Número de Teléfono',
        'International format': 'Formato internacional',
        'Business Information': 'Información Empresarial',
        'Company Name': 'Nombre de la Empresa',
        'Your Role': 'Tu Puesto',
        'Industry': 'Sector',
        'Select Industry': 'Selecciona Sector',
        'Fashion': 'Moda',
        'Electronics': 'Electrónica',
        'Cosmetics': 'Cosméticos',
        'Other': 'Otro',
        'What industry is your business in?': '¿En qué sector opera tu empresa?',
        'Location': 'Ubicación',
        'Country': 'País',
        'Select Country': 'Selecciona País',
        'United States': 'Estados Unidos',
        'Spain': 'España',
        'Where is your business located?': '¿Dónde se encuentra tu empresa?',
        'Additional Information': 'Información Adicional',
        'Tell us about your logistics needs': 'Cuéntanos sobre tus necesidades logísticas',
        'Max 500 characters': 'Máximo 500 caracteres',
        'I agree to the terms and conditions': 'Acepto los términos y condiciones',
        'I have read and accept the privacy policy': 'He leído y acepto la política de privacidad',
        'Send me industry insights and company updates': 'Enviarme información del sector y actualizaciones de la empresa',
        'Send Application': 'Enviar Solicitud',
        'Clear': 'Limpiar',
        'Get in Touch': 'Ponte en Contacto',
        'Los Angeles Office': 'Oficina de Los Ángeles',
        'USA': 'EE.UU.',
        'Los Angeles, California': 'Los Ángeles, California',
        'Zaragoza Office': 'Oficina de Zaragoza',
        'Spain': 'España',
        'Zaragoza, Aragón': 'Zaragoza, Aragón',
        'About TrackFlow': 'Acerca de TrackFlow',
        'Leading warehouse management and last-mile delivery solutions for e-commerce businesses': 'Soluciones líderes en gestión de almacenes y entregas de última milla para empresas de e-commerce',
        'Quick Links': 'Enlaces Rápidos',
        'Legal': 'Legal',
        'Privacy Policy': 'Política de Privacidad',
        'Terms of Service': 'Términos de Servicio',
        'Cookies': 'Cookies',
        'Follow Us': 'Síguenos',
        'LinkedIn': 'LinkedIn',
        'Twitter': 'Twitter',
        'Facebook': 'Facebook',
        '© 2009-2026 TrackFlow. All rights reserved.': '© 2009-2026 TrackFlow. Todos los derechos reservados.'
      }
    };

    this.init();
  }

  /**
   * Initialize language manager
   */
  init() {
    this.setupLanguageToggle();
    this.applyLanguage(this.currentLanguage);
    this.updateHtmlLang();
  }

  /**
   * Setup language toggle button
   */
  setupLanguageToggle() {
    const langToggle = document.getElementById('lang-toggle');
    if (langToggle) {
      langToggle.addEventListener('click', () => this.toggleLanguage());
    }
  }

  /**
   * Toggle between English and Spanish
   */
  toggleLanguage() {
    this.currentLanguage = this.currentLanguage === 'en' ? 'es' : 'en';
    this.saveLanguage(this.currentLanguage);
    this.applyLanguage(this.currentLanguage);
    this.updateHtmlLang();
  }

  /**
   * Apply language to all elements with data-en and data-es attributes
   */
  applyLanguage(lang) {
    const elements = document.querySelectorAll('[data-en][data-es]');
    
    elements.forEach(element => {
      const text = element.getAttribute(`data-${lang}`);
      if (text) {
        // Check if element has children (nested elements)
        if (element.children.length === 0) {
          element.textContent = text;
        } else {
          // For elements with children, only update the direct text node
          const firstTextNode = Array.from(element.childNodes).find(
            node => node.nodeType === Node.TEXT_NODE && node.textContent.trim()
          );
          if (firstTextNode) {
            firstTextNode.textContent = text;
          }
        }
      }
    });

    // Update page language attribute
    document.documentElement.lang = lang;
    
    // Update page title
    const pageTitle = this.currentLanguage === 'en' 
      ? 'TrackFlow - Warehouse Management & Last-Mile Delivery'
      : 'TrackFlow - Gestión de Almacenes y Entregas de Última Milla';
    document.title = pageTitle;

    // Update meta description
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', 
        this.currentLanguage === 'en'
          ? 'TrackFlow - Warehouse management and last-mile delivery solutions for e-commerce'
          : 'TrackFlow - Gestión de almacenes y entregas de última milla para e-commerce'
      );
    }
  }

  /**
   * Update HTML lang attribute
   */
  updateHtmlLang() {
    document.documentElement.lang = this.currentLanguage;
    const langText = document.getElementById('lang-text');
    if (langText) {
      langText.textContent = this.currentLanguage === 'en' ? 'ES' : 'EN';
    }
  }

  /**
   * Save language preference to localStorage
   */
  saveLanguage(lang) {
    localStorage.setItem('trackflow-language', lang);
  }

  /**
   * Get stored language preference
   */
  getStoredLanguage() {
    return localStorage.getItem('trackflow-language');
  }

  /**
   * Get translation for a key
   */
  getTranslation(key, lang = this.currentLanguage) {
    return this.translations[lang]?.[key] || key;
  }
}

// Initialize language manager when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.languageManager = new LanguageManager();
  });
} else {
  window.languageManager = new LanguageManager();
}
