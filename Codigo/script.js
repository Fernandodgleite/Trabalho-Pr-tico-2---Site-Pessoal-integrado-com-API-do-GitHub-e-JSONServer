document.addEventListener('DOMContentLoaded', () => {
    const username = 'fernandodgleite';
    const apiUrl = `https://api.github.com/users/${username}`;
    const reposUrl = `https://api.github.com/users/${username}/repos`;

    // Carregar perfil do usuário
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            console.log('Perfil do usuário:', data);
            if (data) {
                document.getElementById('avatar').src = data.avatar_url;
                document.getElementById('username').innerText = data.name || 'Nome não disponível';
                document.getElementById('bio').innerText = data.bio || 'Bio não disponível';
                document.getElementById('github').href = data.html_url;
                document.getElementById('linkedin').href = `https://www.linkedin.com/in/fernando-dantas-52788a314/`;
            }
        })
        .catch(error => console.error('Erro ao carregar perfil:', error));

    // Carregar repositórios
    fetch(reposUrl)
        .then(response => response.json())
        .then(repos => {
            console.log('Repositórios do usuário:', repos);
            const reposList = document.getElementById('repos-list');
            if (repos && repos.length > 0) {
                repos.forEach(repo => {
                    const repoItem = document.createElement('div');
                    repoItem.classList.add('col-md-4', 'mb-3');
                    repoItem.innerHTML = `
                        <div class="card">
                            <div class="card-body">
                                <h5 class="card-title">${repo.name}</h5>
                                <p class="card-text">${repo.description || 'Sem descrição'}</p>
                                <a href="${repo.html_url}" class="btn btn-primary" target="_blank">Ver Repositório</a>
                            </div>
                        </div>
                    `;
                    reposList.appendChild(repoItem);
                });
            }
        })
        .catch(error => console.error('Erro ao carregar repositórios:', error));

    // Carregar conteúdo sugerido 
    fetch('http://localhost:3000/conteudos')
        .then(response => response.json())
        .then(contents => {
            console.log('Conteúdos sugeridos:', contents);
            const contentContainer = document.getElementById('suggested-content');
            contents.forEach((content, index) => {
                const contentItem = document.createElement('div');
                contentItem.classList.add('carousel-item');
                if (index === 0) contentItem.classList.add('active');
                contentItem.innerHTML = `
                    <img src="${content.image}" class="d-block w-100" alt="${content.title}">
                    <div class="carousel-caption d-none d-md-block">
                        <h5>${content.title}</h5>
                        <p>${content.description}</p>
                    </div>
                `;
                contentContainer.appendChild(contentItem);
            });
        })
        .catch(error => console.error('Erro ao carregar conteúdo sugerido:', error));

    // Carregar colegas de trabalho 
    fetch('http://localhost:3000/colegas')
        .then(response => response.json())
        .then(colleagues => {
            console.log('Colegas de trabalho:', colleagues);
            const colleaguesList = document.getElementById('colleagues-list');
            colleagues.forEach(colleague => {
                const colleagueItem = document.createElement('div');
                colleagueItem.classList.add('col-md-4', 'mb-3');
                colleagueItem.innerHTML = `
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">${colleague.name}</h5>
                            <p class="card-text">${colleague.description}</p>
                        </div>
                    </div>
                `;
                colleaguesList.appendChild(colleagueItem);
            });
        })
        .catch(error => console.error('Erro ao carregar colegas de trabalho:', error));
});
