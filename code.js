my_grid = [[1, 1, 0, 0, 1, 1, 1, 1, 1, 0],
            [1, 1, 0, 0, 1, 1, 1, 1, 1, 0],
            [1, 1, 0, 0, 1, 1, 1, 1, 1, 0],
             [1, 1, 0, 0, 1, 1, 1, 1, 1, 0],
             [1, 1, 0, 0, 1, 1, 1, 1, 1, 0],
             [1, 1, 0, 0, 1, 1, 1, 1, 1, 0],
              [1, 1, 0, 0, 1, 1, 1, 1, 1, 0],
              [1, 1, 0, 0, 1, 1, 1, 1, 1, 0],
              [1, 1, 0, 0, 1, 1, 1, 1, 1, 0],
              [1, 1, 0, 0, 1, 1, 1, 1, 1, 0],
];

let length_amount = 10;    //Default length = 10
let width_amount = 10;     //Default width = 10
let number_of_clicks = 0;  //Default number of clicks = 0
let bomb_amount = 0;       //Default bomb amount = 0
let seconds= 0;            //Default seconds = 0
let minutes= 0;            //Default minutes = 0
let hours= 0;              //Default hours = 0
let bomb_around = 0;       //Default bomb surrounding a cell = 0


window.onload = function(){
  document.getElementById("length_picker").onchange = function(){
      change_length_amount(this.value);
  }
  document.getElementById("width_picker").onchange = function(){
    change_width_amount(this.value);
  }
  draw_grid(my_grid);
  
}

function change_length_amount(new_length_amount){
  length_amount = new_length_amount;
  bomb_amount = 0;
  draw_grid();
  reset_clicks()
}
function change_width_amount(new_width_amount){
  width_amount = new_width_amount;
  bomb_amount = 0;
  draw_grid();
  reset_clicks()
}

function draw_grid(grid){
  let grid_html = generate_grid_html(grid);
  document.getElementById('grid_container').innerHTML = grid_html;
  Generate_Amount_Array()
}

function generate_grid_html(grid){
  let result = "<table id='table'>"
  for(let i = 0; i<length_amount; i++){
    result += generate_row_hmtl(grid, i)
    }

  result += "</table>"
  return result;
    
}

function generate_row_hmtl(grid){
  let result = "<tr>"
  for(let j = 0; j<width_amount; j++){
    result += generate_cell_html(grid, j)
    
  }
  result += "</tr>"
  return result;
    
}

function generate_cell_html(grid){
  cell_amount = width_amount * length_amount
  let percent = Math.floor(cell_amount/5)
  random_number = Math.floor(Math.random() * cell_amount);
  if(random_number < percent ){
    let result = "<td id='cell'class='notrevealed' onclick='click_counter();clear_around(this);'oncontextmenu=set_a_flag(this)>💣</td>"
    bomb_amount++;
    return result;
  } else {
    let result = "<td id='cell'class='notrevealed' onclick='click_counter();clear_around(this);'oncontextmenu=set_a_flag(this)></td>"
    return result;
  }
 
}

function Generate_Amount_Array() {
  let table = document.getElementById('table');
  for (let r = 0, n = table.rows.length; r < n; r++) {
    for (let c = 0, m = table.rows[r].cells.length; c < m; c++) {
      if(table.rows[r].cells[c].innerHTML !== '💣'){
        if(table.rows[r].cells[c-1]){ //Left cell
          if(table.rows[r].cells[c-1].innerHTML == '💣'){
            bomb_around++;
            table.rows[r].cells[c].innerHTML = `${bomb_around}`
          }else{
            table.rows[r].cells[c].innerHTML = `${bomb_around}`
          }
        }
        if(table.rows[r].cells[c+1]){ //Right cell
          if(table.rows[r].cells[c+1].innerHTML == '💣'){
            bomb_around++;
            table.rows[r].cells[c].innerHTML = `${bomb_around}`
          } else{
            table.rows[r].cells[c].innerHTML = `${bomb_around}`
          }
        }
        if(r !== 0){ //Boven cell
          if(table.rows[r-1].cells[c].innerHTML == '💣'){
            bomb_around++;
            table.rows[r].cells[c].innerHTML = `${bomb_around}`
          } else{
            table.rows[r].cells[c].innerHTML = `${bomb_around}`
          }
        }
        if(r !== 0 && c !==0){ //Left Boven cell
          if(table.rows[r-1].cells[c-1].innerHTML == '💣'){
            bomb_around++;
            table.rows[r].cells[c].innerHTML = `${bomb_around}`
          } else{
            table.rows[r].cells[c].innerHTML = `${bomb_around}`
          }
        }
        if(r !== 0 && c !==(width_amount-1)){ //right Boven cell
          if(table.rows[r-1].cells[c+1].innerHTML == '💣'){
            bomb_around++;
            table.rows[r].cells[c].innerHTML = `${bomb_around}`
          } else{
            table.rows[r].cells[c].innerHTML = `${bomb_around}`
          }
        }
        if(r !== (length_amount-1)){ //Onder cell
          if(table.rows[r+1].cells[c].innerHTML == '💣'){
            bomb_around++;
            table.rows[r].cells[c].innerHTML = `${bomb_around}`
          } else{
            table.rows[r].cells[c].innerHTML = `${bomb_around}`
          }
        } 
        if(r !== (length_amount-1) && c !== 0){ //Left under
          if(table.rows[r+1].cells[c-1].innerHTML == '💣'){
            bomb_around++;
            table.rows[r].cells[c].innerHTML = `${bomb_around}`
          } else{
            table.rows[r].cells[c].innerHTML = `${bomb_around}`
          }
        }
        if(r !== (length_amount-1) && c !== (width_amount-1)){ //Left under
          if(table.rows[r+1].cells[c+1].innerHTML == '💣'){
            bomb_around++;
            table.rows[r].cells[c].innerHTML = `${bomb_around}`
          } else{
            table.rows[r].cells[c].innerHTML = `${bomb_around}`
          }
        }         
        }
        bomb_around =0;
        
      }
    }
}
function clear_around(cell) {
  check_array(cell)
  check_win()
}


function check_array(cell){
  let col = cell.cellIndex;
  let row = cell.parentNode.rowIndex;
  let table = document.getElementById('table');
  let content = table.rows[row].cells[col].innerHTML
  hit_bomb(cell);
  if(table.rows[row].cells[col].innerHTML == '0'){
    table.rows[row].cells[col].className = "revealed";
    check_down(cell)
    check_up(cell)
    check_right(cell)
    check_left(cell)
    check_diagonal(cell)

  } else if(table.rows[row].cells[col].innerHTML !== '0'){
    table.rows[row].cells[col].className = "revealed"
  }
}

function check_down(cell){                                                              //Check down of cell
  let col = cell.cellIndex;
  let row = cell.parentNode.rowIndex;
  let table = document.getElementById('table');
  if(row !==(length_amount-1)){
    for (let i = 0;row+i <= (length_amount-1) && table.rows[row+i].cells[col].innerHTML ==0; i++){
      if(table.rows[row+i].cells[col].innerHTML !== '💣'){
        table.rows[row+i].cells[col].className = "revealed";

        check_up(cell, row+i)
        if(row+i+1 <= (length_amount-1)){
          table.rows[row+i+1].cells[col].className = "revealed";
        }   
      }
    }
  }
}

function check_diagonal(cell){                                                          //Check diagonalof cell
  let col = cell.cellIndex;
  let row = cell.parentNode.rowIndex;
  let table = document.getElementById('table');
  if(row !==0 && col !==0){
    table.rows[row-1].cells[col-1].className = "revealed";
  }
  if(row !==0 && col !==(width_amount-1)){
    table.rows[row-1].cells[col+1].className = "revealed";
  }
  if(row !==(length_amount-1) && col !==0){
    table.rows[row+1].cells[col-1].className = "revealed";
  }
  if(row !==(length_amount-1) && col !==(width_amount-1)){
    table.rows[row+1].cells[col+1].className = "revealed";
  }
}

function check_up(cell){                                                              //Check up of cell
  let col = cell.cellIndex;
  let row = cell.parentNode.rowIndex;
  let table = document.getElementById('table');
  if(row !==0){
    for (let i = 0;row-i >= 0 && table.rows[row-i].cells[col].innerHTML ==0; i++){
      if(table.rows[row-i].cells[col].innerHTML !== '💣'){
        table.rows[row-i].cells[col].className = "revealed";
        if(row-i-1 >= 0){
          table.rows[row-i-1].cells[col].className = "revealed";
        }   
      }
    }
  }
}
function check_right(cell){                                                              //Check right of cell
  let col = cell.cellIndex;
  let row = cell.parentNode.rowIndex;
  let table = document.getElementById('table');
  if(col !==(width_amount-1)){
    for (let i = 0;col+i <= (width_amount-1) && table.rows[row].cells[col+i].innerHTML ==0; i++){
      if(table.rows[row].cells[col+i].innerHTML !== '💣'){
        table.rows[row].cells[col+i].className = "revealed";
        if(col+i+1 <= (width_amount-1)){
          table.rows[row].cells[col+i+1].className = "revealed";
        }   
      }
    }
  }
}

function check_left(cell){                                                              //Check left of cell
  let col = cell.cellIndex;
  let row = cell.parentNode.rowIndex;
  let table = document.getElementById('table');
  if(col !==0){
    for (let i = 0;col+i >= 0 && table.rows[row].cells[col+i].innerHTML ==0; i--){
      if(table.rows[row].cells[col+i].innerHTML !== '💣'){
        table.rows[row].cells[col+i].className = "revealed";
        check_down(cell, i)
        if(col+i-1 >= 0){
          table.rows[row].cells[col+i-1].className = "revealed";
        }   
      }
    }
  }
}
function check_win(){                                                //check if you win
  let revealed_counter = 0;
  let without_bombs = (length_amount*width_amount)-bomb_amount
  let = document.getElementById('mytable');
  for (let r = 0, n = table.rows.length; r < n; r++) {
      for (let c = 0, m = table.rows[r].cells.length; c < m; c++) {
        if(table.rows[r].cells[c].innerHTML !== '💣'){
          if(table.rows[r].cells[c].className == "revealed"){
            revealed_counter++;
            }
          }
        }
      }
      if(revealed_counter !== without_bombs){
        revealed_counter = 0;
      }
      if(revealed_counter == without_bombs){
      time = document.getElementById('display').innerHTML
      alert(`You won \nWith ${number_of_clicks} clicks\nIn ${time}`)
      reset_clicks()
      reset_watch()
      reset()
  }
}

 function hit_bomb(cell){    
                                      // Function That checks if you hit a bomb or not
  let col = cell.cellIndex;
  let row = cell.parentNode.rowIndex;
  let table = document.getElementById('table');
  if(table.rows[row].cells[col].innerHTML == '💣'){
    alert('You lost')
    for (let r = 0, n = table.rows.length; r < n; r++) {
      for (let c = 0, m = table.rows[r].cells.length; c < m; c++) {
        if(table.rows[r].cells[c].innerHTML == '💣'){
          table.rows[r].cells[c].className = "bombrevealed";
        }
      }
    }
  }
 }
window.oncontextmenu = function() {   // Disable chrome right-click menu.
  return false
}
function set_a_flag(cell){            // Changes HTML of cell to a flag.
  let col = cell.cellIndex;
  let row = cell.parentNode.rowIndex;
  let table = document.getElementById('table');
  if(table.rows[row].cells[col].className == "notrevealed"){        // Changes only if it isn't revealed.
    table.rows[row].cells[col].className = "flagged"
  }
  else if(table.rows[row].cells[col].className == "flagged"){        // Changes only if it isn't revealed.
  table.rows[row].cells[col].className = "notrevealed"
} 

}
function stateChange(reset) {
  setTimeout('', 5000);
}
function click_counter(){                                                                   // This function count clicks.
  number_of_clicks += 1
  document.getElementById("clicker").innerHTML = `Times clicked: ${number_of_clicks}`;      // Changes HTML to click amount.
}

function reset_clicks(){             // This function will reset the click amount to 0.
  number_of_clicks = 0;
  document.getElementById("clicker").innerHTML = `Times clicked: ${number_of_clicks}`
}

function reset(){                    // This is the reset functionality.
  length_amount = 10;                // Resets length to 10
  width_amount = 10;                 // Resets Width to 10
  bomb_amount = 0;                   // Resets bomb amount to 0
  reset_clicks()                     // Apply reset_clicks fucntion
  draw_grid();                       // Redraw the game grid
  reset_watch()   ;                  // Reset timer 
 }

 function start_watch(){             // Timer will activate when numer of clicks = 1 and continue
  if(number_of_clicks > 0){
    seconds++;

    if(seconds/60 === 1)
    {
      seconds=0;
      minutes++;
  
      if(minutes/60 === 1)
      {
        minutes=0;
        hours++;
      }
    }
    document.getElementById("display").innerHTML = hours + 'h' + minutes + 'm' + seconds + 's'
   
  }

 }
 function reset_watch(){                                    // Reset timer to 0h0m0s
   seconds = 0
   hours = 0
   minutes = 0
   window.clearInterval(start_watch);
   document.getElementById('display').innerHTML = '0h0m0s';

 }
 window.setInterval(start_watch,1000);