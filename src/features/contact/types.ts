export interface ContactFormData {
  fullName: string;
  email: string;
  subject: string;
  category: 'Collaboration' | 'AI Consultation' | 'Mentoring & Training' | 'General Inquiry';
  message: string;
}
