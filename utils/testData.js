// utils/testData.js
module.exports = {
  validLogins: ['user_001', 'us1', 'user_0000000001'],
  validPasswords: ['password1', 'passwor1', 'a'.repeat(255) + '1'],
  invalidLogins: ['u1', 'user_00000000001', 'user@001'],
  invalidPasswords: ['passwo1', 'password', '123456789', '']
};