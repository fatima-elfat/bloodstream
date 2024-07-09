# bloodstream
<h1 align="center">
🩸 BloodStream : Using MERN STACK
</h1>
<p align="center">
MongoDB, Expressjs, Reactjs, Nodejs
</p>
notice, you need client and server runs concurrently in different terminal session, in order to make them talk to each other

## Client side 
```terminal
$ cd client          // go to client folder
$ yarn # or npm i    // npm install packages
$ npm run dev        // run it locally
```
#### Routes:

[HomePage](): "CLIENT_URL/"<br>
[BanksPage]():"CLIENT_URL/banks"<br>
[BankPage]():"CLIENT_URL/banks/:id""<br>
[ListPage]():"CLIENT_URL/donations"<br>
[SinglePage]():"CLIENT_URL/:id"<br>
[Login]():"CLIENT_URL/login"<br>
[Register]():"CLIENT_URL/register"<br>
[ProfilePage]():"CLIENT_URL/profile"<br>
[ProfileUpdatePage]():"CLIENT_URL/ProfileUpdatePage"<br>

#### MAP: leaflet
An open-source JavaScript library
for mobile-friendly interactive maps
<p align="center">
   <a href="https://github.com/Leaflet/Leaflet/blob/main/LICENSE">
      <img src="https://github.com/Leaflet/Leaflet/actions/workflows/main.yml/badge.svg" />
   </a>
   <a href="https://www.openstreetmap.org/copyright">
      <img style="height: 30px;" src="https://www.openstreetmap.org/assets/osm_logo-4b074077c29e100f40ee64f5177886e36b570d4cc3ab10c7b263003d09642e3f.svg" />
   </a>
</p>

## Server side (API)

### Prepare your secret

run the script at the first level:



```terminal
// in the root level
$ cd api
```
You need to add a  DATABASE_URL your database url, JWT_KEY to help safe transmitting of data, and CLIENT_URL your client url  in .env

### Start

```terminal
$ npm i       // npm install packages
$ npm run dev // run it locally
```
#### Routes:
[authRoute](): "/api/auth"<br>
[userRoute]():"/api/users"<br>
[techRoute]():"/api/techniciens"<br>
[bankRoute]():"/api/banks"<br>
[donationRoute]():"/api/donations"<br>
[donorRoute]():"/api/donors"<br>
[donationRecordRoute]():"/api/donationRecords"<br>
