process.env.NODE_ENV = "test";

const request = require("supertest");
const db = require("../db");
const app = require("../app");
const Book = require("../models/book");


describe("Test Book class", function () {

    beforeEach(async function () {
      await db.query("DELETE FROM books");
      
  
      let b1 = await Book.create({
       book:{
        isbn: "0691161510",
        amazon_url: "http://a.co/eobPtX2",
        author: "Matthew Lane",
        language: "english",
        pages: 264,
        publisher: "Princeton University Press",
        title: "Power-Up: Unlocking Hidden Math in Video Games",
        year: 2017


        }
        }
      );
      let b2 = await Book.create({
        book:{
         isbn: "0691161518",
         amazon_url: "http://a.co/eobPtX2",
         author: "Matthew Lane",
         language: "english",
         pages: 266,
         publisher: "Princeton University Press",
         title: "Power-Up: Unlocking Hidden Math in Video Games",
         year: 2019
 
 
         }
         }
       );

    });



    test("Can create book", async function() {

        let b3 = await Book.create({
            book:{
             isbn: "0691161519",
             amazon_url: "http://a.co/eobPtX2",
             author: "Matthew Lane",
             language: "english",
             pages: 266,
             publisher: "Princeton University Press",
             title: "Power-Up: Unlocking Hidden Math in Video Games",
             year: 2020
     
     
             }
             }
           );

           expect(b3).toEqual({

            isbn: "0691161519",
            amazon_url: "http://a.co/eobPtX2",
            author: "Matthew Lane",
            language: "english",
            pages: 266,
            publisher: "Princeton University Press",
            title: "Power-Up: Unlocking Hidden Math in Video Games",
            year: 2020


           });

    });


    test("Can update book", async function() {

        let b3 = await Book.update("0691161518",{
            book:{
             isbn: "0691161519",
             amazon_url: "http://a.co/eobPtX2",
             author: "Matthew Lane",
             language: "english",
             pages: 266,
             publisher: "Princeton University Press",
             title: "Power-Up: Unlocking Hidden Math in Video Games",
             year: 2021
     
     
             }
             }
           );

           expect(b3).toEqual({

            isbn: "0691161518",
            amazon_url: "http://a.co/eobPtX2",
            author: "Matthew Lane",
            language: "english",
            pages: 266,
            publisher: "Princeton University Press",
            title: "Power-Up: Unlocking Hidden Math in Video Games",
            year: 2021


           });

    });

});


describe("Books Routes Test", function () {

    beforeEach(async function () {
        await db.query("DELETE FROM books");
        
    
        let b1 = await Book.create({
         book:{
          isbn: "0691161510",
          amazon_url: "http://a.co/eobPtX2",
          author: "Matthew Lane",
          language: "english",
          pages: 264,
          publisher: "Princeton University Press",
          title: "Power-Up: Unlocking Hidden Math in Video Games",
          year: 2017
  
  
          }
          }
        );
        let b2 = await Book.create({
          book:{
           isbn: "0691161518",
           amazon_url: "http://a.co/eobPtX2",
           author: "Matthew Lane",
           language: "english",
           pages: 266,
           publisher: "Princeton University Press",
           title: "Power-Up: Unlocking Hidden Math in Video Games",
           year: 2019
   
   
           }
           }
         );
  
      });


      /** POST /books/  */
      test("can create books", async function () {
        let response = await request(app)
          .post("/books")
          .send({book:{
            isbn: "0691161525",
            amazon_url: "http://a.co/eobPtX2",
            author: "Matthew Lane",
            language: "english",
            pages: 266,
            publisher: "Princeton University Press",
            title: "Power-Up: Unlocking Hidden Math in Video Games",
            year: 2019
          }});


          let results = response.body;

          expect(results).toEqual(
            {book:
            {
                isbn: "0691161525",
                amazon_url: "http://a.co/eobPtX2",
                author: "Matthew Lane",
                language: "english",
                pages: 266,
                publisher: "Princeton University Press",
                title: "Power-Up: Unlocking Hidden Math in Video Games",
                year: 2019
              }
            }



          );
      
        });


       /** POST /books/ => missing field  */
      test("can create books", async function () {
        let response = await request(app)
          .post("/books")
          .send({book:{
            
            amazon_url: "http://a.co/eobPtX2",
            author: "Matthew Lane",
            language: "english",
            pages: 266,
            publisher: "Princeton University Press",
            title: "Power-Up: Unlocking Hidden Math in Video Games",
            year: 2019
          }});


          let results = await response.body;

          

          expect(results).toEqual(
            {
                error: {
                    message: [
                        "instance.book requires property \"isbn\""
                    ],
                    status: 400
                },
                message: [
                    "instance.book requires property \"isbn\""
                ]
            }
          );
      
        });




               /** POST /books/ => invalid field value  */
      test("can create books", async function () {
        let response = await request(app)
          .post("/books")
          .send({book:{
            isbn: "0691161525",
            amazon_url: "http://a.co/eobPtX2",
            author: "Matthew Lane",
            language: "english",
            pages: "266",
            publisher: "Princeton University Press",
            title: "Power-Up: Unlocking Hidden Math in Video Games",
            year: 2019
          }});


          let results = await response.body;

          

          expect(results).toEqual(
            {
                error: {
                    message: [
                        "instance.book.pages is not of a type(s) integer"
                    ],
                    status: 400
                },
                message: [
                    "instance.book.pages is not of a type(s) integer"
                ]
            }
          );
      
        });




              /** PUT /books/:isbn  */
      test("can udpate book", async function () {
        let response = await request(app)
          .put("/books/0691161518")
          .send({book:{
            isbn: "0691161518",
            amazon_url: "http://a.co/eobPtX2",
            author: "Matthew Lane",
            language: "english",
            pages: 266,
            publisher: "Princeton University Press",
            title: "Power-Up: Unlocking Hidden Math in Video Games",
            year: 2021
          }});


          let results = response.body;

          expect(results).toEqual(
            {book:
            {
                isbn: "0691161518",
                amazon_url: "http://a.co/eobPtX2",
                author: "Matthew Lane",
                language: "english",
                pages: 266,
                publisher: "Princeton University Press",
                title: "Power-Up: Unlocking Hidden Math in Video Games",
                year: 2021
              }
            }



          );
      
        });

      
       /** GET /books/  */
      test("can get all books", async function () {
        let response = await request(app)
          .get("/books");


          let results = response.body;

          expect(results).toStrictEqual(
       
            {books: [{amazon_url: "http://a.co/eobPtX2", 
                    author: "Matthew Lane", 
                    isbn: "0691161510", 
                    language: "english", 
                    pages: 264, 
                    publisher: "Princeton University Press", 
                    title: "Power-Up: Unlocking Hidden Math in Video Games", 
                    year: 2017}, 
                    {amazon_url: "http://a.co/eobPtX2", 
                    author: "Matthew Lane", 
                    isbn: "0691161518", 
                    language: "english", 
                    pages: 266, 
                    publisher: "Princeton University Press", 
                    title: "Power-Up: Unlocking Hidden Math in Video Games", 
                    year: 2019}
                    ]}
          );
      
        });

    });


afterAll(async function() {
    await db.end();
  });
