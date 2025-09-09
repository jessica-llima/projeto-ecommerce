document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('button').forEach(function(btn) {
        if (btn.textContent.trim().toLowerCase() === 'comprar') {
            btn.addEventListener('click', function () {
                var figure = btn.closest('.produto');
                if (!figure) return;
                var img = figure.querySelector('img');
                var nome = figure.querySelector('figcaption') ? figure.querySelector('figcaption').textContent : '';
                var spans = figure.querySelectorAll('.span span');
                var preco = spans.length ? spans[spans.length-1].textContent : 'R$ 0,00';
                var table = document.querySelector('#modal-1-content table tbody');
                if (!table) return;
                var tr = document.createElement('tr');
                tr.innerHTML = `
                    <td class="td-produto"><img src="${img.src}" alt="${img.alt}">${nome}</td>
                    <td>1</td>
                    <td><input type="number" value="1" min="1"></td>
                    <td class="td-total">${preco}</td>
                    <td><button class="btn-deletar" aria-label="Remover produto"></button></td>
                `;
                table.appendChild(tr);
                atualizarTotal();
               
                    var modal = document.getElementById('modal-1');
                    if (modal) {
                        modal.setAttribute('aria-hidden', 'false');
                        modal.classList.add('is-open');
                    }
            });
        }
    });
    var tabela = document.querySelector('#modal-1-content table');
    var totalSpan = document.getElementById('Total');
    var finalizarBtn = document.getElementById('finalizar-compra');

    function atualizarTotal() {
        var total = 0;
        tabela.querySelectorAll('tbody tr').forEach(function (tr) {
            var preco = tr.querySelector('.td-total');
            var qtdInput = tr.querySelector('input[type="number"]');
            if (preco && qtdInput) {
                var precoNum = parseFloat(preco.textContent.replace('R$', '').replace(',', '.'));
                var qtdNum = parseInt(qtdInput.value, 10);
                total += precoNum * qtdNum;
            }
        });
        totalSpan.textContent = 'Total: R$ ' + total.toFixed(2).replace('.', ',');
    }

    tabela.addEventListener('input', function (e) {
        if (e.target.type === 'number') {
            atualizarTotal();
        }
    });

    tabela.addEventListener('click', function (e) {
        if (e.target.classList.contains('btn-deletar')) {
            var tr = e.target.closest('tr');
            if (tr) tr.remove();
            atualizarTotal();
        }
    });

    if (finalizarBtn) {
        finalizarBtn.addEventListener('click', function () {
            alert('Compra finalizada!');
        });
    }

    atualizarTotal();
});
