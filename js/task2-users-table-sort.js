const fields = [
    { id: 'name', title: 'Name' },
    { id: 'email', title: 'Email' },
    { id: 'eyeColor', title: 'Eyes' },
    { id: 'isActive', title: 'Active' },
    { id: 'gender', title: 'Gender' },
    { id: 'balance', title: 'Balance' },
];

let sortId;
let isAscendingSort = true;

const table = document.createElement('table');
const tableHead = document.createElement('thead');
const tableHeadTr = document.createElement('tr');
fields.forEach(field => {
    const th = document.createElement('th');
    th.textContent = field.title;
    th.setAttribute('id', field.id);
    th.addEventListener('click', tableHeadClick);
    tableHeadTr.append(th);
});
tableHead.append(tableHeadTr);
const tableBody = document.createElement('tbody');

table.append(tableHead, tableBody);
document.body.append(table);

function fillTable() {
    tableBody.innerHTML = users
        .map(user => {
            let tr = '<tr>';
            fields.forEach(field => {
                tr += `<td>${user[field.id]}</td>`;
            });
            tr += '</tr>';
            return tr;
        })
        .join('');
}
fillTable();

function tableHeadClick(event) {
    const id = event.currentTarget.getAttribute('id');
    if (id === sortId) {
        isAscendingSort = !isAscendingSort;
    } else {
        sortId = id;
        isAscendingSort = true;
    }

    users.sort((firstUser, secondUser) => {
        const first = firstUser[sortId];
        const second = secondUser[sortId];
        switch (typeof first) {
            case 'string':
                return isAscendingSort
                    ? first.localeCompare(second)
                    : second.localeCompare(first);
            case 'boolean':
            case 'number':
                return isAscendingSort ? first - second : second - first;
            default:
                return 0;
        }
    });
    fillTable();

    fields.forEach(field => {
        const th = document.querySelector('#' + field.id);
        th.textContent = field.title;
        if (sortId === field.id) {
            th.textContent += ` ${isAscendingSort ? '+' : '-'}`;
        }
    });
}
