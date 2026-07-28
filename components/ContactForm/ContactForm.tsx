import { useState, ChangeEvent, FormEvent } from 'react';
import styles from './ContactForm.module.scss';

// Definir tipos para el formulario
interface FormData {
  name: string;
  email: string;
  message: string;
}

export default function ContactForm() {
  // Estados para manejar los datos del formulario, el envío y los errores.
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [sending, setSending] = useState<boolean>(false);
  const [website, setWebsite] = useState<string>(''); // honeypot anti-bots

  // Maneja los cambios en los inputs del formulario
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Envía el formulario a /api/contact, que despacha el mail vía Resend desde el
  // servidor. Antes se usaba EmailJS, que exponía las credenciales en el bundle.
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (sending) return;

    setSending(true);
    setError(false);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, website }),
      });

      if (!response.ok) throw new Error(`Contact request failed: ${response.status}`);

      setSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      console.error('Failed to send message:', err);
      setError(true);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className={styles.contactSection}>
      {submitted ? (
        // Mensaje de éxito cuando se envía el formulario
        <p className={styles.successMessage}>Thank you for reaching out! I will get back to you soon.</p>
      ) : (
        // Formulario de contacto
        <form onSubmit={handleSubmit} className={styles.contactForm}>
          {/* Honeypot: invisible para humanos, tentador para bots. Si viene
              completo, el servidor descarta el envío en silencio. */}
          <div
            aria-hidden
            style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, overflow: 'hidden' }}
          >
            <label htmlFor="website">Website</label>
            <input
              id="website"
              name="website"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
            />
          </div>

          <p className={styles.h3}>Name</p>
          <div className={styles.formGroup}>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <p className={styles.h3}>Email</p>
          <div className={styles.formGroup}>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <p className={styles.h3}>Message</p>
          <div className={styles.formGroup}>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" disabled={sending}>
            {sending ? 'Sending…' : 'Send'}
          </button>

          {error && <p className={styles.errorMessage}>There was an error. Please try again later.</p>}
        </form>
      )}
    </div>
  );
}
