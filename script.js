function abrirPreview() {
    const modal = document.getElementById('modalPreview');
    const previewContent = document.getElementById('previewContent');
    const curriculo = document.getElementById('curriculo');
    
    // Clona o conteúdo do currículo para o preview
    previewContent.innerHTML = curriculo.innerHTML;
    
    // Remove os botões de download e carta do preview
    const menuToggle = previewContent.querySelector('.menu-toggle');
    const cartaToggle = previewContent.querySelector('.carta-toggle');
    if (menuToggle) menuToggle.remove();
    if (cartaToggle) cartaToggle.remove();
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function fecharPreview() {
    const modal = document.getElementById('modalPreview');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// FUNÇÃO PARA ABRIR CARTA DE APRESENTAÇÃO
function abrirCarta() {
    // Abre a carta em uma nova aba
    window.open('carta.html', '_blank');
    
    // Alternativa: abrir na mesma aba
    // window.location.href = 'carta.html';
}

function confirmarDownload() {
    const botao = event.target.closest('.btn-primary');
    const textoOriginal = botao.innerHTML;
    
    // Feedback visual
    botao.innerHTML = '⏳ Gerando PDF...';
    botao.style.pointerEvents = 'none';
    
    const elemento = document.getElementById('curriculo');
    
    const opcoes = {
        margin: [10, 10, 10, 10],
        filename: 'Curriculo_Marcelo_Goulart.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { 
            scale: 2,
            useCORS: true,
            letterRendering: true,
            windowHeight: elemento.scrollHeight
        },
        jsPDF: { 
            unit: 'mm', 
            format: 'a4', 
            orientation: 'portrait',
            compress: true
        },
        pagebreak: { 
            mode: ['avoid-all', 'css', 'legacy'],
            avoid: ['.section', '.skill-item']
        }
    };
    
    html2pdf().set(opcoes).from(elemento).save().then(() => {
        botao.innerHTML = '✓ PDF Baixado!';
        setTimeout(() => {
            fecharPreview();
            botao.innerHTML = textoOriginal;
            botao.style.pointerEvents = 'auto';
        }, 2000);
    }).catch(err => {
        console.error('Erro ao gerar PDF:', err);
        botao.innerHTML = textoOriginal;
        botao.style.pointerEvents = 'auto';
        alert('Erro ao gerar PDF. Tente novamente.');
    });
}

// Fechar modal ao clicar fora
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('modalPreview').addEventListener('click', function(e) {
        if (e.target === this) {
            fecharPreview();
        }
    });

    // Fechar modal com ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            fecharPreview();
        }
    });
});
