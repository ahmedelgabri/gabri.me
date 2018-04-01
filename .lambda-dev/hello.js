export function handler(event, context, callback) {
  console.log(event)
  callback(null, {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify({ msg: 'Hello, World!' }),
  })
}
