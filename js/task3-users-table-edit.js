const tableEl = document.querySelector('table');
const tbodyEl = tableEl.querySelector('tbody');

let serial = 1;
users = users.map(user => {
    return { ...user, id: serial++ };
});

//users = users.map(user => { return { name: user.name, email: user.email, id: serial++ }; });

const deleteUser = event => {
    const userId = Number(event.currentTarget.dataset.id);
    const index = users.findIndex(user => user.id === userId);
    if (index !== -1) {
        users.splice(index, 1);
        const trEl = document.querySelector(`#user-${userId}`);
        trEl.remove();
    }
};

const editUser = event => {
    const userId = Number(event.currentTarget.dataset.id);
    const user = users.find(user => user.id === userId);

    const result = prompt('Edit the user name', `${user.name};${user.email}`);
    if (result != null) {
        const [name, email] = result.split(';');
        if (user.name !== name) {
            user.name = name;
            const tdEl = document.querySelector(`#user-${user.id}-name`);
            tdEl.textContent = user.name;
        }
        if (user.email !== email) {
            user.email = email;
            const trEl = document.querySelector(`#user-${user.id}`);
            const tdEl = trEl.querySelector('td[data-name="email"]');
            tdEl.textContent = user.email;
        }
    }
};

const appendUser = user => {
    const trHtml = `
    <tr id="user-${user.id}">
        <td>${user.id}</td>
        <td id="user-${user.id}-name" data-name="name">${user.name}</td>
        <td data-name="email">${user.email}</td>
        <td>
            <button id="action-delete-${user.id}" data-id="${user.id}" data-action="delete">Del</button>
            <button id="action-edit-${user.id}" data-id="${user.id}" data-action="edit">Edit</button>
        </td>
    </tr>`;
    tbodyEl.insertAdjacentHTML('beforeend', trHtml);
    document
        .querySelector(`#action-delete-${user.id}`)
        .addEventListener('click', deleteUser);
    document
        .querySelector(`#action-edit-${user.id}`)
        .addEventListener('click', editUser);
};

users.forEach(appendUser);

document.querySelector('#add-new-user').addEventListener('click', event => {
    const result = prompt(
        'Add new user if format "name;email"',
        'ivan ivanov;bez@shtanov'
    );
    if (result != null) {
        const [name, email] = result.split(';');
        const user = { name: name, email: email, id: serial++ };
        users.push(user);
        appendUser(user);
    }
});
