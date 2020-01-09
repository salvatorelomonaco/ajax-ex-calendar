$(document).ready(function() {

    var template = $('#giorno').html();
    var templateFunction = Handlebars.compile(template);

    // Imposto una data iniziale
    var dataIniziale = '2018-01-01';
    // La faccio diventare attuale con moment
    var momentIniziale = moment(dataIniziale);
    // Richiamo le funzioni
    stampaGiorni(momentIniziale);
    stampaFeste(momentIniziale);

    $('#next').click(function() {
        // Aggiungo un mese alla data da visualizzare
        momentIniziale.add(1, 'Months');
        stampaGiorni(momentIniziale);
        stampaFeste(momentIniziale);
    });

    $('#prev').click(function() {
        // Aggiungo un mese alla data da visualizzare
        momentIniziale.subtract(1, 'Months');
        stampaGiorni(momentIniziale);
        stampaFeste(momentIniziale);
    });

    // Creo una funzione che mi stampa tutti i giorni
    function stampaGiorni(mese) {
        $('.container-days').empty();
        // Controllo quanti giorni ci sono nel mese
        var giorniMese = mese.daysInMonth();
        // Mi prendo il mese selezionato
        var meseCorrente = mese.format('MMMM');
        $('#mese').text(meseCorrente);
        // Uso il ciclo per clonare i giorni nel calendario
        for (var i = 1; i <= giorniMese; i++) {
            // Oggetti che vanno a popolare il template
            var elementi = {
                // i corrisponde ogni volta ad un numero da 1 alla fine del mese
                'numero-giorno': i,
                'format-day': mese.format('YYYY-MM-') + giornoDueCifre(i)
            };
            var htmlFinale = templateFunction(elementi);
            $('.container-days').append(htmlFinale);
        };

    };

    // Creo una funzione per stampare i giorni di festa presi tramite l'API
    function stampaFeste(mese) {
        $.ajax({
            'url': 'https://flynn.boolean.careers/exercises/api/holidays',
            'method': 'GET',
            'data': {
                'year': 2018,
                'month': mese.month()
            },
            'success': function(data) {
                // .response mi da i dati di cui ho bisogno sotto forma di array
                var festività = data.response;
                // li giro con il ciclo for
                for (var i = 0; i < festività.length; i++) {
                    // prendo la data e il nome della festività
                    var dataFesta = festività[i].date;
                    var nomeFesta = festività[i].name;
                    // vado a leggere quella con il data-giorno uguale alla data dela festività per differenzarla
                    $('.container-days div[data-giorno="' + dataFesta + '"]').addClass('festa').append('<span>' + nomeFesta + '</span>');
                }
            },
            'error': function() {
                alert('Error')
            }
        });
    };

    // Funzione per far si che la data venga sempre con due numeri nel data-giorni
    function giornoDueCifre(giorno) {
        if (giorno < 10) {
            return '0' + giorno;
        } else {
            return giorno;
        };
    };
});
