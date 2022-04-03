//   !!!   import users from './users.js'; //если импортировать данние из файла ./users.js

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

//console.log(users);
const tableEl = document.querySelector('#users-table');

const makeUsersTableRows = users.map(makeUserTableRowMarkup).join('');

tableEl.insertAdjacentHTML('beforeend', makeUsersTableRows);

const select = document.createElement('select');
select.classList.add('select-css');

users.forEach((user, index) => {
    const option = document.createElement('option');
    option.setAttribute('value', `user-${index}`);
    option.textContent = user.name;
    select.append(option);
});
select.addEventListener('change', event => {
    tableEl
        .querySelectorAll('td')
        .forEach(td => (td.style.fontWeight = 'normal'));

    const id = event.currentTarget.value;
    const trEl = document.querySelector('#' + id);
    //console.log(trEl);
    const rowEl = trEl.querySelectorAll('td');
    // console.log(rowEl);
    rowEl.forEach(td => (td.style.fontWeight = 'bold'));
});

document.body.append(select);

const divEl = document.createElement('div');

const ulEl = document.createElement('ul');
ulEl.setAttribute('id', 'search-result');

const inputEl = document.createElement('input');
inputEl.classList.add('list-css');
inputEl.setAttribute('id', 'search-text');
inputEl.setAttribute('type', 'text');
inputEl.setAttribute('placeholder', 'Enter the text');
inputEl.addEventListener('input', event => {
    ulEl.innerHTML = '';
    const text = event.currentTarget.value.toUpperCase();
    if (text != '') {
        const html = users
            .filter(
                user =>
                    user.name.toUpperCase().includes(text) ||
                    user.email.toUpperCase().includes(text)
            )
            .map(user => `<li>${user.name} - ${user.email}</li>`)
            .join('');
        ulEl.innerHTML = html;
    }
});

divEl.append(inputEl, ulEl);
document.body.append(divEl);

//inputEl.classList.add('list-css');
