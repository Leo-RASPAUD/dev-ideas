const {
    CognitoUserSession,
    CognitoAccessToken,
    CognitoRefreshToken,
    CognitoIdToken,
    CognitoUserPool,
    CognitoUser,
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
    const { idToken, refreshToken, accessToken, username } = JSON.parse(event.body);

    const tokenData = {
        IdToken: new CognitoIdToken({ IdToken: idToken }),
        RefreshToken: new CognitoRefreshToken({ RefreshToken: refreshToken }),
        AccessToken: new CognitoAccessToken({ AccessToken: accessToken }),
    };

    const userPool = new CognitoUserPool({
        UserPoolId: process.env.COGNITO_USER_POOL_ID,
        ClientId: process.env.COGNITO_CLIENT_ID,
    });

    const session = new CognitoUserSession(tokenData);
    if (session.isValid()) {
        const userData = { Username: username, Pool: userPool };
        try {
            const cognitoUser = new CognitoUser(userData);
            return wrapResult({
                statusCode: 200,
                message: { isSessionValid: true, user: cognitoUser },
            });
        } catch (error) {
            return wrapResult({ statusCode: 500, message: error });
        }
    }
    return wrapResult({ statusCode: 200, message: { isSessionValid: false } });
};
