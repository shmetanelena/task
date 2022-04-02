import users from './users.js';

const makeUserTableRowMarkup = ({ name, email, balance }, index) => {
    return `
    <tr id = "user-${index}">
        <td>${index}</td>
        <td>${name}</td>
        <td>${email}</td>
        <td>${balance}</td>
    </tr>
    `;
};

console.log(users);
const tableEl = document.querySelector('#users-table');

const makeUsersTableRows = users.map(makeUserTableRowMarkup).join('');

tableEl.insertAdjacentHTML('beforeend', makeUsersTableRows);

console.log(makeUsersTableRows);

//let trEl = document.createElement('tr');
// let tdEl = document.createElement('td');
/*<select>
    <option value="value1">Text1</option>
    <option value="value2">Text2</option>
    <option value="value3">Text3</option>
</select>;
*/
//element<select>.value = value1...3
