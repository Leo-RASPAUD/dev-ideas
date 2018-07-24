const {
    CognitoUserPool,
    CognitoUser,
    AuthenticationDetails,
} = require('amazon-cognito-identity-js');
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
    const { email, password } = JSON.parse(event.body);
    const authenticationData = { Username: email, Password: password };
    const userPool = new CognitoUserPool({
        UserPoolId: process.env.COGNITO_USER_POOL_ID,
        ClientId: process.env.COGNITO_CLIENT_ID,
    });

    try {
        const userData = { Username: email, Pool: userPool };
        const cognitoUser = new CognitoUser(userData);
        const authenticationDetails = new AuthenticationDetails(authenticationData);

        const resultPromise = await new Promise((resolve, reject) => {
            cognitoUser.authenticateUser(authenticationDetails, {
                onSuccess(result) {
                    resolve(result);
                },
                onFailure(error) {
                    reject(error);
                },
            });
        });
        return wrapResult({ statusCode: 200, message: resultPromise });
    } catch (error) {
        return wrapResult({ statusCode: 500, message: error });
    }
};
