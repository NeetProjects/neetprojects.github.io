/* -----------------------------------------------*/
/* --------->>> Constantes Globais <<<-----------*/
/* ---------------------------------------------*/
// Caminho da pasta da página atual
const PATH = window.location.pathname.replace('/index.html', '')

// Divs da página
const projectTitle    = $("#vn-title"     ),
      projectImg      = $(".project-img"  ),
      patchDownload   = $("#download_row" ),
      projectInfo     = $(".project-info" ),
      projectSinopse  = $(".sinopse"      ),
      projectTags     = $(".vn-tags"      ),
      projectProgress = $(".progress-area"),
      projectGallery  = $("#gallery_row"  );



/* -------------------------------------------------*/
/* --------->>> Funções de Adicionar <<<-----------*/
/* -----------------------------------------------*/

// Adicionar Título
function addTitle(project) {
    projectTitle.append(project.title);
}

// Adicionar capa
function addCover(project) {
    var projectCover = $("<div>").append(
        $("<img>")
            .attr("src", `/vn/${project.id}/img/capa.webp`)
            .addClass("img-fluid rounded b-shadow-a")
            .attr("alt", "")
    );
    projectImg.append(projectCover);
}

// Adicionar informações
function addInfos(project) {
    var dados = "ㅤ" + project.info;
    var infos = $("<p>").append(
        $("<img>")
            .attr("src", "/img/class-indi/" + project.peg + ".png")
            .attr("width", "40")
            .attr("height", "40")
            .attr("title", "Não recomendado para menores de " + project.peg + " anos"),
        dados
    );
    projectInfo.append(infos);
}

// Adicionar Sinopse
function addSinopse(project) {
    projectSinopse.append(project.sinop);
}

// Adicionar tags
function addTags(project) {
    var tags = project.tags;
    tags.forEach(function(tag) {
        var tagElem = $("<p>").text(tag);
        projectTags.append(tagElem);
    });
}

// Adicionar botão e textos de download
function addDownload(project) {
    // Se NÃO tiver download:
    if (project.download == "") {
        var tbrText = $("<p>")
            .attr("align", "center")
            // Evita bugs no mobile
            .attr("style", "margin: 14px 95px;")
            // Texto
            .append($("<strong>").html("<br>EM BREVE..."));
        patchDownload.append(tbrText);  // Botar texto na área de download
        return;                         // Fechar
    }
    // Se tiver:
    // Adicionar botão
    var downBut = $("<a>")
        .attr("href", project.download)
        .addClass("btn-download")
        .html('Baixar patch <i class="fas fa-cloud-arrow-down"></i>');
    // Adicionar aviso
    var copyText = $("<p>")
        .attr("align", "justify")
        .html("<strong>AVISO:</strong>\
                Este é um patch não oficial sem fins lucrativos\
                e de venda proibida que não inclui nenhuma cópia do jogo original.\
                Aplique-o em cópias devidamente adquiridas!"
        );
    // Botar na área de download
    patchDownload.append(downBut, copyText);
}

// Adicionar Barras de progresso
function addProgress(name, type) {
    projectProgress.append(
        $("<span>").html(name),
        $("<span>").addClass("pull-right").html(type + "%"),
        $("<div>").addClass("progress").append(
        $("<div>")
            .addClass("progress-bar")
            .attr("style", `width: ${type}%;`)
            .attr("role", "progressbar")
            .attr("aria-valuemin", "0")
            .attr("aria-valuenow", type)
            .attr("aria-valuemax", "100")
        )
    );
}

// Adicionar Galeria de Screenshots
function addGallery(project) {
    // String vazia = Não tem galeria
    if (project.gallery == ""){return}
    // Se tiver galeria:
    for (var i = 1; i < 7; i++) { // Ir do "print1" até "print6"
        var printPath = `${PATH}/img/print${i}.webp`;
        var div = $("<div>")
            .addClass("col-sm-6 col-md-4")
            .attr("data-aos", "fade-up")
        var image = div.append(
            $("<a>")
            .addClass("lightbox")
            .attr("href", printPath)
            .append($("<img>").attr("src", printPath))
        );
        projectGallery.append(image);
    }
    baguetteBox.run(".print-gallery"); // Ativar galeria
}



/* -------------------------------------------------*/
/* --------->>> Carregar os Detalhes <<<-----------*/
/* -----------------------------------------------*/
function loadProjectDetails() {
    $.getJSON(`${PATH}/info.json`, function(project) {
        // Adicionar elementos
        // ------------------------------------------------ // Elemento: ---------
        addTitle    (project);                              // Título
        addInfos    (project);                              // Informações
        addCover    (project);                              // Capa
        addSinopse  (project);                              // Sinopse
        addDownload (project);                              // Área de download
        // ------------------------------------------------ // --------------------
        addTags     (project);                              // Tags
        addProgress ("Menus", project.menus);               // Progresso dos Menus
        addProgress ("Imagens e Vídeos", project.imgs);     // Progresso da Edição
        addProgress ("História", project.hist);             // Progresso da História
        addProgress ("Revisão", project.rev);               // Progresso do Revisão
        // ------------------------------------------------ // --------------------
        addGallery  (project);                              // Screenshots
    });
}

// Executar ao carregar a página
$(document).ready(loadProjectDetails());
