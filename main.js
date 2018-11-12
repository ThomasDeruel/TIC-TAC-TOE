const body = document.querySelector("main");
let res = document.querySelector('span');
let table = [
    [0,0,0],
    [0,0,0],
    [0,0,0],
];
let win = 0;
let turn = Math.floor(Math.random() * 100) > 49;

render = function(){
  createTable();
  const win = columnCheckv2() || lineCheckv2() || diagonalTLCheckv2() || diagonalTRCheck() || false;
  if(win){
    console.log('win win')
    res.textContent="gagné"
    return;
  }
  if(draw()){
    console.log('égalité');
    res.textContent="égalité"
    return;
  }
  const tr_list = [...document.querySelectorAll('tr')];
  tr_list.map( (tr,i_row) =>{
    const td_list = [...tr.querySelectorAll('td')];
    td_list.map( (td,i_col) => {
      td.addEventListener('click', userFunction.bind(null,i_row,i_col), true)
    })
  })
};

userFunction = (row,col) => {
  if(table[row][col] !== 0){
    return;
  }
  turn ? table[row][col] = 1 : table[row][col] = 2;
  turn = !turn;
  render();
};

diagonalTRCheck = function() { // BEST
  let reverse = [].concat(table).reverse();
  return reverse.every((tr,i_row)=>{
    return (reverse[i_row][i_row] === reverse[0][0] && reverse[0][0] !== 0);
  });
};

diagonalTLCheckv2 = function() { // BEST
  return table.every((tr,i_row)=>{
    return (table[i_row][i_row] === table[0][0] && table[0][0] !== 0);
  });
};

const draw = function() { // BEST
  return table.every((tr,i_row)=>{
    return tr.every((td,i_col)=>{
      return table[i_row][i_col] !== 0;
    });
  });
};

lineCheckv2 = function() { // BEST
  return table.some((tr,r)=>{
    return tr.every((td,c)=>{
      return (table[r][c] == table[r][0] && table[r][0] !== 0);
    });
  });
};

columnCheckv2 = function() { // BEST
  return table.some((tr,r)=>{
    return tr.every((td,c)=>{
      return (table[c][r] == table[0][r] && table[0][r] !== 0);
    });
  });
};

const createTable = () => {
  if(body.children.length !== 0){
    body.removeChild(document.querySelector("table"));
  }
  if(turn){
    console.log('tour du joueur');
  }else {
    console.log('tour de l\'ordi');
  }
  const main = document.createElement("table");
  table.map(row=>{
    const tr = document.createElement("tr");
    row.map(column=>{
        let td = document.createElement("td");
        const val =  column === 0 ? '' :
                     column === 1 ? 'O' :
                     'X';
        if(val !== ""){
          td.classList.add("selected");
        }
        const content = document.createTextNode(val);
        td.appendChild(content);
        tr.appendChild(td);
    })
    main.appendChild(tr);
  })
  body.appendChild(main);
  const list = [...document.querySelectorAll('td')];
  list.map(td=>{
    if(td.textContent !== ""){
      td.classList.add('selected');
    }
  })
};
render();
//si tour joueur:
//si tour ordi
// choisir un p aléatoire
// tant que le champs n'est pas vide choisir à nouveau un champs aleatoire
//---------------
//-------------
// recommencer
// ajouter un nouveau tableau vide :)
//.addEventListener('click',this);