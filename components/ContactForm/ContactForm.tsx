import { useState, ChangeEvent, FormEvent } from 'react';
import emailjs from '@emailjs/browser';
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

  // Maneja los cambios en los inputs del formulario
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Envía el formulario usando EmailJS
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Parámetros necesarios para EmailJS
    const serviceID = 'service_6bqn1tv';
    const templateID = 'template_f19dbvt';
    const userID = 'KadAicMAaNEheSzf5';

    // Enviar el email con EmailJS
    emailjs.send(serviceID, templateID, { ...formData }, userID)
      .then((response) => {
        console.log('Email sent successfully!', response.status, response.text);
        setSubmitted(true);
        setError(false);
        setFormData({
          name: '',
          email: '',
          message: ''
        });
      })
      .catch((err) => {
        console.error('Failed to send email:', err);
        setError(true);
      });
  };

  return (
    <div className={styles.contactSection}>
      {submitted ? (
        // Mensaje de éxito cuando se envía el formulario
        <p className={styles.successMessage}>Thank you for reaching out! I will get back to you soon.</p>
      ) : (
        // Formulario de contacto
        <form onSubmit={handleSubmit} className={styles.contactForm}>
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

          <button type="submit">Send</button>

          {error && <p className={styles.errorMessage}>There was an error. Please try again later.</p>}
        </form>
      )}
    </div>
  );
}
