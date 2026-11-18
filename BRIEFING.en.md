# BRIEFING.md — TrackFlow

## Milestone 1: Your Company's Public Website

_Estas instrucciones están [disponibles en español](./trackflow-BRIEFING.es.md)._

> This document describes your company and the specific situation you're building this milestone for. Read it completely before writing any code. Everything you build must reflect this context.

---

## Your company

**TrackFlow** is a last-mile delivery and warehouse management company founded in 2009 in Los Angeles, United States. It operates in two markets—United States (Los Angeles) and Spain (Zaragoza)—and offers three services: warehouse management for e-commerce brands, last-mile delivery (the final leg from warehouse to end customer), and reverse logistics (returns and product reconditioning). It has approximately 130 employees and generates around 9 million euros in annual revenue. Its clients are mid-sized fashion, electronics, and cosmetics brands that sell online.

---

## Your department and the problem you must solve

You work in the **TrackFlow Tech** unit, reporting directly to CTO Andrés Kim. TrackFlow's current corporate website was built years ago by an external agency and is completely outdated. It doesn't reflect that the company operates in two countries, doesn't clearly explain the services, and there's no way for interested companies to request information in a structured manner. Miguel Torres (Commercial Director) needs a professional website that presents TrackFlow's services and captures leads from potential companies that want to outsource their logistics.

---

## Your stakeholder

**Miguel Torres**, Commercial Director

> Hi,
>
> We need a new website that presents TrackFlow as what we are: a serious logistics operator with presence in the United States and Spain. It must explain our three main services: warehouse management, last mile, and reverse logistics. I also need a page with a form so interested companies can request information. We currently get very vague inquiries by email and waste a lot of time qualifying whether they're real clients or not. I want to capture: company data, type of product they handle, estimated monthly shipping volume, countries where they operate, and which services interest them. The site must be responsive, accessible, and SEO optimized. Use Tailwind and make sure the form has complete validation.

---

## Language scope

- Multilingual support is **optional but highly recommended** given TrackFlow's operations in the United States and Spain.
- You must choose one **base language** for the full website and form experience.
- If you implement a second language, treat it as an enhancement (do not reduce quality/completeness in the base language).

## Landing page content

Your landing page must include the following sections, in this order:

### Header

- Logo or name "TrackFlow"
- Navigation: Home | Services | Coverage | Contact

### Hero

- **Headline:** "Logistics that scales with your e-commerce"
- **Subheadline:** "Warehouse management, last-mile deliveries, and reverse logistics in the United States and Spain. Over 15 years helping fashion, electronics, and cosmetics brands grow without worrying about operations."
- **Call to action:** Button "Request information" linking to the form

### Services (3 columns)

1. **Warehouse Management**
   - Storage, picking and packing
   - Real-time inventory
   - We operate warehouses in Los Angeles and Zaragoza

2. **Last-Mile Deliveries**
   - Certified carrier network in both countries
   - Unified shipment tracking
   - Incident and returns management

3. **Reverse Logistics**
   - Complete returns management
   - Inspection and reconditioning
   - Integration with your sales platform

### Coverage (2 columns)

- **United States**
  - Warehouse in Los Angeles
  - National coverage
  - Carriers: UPS, FedEx, DHL

- **Spain**
  - Warehouse in Zaragoza
  - Peninsular and island coverage
  - Carriers: MRW, SEUR, DHL

### Why TrackFlow (4 benefits)

- **Binational operation:** The only operator with own infrastructure in the United States and Spain
- **+130 professionals** dedicated to your logistics
- **Own technology** for total visibility of your inventory
- **E-commerce specialization** in fashion, electronics, and cosmetics

### Contact

- Email: <comercial@trackflow.com>
- Los Angeles: +1 213 555 0147
- Zaragoza: +34 976 123 456

### Footer

- © 2025 TrackFlow. All rights reserved.
- LinkedIn

---

## Information request form fields

Your form must capture the following information:

| Field                                       | Type     | Validation                                             | Required |
| ------------------------------------------- | -------- | ------------------------------------------------------ | -------- |
| **Company name**                            | text     | Minimum 2 characters                                   | Yes      |
| **Contact person**                          | text     | Minimum 2 words (first and last name)                  | Yes      |
| **Corporate email**                         | email    | Valid email format                                     | Yes      |
| **Phone**                                   | tel      | Format: +[country code] [number]                       | Yes      |
| **Company website**                         | url      | Valid URL format                                       | No       |
| **Main operating country**                  | select   | United States / Spain / Both / Other                   | Yes      |
| **Product type**                            | select   | Fashion / Electronics / Cosmetics / Food / Other       | Yes      |
| **Estimated monthly shipping volume**       | select   | 0-100 / 101-500 / 501-2000 / 2000+ / Not sure          | Yes      |
| **Services of interest**                    | checkbox | Warehousing / Last mile / Reverse logistics (multiple) | Yes      |
| **Do you currently work with another 3PL?** | radio    | Yes / No / Evaluating options                          | Yes      |
| **Comments or specific needs**              | textarea | Maximum 500 characters                                 | No       |
| **I accept the privacy policy**             | checkbox | Must be checked to submit                              | Yes      |

---

## Specific validations

1. **Company name:** Minimum 2 characters
2. **Contact person:** Must contain at least first and last name
3. **Email:** Must be valid format (contain @ and domain)
4. **Phone:** Must start with + followed by country code
5. **Website:** If provided, must be valid URL (start with http:// or https://)
6. **Services of interest:** At least one must be selected
7. **Comments:** Limit to 500 characters with visible counter
8. **Privacy policy:** Checkbox must be checked to submit

---

## Expected error messages

When a field doesn't meet validation, display these specific messages:

- **Company name:** "Company name must have at least 2 characters"
- **Contact person:** "Enter first and last name of contact"
- **Email:** "Enter a valid corporate email (example: <name@company.com>)"
- **Phone:** "Phone must include country code (example: +1 213 555 0147)"
- **Website:** "If you include website, it must be a valid URL"
- **Country:** "Select main operating country"
- **Product type:** "Select the type of product you handle"
- **Monthly volume:** "Select estimated monthly volume"
- **Services of interest:** "Select at least one service of interest"
- **Current 3PL:** "Indicate if you currently work with another logistics provider"
- **Comments:** "Comments cannot exceed 500 characters (X remaining)"
- **Privacy policy:** "You must accept the privacy policy to continue"

---

## Success message

When the form validates correctly (simulate submission), display:

> **Thank you for your interest in TrackFlow!**
>
> We have received your request. Our commercial team will review your information and contact you within the next 24-48 hours to schedule a call and learn about your logistics needs in detail.
>
> If you have any urgent inquiry, write to us directly at <comercial@trackflow.com>

---

## Specific restriction

The form is designed for **e-commerce companies looking to outsource their logistics**, not for end consumers who want to track a package or make a return. If you detect that the selected volume is "0-100 shipments/month" AND the "Product type" field is relevant, include a warning message: "For volumes under 100 monthly shipments, our services might not be the most efficient solution. Are you sure you want to continue?"

---

## Required Schema.org markup

Implement the following Schema.org markup on your landing page:

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "TrackFlow",
  "description": "Warehouse management and last-mile deliveries for e-commerce",
  "url": "https://trackflow.com",
  "foundingDate": "2009",
  "address": [
    {
      "@type": "PostalAddress",
      "addressCountry": "US",
      "addressLocality": "Los Angeles",
      "addressRegion": "California"
    },
    {
      "@type": "PostalAddress",
      "addressCountry": "ES",
      "addressLocality": "Zaragoza",
      "addressRegion": "Aragón"
    }
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+1-213-555-0147",
    "contactType": "sales",
    "availableLanguage": ["Spanish", "English"]
  },
  "sameAs": ["https://linkedin.com/company/trackflow"],
  "areaServed": [
    {
      "@type": "Country",
      "name": "United States"
    },
    {
      "@type": "Country",
      "name": "Spain"
    }
  ]
}
```
