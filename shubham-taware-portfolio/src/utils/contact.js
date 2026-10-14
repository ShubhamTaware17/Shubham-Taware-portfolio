export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export const LIMITS = {
  nameMin: 2,
  name: 80,
  email: 254,
  messageMin: 10,
  message: 2000,
};

/** Returns an object with one message per invalid field. An empty object means valid. */
export function validateContact({ name, email, message }) {
  const errors = {};
  const cleanName = name.trim();
  const cleanEmail = email.trim();
  const cleanMessage = message.trim();

  if (!cleanName) {
    errors.name = 'Please enter your name.';
  } else if (cleanName.length < LIMITS.nameMin) {
    errors.name = `Name should be at least ${LIMITS.nameMin} characters.`;
  }

  if (!cleanEmail) {
    errors.email = 'Please enter your email address.';
  } else if (cleanEmail.length > LIMITS.email || !EMAIL_PATTERN.test(cleanEmail)) {
    errors.email = 'Enter a valid email address, for example name@domain.com.';
  }

  if (!cleanMessage) {
    errors.message = 'Please write a message.';
  } else if (cleanMessage.length < LIMITS.messageMin) {
    const remaining = LIMITS.messageMin - cleanMessage.length;
    errors.message = `Add ${remaining} more character${remaining === 1 ? '' : 's'} to your message.`;
  }

  return errors;
}

/** Posts the form as JSON with a timeout. Resolves on a 2xx response and throws otherwise. */
export async function sendContact(endpoint, payload) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 15000);
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }
    return true;
  } finally {
    clearTimeout(timer);
  }
}
