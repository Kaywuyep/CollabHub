const bcrypt = require('bcrypt');

const testPassword = async (plainPassword, hashedPassword) => {
    try {
        const saltRounds = 10;
        
        // Hash the plain password
        const newHashedPassword = await bcrypt.hash(plainPassword, saltRounds);
        console.log("New Hashed Password:", newHashedPassword);

        // Compare the plain password with the existing hashed password
        const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
        console.log("Password Match:", isMatch);

        // Compare the plain password with the newly hashed password
        const isNewMatch = await bcrypt.compare(plainPassword, newHashedPassword);
        console.log("New Password Match:", isNewMatch);
    } catch (error) {
        console.error("Error:", error);
    }
};

const plainPassword = "pass12345";
const hashedPassword = "$2b$10$FUwh/ZDV7S9JSsyqcnGlguoIvOGwHIWOYUvcsVLMR3nU5.D85t.cm";

testPassword(plainPassword, hashedPassword);