export const formatPhone = (phone: string) => {
  phone = phone.trim();
  if (phone.startsWith('+38')) {
    phone = phone.slice(3);
  }
  phone = phone.replace(/ /g, '');
  return phone;
};
