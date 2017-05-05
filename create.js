
const models = require('./models')
models.User.sync({ force: false })
models.Rating.sync({ force: false })
models.Dispute.sync({ force: false })
models.Photo.sync({ force: false })
models.Tag.sync({ force: false })

var users = [
  {
    "name": "Blevins Casey",
    "email": "blevinscasey@caxt.com",
    "password": "1234",
    "description": "Eu sunt ea aliquip nisi occaecat quis irure laborum. Ea nisi incididunt nisi veniam duis elit aliqua ut deserunt laboris non officia. Occaecat aliqua eu laboris velit officia ut et voluptate ut aute laboris excepteur. Nulla minim laboris eu dolor cupidatat commodo. Cupidatat et dolore magna aute aliquip nisi sint irure enim dolor quis occaecat commodo."
  },
  {
    "name": "Lambert Simon",
    "email": "lambertsimon@caxt.com",
    "password": "1234",
    "description": "Velit laboris ex occaecat ut amet magna commodo exercitation. Fugiat eiusmod minim id velit ex proident. Ea fugiat deserunt eiusmod aliquip. Sunt id ad minim sint."
  },
  {
    "name": "Bobbi Hobbs",
    "email": "bobbihobbs@caxt.com",
    "password": "1234",
    "description": "Ex non magna culpa proident nostrud excepteur laboris qui. Dolor ut ad consequat qui anim commodo quis nostrud irure ullamco nulla pariatur cupidatat dolore. Aliqua ut eu occaecat culpa irure esse anim tempor nulla magna id irure officia. Ut et ipsum eiusmod et do sint dolor eu ipsum. Duis commodo consequat elit cillum et pariatur magna id aute excepteur fugiat dolor. Ipsum voluptate officia non ad irure enim qui sunt commodo non elit laboris deserunt sint."
  },
  {
    "name": "Marla Mclaughlin",
    "email": "marlamclaughlin@caxt.com",
    "password": "1234",
    "description": "Id amet qui ullamco sit dolore do cillum anim enim. Incididunt esse consequat id aliquip eu amet ea adipisicing esse. Tempor excepteur cupidatat ullamco reprehenderit laborum officia magna. Aliquip proident velit qui fugiat ad tempor qui culpa sit cupidatat. Proident velit adipisicing non dolore occaecat Lorem laborum anim tempor sit. Laboris ea dolor occaecat dolor."
  },
  {
    "name": "Bonita Sherman",
    "email": "bonitasherman@caxt.com",
    "password": "1234",
    "description": "Est velit mollit tempor ad sit aute. Sit eu incididunt ex laboris enim est ex ipsum. Sint nisi cupidatat ad ipsum nulla irure duis ipsum irure. Consectetur tempor ipsum amet ea sunt eiusmod magna non. Quis consectetur irure cupidatat irure qui do nulla culpa."
  },
  {
    "name": "Zelma Livingston",
    "email": "zelmalivingston@caxt.com",
    "password": "1234",
    "description": "Lorem minim cupidatat est nostrud aliquip tempor cupidatat incididunt cillum magna. Excepteur sunt exercitation fugiat sit id aute. Aliqua reprehenderit tempor in reprehenderit pariatur. Non duis minim ullamco nulla et officia. Lorem est occaecat excepteur nulla ex aute id consectetur commodo dolore non officia exercitation."
  },
  {
    "name": "Banks Middleton",
    "email": "banksmiddleton@caxt.com",
    "password": "1234",
    "description": "Esse ex qui pariatur minim duis occaecat id consequat consequat ipsum do cillum laboris pariatur. Ipsum ullamco magna irure ipsum deserunt qui excepteur cillum. Laborum nulla proident officia sit velit dolor adipisicing non est ullamco qui dolor ex incididunt. Exercitation pariatur est cupidatat sit cillum."
  },
  {
    "name": "Sharpe Clark",
    "email": "sharpeclark@caxt.com",
    "password": "1234",
    "description": "Veniam proident laborum esse nulla tempor dolor sint enim reprehenderit enim. Ea enim Lorem voluptate et commodo reprehenderit reprehenderit ex. Laboris occaecat dolor eu mollit proident quis magna quis et velit est sunt consequat id. In cupidatat anim Lorem deserunt ea labore sunt fugiat minim reprehenderit commodo. Minim reprehenderit deserunt ut esse consequat sint eiusmod cupidatat voluptate voluptate culpa veniam sint."
  },
  {
    "name": "Hester Mcmahon",
    "email": "hestermcmahon@caxt.com",
    "password": "1234",
    "description": "Labore ullamco est tempor deserunt aute exercitation aliqua aute duis ad Lorem eiusmod ipsum. Qui do tempor aliqua nulla excepteur incididunt duis esse qui. Nulla cillum mollit cupidatat magna cupidatat commodo do. Ea id et deserunt aute aute cupidatat excepteur duis exercitation sint. Ut dolore nulla labore tempor elit labore magna ex elit eiusmod occaecat sint dolore ea. Voluptate laboris irure excepteur veniam dolor irure. Veniam occaecat Lorem ea ullamco Lorem do id consequat laboris Lorem."
  },
  {
    "name": "Della Myers",
    "email": "dellamyers@caxt.com",
    "password": "1234",
    "description": "Aute sunt pariatur cillum laborum. Dolor non laboris ut mollit adipisicing officia nostrud occaecat sunt esse sunt deserunt incididunt sit. Ipsum dolor cillum tempor velit consectetur. Sunt enim minim aliquip magna excepteur tempor. Cillum labore sit mollit amet sit culpa nisi Lorem non consectetur cupidatat."
  },
  {
    "name": "Grimes Flynn",
    "email": "grimesflynn@caxt.com",
    "password": "1234",
    "description": "Aliqua adipisicing ex veniam eu laboris. Voluptate consectetur consectetur labore sit Lorem minim minim qui sit. Nostrud occaecat est reprehenderit adipisicing quis. Pariatur Lorem velit nisi do fugiat occaecat nulla cupidatat eu velit."
  },
  {
    "name": "Lynda West",
    "email": "lyndawest@caxt.com",
    "password": "1234",
    "description": "In aliqua quis sit irure consequat sint eiusmod dolor qui. Consequat id sunt fugiat deserunt. Dolor officia laborum magna officia commodo eu reprehenderit est magna velit. Duis adipisicing irure cupidatat nulla irure nisi enim sunt officia veniam veniam aliqua. Magna dolor commodo laborum dolor veniam excepteur culpa consectetur tempor dolor labore duis mollit. Tempor tempor culpa commodo dolor qui duis eiusmod id mollit adipisicing cupidatat."
  },
  {
    "name": "Lolita Lamb",
    "email": "lolitalamb@caxt.com",
    "password": "1234",
    "description": "Eiusmod occaecat cillum officia mollit eu non in ipsum labore irure. Mollit nisi sunt veniam incididunt velit ea commodo excepteur qui excepteur. Laborum eu duis pariatur eiusmod cillum. Veniam qui ullamco mollit pariatur voluptate. Lorem laborum officia laboris est deserunt ullamco eu. Nulla reprehenderit magna esse exercitation elit laboris mollit incididunt."
  },
  {
    "name": "Francisca Snow",
    "email": "franciscasnow@caxt.com",
    "password": "1234",
    "description": "Et fugiat esse Lorem ipsum cupidatat Lorem nostrud culpa ex. Amet commodo eu exercitation cupidatat enim ea dolor irure tempor eu enim adipisicing duis dolore. Dolore nisi voluptate voluptate proident irure qui excepteur sunt quis."
  },
  {
    "name": "Hudson England",
    "email": "hudsonengland@caxt.com",
    "password": "1234",
    "description": "Enim magna pariatur commodo magna irure consectetur officia in quis nisi cillum magna minim. Ut minim est mollit ullamco nulla sint mollit anim do irure sit eiusmod non elit. Id id irure laborum elit magna reprehenderit sunt exercitation cupidatat. Dolore veniam eu ut laboris non pariatur excepteur duis. Consectetur culpa ut aliqua irure sit non esse cupidatat. Irure exercitation adipisicing nulla ex aliquip."
  },
  {
    "name": "Tamera Horton",
    "email": "tamerahorton@caxt.com",
    "password": "1234",
    "description": "Ad et aute sint eu ut aliquip nostrud magna dolore est. Pariatur minim magna voluptate exercitation. Quis eu cillum nisi nisi elit nulla ut proident aliqua. Excepteur sunt quis magna enim culpa proident officia do reprehenderit do. Exercitation excepteur veniam aliquip eu eiusmod labore et laborum exercitation. Sit incididunt anim veniam tempor ex sint culpa eu ipsum sint pariatur ut."
  },
  {
    "name": "Eloise Mckenzie",
    "email": "eloisemckenzie@caxt.com",
    "password": "1234",
    "description": "Dolore in non elit esse laborum occaecat quis. Nisi aute consequat proident nostrud veniam fugiat pariatur laborum sint id. Consectetur ipsum ex laboris ex Lorem. Cillum Lorem proident pariatur eu dolore eiusmod cupidatat aliqua aute."
  },
  {
    "name": "Benita Cameron",
    "email": "benitacameron@caxt.com",
    "password": "1234",
    "description": "Excepteur esse elit ea officia quis Lorem commodo labore non aute culpa laborum id. Fugiat id esse mollit nulla occaecat. Aute ut voluptate in esse."
  },
  {
    "name": "Stanley Anthony",
    "email": "stanleyanthony@caxt.com",
    "password": "1234",
    "description": "Ipsum enim nulla pariatur velit laborum aute ipsum aute. Sit mollit tempor aliquip ipsum. Ea officia commodo nulla fugiat eu in. Sit excepteur eiusmod sit sint consequat laborum."
  },
  {
    "name": "Hampton Schultz",
    "email": "hamptonschultz@caxt.com",
    "password": "1234",
    "description": "Occaecat enim cupidatat consequat irure velit minim laborum adipisicing laborum. Excepteur magna pariatur culpa aliquip aute cillum anim ipsum occaecat exercitation sint est duis excepteur. Aute enim ea nisi tempor magna nostrud eu duis dolore fugiat excepteur adipisicing. Et mollit est dolor nisi. Esse occaecat sunt et non anim. Magna nostrud consectetur do quis Lorem fugiat deserunt."
  },
  {
    "name": "Heather Travis",
    "email": "heathertravis@caxt.com",
    "password": "1234",
    "description": "Labore enim exercitation mollit non ullamco excepteur eiusmod. Ullamco quis officia Lorem sunt aliqua nostrud anim Lorem exercitation reprehenderit consequat reprehenderit anim. Consequat incididunt fugiat labore nisi Lorem cillum labore. Veniam cupidatat nulla cupidatat laboris incididunt irure ut aute quis ea. Aliqua magna incididunt qui duis mollit nisi occaecat. Dolore ut incididunt magna esse dolore mollit reprehenderit do nisi proident."
  },
  {
    "name": "Jean Randall",
    "email": "jeanrandall@caxt.com",
    "password": "1234",
    "description": "Ullamco dolore cupidatat dolor aliqua est consequat cupidatat sunt Lorem. Culpa elit id eiusmod ex ullamco veniam. Quis amet aliqua nisi id deserunt ex nisi pariatur enim. Sint pariatur exercitation sit in qui. Ad cillum excepteur labore aliqua minim ad anim incididunt esse laboris."
  },
  {
    "name": "Bowman Clarke",
    "email": "bowmanclarke@caxt.com",
    "password": "1234",
    "description": "Ea ex commodo officia eiusmod nostrud do eiusmod. Amet amet sit consectetur incididunt laboris reprehenderit sint dolor nisi deserunt sint sit enim. Eu do proident culpa do nulla in culpa esse ea."
  },
  {
    "name": "Park Long",
    "email": "parklong@caxt.com",
    "password": "1234",
    "description": "Dolor ipsum dolor dolor aliqua nulla pariatur proident dolore cillum. Lorem proident magna ea do do nulla proident pariatur officia amet ad. Exercitation exercitation eu est elit."
  },
  {
    "name": "Humphrey Hampton",
    "email": "humphreyhampton@caxt.com",
    "password": "1234",
    "description": "Non nostrud laborum sint ullamco est minim anim ad pariatur deserunt sint proident proident. Ut sit sint laborum labore excepteur sint enim non proident mollit adipisicing do ad. Culpa ipsum dolor aute do eiusmod reprehenderit. Tempor Lorem occaecat eiusmod sint laboris non ad elit mollit. Et labore dolor laborum voluptate aliqua ex elit duis tempor et dolor labore esse. Adipisicing incididunt ex incididunt tempor tempor cillum ea minim laboris exercitation."
  },
  {
    "name": "Wong Johnston",
    "email": "wongjohnston@caxt.com",
    "password": "1234",
    "description": "Id cupidatat quis pariatur duis eiusmod excepteur elit cillum consequat fugiat esse incididunt pariatur. Pariatur sint tempor magna sunt qui tempor fugiat incididunt ullamco officia cillum exercitation. Ea labore ullamco proident voluptate consectetur anim occaecat ex eu tempor exercitation. Nulla officia ea ipsum eu id amet eiusmod ea ex cupidatat cupidatat. Pariatur duis nisi aliqua reprehenderit excepteur dolore do velit minim et deserunt officia incididunt nostrud."
  },
  {
    "name": "Kirby Guy",
    "email": "kirbyguy@caxt.com",
    "password": "1234",
    "description": "Occaecat ad elit sunt nulla Lorem voluptate aute sunt deserunt non proident incididunt occaecat excepteur. Laboris reprehenderit consectetur deserunt quis. Dolor incididunt est laboris eiusmod non ipsum proident reprehenderit in sint quis anim. Et sit non eiusmod enim quis eu consectetur. Laboris ipsum pariatur cillum excepteur officia laboris ea enim non consectetur laborum elit eu ad. Commodo velit sit aliqua eiusmod tempor laborum irure."
  },
  {
    "name": "Marian Shaffer",
    "email": "marianshaffer@caxt.com",
    "password": "1234",
    "description": "Ut dolor aliquip aute fugiat occaecat irure nulla qui velit sit velit aute dolore aute. Ea sit id voluptate tempor. Cillum in fugiat culpa ad veniam duis. Cupidatat ad labore duis irure."
  },
  {
    "name": "Reese Guerrero",
    "email": "reeseguerrero@caxt.com",
    "password": "1234",
    "description": "Lorem id officia occaecat excepteur officia ea est sint consectetur commodo. Nostrud proident anim eiusmod irure dolor sunt dolore ut nulla enim qui sit. Occaecat proident officia minim voluptate ut est qui occaecat in dolore dolor nisi consectetur. Incididunt nostrud fugiat proident deserunt non pariatur minim. Veniam eu aliqua mollit qui magna qui velit officia et."
  },
  {
    "name": "Greer Kinney",
    "email": "greerkinney@caxt.com",
    "password": "1234",
    "description": "Dolor excepteur ut minim aliquip adipisicing duis quis. Do mollit reprehenderit pariatur reprehenderit et irure est anim eiusmod est cupidatat. Nostrud veniam do exercitation eiusmod cillum id sunt mollit tempor ea eiusmod."
  },
  {
    "name": "Christian Palmer",
    "email": "christianpalmer@caxt.com",
    "password": "1234",
    "description": "Pariatur commodo occaecat ut dolor. Consequat labore nostrud voluptate esse mollit fugiat magna amet velit amet magna nostrud. Lorem aute aliquip adipisicing nulla ut ut irure eiusmod labore ipsum ut minim ex non. Magna elit reprehenderit mollit Lorem quis veniam officia esse fugiat. Eu consectetur est aute labore occaecat amet tempor."
  },
  {
    "name": "Lina Craig",
    "email": "linacraig@caxt.com",
    "password": "1234",
    "description": "Cillum sint consequat ipsum veniam nisi laborum incididunt deserunt. Dolore deserunt aliqua dolor sit. Id exercitation ex sit sunt est do laborum est pariatur."
  },
  {
    "name": "Viola Adams",
    "email": "violaadams@caxt.com",
    "password": "1234",
    "description": "Anim id laborum veniam aliquip anim voluptate commodo amet nulla dolore culpa excepteur nulla consectetur. Culpa laboris dolor ex amet sunt proident. Voluptate in culpa officia do. Excepteur tempor in dolore occaecat dolore proident velit ipsum eiusmod amet culpa qui eu dolore. Id exercitation sit ullamco eu ullamco aute cupidatat aute irure nostrud quis ex labore."
  },
  {
    "name": "Rochelle Crane",
    "email": "rochellecrane@caxt.com",
    "password": "1234",
    "description": "Elit consectetur mollit dolor in consequat do exercitation pariatur. Id duis enim in tempor cupidatat sit adipisicing commodo. Incididunt incididunt sint in nulla labore. Ea ex ad consectetur eiusmod. Magna sit minim voluptate voluptate amet amet eiusmod dolore sint excepteur incididunt magna et. Aliquip enim do aliqua consequat fugiat dolor anim minim."
  },
  {
    "name": "Boyd Curry",
    "email": "boydcurry@caxt.com",
    "password": "1234",
    "description": "Ea exercitation aliqua fugiat exercitation minim sint exercitation. Ullamco adipisicing adipisicing nisi do cupidatat non. Aliqua ut incididunt nisi laborum laboris ullamco et adipisicing sit. Voluptate fugiat dolor consequat aliquip. Et irure aliqua magna ea aliqua dolore anim ex quis minim officia eiusmod do culpa. Occaecat nisi reprehenderit est sunt occaecat. Amet deserunt nostrud sunt aliquip."
  },
  {
    "name": "Melisa Gaines",
    "email": "melisagaines@caxt.com",
    "password": "1234",
    "description": "Ut laboris do tempor pariatur non consequat eiusmod dolore amet officia ut adipisicing incididunt mollit. Laboris fugiat id consequat eu exercitation eu. Dolore velit fugiat velit duis nisi mollit anim ex cillum."
  },
  {
    "name": "Cotton Cohen",
    "email": "cottoncohen@caxt.com",
    "password": "1234",
    "description": "Incididunt fugiat laborum commodo ullamco sunt. Irure voluptate aute ullamco ullamco veniam anim aliquip quis nisi do dolore fugiat excepteur. Reprehenderit esse adipisicing duis ex ea laboris aute qui esse laborum labore. Sint eu nulla ad duis culpa anim nisi proident adipisicing enim deserunt esse. Amet excepteur labore dolor qui anim tempor id ut eiusmod fugiat et id qui ex. Laboris elit ipsum magna dolore quis cupidatat proident. Ad ipsum ipsum cupidatat aute non in consequat."
  },
  {
    "name": "Leola Small",
    "email": "leolasmall@caxt.com",
    "password": "1234",
    "description": "Pariatur sit exercitation cillum ex laborum irure laborum amet ad nostrud exercitation. Adipisicing ad nulla consequat aliqua. Magna est cillum magna in nulla. Non irure quis laborum irure occaecat."
  },
  {
    "name": "Horn Patrick",
    "email": "hornpatrick@caxt.com",
    "password": "1234",
    "description": "Non enim Lorem nisi cillum non ut amet. Esse ullamco culpa excepteur consequat pariatur enim incididunt. Tempor elit et ad anim quis cillum incididunt aliqua. Culpa elit ut elit officia irure nostrud eu nisi sit ad nostrud veniam adipisicing proident. Ut anim occaecat qui minim magna proident. Commodo esse magna ad ullamco tempor. Laborum non nulla incididunt reprehenderit esse enim commodo enim irure consectetur ut."
  },
  {
    "name": "Sampson Francis",
    "email": "sampsonfrancis@caxt.com",
    "password": "1234",
    "description": "Labore ullamco nisi sunt id adipisicing aliqua laboris aliquip ullamco occaecat id consequat. Sit consequat dolor dolore velit eiusmod minim nostrud adipisicing cupidatat occaecat occaecat cupidatat nulla. Et velit cupidatat dolore nostrud nisi reprehenderit. Amet irure tempor elit laborum minim sit aliqua eiusmod deserunt elit minim incididunt id. Ut fugiat amet cupidatat fugiat ipsum do adipisicing veniam."
  },
  {
    "name": "Phyllis Heath",
    "email": "phyllisheath@caxt.com",
    "password": "1234",
    "description": "Ullamco tempor Lorem fugiat ullamco. Deserunt est labore adipisicing dolore dolore velit duis duis proident labore dolor ut ipsum. Est nisi labore do sunt nulla ut sint excepteur est deserunt. Proident exercitation commodo exercitation sint sunt laborum ex et dolore cillum enim. Dolore mollit non quis laborum id reprehenderit mollit ex fugiat labore proident esse. Culpa nulla est sunt enim et consequat. Do do do Lorem voluptate cillum occaecat."
  },
  {
    "name": "Maude Lynch",
    "email": "maudelynch@caxt.com",
    "password": "1234",
    "description": "Ad fugiat nostrud magna occaecat labore nostrud labore Lorem do qui dolore. Dolor mollit officia ut esse laborum occaecat exercitation commodo aliquip nostrud sint et aliqua. Eu dolor velit et irure veniam eiusmod qui cillum non ipsum aute nostrud sunt id. Est officia dolore laboris non aliquip. Pariatur pariatur nostrud do cupidatat duis ex veniam qui aliqua. In est in dolor deserunt anim fugiat consequat duis magna cillum nostrud sint."
  },
  {
    "name": "Harding Sutton",
    "email": "hardingsutton@caxt.com",
    "password": "1234",
    "description": "Mollit ea nulla quis occaecat in quis laboris nisi aliquip voluptate elit. Amet duis aute nostrud velit eiusmod non sunt ad exercitation nisi amet nulla exercitation aute. Mollit adipisicing occaecat ut fugiat ex do. Aliqua quis enim magna dolore ea commodo occaecat consectetur et aute adipisicing commodo magna. Est sit irure aute laboris enim."
  },
  {
    "name": "Christine Suarez",
    "email": "christinesuarez@caxt.com",
    "password": "1234",
    "description": "Est qui dolore dolore nisi labore irure enim voluptate id nostrud voluptate. Ut nisi Lorem do magna consectetur. Cillum reprehenderit sunt ipsum culpa dolore officia excepteur Lorem sit ut aliquip est in proident. Aliqua sunt reprehenderit mollit est mollit sunt. In quis non aute sit est officia. Ea mollit dolor non sint magna consectetur."
  },
  {
    "name": "Hernandez Powers",
    "email": "hernandezpowers@caxt.com",
    "password": "1234",
    "description": "Laborum excepteur mollit nisi culpa laboris anim consequat magna. In consectetur in amet occaecat do duis culpa esse pariatur. Minim minim culpa et eiusmod anim."
  },
  {
    "name": "Chambers Arnold",
    "email": "chambersarnold@caxt.com",
    "password": "1234",
    "description": "Dolore ad laboris velit minim. Irure pariatur officia anim dolor consequat eu consectetur cillum sit incididunt. Adipisicing sunt fugiat pariatur non."
  },
  {
    "name": "Sallie Lloyd",
    "email": "sallielloyd@caxt.com",
    "password": "1234",
    "description": "Veniam ad tempor in sit sunt velit enim tempor. Dolor adipisicing incididunt commodo est ut ipsum officia veniam consequat voluptate eu tempor reprehenderit. Enim dolore quis minim labore consequat reprehenderit labore cupidatat ea ut."
  },
  {
    "name": "Mariana York",
    "email": "marianayork@caxt.com",
    "password": "1234",
    "description": "Pariatur ipsum sit labore magna minim. Amet aliqua ad irure culpa cillum fugiat sunt elit sint consequat anim sint minim nostrud. Labore sint ea ex esse et culpa quis. Exercitation cillum ut est minim consequat amet cillum dolore. Eu commodo dolor aliqua cupidatat ea enim amet laborum. Et ad eiusmod quis consequat ipsum cillum commodo cupidatat. Magna reprehenderit dolore non sunt commodo magna esse consectetur velit."
  },
  {
    "name": "Bertie Wheeler",
    "email": "bertiewheeler@caxt.com",
    "password": "1234",
    "description": "Sunt nostrud velit sunt qui et irure. Voluptate sunt reprehenderit nulla reprehenderit mollit cupidatat. Eiusmod aute tempor pariatur anim eiusmod officia cupidatat ipsum velit. Est excepteur ullamco deserunt quis laborum et voluptate incididunt aliqua est culpa esse adipisicing. Ea sunt voluptate dolor sunt labore."
  },
  {
    "name": "Allison Daniels",
    "email": "allisondaniels@caxt.com",
    "password": "1234",
    "description": "Ipsum tempor reprehenderit ullamco ad adipisicing fugiat quis proident quis magna. Mollit aliqua adipisicing minim ullamco reprehenderit. Et laborum incididunt aute commodo commodo. Id ipsum Lorem consectetur dolor deserunt velit veniam id dolore. Ea consectetur pariatur ut Lorem dolor est non nostrud ex sunt qui dolor eiusmod."
  }
]

const bcrypt = require('bcrypt-nodejs')
Promise.all(users.map( user => {
    return models.User.create({
        name: user.name,
        email: user.email,
        password: bcrypt.hashSync(user.password),
        description: user.description
    })
    .then( result => {
        console.log('inserted: ' + JSON.stringify(result))
        return
    })
}))
.then( result => {
    console.log('total insertion: ' + result.length)
})
.catch( error => {
    console.log(JSON.stringify(error))
})
