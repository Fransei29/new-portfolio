"use client";  // Indica que el componente es para uso en la parte del cliente.

import { useState } from 'react';
import emailjs from 'emailjs-com'; // Importar EmailJS
import '../app/contact/contact.css'; // Estilos compartidos

export default function ContactForm() {
  // Estados para manejar los datos del formulario, el envío y los errores.
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  // Maneja los cambios en los inputs del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Envía el formulario usando EmailJS
  const handleSubmit = (e) => {
    e.preventDefault();

    // Parámetros necesarios para EmailJS
    const serviceID = 'service_6bqn1tv';
    const templateID = 'template_f19dbvt';
    const userID = 'KadAicMAaNEheSzf5';

    // Enviar el email con EmailJS
    emailjs.send(serviceID, templateID, formData, userID)
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
    <div className="contact-section">
      {submitted ? (
        // Mensaje de éxito cuando se envía el formulario
        <p className="success-message">Thank you for reaching out! I will get back to you soon.</p>
      ) : (
        // Formulario de contacto
        <form onSubmit={handleSubmit} className="contact-form">
          <p className='h3'>Name</p>
          <div className="form-group">
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <p className='h3'>Email</p>
          <div className="form-group">
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <p className='h3'>Message</p>
          <div className="form-group">
            <textarea
              id="message"
              name="message"
              placeholder="Message"
              value={formData.message}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit">Send</button>

          {error && <p className="error-message">There was an error. Please try again later.</p>}
        </form>
      )}
    </div>
  );
}
