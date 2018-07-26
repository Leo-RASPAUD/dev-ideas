import Amplify from 'aws-amplify';

Amplify.configure({
    Auth: {
        // REQUIRED only for Federated Authentication - Amazon Cognito Identity Pool ID
        identityPoolId: 'ap-southeast-2:bf493043-1e13-4078-a3f2-8d6e1e32d842',

        // REQUIRED - Amazon Cognito Region
        region: 'ap-southeast-2',

        // OPTIONAL - Amazon Cognito User Pool ID
        userPoolId: 'ap-southeast-2_tKJNrUVsc',

        // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
        userPoolWebClientId: '5ts8m0j1qmkkkv895speeoh058',
    },
});
