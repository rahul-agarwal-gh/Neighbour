export default class Queue
{ 
    // Array is used to implement a Queue 
    constructor(){
        this.items = []; 
    }
    
    enqueue()
    {    
        this.items.push(element); 
    } 

   dequeue()
    { 
        if(this.isEmpty()) 
            return "Underflow"; 
        return this.items.shift(); 
    } 
    
    front() 
    { 
    // returns the Front element of  
    // the queue without removing it. 
        if(this.isEmpty()) 
            return "No elements in Queue"; 
        return this.items[0]; 
    } 
       
    isEmpty() 
    { 
        // return true if the queue is empty. 
        return this.items.length == 0; 
    } 

} 

