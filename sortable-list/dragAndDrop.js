const draggableList = document.getElementById('draggable-list');
const checkBtn = document.getElementById('check');
// 10대 부자
const richestPeople = [
  'JEFF BEZOS',
  'BILL GATES',
  'BERNARD ARNAULT & FAMILY',
  'WARREN BUFFETT',
  'LARRY ELLISON',
  'AMANCIO ORTEGA',
  'MARK ZUCKERBERG',
  'JIM WALTON',
  'ALICE WALTON',
  'ROB WALTON',
];
// 리스트 아이템 보관
const listItems = [];

let dragStartIndex;

// 리스트 아이템 생성
function createList() {
  [...richestPeople]
    .map((name) => ({ value: name, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map((a) => a.value)
    .forEach((person, index) => {
      const listItem = document.createElement('li');

      listItem.setAttribute('data-index', index);

      listItem.innerHTML = `
      <span class="number">${index + 1}</span>
      <div class="draggable" draggable="true">
        <p class="person-name">${person}</p>
        <i class="fas fa-grip-lines"></i>
      </div>
    `;

      listItems.push(listItem);

      draggableList.appendChild(listItem);
    });

  addEventListeners();
}

// 드래그 시작 인덱스 저장
function dragStartHandle() {
  dragStartIndex = +this.closest('li').getAttribute('data-index');
}

function dragOverHandle(e) {
  e.preventDefault();

  this.classList.add('over');
}

// 드롭 위치와 스왑
function dropHandle() {
  const dragEndIndex = +this.getAttribute('data-index');
  swapItems(dragStartIndex, dragEndIndex);

  this.classList.remove('over');
}

// 리스트 아이템 스왑
function swapItems(fromIndex, toIndex) {
  const itemFrom = listItems[fromIndex].querySelector('.draggable');
  const itemTo = listItems[toIndex].querySelector('.draggable');

  listItems[fromIndex].appendChild(itemTo);
  listItems[toIndex].appendChild(itemFrom);
}

function dragEnterHandle() {
  this.classList.add('over');
}

function dragLeaveHandle() {
  this.classList.remove('over');
}

function addEventListeners() {
  const draggables = document.querySelectorAll('.draggable');
  const dragListItems = document.querySelectorAll('.draggable-list li');

  draggables.forEach((draggable) => {
    draggable.addEventListener('dragstart', dragStartHandle);
  });

  dragListItems.forEach((item) => {
    item.addEventListener('dragover', dragOverHandle);
    item.addEventListener('drop', dropHandle);
    item.addEventListener('dragenter', dragEnterHandle);
    item.addEventListener('dragleave', dragLeaveHandle);
  });
}

// 순서 확인
function checkOrder() {
  listItems.forEach((item) => {
    const personName = item.querySelector('.person-name').innerText;
    if (personName === richestPeople[item.getAttribute('data-index')]) {
      item.className = 'right';
    } else {
      item.className = 'wrong';
    }
  });
}

createList();

checkBtn.addEventListener('click', checkOrder);
