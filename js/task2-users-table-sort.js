const fields = [
    { id: 'name', title: 'Name' },
    { id: 'email', title: 'Email' },
    { id: 'eyeColor', title: 'Eyes' },
    { id: 'isActive', title: 'Active' },
    { id: 'gender', title: 'Gender' },
];

let sortId;
let isAscendingSort = true;

const table = document.createElement('table');
const tableHead = document.createElement('thead');
const tableHeadTr = document.createElement('tr');
fields.forEach(field => {
    const th = document.createElement('th');
    th.textContent = field.title;
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
