'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, CheckCircle, Loader2 } from 'lucide-react';
import styles from './ContactModal.module.css';

export default function ContactModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [status, setStatus] = useState('idle'); // idle, loading, success, error
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.message) {
      setStatus('error');
      setErrorMessage('Email and message are required fields.');
      return;
    }

    setStatus('loading');
    try {
      const response = await fetch('http://localhost:5001/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      
      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', phone: '', message: '' });
      } else {
        setStatus('error');
        setErrorMessage(data.error || 'Failed to submit form.');
      }
    } catch (err) {
      console.error(err);
      setStatus('error');
      setErrorMessage('Connection failed. Make sure backend is running.');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className={styles.overlay}>
          {/* Backdrop blur click wrapper */}
          <motion.div
            className={styles.backdrop}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal Container */}
          <motion.div
            className={styles.modal}
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
          >
            <button className={styles.closeBtn} onClick={onClose} aria-label="Close Modal">
              <X size={20} />
            </button>

            {status === 'success' ? (
              <div className={styles.successWrapper}>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                >
                  <CheckCircle size={64} className={styles.successIcon} />
                </motion.div>
                <h2>Message Sent!</h2>
                <p>Thank you for contacting Buldex. Our team will get back to you shortly.</p>
                <button className="btn-primary" onClick={onClose}>
                  Done
                </button>
              </div>
            ) : (
              <div className={styles.formWrapper}>
                <div className={styles.header}>
                  <h2>Get A Quote / Contact Us</h2>
                  <p>Submit your details below and our construction specialists will review your project.</p>
                </div>

                <form onSubmit={handleSubmit} className={styles.form}>
                  <div className={styles.inputGroup}>
                    <label htmlFor="name">Full Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. John Doe"
                    />
                  </div>

                  <div className={styles.row}>
                    <div className={styles.inputGroup}>
                      <label htmlFor="email">Email Address *</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        required
                      />
                    </div>
                    <div className={styles.inputGroup}>
                      <label htmlFor="phone">Phone Number</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+1 (555) 000-0000"
                      />
                    </div>
                  </div>

                  <div className={styles.inputGroup}>
                    <label htmlFor="message">Message / Project Brief *</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us about your project requirements..."
                      rows={4}
                      required
                    />
                  </div>

                  {status === 'error' && (
                    <div className={styles.errorAlert}>
                      {errorMessage}
                    </div>
                  )}

                  <button
                    type="submit"
                    className={`btn-primary ${styles.submitBtn}`}
                    disabled={status === 'loading'}
                  >
                    {status === 'loading' ? (
                      <>
                        <Loader2 className={styles.spinner} size={18} />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send size={18} />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
