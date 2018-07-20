const cognitoPoolData = {
    UserPoolId: process.env.COGNITO_USER_POOL_ID,
    ClientId: process.env.COGNITO_CLIENT_ID,
};

export default {
    cognitoPoolData,
};
