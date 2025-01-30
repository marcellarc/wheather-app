function getWeather() {
    const apiKey = 'b4603e8bd3e7d03119d2c1c97831eb08';
    const cidade = document.getElementById('cidade').value;

    if(!cidade) {
        alert('Por favor, digite uma cidade');
        return;
    }

    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${apiKey}&lang=pt_br`;
    const previsaoUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cidade}&appid=${apiKey}&lang=pt_br`;

    fetch(currentWeatherUrl)
        .then(response => response.json())
        .then(data => {
            displayClima(data);
        })
        .catch(error => {
            console.log('Erro ao buscar clima atual:', error);
            alert('Erro ao buscar clima atual. Por favor, tente novamente.');
        });

    fetch(previsaoUrl)
        .then(response => response.json())
        .then(data => {
            displayPrevisao(data.list);
        })
        .catch(error => {
            console.error('Erro ao buscar previsão do tempo:', error);
            alert('Erro ao buscar previsão do tempo. Por favor, tente novamente.');
        });
}

function displayClima(data) {
    const tempDivInfo = document.getElementById('temp-div');
    const climaInfoDiv = document.getElementById('clima-info');
    const climaIcone = document.getElementById('clima-icone');
    const previsaoHoraDiv = document.getElementById('previsao-hora');
    const umidadeDiv = document.getElementById('umidade');

    climaInfoDiv.innerHTML = '';
    previsaoHoraDiv.innerHTML = '';
    tempDivInfo.innerHTML = '';
    umidadeDiv.innerHTML = '';

    if(data.cod === '404') {
        climaInfoDiv.innerHTML = `<p>${data.message}</p>`;
    }
    
    else {
        const nomeCidade = data.name;
        const temperatura = Math.round(data.main.temp - 273.15);
        const descricao = data.weather[0].description;
        const umidade = "Umidade: " + data.main.humidity + "%";
        const iconeCodigo = data.weather[0].icon;
        const iconeUrl = `https://openweathermap.org/img/wn/${iconeCodigo}@4x.png`;
        
        const temperaturaHTML = `<p>${temperatura}°C</p>`;
        const climaHtml = `<p>${nomeCidade}</p><p>${descricao}</p>`;
        
        tempDivInfo.innerHTML = temperaturaHTML;
        climaInfoDiv.innerHTML = climaHtml;
        umidadeDiv.innerHTML = umidade;
        climaIcone.src = iconeUrl;
        climaIcone.alt = descricao;

        exibirImg();
    }
}

function displayPrevisao(horaData) {
    const previsaoHoraDiv = document.getElementById('previsao-hora');
    const prox24Horas = horaData.slice(0, 8);

    prox24Horas.forEach(item => {
        const dataTime = new Date(item.dt * 1000);
        const hora = dataTime.getHours();
        const temperatura = Math.round(item.main.temp - 273.15);
        const iconeCodigo = item.weather[0].icon;
        const iconeUrl = `https://openweathermap.org/img/wn/${iconeCodigo}.png`;

        const horaItemHtml = `
            <div class="hora-item">
                <span>${hora}:00</span>
                <img src="${iconeUrl}" alt="Clima por Hora ícone">
                <span>${temperatura}°C</span>
            </div>`;

        previsaoHoraDiv.innerHTML += horaItemHtml;
    });
}

function exibirImg() {
    const iconeClima = document.getElementById('clima-icone');
    iconeClima.style.display = 'block';
}


