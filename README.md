## Quoter

### system requirements
1. ms sql server
2. dotnet core 2.0
3. nodejs >= 6

### install all dependencies and run app

1. git clone https://github.com/alexeyShumakov/quoter.git
2. cd Quoter
3. dotnet restore
4. sqlcmd -S localhost -i .\CreateDb.sql
5. cd QuoterWeb
6. npm i
7. webpack
8. webpack --config webpack.config.vendor.js
9. dotnet run

### Tests

1. cd QuoterWeb
2. npm test
3. cd QuoterTests
4. dotnet test
