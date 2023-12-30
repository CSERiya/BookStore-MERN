import express from 'express';
import {Book} from '../models/bookModel.js';
const router = express.Router()

// Route for add the details
router.post('/', async (request, response) => {
    try {
          console.log('Received Request Data:', request.body);
      // if (
      //   !request.body.title ||
      //   !request.body.author ||
      //   !request.body.publishYear
        
      // ) {
      //   return response.status(400).send({
      //     message: 'Send all required fields: title, author, publishYear',
      //   });
      // }
      if (
        request.body.title === undefined ||
        request.body.author === undefined ||
        request.body.publishYear === undefined
      ) {
        return response.status(400).send({
          message: 'Send all required fields: title, author, publishYear',
        });
      }
  
      // Create new book object
      // Create new book object
const newBook = {
  title: request.body.title,
  author: request.body.author,
  publishYear: request.body.publishYear,
  // description: request.body.description || 'hii', // Set default value if not present
};

  
      // Include description if it exists
      if (request.body.description) {
        newBook.description = request.body.description;
      }
      const book = await Book.create(newBook);
      // return response.status(201).send(book);
      return response.status(201).json(book);
    } catch (error) {
      console.log(error.message);
      response.status(500).send({ message: error.message });
    }
  });

    
    // Route for Get One Book from the database by ID
    router.get('/:id', async (request, response) => {
        try {
            const { id } = request.params;
            if (!id) {
              console.log('ID is undefined.');
              return response.status(404).json({ message: 'Book not found' });
            }
      
          const book = await Book.findById(id);
      
          if (!book) {
            return response.status(404).json({ message: 'Book not found' });
          }
      
          return response.status(200).json(book);
        } catch (error) {
          console.log(error.message);
          response.status(500).send({ message: 'Internal Server Error' });
        }
      });
    
    // Route for Update a Book
    router.put('/:id',async(request, response)=>{
        try{
    if(
        !request.body.title || 
        !request.body.author ||
        !request.body.publishYear
    ){
        return response.status(400).send({
            message:'Send all required fields: title, author, publishYear',
    });
    }
    const {id}=request.params;
    const result=await Book.findByIdAndUpdate(id, request.body);
    
    if(!result){
        return response.status(404).json({message:'Book not found'});
    }
    return response.status(200).send({message:'Book updated successfully'});
        }
        catch(error){
            console.log(error.message);
    response.status(500).send({message:error.message});
        }
    });
    
    // Route for Delete a Book
    router.delete('/:id',async(request,response)=>{
    try{
    const {id}=request.params;
    const result=await Book.findByIdAndDelete(id);
    
    if(!result){
        return response.status(404).json({message:'Book not found'});
    }
    return response.status(200).send({message:'Book deleted successfully!'});
    }
    catch(error){
         console.log(error.message);
    response.status(500).send({message:error.message});
    }
    });
    export default router;  