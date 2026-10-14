import { useState } from 'react';
import { AnimatePresence, motion, useAnimate } from 'framer-motion';
import { FaPaperPlane } from 'react-icons/fa6';
import { contact, isConfiguredEmail, isConfiguredUrl } from '../config/site.js';
import { LIMITS, sendContact, validateContact } from '../utils/contact.js';
import { renderPlaceholders } from '../utils/placeholders.jsx';

const EMPTY_VALUES = { name: '', email: '', message: '', website: '' };

function Field({ name, label, error, as = 'input', type = 'text', maxLength, value, onChange, onBlur, autoComplete }) {
  const id = `contact-${name}`;
  const errorId = `${id}-error`;
  const Control = as;

  return (
    <div className={`field${error ? ' is-invalid' : ''}`} data-field={name}>
      <Control
        id={id}
        name={name}
        type={as === 'input' ? type : undefined}
        placeholder=" "
        value={value}
        maxLength={maxLength}
        autoComplete={autoComplete}
        onChange={onChange}
        onBlur={onBlur}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={error ? errorId : undefined}
      />
      <label htmlFor={id}>{label}</label>
      <p id={errorId} className="field__error">
        {error ?? ''}
      </p>
    </div>
  );
}

function SuccessPanel({ onReset }) {
  return (
    <motion.div
      className="success"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      role="status"
    >
      <motion.svg viewBox="0 0 64 64" className="success__icon" aria-hidden="true">
        <motion.circle
          cx="32"
          cy="32"
          r="30"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.8 }}
        />
        <motion.path
          d="M20 33 L28 41 L44 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        />
      </motion.svg>
      <h3 className="success__title">Message sent</h3>
      <p>Thank you for getting in touch. I will reply as soon as I can.</p>
      <button type="button" className="btn btn--ghost btn--sm" onClick={onReset}>
        Send another message
      </button>
    </motion.div>
  );
}

export default function ContactForm() {
  const [values, setValues] = useState(EMPTY_VALUES);
  const [touched, setTouched] = useState({});
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [status, setStatus] = useState('idle'); // idle | sending | success | error | unconfigured
  const [errorMessage, setErrorMessage] = useState('');
  const [scope, animate] = useAnimate();

  // Errors are derived from the values, so they never drift out of sync.
  const errors = validateContact(values);
  const showError = (field) => (touched[field] || submitAttempted ? errors[field] : undefined);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((previous) => ({ ...previous, [name]: value }));
    if (status === 'error') setStatus('idle');
  };

  const handleBlur = (event) => {
    const { name } = event.target;
    setTouched((previous) => ({ ...previous, [name]: true }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitAttempted(true);

    const invalidFields = Object.keys(errors);
    if (invalidFields.length > 0) {
      const first = scope.current?.querySelector(`[name="${invalidFields[0]}"]`);
      first?.focus();
      invalidFields.forEach((field) => {
        animate(`[data-field="${field}"]`, { x: [0, -8, 8, -6, 6, 0] }, { duration: 0.45 });
      });
      return;
    }

    // Honeypot: real visitors never fill this hidden field. Bots that do get a silent success.
    if (values.website) {
      setStatus('success');
      return;
    }

    if (!isConfiguredUrl(contact.endpoint)) {
      setStatus('unconfigured');
      return;
    }

    setStatus('sending');
    setErrorMessage('');
    try {
      await sendContact(contact.endpoint, {
        name: values.name.trim(),
        email: values.email.trim(),
        message: values.message.trim(),
        _subject: `Portfolio message from ${values.name.trim()}`,
      });
      setStatus('success');
      setValues(EMPTY_VALUES);
      setTouched({});
      setSubmitAttempted(false);
    } catch (error) {
      setStatus('error');
      setErrorMessage(
        error.name === 'AbortError'
          ? 'The request took too long. Please check your connection and try again.'
          : 'Your message could not be sent. Please try again in a moment.',
      );
    }
  };

  const resetForm = () => {
    setStatus('idle');
    setSubmitAttempted(false);
  };

  if (status === 'success') {
    return (
      <div className="contact__card">
        <AnimatePresence mode="wait">
          <SuccessPanel key="success" onReset={resetForm} />
        </AnimatePresence>
      </div>
    );
  }

  const isSending = status === 'sending';

  return (
    <div className="contact__card">
      <form
        ref={scope}
        className="contact-form"
        onSubmit={handleSubmit}
        noValidate
        aria-busy={isSending}
        aria-describedby="contact-form-status"
      >
        <Field
          name="name"
          label="Your name"
          autoComplete="name"
          maxLength={LIMITS.name}
          value={values.name}
          error={showError('name')}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <Field
          name="email"
          label="Email address"
          type="email"
          autoComplete="email"
          maxLength={LIMITS.email}
          value={values.email}
          error={showError('email')}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <Field
          name="message"
          label="Your message"
          as="textarea"
          maxLength={LIMITS.message}
          value={values.message}
          error={showError('message')}
          onChange={handleChange}
          onBlur={handleBlur}
        />

        <div className="contact-form__meta">
          <span className="contact-form__count" aria-hidden="true">
            {values.message.length}/{LIMITS.message}
          </span>
        </div>

        {/* Hidden from people and screen readers. Bots tend to fill every input. */}
        <div className="hp" aria-hidden="true">
          <label>
            Website
            <input
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              value={values.website}
              onChange={handleChange}
            />
          </label>
        </div>

        <div id="contact-form-status" className="contact-form__status" role="status" aria-live="polite">
          {status === 'unconfigured' && (
            <p className="notice">
              Messages can&apos;t be sent from this version of the site yet. Please email me at{' '}
              {isConfiguredEmail(contact.email) ? (
                <a href={`mailto:${contact.email}`}>{contact.email}</a>
              ) : (
                renderPlaceholders(contact.email)
              )}
              .
            </p>
          )}
          {status === 'error' && <p className="notice notice--error">{errorMessage}</p>}
        </div>

        <button type="submit" className={`btn btn--primary contact-form__submit${isSending ? ' is-sending' : ''}`} disabled={isSending}>
          {isSending ? (
            <>
              <span className="spinner" aria-hidden="true" />
              Sending…
            </>
          ) : (
            <>
              Send message
              <FaPaperPlane aria-hidden="true" />
            </>
          )}
        </button>
      </form>
    </div>
  );
}
