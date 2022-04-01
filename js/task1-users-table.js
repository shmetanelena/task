import users from './users.js';

const makeUserTableRowMarkup = ({ name, email, balance }) => {
    return `
    <tr>
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
