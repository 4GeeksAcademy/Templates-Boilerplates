/**
 * Real-time Form Validation for TrackFlow Partnership Application
 * Context-aware error messages based on actual user input
 * Validates fields on input, blur, and change events
 */

// Briefing restriction: low monthly volume with a product type selected
const LOW_VOLUME_WARNING = 'Para volúmenes menores a 100 envíos mensuales, nuestros servicios podrían no ser la solución más eficiente. ¿Seguro que quieres continuar?';

class FormValidator {
  constructor() {
    this.form = document.getElementById('applicationForm');
    this.allFields = [
      'companyName', 'contactPerson', 'email', 'phone', 'website',
      'country', 'productType', 'shipmentVolume', 'services',
      'otherPL', 'comments', 'privacy'
    ];
    this.init();
  }

  init() {
    if (!this.form) return;

    // Add submit event listener
    this.form.addEventListener('submit', (e) => this.handleSubmit(e));

    // Editing the form removes the previous success banner
    this.form.addEventListener('input', () => this.hideSuccessBanner());

    // Add real-time validation listeners for all fields
    this.allFields.forEach(fieldName => {
      const field = document.getElementById(fieldName);
      if (!field) return;

      // For text inputs and email: validate on input (real-time)
      if (['text', 'email', 'tel', 'url'].includes(field.type)) {
        field.addEventListener('input', () => this.validateField(fieldName));
      }

      // For checkboxes and radios: validate on change
      if (['checkbox', 'radio'].includes(field.type)) {
        field.addEventListener('change', () => this.validateField(fieldName));
      }

      // For selects: validate on change
      if (field.tagName === 'SELECT') {
        field.addEventListener('change', () => this.validateField(fieldName));
      }

      // For textareas: validate on input
      if (field.tagName === 'TEXTAREA') {
        field.addEventListener('input', () => {
          this.updateCommentsCounter(field);
          this.validateField(fieldName);
        });
        this.updateCommentsCounter(field);
      }

      // Validate on blur for all fields
      field.addEventListener('blur', () => this.validateField(fieldName));
    });

    // Low-volume warning depends on two fields; a reset clears both
    ['shipmentVolume', 'productType'].forEach(id => {
      document.getElementById(id)?.addEventListener('change', () => this.updateVolumeWarning());
    });
    this.form.addEventListener('reset', () => setTimeout(() => this.updateVolumeWarning(), 0));
    this.updateVolumeWarning();

    // Special handling for radio/checkbox groups
    document.querySelectorAll('input[name="services"]').forEach(input => {
      input.addEventListener('change', () => this.validateField('services'));
    });

    document.querySelectorAll('input[name="otherPL"]').forEach(input => {
      input.addEventListener('change', () => this.validateField('otherPL'));
    });
  }

  /**
   * Update the visible character counter for the comments textarea
   */
  updateCommentsCounter(field) {
    const counter = document.getElementById('commentsCounter');
    if (counter && field) {
      counter.textContent = `${field.value.length} / 500`;
    }
  }

  /**
   * Error message for a field, or '' when the value is valid.
   * One specific message per field, as defined by the product spec.
   */
  getContextualErrorMessage(fieldName, value) {
    const raw = value ?? '';
    const v = raw.trim();

    switch (fieldName) {
      case 'companyName':
        return v.length >= 2 ? '' : 'El nombre de la empresa debe tener al menos 2 caracteres';

      case 'contactPerson': {
        const words = v.split(/\s+/).filter(w => w.length > 0);
        return words.length >= 2 ? '' : 'Ingresa nombre y apellido del contacto';
      }

      case 'email':
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)
          ? ''
          : 'Ingresa un email corporativo válido (ejemplo: nombre@empresa.com)';

      case 'phone': {
        // Spaces, hyphens and parentheses are allowed as separators: "+1 213 555 0147"
        const compact = v.replace(/[\s\-()]/g, '');
        return /^\+\d{7,15}$/.test(compact)
          ? ''
          : 'El teléfono debe incluir código de país (ejemplo: +1 213 555 0147)';
      }

      case 'website': {
        if (!v) return ''; // optional field
        let isUrl = false;
        if (/^https?:\/\//i.test(v)) {
          try { new URL(v); isUrl = true; } catch { isUrl = false; }
        }
        return isUrl ? '' : 'Si incluyes sitio web, debe ser una URL válida';
      }

      case 'country':
        return v ? '' : 'Selecciona el país de operación principal';

      case 'productType':
        return v ? '' : 'Selecciona el tipo de producto que manejas';

      case 'shipmentVolume':
        return v ? '' : 'Selecciona el volumen mensual estimado';

      case 'comments': {
        const max = 500;
        return raw.length > max
          ? `Los comentarios no pueden exceder ${max} caracteres (quedan ${Math.max(0, max - raw.length)})`
          : '';
      }

      case 'privacy':
        // Checkbox state is handled in validateField / handleSubmit
        return '';

      default:
        return '';
    }
  }

  /**
   * Validate a single field in real-time
   */
  validateField(fieldName) {
    const field = document.getElementById(fieldName);
    const errorElement = document.getElementById(`${fieldName}Error`);
    
    let isValid = true;
    let errorMessage = '';

    // Handle different field types
    if (['services', 'otherPL'].includes(fieldName)) {
      // For radio/checkbox groups, validate differently
      const isGroup = fieldName === 'services' || fieldName === 'otherPL';
      if (isGroup) {
        const groupName = fieldName === 'services' ? 'services' : 'otherPL';
        const checked = document.querySelector(`input[name="${groupName}"]:checked`);
        if (!checked) {
          isValid = false;
          if (fieldName === 'services') {
            errorMessage = 'Selecciona al menos un servicio de interés';
          } else {
            errorMessage = 'Indica si actualmente trabajas con otro proveedor logístico';
          }
        }
      }
    } else if (fieldName === 'privacy') {
      // Privacy checkbox validation
      const privacyCheckbox = document.getElementById('privacy');
      if (privacyCheckbox && !privacyCheckbox.checked) {
        isValid = false;
        errorMessage = 'Debes aceptar la política de privacidad para continuar';
      }
    } else {
      // For regular fields, use contextual validators
      const value = field ? field.value : '';
      errorMessage = this.getContextualErrorMessage(fieldName, value);
      
      if (errorMessage) {
        isValid = false;
      }
    }

    // Update UI based on validation result
    // Optional fields left empty are valid but should not show a confirmation
    const isOptional = ['website', 'comments'].includes(fieldName);
    const isEmpty = !field || !field.value || field.value.trim() === '';
    const showSuccess = isValid && !(isOptional && isEmpty);

    this.updateFieldUI(field, errorElement, isValid, errorMessage, showSuccess);
    return isValid;
  }

  /**
   * aria-describedby = hint (always) + error message (when invalid).
   */
  setDescribedBy(field, hasError) {
    const ids = [];
    if (document.getElementById(`${field.id}Hint`)) ids.push(`${field.id}Hint`);
    if (hasError) ids.push(`${field.id}Error`);
    if (ids.length) field.setAttribute('aria-describedby', ids.join(' '));
    else field.removeAttribute('aria-describedby');
  }

  /**
   * Update field UI (border color, error message, aria attributes)
   */
  updateFieldUI(field, errorElement, isValid, errorMessage, showSuccess = false) {
    // Groups (services, otherPL) have no element with their own id, so field may be null;
    // their error message must still be shown and cleared.
    if (!field && !errorElement) return;

    // Groups (services, otherPL): link the group container to its error message
    if (!field && errorElement) {
      const group = document.querySelector(`[aria-labelledby="${errorElement.id.replace(/Error$/, 'Label')}"]`);
      if (group) {
        if (isValid) group.removeAttribute('aria-describedby');
        else group.setAttribute('aria-describedby', errorElement.id);
      }
    }

    if (isValid) {
      // Clear error state
      if (field) {
        field.classList.remove('ring-2', 'ring-red-500', 'border-red-500', 'bg-red-50');
        field.classList.add('border-gray-300');
        field.setAttribute('aria-invalid', 'false');
        this.setDescribedBy(field, false);
      }

      if (errorElement) {
        this.clearErrorElement(errorElement);
        if (showSuccess) {
          this.showSuccessElement(errorElement);
        } else {
          this.hideSuccessElement(errorElement);
        }
      }
    } else {
      // Show error state with animated transition
      if (field) {
        field.classList.add('ring-2', 'ring-red-500', 'border-red-500');
        field.classList.remove('border-gray-300');
        field.setAttribute('aria-invalid', 'true');
        this.setDescribedBy(field, true);
      }

      if (errorElement) {
        this.hideSuccessElement(errorElement);
        this.renderErrorMessage(errorElement, errorMessage);
        errorElement.setAttribute('role', 'alert');
        errorElement.setAttribute('aria-atomic', 'true');
      }
    }
  }

  /**
   * Confirmation shown under a field when its value is valid.
   * The element is created next to the field's error container on first use.
   */
  getSuccessElement(errorElement) {
    const id = `${errorElement.id.replace(/Error$/, '')}Success`;
    let el = document.getElementById(id);
    if (!el) {
      el = document.createElement('span');
      el.id = id;
      el.className = 'field-success hidden';
      el.setAttribute('role', 'status');
      errorElement.insertAdjacentElement('afterend', el);
    }
    return el;
  }

  showSuccessElement(errorElement) {
    const el = this.getSuccessElement(errorElement);
    el.textContent = '✓ Validación correcta';
    el.className = 'field-success';
  }

  hideSuccessElement(errorElement) {
    const el = document.getElementById(`${errorElement.id.replace(/Error$/, '')}Success`);
    if (el) {
      el.textContent = '';
      el.className = 'field-success hidden';
    }
  }

  /**
   * Hide an error element and remove its content
   */
  clearErrorElement(errorElement) {
    errorElement.replaceChildren();
    errorElement.className = 'field-error hidden';
  }

  /**
   * Render a message such as "❌ Campo obligatorio | Detalle" as a styled block:
   * icon, bold title and one line per detail. Built with DOM nodes (no innerHTML).
   * "❌" = required/blocking error (red); "⚠️" = warning (amber).
   */
  renderErrorMessage(errorElement, message) {
    const isWarning = message.startsWith('⚠');
    const text = message.replace(/^(❌|⚠️?)\s*/, '');
    const [title, ...details] = text.split('|').map(part => part.trim()).filter(Boolean);

    errorElement.replaceChildren();
    errorElement.className = `field-error ${isWarning ? 'field-error--warning' : 'field-error--error'}`;

    const icon = document.createElement('span');
    icon.className = 'field-error__icon';
    icon.setAttribute('aria-hidden', 'true');
    icon.textContent = isWarning ? '!' : '×';

    const body = document.createElement('span');
    body.className = 'field-error__body';

    const titleEl = document.createElement('span');
    titleEl.className = 'field-error__title';
    titleEl.textContent = title || '';
    body.append(titleEl);

    details.forEach(detail => {
      const detailEl = document.createElement('span');
      detailEl.className = 'field-error__detail';
      detailEl.textContent = detail;
      body.append(detailEl);
    });

    errorElement.append(icon, body);
  }

  /**
   * Show the low-volume warning when volume is "0-100" and a product type is selected.
   * Returns true while the warning applies.
   */
  updateVolumeWarning() {
    const warning = document.getElementById('shipmentVolumeWarning');
    const volume = document.getElementById('shipmentVolume')?.value;
    const productType = document.getElementById('productType')?.value;
    const show = volume === '0-100' && Boolean(productType);

    if (warning) {
      warning.textContent = LOW_VOLUME_WARNING;
      warning.classList.toggle('hidden', !show);
    }
    return show;
  }

  /**
   * Handle form submission
   */
  handleSubmit(e) {
    e.preventDefault();

    // Validate all fields
    let isValid = true;
    this.allFields.forEach(fieldName => {
      if (!this.validateField(fieldName)) {
        isValid = false;
      }
    });

    // Additional validation for radio/checkbox groups
    const servicesChecked = document.querySelector('input[name="services"]:checked');
    if (!servicesChecked) {
      isValid = false;
      this.showFieldError('services', 'Selecciona al menos un servicio de interés');
    }

    const otherPLChecked = document.querySelector('input[name="otherPL"]:checked');
    if (!otherPLChecked) {
      isValid = false;
      this.showFieldError('otherPL', 'Indica si actualmente trabajas con otro proveedor logístico');
    }

    const privacyChecked = document.getElementById('privacy')?.checked;
    if (!privacyChecked) {
      isValid = false;
      this.showFieldError('privacy', 'Debes aceptar la política de privacidad para continuar');
    }

    const formStatus = document.getElementById('formStatus');
    this.hideSuccessBanner();
    if (isValid) {
      this.hideErrorSummary();
      // Low-volume restriction: the user must explicitly confirm before sending
      if (this.updateVolumeWarning() && !window.confirm(LOW_VOLUME_WARNING)) {
        return;
      }
      this.submitForm();
      return;
    }

    // Count only the error messages that are actually visible
    const visibleErrors = Array.from(this.form.querySelectorAll('.field-error:not(.hidden)'));
    this.showErrorSummary(visibleErrors);

    const pluralText = visibleErrors.length > 1 ? 'errores' : 'error';
    if (formStatus) {
      formStatus.textContent = `Encontramos ${visibleErrors.length} ${pluralText}. Revisa los campos marcados y corrígelos.`;
    }
  }

  /**
   * Show an error for a specific field (used for groups and on submit)
   */
  showFieldError(fieldName, message) {
    const errorElement = document.getElementById(`${fieldName}Error`);
    if (errorElement) {
      this.renderErrorMessage(errorElement, message);
      errorElement.setAttribute('role', 'alert');
      errorElement.setAttribute('aria-atomic', 'true');
    }
  }

  /**
   * Visible summary at the top of the form: one link per invalid field.
   * Each link jumps to the field (for groups, to their first option).
   */
  showErrorSummary(visibleErrors) {
    const summary = document.getElementById('errorSummary');
    if (!summary) return;

    const jumpTargets = { services: 'storage', otherPL: 'otherPLYes' };
    summary.replaceChildren();

    const heading = document.createElement('p');
    heading.className = 'field-summary__title';
    heading.textContent = visibleErrors.length === 1
      ? 'Revisa este campo antes de enviar:'
      : `Revisa estos ${visibleErrors.length} campos antes de enviar:`;
    summary.append(heading);

    const list = document.createElement('ul');
    list.className = 'field-summary__list';

    visibleErrors.forEach(errorEl => {
      const fieldName = errorEl.id.replace(/Error$/, '');
      const label = document.querySelector(`label[for="${fieldName}"]`)
        || document.getElementById(`${fieldName}Label`);
      const labelText = label ? label.textContent.replace(/\((Obligatorio|Opcional)\)/g, '').replace(/\s+/g, ' ').trim() : fieldName;

      const item = document.createElement('li');
      const link = document.createElement('a');
      const targetId = jumpTargets[fieldName] || fieldName;
      link.href = `#${targetId}`;
      link.textContent = labelText;
      // Move focus explicitly: a plain #hash jump does not reliably focus the field
      link.addEventListener('click', e => {
        e.preventDefault();
        const target = document.getElementById(targetId);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'center' });
          target.focus();
        }
      });
      item.append(link);
      list.append(item);
    });

    summary.append(list);
    summary.classList.remove('hidden');
    summary.focus();
    summary.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  hideSuccessBanner() {
    const successMessage = document.getElementById('successMessage');
    if (successMessage && !successMessage.classList.contains('hidden')) {
      successMessage.classList.add('hidden');
    }
  }

  hideErrorSummary() {
    const summary = document.getElementById('errorSummary');
    if (!summary) return;
    summary.replaceChildren();
    summary.classList.add('hidden');
  }

  /**
   * Submit form data
   */
  async submitForm() {
    const formStatus = document.getElementById('formStatus');
    const successMessage = document.getElementById('successMessage');

    try {
      // Collect form data
      const formData = new FormData(this.form);
      const data = Object.fromEntries(formData);

      // In production, send to backend
      console.log('✓ Formulario válido. Datos:', data);

      // Show success message (the element starts with Tailwind's "hidden" class)
      if (successMessage) {
        successMessage.classList.remove('hidden');
        successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
        successMessage.focus();
      }

      if (formStatus) {
        formStatus.textContent = '¡Gracias por tu interés en TrackFlow! Hemos recibido tu solicitud.';
      }

      // Reset form after delay
      setTimeout(() => {
        this.form.reset();
        this.updateCommentsCounter(document.getElementById('comments'));
        if (formStatus) {
          formStatus.textContent = '';
        }
        
        // Reset error states
        this.allFields.forEach(fieldName => {
          const field = document.getElementById(fieldName);
          const errorElement = document.getElementById(`${fieldName}Error`);
          if (field && errorElement) {
            this.updateFieldUI(field, errorElement, true, '');
          }
        });
      }, 3000);

    } catch (error) {
      console.error('Error al enviar formulario:', error);
      
      if (formStatus) {
        formStatus.textContent = '❌ Error en el servidor | Por favor, intenta de nuevo más tarde.';
      }
    }
  }
}

// Initialize form validator when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new FormValidator();
  });
} else {
  new FormValidator();
}