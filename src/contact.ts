/** Links de contato direto (funcionam em qualquer hospedagem, sem backend). */

export const waLink = (number: string, text: string) =>
  `https://wa.me/${number}?text=${encodeURIComponent(text)}`;

export const mailtoLink = (to: string, subject: string, body: string) =>
  `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

export const telLink = (number: string) => `tel:+${number}`;
