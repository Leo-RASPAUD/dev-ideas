const REGION = 'ap-southeast-2';
const GRAPHQL_ENDPOINT =
    'https://kj42ipwl6jbrflav5ptiavzwp4.appsync-api.ap-southeast-2.amazonaws.com/graphql';

export default {
    Auth: {
        identityPoolId: 'ap-southeast-2:bf493043-1e13-4078-a3f2-8d6e1e32d842',
        region: REGION,
        userPoolId: 'ap-southeast-2_tKJNrUVsc',
        userPoolWebClientId: '5ts8m0j1qmkkkv895speeoh058',
    },
    aws_appsync_graphqlEndpoint: GRAPHQL_ENDPOINT,
    aws_appsync_region: REGION,
    aws_appsync_authenticationType: 'AMAZON_COGNITO_USER_POOLS',
};
