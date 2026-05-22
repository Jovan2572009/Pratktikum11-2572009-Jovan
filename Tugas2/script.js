$(document).ready(function() {
    
    var suggestions = [
        'Apple', 'Banana', 'Cherry', 'Durian',
        'Elderberry', 'Fig', 'Grape', 'Honeydew',
        'Barbie', 'Frozen'
    ];
    
    var recentSearch = [];

    var movieDatabase = [
        { title: 'Barbie', year: '2023', genre: 'Komedi', icon: '💖' },
        { title: 'Frozen', year: '2013', genre: 'Animasi', icon: '❄️' }
    ];

    function renderSuggestions(query) {
        $('#suggestionBox').empty();

        if (query === "") {
            if (recentSearch.length > 0) {
                $('#suggestionBox').append('<div class="recent-title">Pencarian terakhir:</div>');
                $.each(recentSearch, function(index, item) {
                    var itemHTML = `
                        <div class="suggestion-item" data-value="${item}">
                            <span>${item}</span>
                            <button class="btn-del" data-index="${index}">&times;</button>
                        </div>
                    `;
                    $('#suggestionBox').append(itemHTML);
                });
            }
        } else {
            var matched = suggestions.filter(function(s) {
                return s.toLowerCase().indexOf(query.toLowerCase()) !== -1;
            });

            if (matched.length > 0) {
                $.each(matched, function(index, item) {
                    var itemHTML = `
                        <div class="suggestion-item" data-value="${item}">
                            <span>${item}</span>
                        </div>
                    `;
                    $('#suggestionBox').append(itemHTML);
                });
            } else {
                $('#suggestionBox').append('<div class="suggestion-item" style="color: #888; cursor: default;">Film tidak ditemukan</div>');
            }
        }
    }

    function jalankanPencarian() {
        var query = $.trim($('#search-input').val());
        if (query !== "") {
            if (suggestions.indexOf(query) === -1) {
                suggestions.push(query);
            }
            if (recentSearch.indexOf(query) === -1) {
                recentSearch.unshift(query);
            }
            
            $('#suggestionBox').hide();
            renderMovieResults(query);
        }
    }

    function renderMovieResults(query) {
        $('#movie-gallery').empty();
        
        var hasilFilm = movieDatabase.filter(function(movie) {
            return movie.title.toLowerCase() === query.toLowerCase();
        });

        if (hasilFilm.length > 0) {
            $('#search-result-info').html(`Menampilkan <span>${hasilFilm.length} film</span> untuk "${query}"`);
            
            $.each(hasilFilm, function(index, movie) {
                var cardHTML = `
                    <div class="movie-card">
                        <div class="movie-poster-placeholder">${movie.icon}</div>
                        <div class="movie-title">${movie.title}</div>
                        <div class="movie-year">${movie.year}</div>
                        <div class="movie-genre">${movie.genre}</div>
                    </div>
                `;
                $('#movie-gallery').append(cardHTML);
            });
        } else {
            $('#search-result-info').html(`Menampilkan <span>0 film</span> untuk "${query}"`);
        }
    }

    $('#search-input').on('input', function () {
        var query = $.trim($(this).val());
        renderSuggestions(query);
        $('#suggestionBox').show();
    });

    $('#search-input').on('keypress', function(e) {
        if (e.which === 13) {
            jalankanPencarian();
        }
    });

    $('.btn-search').on('click', function() {
        jalankanPencarian();
    });

    $(document).on('click', function (event) {
        var isInside = $(event.target).closest('#searchWrapper').length > 0;
        if (!isInside) {
            $('#suggestionBox').hide();
        }
    });

    $('#suggestionBox').on('click', '.btn-del', function(e) {
        e.stopPropagation();
        var index = parseInt($(this).data('index'));
        recentSearch.splice(index, 1);
        renderSuggestions('');
    });

    $('#suggestionBox').on('click', '.suggestion-item', function() {
        var value = $(this).data('value');
        if (value !== "Film tidak ditemukan") {
            $('#search-input').val(value);
            jalankanPencarian();
        }
    });

});