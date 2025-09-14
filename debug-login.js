const bcrypt = require('bcrypt');

const testPassword = async () => {
  const plaintext = 'ciudad2025';
  const hash = '$2b$12$f/Cl5ACxR5N6hE0I9TMGmOk7FXSrt75yHxUUPidRHQq1YJ.XIxYPS';
  
  console.log('Testing bcrypt comparison...');
  try {
    const result = await bcrypt.compare(plaintext, hash);
    console.log('Bcrypt comparison result:', result);
  } catch (error) {
    console.error('Bcrypt error:', error);
  }
};

testPassword();
