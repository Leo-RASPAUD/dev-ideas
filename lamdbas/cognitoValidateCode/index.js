const { CognitoUserPool, CognitoUser } = require('amazon-cognito-identity-js');
global.fetch = require('node-fetch');

const wrapResult = ({ statusCode, message }) => ({
    statusCode,
    body: JSON.stringify(message),
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
    },
});

exports.handler = async event => {
    const { confirmationCode, email } = JSON.parse(event.body);
    const userPool = new CognitoUserPool({
        UserPoolId: process.env.COGNITO_USER_POOL_ID,
        ClientId: process.env.COGNITO_CLIENT_ID,
    });

    try {
        const userData = { Username: email, Pool: userPool };
        const cognitoUser = new CognitoUser(userData);
        const resultPromise = await new Promise((resolve, reject) => {
            cognitoUser.confirmRegistration(confirmationCode, true, error => {
                if (error) {
                    reject(error);
                }
                resolve();
            });
        });
        return wrapResult({ statusCode: 200, message: resultPromise });
    } catch (error) {
        return wrapResult({ statusCode: 500, message: error });
    }
};
