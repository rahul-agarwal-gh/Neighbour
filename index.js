/* Below logic is for creating a grid or our graph */

// import Queue from "./Queue";
class Queue
{ 
    // Array is used to implement a Queue 
    constructor(){
        this.items = []; 
        this.visited = new Array(1040);
        this.visited.fill(false);
    }
    
    checkVisited(id)
    {
        return this.visited[id-1];
    }

    markVisited(id)
    {
        this.visited[id-1] = true;
    }
    enqueue(element)
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

let queue = new Queue();


class Stack { 
  
    constructor() 
    { 
        this.elements = []; 
    } 
  
    push(element) 
    { 
        this.elements.push(element); 
    } 
    pop() 
    { 
        if (this.elements.length == 0) 
            return "Underflow"; 
        return this.elements.pop(); 
    } 
    peek() 
    { 
        return this.elements[this.elements.length - 1]; 
    } 
    isEmpty() 
    { 
        return this.elements.length == 0; 
    }       
} 

let stack = new Stack();

let tableWidthString = $("table").css("width");//getting the width of our table. since we used col-lg-12 class with table, its
//width is whatever the width of our viewport is.using width, we determine how many cells we want in each row
let len = tableWidthString.length;//table width is in string format like "1400px". we took out the px and stored width in an integer
let tableWidth = tableWidthString.substring(0, len-2);

let tableHeightString = $("table").css("height");//getting the height of the container in which table sits. Since table's
//height depends on the no. of rows it has. we set the height of the container that contains the grid as 600px 
// and then we used that height to determine how many rows our grid will have 
len = tableHeightString.length;
let tableHeight = tableHeightString.substring(0, len-2);

let cellSize = Math.floor(tableWidth/50);//cellsize stores size of each cell. cellsize is 30

let col = 1;
for(let i = 30; i <= 600; i+=cellSize){

    let newRow = document.createElement("tr");//Creating a row in grid.


    for(let j = 0; j <= 1530; j+=cellSize){
       
        let newCell = document.createElement("td");//creating a square cell of edge 30px. adding css class "cell" to it.
        newCell.classList.add("cell");//javascript to add class to an element
        // newCell.style.height = cellSize+"px";//js to set height of an element
        // newCell.style.width = cellSize+"px";//js to set width of an element
        newRow.append(newCell);//appending this cell to our row using jquery append function

        let id = col.toString();
        
        $(newCell).attr("id", id);
        // let lastCellAdded = $("td").last();
        // let posLastCellAdded = lastCellAdded.position();
        // console.log(posLastCellAdded.left);
        // console.log(posLastCellAdded.top);
        col++;
    }
    $("table").append(newRow);//appending this row to our table, i.e, grid using jquery
}

/* grid created */

/* creating home marker object*/
let homeMarker = document.createElement("i");
homeMarker.classList.add("fas");
homeMarker.classList.add("fa-home");
homeMarker.set = false;
homeMarker.parent = false;

/* creating destination marker object*/
let destMarker = document.createElement("i");
destMarker.classList.add("fas");
destMarker.classList.add("fa-map-marker-alt");
destMarker.set = false;
destMarker.parent = false;

let homeClick = false;
let destClick = false;

$("#home-btn").on("click", function markHome(event){

    
    if($("#dest-btn").css("background-color") == "rgb(165, 42, 42)"){
        destClick = false;    
        $("#dest-btn").css("background-color", "rgb(223,245,242)");
    }

    if(homeClick == false){

        homeClick = true;
        event.target.style.backgroundColor = "brown";
        
        $("td").on("click", function(e){
            if (homeClick) {
                if(homeMarker.set == false){
                    homeMarker.set = true;
                    homeMarker.parent = e.currentTarget;
                    e.currentTarget.append(homeMarker);
                    e.currentTarget.style.textAlign = "center";
                }
                else if(homeMarker.set == true && homeMarker.parent != e.currentTarget){
                    homeMarker.parent.removeChild(homeMarker.parent.childNodes[0]);
                    homeMarker.set = true;
                    homeMarker.parent = e.currentTarget;
                    e.currentTarget.append(homeMarker);
                    e.currentTarget.style.textAlign = "center";
                }
            }
            else{
                $("td").off("click");
            }
        });
    }
    else{
        homeClick = false;
        event.target.style.backgroundColor = "#dff5f2";
        event.target.removeEventListener(event.type, markHome);        
    }
   
});

$("#dest-btn").on("click", function markdest(event){

    if($("#home-btn").css("background-color") == "rgb(165, 42, 42)"){
        homeClick = false;    
        $("#home-btn").css("background-color", "rgb(223,245,242)");
    }

    if(destClick == false){

        destClick = true;
        event.target.style.backgroundColor = "brown";
        
        $("td").on("click", function(e){
            if (destClick) {
                if(destMarker.set == false){
                    destMarker.set = true;
                    destMarker.parent = e.currentTarget;
                    e.currentTarget.append(destMarker);
                    e.currentTarget.style.textAlign = "center";
                }
                else if(destMarker.set == true && destMarker.parent != e.currentTarget){
                    destMarker.parent.removeChild(destMarker.parent.childNodes[0]);
                    destMarker.set = true;
                    destMarker.parent = e.currentTarget;
                    e.currentTarget.append(destMarker);
                    e.currentTarget.style.textAlign = "center";
                }
            }
            else{
                $("td").off("click");
            }
        });
    }
    else{
        destClick = false;
        event.target.style.backgroundColor = "#dff5f2";
        event.target.removeEventListener(event.type, markdest);        
    }
   
});

function getNeighbour(element){

    let elId = $(element).attr("id");
    let prev = null;
    let next = null;
    let up = null;
    let down = null;
    
    if((parseInt(elId)-1) % 52 == 0 || $(document.getElementById((parseInt(elId) - 1).toString())).css("border-color") == "rgb(29, 45, 80)") prev = null;  
    else prev = (parseInt(elId) - 1).toString();
    
    if(parseInt(elId) % 52 == 0 || $(document.getElementById((parseInt(elId) + 1).toString())).css("border-color") == "rgb(29, 45, 80)")next = null;
    else next = (parseInt(elId) + 1).toString();

    if((parseInt(elId)-52 < 1) || $(document.getElementById((parseInt(elId) - 52).toString())).css("border-color") == "rgb(29, 45, 80)") up = null;
    else up = (parseInt(elId) - 52).toString();

    if((parseInt(elId) + 52 > 1040) || $(document.getElementById((parseInt(elId) + 52).toString())).css("border-color") == "rgb(29, 45, 80)") down = null;
    else down = (parseInt(elId) + 52).toString();
        
    return [prev, next, up, down];

}

let parentID = new Array(1040);

$("#find-path").on("click", function(event){
    
    
    if($("#home-btn").css("background-color") == "rgb(165, 42, 42)"){
        homeClick = false;    
        $("#home-btn").css("background-color", "rgb(223,245,242)");
    }

    if($("#dest-btn").css("background-color") == "rgb(165, 42, 42)"){
        destClick = false;    
        $("#dest-btn").css("background-color", "rgb(223,245,242)");
    }

    let homeId = $(homeMarker.parent).attr("id");
    let destId = $(destMarker.parent).attr("id");

    let algo = $(".dropdown-item.active").text();//getting which algorithm user has selected
    
    switch (algo) {
        case "BFS" :
            BFS(homeId, destId);
            break;
    
        case "DFS" :
            DFS(homeId, destId);
            break;

        default:
            break;
    }
    
});

async function BFS(homeId, destId){
    
    parentID[homeId] = -1; //making parentId of home node as -1 as home node is source node

    queue.enqueue(homeId);
    queue.visited[parseInt(homeId)] == true;

    while(!queue.isEmpty()){

        let current = queue.dequeue();
        
        await new Promise(done => setTimeout(() => done(), 10));  

        document.getElementById(current).style.backgroundColor = "blue";

        if(current === destId)
        {
            queue.items = [];//empty the queue
            break;
        }
        
        let neighbours = getNeighbour(document.getElementById(current));
    
        for(let i = 0; i < 4; i++)
        {
                if(neighbours[i] !== null && (!queue.checkVisited(parseInt(neighbours[i])))){
                        queue.enqueue(neighbours[i]);
                        queue.markVisited(parseInt(neighbours[i]));
                        parentID[parseInt(neighbours[i])] = current; //index is number and id is stored as string
                }
                    
        }
        
    }

    printPath(homeId, destId);    
}


async function DFS(homeId, destId){
    
    parentID[homeId] = -1;

    stack.push(homeId); //initially pushing home element on the stack 
    queue.visited[parseInt(homeId)] == true;//and marking it as visited

    while(!stack.isEmpty()) { 
         
                let current = stack.pop(); 
                
                await new Promise(done => setTimeout(() => done(), 10));  

                document.getElementById(current).style.backgroundColor = "blue";

                if(current === destId)
                    break;  

                let neighbours = getNeighbour(document.getElementById(current));
    
                for(let i = 0; i < 4; i++)
                {
                    //only valid and unvisited neighbours will be pushed onto the stack
                    if(neighbours[i] !== null && (!queue.checkVisited(parseInt(neighbours[i])))){
                        stack.push(neighbours[i]);
                        queue.markVisited(parseInt(neighbours[i]));//mark the pushed neighbours as visited
                        parentID[parseInt(neighbours[i])] = current;
                    }
                }
               
                  
            } 

            printPath(homeId, destId);    
}

async function printPath(homeId, destId){

    if(queue.isEmpty() && parentID[parseInt(destId)] !== undefined){
        let index = parseInt(destId);
        while(index != parseInt(homeId)){
    
            let parentOfCurrent = parentID[index];
            await new Promise(done => setTimeout(() => done(), 10));  
            
            document.getElementById(index.toString()).style.backgroundColor = "Yellow";
            document.getElementById(index.toString()).style.borderColor = "Yellow";
            index = parseInt(parentOfCurrent);
        }
    }
    
}

//implementing wall functionality
let mouseDown = 0;

$("td").on("mousedown",function(e){
    mouseDown = 1;
    makeBlack(e);
});

$("td").on("mouseup", function(e){
    mouseDown = 0;
})

$("td").on("mouseenter", function(e){

    if(mouseDown === 1){
        makeBlack(e);
    }
});


function makeBlack(e){

    if($("#home-btn").css("background-color") != "rgb(165, 42, 42)" && $("#dest-btn").css("background-color") != "rgb(165, 42, 42)" && !(e.currentTarget.hasChildNodes())){
        $(e.currentTarget).css("background-color", "#1d2d50"); 
        $(e.currentTarget).css("border-color", "#1d2d50"); 
    }
    

}

$(".dropdown-item").on("click",function(e){

    let currentActive = $(".dropdown-item.active");
    currentActive.removeClass("active");
    $(e.currentTarget).addClass("active");
    $("#navbarDropdown").text("Algorithm: "+$(e.currentTarget).text());
    
});