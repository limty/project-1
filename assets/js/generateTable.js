function generateTable(rows, cols) {
  let table = document.createElement("table");
  table.setAttribute("align", "center");

  for (let i = 0; i < rows; i++) {
    let tr = document.createElement("tr");
    for (let j = 0; j < cols; j++) {
      let td = document.createElement("td");
      td.classList.add("grid");
      td.setAttribute("id", `grid-${i}-${j}`);
      tr.appendChild(td);
    }
    table.appendChild(tr);
  }

  return table;
}

document.addEventListener("DOMContentLoaded", () => {
  let board = document.querySelector(".board");
  let table = generateTable(12, 16);
  board.appendChild(table);
});
