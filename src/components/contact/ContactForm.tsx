import React from 'react';
import { useForm } from '@formspree/react';
import { contactSchema, type ContactFormData } from '../../lib/types';
import { CONTACT_INFO } from '../../lib/constants';

export default function ContactForm() {
  const [state, handleSubmit] = useForm("your-form-id");
  const [validationError, setValidationError] = React.useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    
    try {
      contactSchema.parse(data);
      setValidationError(null);
      handleSubmit(e);
    } catch (error) {
      if (error instanceof Error) {
        setValidationError(error.message);
      }
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-xl">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
        Get in Touch
      </h2>

      <form onSubmit={onSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Phone (optional)
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
          />
        </div>

        {validationError && (
          <p className="text-red-600 text-sm">{validationError}</p>
        )}

        {state.errors?.length > 0 && (
          <p className="text-red-600 text-sm">{state.errors[0].message}</p>
        )}

        {state.succeeded && (
          <p className="text-green-600 text-sm">Message sent successfully!</p>
        )}

        <button
          type="submit"
          disabled={state.submitting}
          className="w-full px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50"
        >
          {state.submitting ? 'Sending...' : 'Send Message'}
        </button>
      </form>

      <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
          Direct Contact
        </h3>
        <div className="space-y-2 text-gray-600 dark:text-gray-400">
          <p>Email: {CONTACT_INFO.email}</p>
          <p>Phone: {CONTACT_INFO.phone}</p>
        </div>
      </div>
    </div>
  );
}