/*
 * Configuration for the local Web Server (ws)
 */
module.exports = {
  port: 17080,
  rewrite: [
    {
      from: '/app/(.*)',
      to: 'http://localhost:17070/$1'
    },
    {
      from: '/admin/(.*)',
      to: 'http://localhost:17090/$1'
    }
  ],
}
