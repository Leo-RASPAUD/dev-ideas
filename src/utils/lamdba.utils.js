const baseUrl = 'https://8lnhuf2myb.execute-api.ap-southeast-2.amazonaws.com/dev-ideas';

const login = `${baseUrl}/login`;
const register = `${baseUrl}/register`;
const validateCode = `${baseUrl}/validateCode`;
const checkSession = `${baseUrl}/checkSession`;

export default {
    login,
    register,
    validateCode,
    checkSession,
};
