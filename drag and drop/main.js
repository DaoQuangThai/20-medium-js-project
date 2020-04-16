const draggableList = document.getElementById('draggable-list');
const checkList = document.getElementById('check');

const richestPeople = [
  'Jeff Bezos',
  'Bill Gates',
  'Warren Buffett',
  'Bernard Arnault',
  'Carlos Slim Helu',
  'Amancio Ortega',
  'Larry Ellison',
  'Mark Zuckerberg',
  'Michael Bloomberg',
  'Larry Page',
];

const listItems = [];
let dragStartIndex;

// Render draggable List to DOM

function renderList() {
  const randomSortArr = richestPeople
    .map(a => ({
      value: a,
      sort: Math.random(),
    }))
    .sort((a, b) => a.sort - b.sort)
    .map(a => a.value);

  //   console.log(randomSortArr);

  randomSortArr.forEach((person, index) => {
    const listItem = document.createElement('li');
    listItem.classList.add('person');

    listItem.setAttribute('data-index', index);

    listItem.innerHTML = `
         <span class="position">${index + 1}</span>
         <div class="person-info draggable" draggable="true">
            <span class="name">${person}</span>
            <i class="icon fas fa-grip-lines"></i>
         </div>
    `;

    listItems.push(listItem);

    draggableList.appendChild(listItem);
  });

  addEventListener();
}

// Fire drag and drop event
function dragStart() {
  dragStartIndex = +this.closest('li').getAttribute('data-index');
}

function dragLeave() {
  this.classList.remove('over');
}

function dragOver(event) {
  // By defaut it prevent drag over so must do code below
  // Drag drop only work after this
  event.preventDefault();
}

function dragEnter() {
  this.classList.add('over');
}

function dragDrop() {
  const dragEndIndex = +this.getAttribute('data-index');

  swapItems(dragStartIndex, dragEndIndex);
  this.classList.remove('over');
}

function swapItems(fromIndex, toIndex) {
  const itemOne = listItems[fromIndex].querySelector('.draggable');
  const itemTwo = listItems[toIndex].querySelector('.draggable');

  // tại sao chỗ này nó không add thêm, mà lại bù trừ
  // đã test nó sẽ lấy cái chỗ này và thêm vào chổ kia nên chỗ bị lấy sẽ mất
  listItems[fromIndex].appendChild(itemTwo);
  listItems[toIndex].appendChild(itemOne);
}

function addEventListener() {
  const dragListItems = document.querySelectorAll('.person');
  const draggables = document.querySelectorAll('.draggable');

  // Drag content
  draggables.forEach(draggable =>
    draggable.addEventListener('dragstart', dragStart)
  );

  // Drag area
  dragListItems.forEach(item => {
    item.addEventListener('dragleave', dragLeave);
    item.addEventListener('dragover', dragOver);
    item.addEventListener('dragenter', dragEnter);
    item.addEventListener('drop', dragDrop);
  });
}

function isCorrectOrder() {
  listItems.forEach((item, index) => {
    console.log(item);

    const personName = item.querySelector('.draggable').innerText;

    if (personName !== richestPeople[index]) {
      item.classList.add('wrong');
    } else {
      item.classList.remove('wrong');
      item.classList.add('right');
    }
  });
}

renderList();

// Add event listener
checkList.addEventListener('click', isCorrectOrder);
