
const models = require('./models')
models.User.sync({ force: false })
models.Rating.sync({ force: false })
models.Dispute.sync({ force: false })
models.Photo.sync({ force: false })
models.Tag.sync({ force: false })

var users = [
  {
    "name": "Marilyn Barker",
    "email": "marilynbarker@rotodyne.com",
    "password": "1234"
  },
  {
    "name": "Prince Moreno",
    "email": "princemoreno@rotodyne.com",
    "password": "1234"
  },
  {
    "name": "Witt Roach",
    "email": "wittroach@rotodyne.com",
    "password": "1234"
  },
  {
    "name": "Woodard Clements",
    "email": "woodardclements@rotodyne.com",
    "password": "1234"
  },
  {
    "name": "Lucas Pugh",
    "email": "lucaspugh@rotodyne.com",
    "password": "1234"
  },
  {
    "name": "Valentine Miles",
    "email": "valentinemiles@rotodyne.com",
    "password": "1234"
  },
  {
    "name": "Lela Prince",
    "email": "lelaprince@rotodyne.com",
    "password": "1234"
  },
  {
    "name": "Minerva Benjamin",
    "email": "minervabenjamin@rotodyne.com",
    "password": "1234"
  },
  {
    "name": "Roxanne Dickerson",
    "email": "roxannedickerson@rotodyne.com",
    "password": "1234"
  },
  {
    "name": "Chandra Chambers",
    "email": "chandrachambers@rotodyne.com",
    "password": "1234"
  },
  {
    "name": "Blackwell French",
    "email": "blackwellfrench@rotodyne.com",
    "password": "1234"
  },
  {
    "name": "Olga Nichols",
    "email": "olganichols@rotodyne.com",
    "password": "1234"
  },
  {
    "name": "Webb Bush",
    "email": "webbbush@rotodyne.com",
    "password": "1234"
  },
  {
    "name": "Mcdowell Holloway",
    "email": "mcdowellholloway@rotodyne.com",
    "password": "1234"
  },
  {
    "name": "Guerra Odom",
    "email": "guerraodom@rotodyne.com",
    "password": "1234"
  },
  {
    "name": "Meredith Acevedo",
    "email": "meredithacevedo@rotodyne.com",
    "password": "1234"
  },
  {
    "name": "Irwin Alford",
    "email": "irwinalford@rotodyne.com",
    "password": "1234"
  },
  {
    "name": "Morrison Clemons",
    "email": "morrisonclemons@rotodyne.com",
    "password": "1234"
  },
  {
    "name": "Singleton Bonner",
    "email": "singletonbonner@rotodyne.com",
    "password": "1234"
  },
  {
    "name": "Pacheco Nixon",
    "email": "pacheconixon@rotodyne.com",
    "password": "1234"
  },
  {
    "name": "Skinner Charles",
    "email": "skinnercharles@rotodyne.com",
    "password": "1234"
  },
  {
    "name": "Rutledge Nieves",
    "email": "rutledgenieves@rotodyne.com",
    "password": "1234"
  },
  {
    "name": "Millie Park",
    "email": "milliepark@rotodyne.com",
    "password": "1234"
  },
  {
    "name": "Beatriz Blevins",
    "email": "beatrizblevins@rotodyne.com",
    "password": "1234"
  },
  {
    "name": "Bauer Hernandez",
    "email": "bauerhernandez@rotodyne.com",
    "password": "1234"
  },
  {
    "name": "Berger Tyson",
    "email": "bergertyson@rotodyne.com",
    "password": "1234"
  },
  {
    "name": "Tia Tucker",
    "email": "tiatucker@rotodyne.com",
    "password": "1234"
  },
  {
    "name": "Harriet Thompson",
    "email": "harrietthompson@rotodyne.com",
    "password": "1234"
  },
  {
    "name": "Rosanna Rosario",
    "email": "rosannarosario@rotodyne.com",
    "password": "1234"
  },
  {
    "name": "Petersen Franks",
    "email": "petersenfranks@rotodyne.com",
    "password": "1234"
  },
  {
    "name": "Justine Buchanan",
    "email": "justinebuchanan@rotodyne.com",
    "password": "1234"
  },
  {
    "name": "Hannah Stevenson",
    "email": "hannahstevenson@rotodyne.com",
    "password": "1234"
  },
  {
    "name": "Nicole Pate",
    "email": "nicolepate@rotodyne.com",
    "password": "1234"
  },
  {
    "name": "Barnes Fitzgerald",
    "email": "barnesfitzgerald@rotodyne.com",
    "password": "1234"
  },
  {
    "name": "Dolly Simmons",
    "email": "dollysimmons@rotodyne.com",
    "password": "1234"
  },
  {
    "name": "Bass Atkinson",
    "email": "bassatkinson@rotodyne.com",
    "password": "1234"
  },
  {
    "name": "Anthony Mccall",
    "email": "anthonymccall@rotodyne.com",
    "password": "1234"
  },
  {
    "name": "Velazquez Merritt",
    "email": "velazquezmerritt@rotodyne.com",
    "password": "1234"
  },
  {
    "name": "Sharp Garrison",
    "email": "sharpgarrison@rotodyne.com",
    "password": "1234"
  },
  {
    "name": "Corrine Harper",
    "email": "corrineharper@rotodyne.com",
    "password": "1234"
  },
  {
    "name": "Penny Maldonado",
    "email": "pennymaldonado@rotodyne.com",
    "password": "1234"
  },
  {
    "name": "Rowland Stafford",
    "email": "rowlandstafford@rotodyne.com",
    "password": "1234"
  },
  {
    "name": "Ryan Mayer",
    "email": "ryanmayer@rotodyne.com",
    "password": "1234"
  },
  {
    "name": "Beverley Armstrong",
    "email": "beverleyarmstrong@rotodyne.com",
    "password": "1234"
  },
  {
    "name": "Tamara Campbell",
    "email": "tamaracampbell@rotodyne.com",
    "password": "1234"
  },
  {
    "name": "Etta Bray",
    "email": "ettabray@rotodyne.com",
    "password": "1234"
  },
  {
    "name": "Lea Guerra",
    "email": "leaguerra@rotodyne.com",
    "password": "1234"
  },
  {
    "name": "Casey Beach",
    "email": "caseybeach@rotodyne.com",
    "password": "1234"
  },
  {
    "name": "Robert Battle",
    "email": "robertbattle@rotodyne.com",
    "password": "1234"
  },
  {
    "name": "Little Marsh",
    "email": "littlemarsh@rotodyne.com",
    "password": "1234"
  }
]

const bcrypt = require('bcrypt-nodejs')
Promise.all(users.map( user => {
    return models.User.create({
        name: user.name,
        email: user.email,
        password: bcrypt.hashSync(user.password)
    })
    .then( result => {
        console.log('inserted: ' + JSON.stringify(result))
    })
}))
.then( result => {
    console.log('total insertion: ' + result.length)
})
.catch( error => {
    console.log(JSON.stringify(error))
})
