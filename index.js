const apikei = 'https://api.github.com/users/';
const url = 'https://github.com/'
const form = document.querySelector('.form');
const textBox = document.querySelector('.text-box');
const txtW = document.querySelector('.text-wrapper');
const card = document.querySelector('.card')
const itemContainer = document.querySelector("ul");
const wrapper = document.querySelector('.container');
const reposi=document.querySelector('.tags')

form.addEventListener('submit', e => {
    wrapper.classList.remove('hide');

    e.preventDefault();
    if (textBox.value) {
        const avtname = textBox.value;
        getGithub(avtname).then(res => {
            txtW.querySelector('.directlink').innerHTML = `check ${res.login} prfile`
            txtW.querySelector('.directlink').setAttribute('href', res.html_url);
            txtW.querySelector('h2').innerText = res.login;
            txtW.querySelector('p').innerText = res.bio;
            card.querySelector('div img').setAttribute('src', res.avatar_url)
            itemContainer.innerHTML = "";
            itemContainer.innerHTML = `
            <li class="folower">${res.following} following</li>
            <li class="follwing">${res.followers} follower</li>
            <li class="repo">${res.public_repos} repository</li>
            `;
            console.log(res);
            grtrepos(res).then(res => {
                reposi.innerHTML ='';
                res.slice(0,4).forEach(element => {
                    console.log(element)
                    reposi.innerHTML +=`
                    <a href="${element.html_url}" class="repositoris">${element.name}</a>
                    `
                });
            })
        });

        textBox.value = '';
    }
})


async function getGithub(avtname) {
    const res = await fetch(apikei + avtname);
    const response = await res.json();
    return response;
}


async function grtrepos(res) {
    const repos = await fetch(apikei + res.login + '/repos')
    const respomse = await repos.json();
    return respomse;

}