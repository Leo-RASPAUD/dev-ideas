const { CognitoUserPool, CognitoUserAttribute } = require('amazon-cognito-identity-js');
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
    const dataEmail = { Name: 'email', Value: email };

    try {
        const attributeList = [];
        const attributeEmail = new CognitoUserAttribute(dataEmail);
        attributeList.push(attributeEmail);

        const userPool = new CognitoUserPool({
            UserPoolId: process.env.COGNITO_USER_POOL_ID,
            ClientId: process.env.COGNITO_CLIENT_ID,
        });

        const resultPromise = await new Promise((resolve, reject) => {
            userPool.signUp(email, password, attributeList, null, error => {
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
