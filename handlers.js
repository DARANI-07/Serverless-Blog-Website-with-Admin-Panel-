const AWS = require('aws-sdk');
const db = new AWS.DynamoDB.DocumentClient();
const TABLE = process.env.BlogTableName || "BlogTable";

module.exports.getPosts = async () => {
  const res = await db.scan({ TableName: TABLE }).promise();
  return { statusCode: 200, body: JSON.stringify(res.Items) };
};

module.exports.createPost = async (evt) => {
  const { title, content } = JSON.parse(evt.body);
  const id = Date.now().toString();
  const item = { postId: id, title, content, createdAt: new Date().toISOString() };
  await db.put({ TableName: TABLE, Item: item }).promise();
  return { statusCode: 201, body: JSON.stringify(item) };
};

module.exports.deletePost = async (evt) => {
  const id = evt.pathParameters.postId;
  await db.delete({ TableName: TABLE, Key: { postId: id } }).promise();
  return { statusCode: 204 };
};
