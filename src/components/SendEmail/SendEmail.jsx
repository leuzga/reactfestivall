import emailjs from '@emailjs/browser';

const sendEmail = (to_name) => {
  const publicKey = 'jOGsLUSus5sS8gat5';
  emailjs.init(publicKey);

  const serviceId = 'service_8brf0xh';
  const templateId = 'template_2k69csx';

  const templateParams = {
    to_name: to_name,
    from_name: 'noreply@festivall.com',
    subject: 'Valida tu E-mail',
    reply_to: to_name,
  };

  // Enviar el correo electrónico
  emailjs.send(serviceId, templateId, templateParams).then(
    (response) => {
      'Correo electrónico enviado con éxito:', response.status, response.text;
    },
    (error) => {
      console.error('Error al enviar el correo electrónico:', error);
    }
  );
};

export default sendEmail;
