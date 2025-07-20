const awsConfig = {
  Auth: {
    region: 'YOUR_REGION',
    userPoolId: 'OUTPUT_UserPoolId',
    userPoolWebClientId: 'OUTPUT_UserPoolClientId'
  },
  API: {
    endpoints: [
      {
        name: "BlogAPI",
        endpoint: "OUTPUT_BlogApiURL"
      }
    ]
  }
};
export default awsConfig;
